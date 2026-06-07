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
[SYSTEM] You are a certified architect. Transform the uploaded 2D floor plan into a photorealistic top-down 3D interior render. Apply real architectural principles.

[INPUT]
Uploaded floor plan image showing a residential apartment layout.

[CRITICAL ARCHITECTURAL RULES]
1. PRESERVE EXACT LAYOUT: Count the rooms in the uploaded plan. Render EXACTLY that many rooms. No more, no less.
2. MANDATORY BATHROOM: If the plan shows a bathroom/toilet symbol, it MUST become a proper separate bathroom room. If no bathroom symbol exists but it's a residential unit, add 1 bathroom logically.
3. TOILET LOCATION RULES:
   - Toilet MUST be inside a closed bathroom room
   - Toilet CANNOT be in kitchen, living room, or hallway
   - Bathroom door must NOT open directly into kitchen
4. KITCHEN RULES:
   - Kitchen must have proper counter, cabinets, sink
   - No toilet, no bed, no shower in kitchen
   - Kitchen must be adjacent to living/dining area
5. CIRCULATION LOGIC:
   - Use hallway/foyer to connect rooms
   - Bedroom needs privacy, not directly visible from entrance
   - Avoid walking through one room to reach another
6. WALL THICKNESS: All walls must show realistic 3D thickness (20-30cm).
7. ROOM FUNCTIONALITY:
   - Living: sofa, coffee table, TV, rug
   - Kitchen: cabinets, counter, sink, stove, fridge
   - Bathroom: toilet (in closed room!), sink, shower
   - Bedroom: bed, nightstands, wardrobe
8. STYLE: Warm minimalist premium. Beige, ivory, cream, natural light wood. Soft ambient lighting.
9. PERSPECTIVE: Strict top-down orthographic (90°). 3D effect with realistic wall height.
10. NO TEXT: Remove all labels, dimensions, annotations. Zero text.

[SPATIAL FLOW]
Entrance → Foyer → Public zones (living/kitchen) → Private zones (bedrooms/bath)
Bathroom accessible from hallway or near bedrooms. NOT from kitchen.

[NEGATIVE PROMPT]
toilet in kitchen, toilet visible from living room, toilet in hallway, toilet in open space,
extra rooms not in original plan, missing rooms from original plan,
2D flat blueprint, technical drawing, line art, sketch, cartoon, anime,
exterior view, building facade, outside scene, city, street, aerial,
text, labels, dimensions, measurements, annotations, watermark, logo,
black and white, monochrome, low quality, blurry, distorted
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