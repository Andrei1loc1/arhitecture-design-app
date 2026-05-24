import { NextRequest, NextResponse } from "next/server";

const PIXAZO_URL = "https://gateway.pixazo.ai/flux-1-schnell/v1/getData";

function buildFloorPlanPrompt(userPrompt: string) {
    const cleanedPrompt = userPrompt.trim();

    // Extragem numărul de camere din promptul userului dacă există
    const roomCountMatch = cleanedPrompt.match(/(\d+)\s*(camere|rooms|bedroom|dormitor|living|kitchen|bucatarie|bathroom|baie)/i);
    const requestedRooms = roomCountMatch ? parseInt(roomCountMatch[1]) : null;

    return `
[ROLE] You are an expert architectural visualization AI. Create a precise top-down 3D interior floor plan render based on the user's description.

[INPUT - USER REQUEST]
${cleanedPrompt}

[CRITICAL RULES - FOLLOW EXACTLY]
1. ROOM COUNT: Generate EXACTLY the number of rooms specified by the user.${requestedRooms ? ` The user requested ${requestedRooms} rooms. Do NOT add more or fewer rooms.` : ' If no specific number is given, use reasonable defaults for the space described.'}
2. ROOM LIST: Only include rooms explicitly mentioned by the user. Do NOT add extra rooms (no bonus closets, storage rooms, or utility rooms unless requested).
3. PERSPECTIVE: Pure top-down orthographic view (bird's eye, 90-degree angle), looking straight down at the floor.
4. NO EXTERIOR: Show ONLY interior spaces. No building exteriors, no windows showing outside views, no facades.
5. 3D EFFECT: Walls must have realistic 3D height and thickness (not flat 2D lines). Furniture must be 3D with realistic proportions and shadows.
6. FURNITURE: Each room must contain context-appropriate furniture. Bedrooms = bed + nightstands. Living = sofa + coffee table. Kitchen = cabinets + island/counter. Bathroom = toilet + sink + shower.
7. STYLE: Premium warm minimalist interior design. Colors: beige, ivory, cream, warm neutrals, natural light wood, soft champagne lighting.
8. MATERIALS: Realistic textures - linen, wood grain, stone, ceramic, soft shadows.
9. NO TEXT: Absolutely NO labels, NO room names, NO dimensions, NO measurements, NO symbols, NO annotations, NO watermarks, NO logos, NO text of any kind.
10. QUALITY: Photorealistic architectural visualization. Clean composition. Professional lighting.

[NEGATIVE PROMPT - EXCLUDE COMPLETELY]
- exterior, facade, building outside, windows showing outside
- city, street, neighborhood, aerial view, urban scene
- more rooms than requested, bonus rooms, extra spaces
- 2D flat lines, blueprint style, technical drawing
- text, labels, dimensions, measurements, annotations, watermark, logo
- black and white, monochrome, sketch, line drawing
- cartoon, anime, illustration, painting style
- blurry, low quality, distorted proportions

[OUTPUT FORMAT]
Single high-resolution image. Top-down 3D interior floor plan render. No text anywhere.
`;
}
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const prompt = String(body.prompt || "").trim();
        const width = Number(body.width || 768);
        const height = Number(body.height || 768);
        const num_steps = Number(body.num_steps || 4);
        const seed = Number(body.seed || Math.floor(Math.random() * 1000000));

        if (!prompt) {
            return NextResponse.json(
                { error: "Promptul este obligatoriu." },
                { status: 400 }
            );
        }

        const apiKey = process.env.PIXAZO_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Lipsește PIXAZO_API_KEY din .env.local." },
                { status: 500 }
            );
        }

        const finalPrompt = buildFloorPlanPrompt(prompt);

        const response = await fetch(PIXAZO_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Ocp-Apim-Subscription-Key": apiKey,
            },
            body: JSON.stringify({
                prompt: finalPrompt,
                num_steps,
                seed,
                width,
                height,
            }),
            cache: "no-store",
        });

        const rawText = await response.text();

        let data: any;
        try {
            data = JSON.parse(rawText);
        } catch {
            console.error("Pixazo non-JSON response:", rawText);

            return NextResponse.json(
                {
                    error: "Pixazo nu a returnat JSON valid.",
                    raw: rawText.slice(0, 500),
                },
                { status: response.status || 500 }
            );
        }

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: data?.message || data?.error || "Pixazo a refuzat cererea.",
                    raw: data,
                },
                { status: response.status }
            );
        }

        const imageUrl = data.output || data.imageUrl || data.url;

        if (!imageUrl) {
            return NextResponse.json(
                {
                    error: "Pixazo a răspuns, dar nu a returnat URL-ul imaginii.",
                    raw: data,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            imageUrl,
            promptUsed: finalPrompt,
        });
    } catch (error) {
        console.error("Pixazo route error:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "A apărut o eroare internă.",
            },
            { status: 500 }
        );
    }
}