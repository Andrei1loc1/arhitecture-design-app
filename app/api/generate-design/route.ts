import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
    try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            return NextResponse.json(
                { error: "Lipsește BLOB_READ_WRITE_TOKEN." },
                { status: 500 }
            );
        }

        if (!process.env.PIXAZO_API_KEY) {
            return NextResponse.json(
                { error: "Lipsește PIXAZO_API_KEY." },
                { status: 500 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "Nu ai trimis niciun fișier." },
                { status: 400 }
            );
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Fișierul trebuie să fie o imagine." },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const inputBuffer = Buffer.from(arrayBuffer);

        // Normalizăm imaginea la 1024x1024 ca să fie stabilă
        const normalizedSource = await sharp(inputBuffer)
            .resize(1024, 1024, {
                fit: "contain",
                background: { r: 255, g: 255, b: 255, alpha: 1 },
            })
            .png()
            .toBuffer();

        // Mască complet albă = rescrie toată imaginea
        const whiteMask = await sharp({
            create: {
                width: 1024,
                height: 1024,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 },
            },
        })
            .png()
            .toBuffer();

        const sourceBlob = await put(
            `floorplans/${Date.now()}-source.png`,
            normalizedSource,
            {
                access: "public",
                token: process.env.BLOB_READ_WRITE_TOKEN,
                contentType: "image/png",
            }
        );

        const maskBlob = await put(
            `floorplans/${Date.now()}-mask.png`,
            whiteMask,
            {
                access: "public",
                token: process.env.BLOB_READ_WRITE_TOKEN,
                contentType: "image/png",
            }
        );

        const prompt = `
Convert this black and white apartment floor plan into a top-down 3D furnished interior render.

Important:
- This is an apartment floor plan, not a city map, not an aerial neighborhood, not an exterior view.
- Keep the apartment layout recognizable.
- Preserve the general room arrangement and wall structure.
- Show a top-down interior visualization of the apartment only.
- Convert each room into a furnished interior space.
- Remove all labels, room names, dimensions, symbols and technical annotations.
- Use a warm minimalist interior style with beige, ivory, light wood and soft shadows.
- Show only one apartment unit, not multiple buildings.
- No aerial city view, no streets, no neighborhood, no exterior urban scene.
- No text, no watermark.
`;

        const negative_prompt = `
city, aerial view, satellite image, urban grid, neighborhood, roads, buildings, map, exterior, multiple houses, block layout, text, labels, dimensions, watermark
`;

        const response = await fetch(
            "https://gateway.pixazo.ai/inpainting/v1/getImage",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Ocp-Apim-Subscription-Key": process.env.PIXAZO_API_KEY,
                },
                body: JSON.stringify({
                    prompt,
                    imageUrl: sourceBlob.url,
                    maskUrl: maskBlob.url,
                    negative_prompt:
                        "watermark, text, labels, dimensions, logo, blurry image, distorted structure, extra rooms, bad anatomy, low quality",
                    height: 1024,
                    width: 1024,
                    num_steps: 20,
                    guidance: 5,
                    seed: 42,
                }),
                cache: "no-store",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    error:
                        data?.message ||
                        data?.error ||
                        "Pixazo inpainting request failed.",
                },
                { status: response.status }
            );
        }

        if (!data?.imageUrl) {
            return NextResponse.json(
                { error: "Pixazo nu a returnat imageUrl." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            src: data.imageUrl,
            sourceImageUrl: sourceBlob.url,
            maskUrl: maskBlob.url,
        });
    } catch (error) {
        console.error("Generate design error:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "A apărut o eroare la generare.",
            },
            { status: 500 }
        );
    }
}