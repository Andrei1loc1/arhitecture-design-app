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
[ROLE] Expert architectural visualization AI. Transform the uploaded 2D floor plan into a photorealistic top-down 3D interior render.

[INPUT ANALYSIS]
Analyze the uploaded floor plan image carefully. Count the rooms visible in the original plan. Generate EXACTLY that number of rooms - do NOT add extra rooms or remove existing ones.

[CRITICAL RULES]
1. ROOM COUNT: Generate EXACTLY the same number of rooms as shown in the uploaded floor plan. If the plan shows 2 rooms, render 2 rooms. If it shows 3 rooms, render 3 rooms. NEVER add bonus rooms.
2. PRESERVE LAYOUT: Keep the exact wall positions, door placements, window locations, and room proportions from the original plan.
3. PERSPECTIVE: Strict top-down orthographic view (90-degree vertical angle). Bird's eye looking straight down.
4. 3D EFFECT: All walls must have visible height and thickness. Furniture must be 3D with realistic depth, shadows, and proportions.
5. INTERIOR ONLY: Show only the inside of the apartment. No exterior walls, no building facade, no outside view through windows.
6. FURNITURE: Each room gets appropriate furniture based on room type:
   - Bedroom: bed, nightstands, wardrobe
   - Living room: sofa, coffee table, TV unit, rug
   - Kitchen: cabinets, counter, fridge, stove, island if space allows
   - Bathroom: toilet, sink, shower/tub, mirror
   - Dining: table, chairs, maybe sideboard
7. STYLE: Warm minimalist premium interior. Colors: beige, ivory, cream, warm taupe, natural light oak wood. Soft ambient lighting with gentle shadows.
8. MATERIALS: Realistic textures - linen upholstery, wood grain, stone countertops, ceramic tiles, soft fabric.
9. NO TEXT: Remove ALL labels, room names, dimensions, measurements, symbols, annotations, legends. Absolutely zero text or numbers.
10. QUALITY: Photorealistic, premium architectural visualization, clean composition, professional lighting.

[STYLE DETAILS]
- Warm neutral color palette
- Natural materials and textures
- Soft shadows and ambient lighting
- Realistic furniture proportions
- Clean uncluttered spaces
- Premium feel

[OUTPUT]
Single high-resolution top-down 3D interior render. No text anywhere.
`;

        const negative_prompt = `
more rooms than original, extra rooms, bonus spaces, fewer rooms than original, missing rooms,
2D flat blueprint, technical drawing, line art, sketch, cartoon, anime, illustration, painting,
exterior view, building facade, outside scene, city, street, aerial view, neighborhood,
text, labels, numbers, dimensions, measurements, annotations, watermark, logo, signature,
black and white, monochrome, grayscale, low quality, blurry, distorted proportions, bad anatomy,
multiple apartments, building complex, floor plan with text, blueprint style
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