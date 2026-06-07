import { NextRequest, NextResponse } from "next/server";

const PIXAZO_URL = "https://gateway.pixazo.ai/flux-1-schnell/v1/getData";

function parseRoomsFromPrompt(userPrompt: string): string[] {
    const prompt = userPrompt.toLowerCase();
    const rooms: string[] = [];
    
    // Detectăm tipurile de camere menționate
    if (prompt.includes('living') || prompt.includes('sufragerie') || prompt.includes('sala')) {
        rooms.push('Living room');
    }
    if (prompt.includes('bucatarie') || prompt.includes('kitchen') || prompt.includes('bucătărie')) {
        rooms.push('Kitchen');
    }
    if (prompt.includes('dormitor') || prompt.includes('bedroom') || prompt.includes('cameră') || prompt.includes('camera')) {
        // Extragem numărul de dormitoare
        const match = prompt.match(/(\d+)\s*(dormitor|bedroom|cameră|camera|camere)/);
        const count = match ? parseInt(match[1]) : 1;
        for (let i = 0; i < count; i++) {
            rooms.push(count > 1 ? `Bedroom ${i + 1}` : 'Bedroom');
        }
    }
    if (prompt.includes('baie') || prompt.includes('bathroom') || prompt.includes('toaletă') || prompt.includes('toaleta')) {
        rooms.push('Bathroom');
    }
    if (prompt.includes('dining') || prompt.includes('sufragerie') || prompt.includes('mancare') || prompt.includes('masă')) {
        rooms.push('Dining room');
    }
    if (prompt.includes('hol') || prompt.includes('hallway') || prompt.includes('foyer') || prompt.includes('antreu')) {
        rooms.push('Entrance hallway');
    }
    if (prompt.includes('birou') || prompt.includes('office') || prompt.includes('studio') || prompt.includes('lucru')) {
        rooms.push('Home office');
    }
    if (prompt.includes('balcon') || prompt.includes('balcony') || prompt.includes('terasa') || prompt.includes('terasă')) {
        rooms.push('Balcony');
    }
    if (prompt.includes('dressing') || prompt.includes('closet') || prompt.includes('wardrobe')) {
        rooms.push('Walk-in closet');
    }
    
    // Dacă nu am detectat nicio cameră specifică, returnăm living + kitchen ca default
    if (rooms.length === 0) {
        rooms.push('Living room', 'Kitchen', 'Bathroom');
    }
    
    // Adăugăm mandatory bathroom dacă nu există deja
    const hasBathroom = rooms.some(r => r.includes('Bathroom'));
    if (!hasBathroom) {
        rooms.push('Bathroom');
    }
    
    return rooms;
}

function buildFloorPlanPrompt(userPrompt: string) {
    const cleanedPrompt = userPrompt.trim();
    const rooms = parseRoomsFromPrompt(cleanedPrompt);
    const roomList = rooms.map((room, index) => `${index + 1}. ${room}`).join('\n');
    const roomCount = rooms.length;
    
    return `
TOP-DOWN 3D INTERIOR FLOOR PLAN. Aerial bird's eye view looking straight down at 90 degrees.

Generate a photorealistic top-down floor plan render of an apartment with EXACTLY ${roomCount} rooms:
${roomList}

CRITICAL RULES:
- PERSPECTIVE: STRICT top-down aerial view (90° vertical angle). Looking straight down at the floor. NOT 3/4 view. NOT perspective view. NOT isometric. Pure top-down.
- Each room is a separate enclosed space with 3D walls (20-30cm thick, visible height).
- Toilet MUST be inside Bathroom only. Never in kitchen/living/hallway.
- Bathroom door must NOT open into kitchen.
- Kitchen: cabinets, counter, sink, stove. No bed/toilet in kitchen.
- Furniture is 3D with realistic proportions and shadows.
- Style: warm minimalist. Beige, ivory, cream, light oak wood. Soft ambient lighting.
- NO text, labels, dimensions, annotations, watermarks.

FURNITURE BY ROOM (ONLY these items, placed correctly):
- Living room: One L-shaped sofa against a wall, one rectangular coffee table in center, one TV stand against opposite wall, one area rug under coffee table. NO bed, NO dining table, NO toilet.
- Kitchen: L-shaped or linear counter along walls, upper cabinets above counter, sink in counter, stove, refrigerator against wall. One small dining table with 2-4 chairs if space allows. NO bed, NO sofa, NO toilet.
- Bathroom: One toilet in corner, one sink with mirror on wall, one shower cabin or bathtub. NO bed, NO sofa, NO kitchen appliances, NO dining table.
- Bedroom: One double bed with headboard against wall (NOT mattress on floor), two nightstands beside bed, one wardrobe/closet against wall. NO sofa, NO kitchen appliances, NO dining table, NO toilet.
- Dining room: One rectangular dining table centered, 4-6 chairs around table, one sideboard against wall. NO bed, NO sofa, NO toilet.
- Hallway: Small console table or coat rack against wall, maybe mirror. NO bed, NO sofa, NO kitchen appliances, NO dining table, NO toilet.

NEGATIVE:
- 3/4 perspective view, isometric, angled view, side view, interior corner view, room corner perspective
- mattress on floor, bed on floor without frame, sleeping mat on floor, futon on floor
- toilet in kitchen, toilet in living room, open toilet, toilet visible
- sofa in bedroom, sofa in bathroom, sofa in kitchen
- bed in kitchen, bed in living room, bed in bathroom
- dining table in bedroom, dining table in bathroom
- kitchen appliances in living room, stove in bedroom, refrigerator in hallway
- random objects, clutter, boxes, piles of items, scattered objects
- more than ${roomCount} rooms, fewer than ${roomCount} rooms
- 2D blueprint, technical drawing, sketch, line art, flat lines
- exterior view, building facade, city, street
- text, labels, dimensions, watermark, logo
- cartoon, anime, illustration, painting
- black and white, low quality, blurry

Output: Single photorealistic top-down 3D interior floor plan. ${roomCount} rooms with correct furniture placement. No text. Strict top-down view.
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