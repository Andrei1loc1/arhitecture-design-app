// lib/design-profile-ai.ts

export type DesignProfileAnswers = {
    retreatFeeling: string;
    dailyRhythm: string;
    visualOrder: string;
    socialEnergy: string;
    materialPreference: string;
};

export type GeneratedDesignProfile = {
    profileName: string;
    shortDescription: string;
    atmosphere: string;
    colorPalette: string[];
    materials: string[];
    lighting: string;
    spatialLogic: string;
    designRecommendation: string;
};

const UNCLOSE_BASE_URL = "https://hermes.ai.unturf.com/v1";
const UNCLOSE_API_KEY = "permacomputer";
const UNCLOSE_MODEL = "adamo1139/Hermes-3-Llama-3.1-8B-FP8-Dynamic";

function buildPrompt(answers: DesignProfileAnswers) {
    return `
You are an architectural interior design psychologist, but do not diagnose.
Generate a refined "Architectural Design Personality Profile" based on the user's answers.

User answers:
1. Desired emotional feeling at home: ${answers.retreatFeeling}
2. Daily rhythm: ${answers.dailyRhythm}
3. Relationship with visual order: ${answers.visualOrder}
4. Social energy: ${answers.socialEnergy}
5. Material preference: ${answers.materialPreference}

Return ONLY valid JSON.
No markdown.
No explanations outside JSON.

JSON shape:
{
  "profileName": "short elegant profile title",
  "shortDescription": "2 sentence description in Romanian",
  "atmosphere": "main atmosphere in Romanian",
  "colorPalette": ["color 1", "color 2", "color 3", "color 4"],
  "materials": ["material 1", "material 2", "material 3"],
  "lighting": "lighting recommendation in Romanian",
  "spatialLogic": "how the space should be organized in Romanian",
  "designRecommendation": "one final practical design recommendation in Romanian"
}

Tone:
- premium
- minimalist
- architectural
- clear
- emotionally intelligent
- not clinical
`;
}

function safeJsonParse(text: string): GeneratedDesignProfile {
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned) as GeneratedDesignProfile;
}

export async function generateArchitecturalDesignProfile(
    answers: DesignProfileAnswers
): Promise<GeneratedDesignProfile> {
    const response = await fetch(`${UNCLOSE_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${UNCLOSE_API_KEY}`,
        },
        body: JSON.stringify({
            model: UNCLOSE_MODEL,
            temperature: 0.65,
            max_tokens: 900,
            messages: [
                {
                    role: "system",
                    content:
                        "You create refined interior design personality profiles in Romanian. Return strict JSON only.",
                },
                {
                    role: "user",
                    content: buildPrompt(answers),
                },
            ],
        }),
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error?.message ||
            data?.message ||
            "UncloseAI nu a putut genera profilul."
        );
    }

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error("UncloseAI nu a returnat conținut.");
    }

    return safeJsonParse(content);
}