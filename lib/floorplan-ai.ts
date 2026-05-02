"use client";

import { puter } from "@heyputer/puter.js";

export type DesignProfile = {
    feeling?: string;
    lifestyle?: string;
    atmosphere?: string;
};

function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

function buildPrompt(profile?: DesignProfile) {
    return `
Convert this uploaded 2D architectural floor plan into a clean, premium top-down 3D interior design render.

Strict architectural rules:
- Preserve the exact room layout, wall positions, doors, windows, and circulation.
- Do not add extra rooms.
- Do not change the structure.
- Remove all labels, room names, dimensions, annotations, and technical text.
- Keep a top-down orthographic architectural view.
- Convert walls into realistic low-height 3D walls.
- Add furniture only where the plan clearly implies it.
- No logos, no watermark, no text.

Personalization profile:
- Desired feeling: ${profile?.feeling || "calm, refined, emotionally balanced"}
- Lifestyle focus: ${profile?.lifestyle || "relaxation, comfort, and everyday functionality"}
- Visual atmosphere: ${profile?.atmosphere || "warm minimalist, elegant, premium"}

Design direction:
- warm beige, ivory, natural wood, stone, soft linen textures
- subtle champagne lighting
- premium minimalist architecture
- elegant furniture
- calm cinematic shadows
- realistic materials
- professional interior visualization

Important:
This is an apartment floor plan, not a city map, not an aerial neighborhood, not an exterior view.
Show only one interior apartment layout.
`;
}

export async function generateDesignFromFloorPlan(
    file: File,
    profile?: DesignProfile
): Promise<HTMLImageElement> {
    if (!file.type.startsWith("image/")) {
        throw new Error("Fișierul încărcat trebuie să fie o imagine.");
    }

    const dataUrl = await fileToDataURL(file);
    const prompt = buildPrompt(profile);

    const result = await puter.ai.txt2img(prompt, {
        provider: "gemini",
        model: "gemini-2.5-flash-image-preview",
        input_image: dataUrl,
        input_image_mime_type: file.type,
        ratio: {
            w: 1024,
            h: 1024,
        },
    });

    return result as HTMLImageElement;
}