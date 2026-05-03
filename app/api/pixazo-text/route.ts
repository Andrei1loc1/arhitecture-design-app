import { NextRequest, NextResponse } from "next/server";

const PIXAZO_URL = "https://gateway.pixazo.ai/flux-1-schnell/v1/getData";

function buildFloorPlanPrompt(userPrompt: string) {
    const cleanedPrompt = userPrompt.trim();

    return `
TASK:
Convert the described apartment floor plan into a top-down 3D furnished interior render.

CORE CONSTRAINTS:
- This is an apartment floor plan.
- Not a city map.
- Not an aerial neighborhood.
- Not an exterior building render.
- Show only one apartment unit.
- Keep the layout recognizable.
- Preserve room arrangement and wall structure.
- Show only the apartment interior in top-down view.
- Furnish each room appropriately.
- Remove labels, room names, dimensions, symbols, measurements, and technical annotations.
- Use warm minimalist interior design.
- Use beige, ivory, warm neutrals, light wood, and soft shadows.
- Make it look like a premium architectural visualization.
- Realistic furniture, realistic proportions, clean composition.
- No text, no watermark.

USER CUSTOMIZATION:
${cleanedPrompt}

NEGATIVE CONSTRAINTS:
- no city
- no street
- no neighborhood
- no exterior scene
- no building complex
- no aerial urban view
- no blueprint text
- no labels
- no watermark
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