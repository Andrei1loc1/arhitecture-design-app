// app/api/design-profile/route.ts

import { NextResponse } from "next/server";
import {
    generateArchitecturalDesignProfile,
    type DesignProfileAnswers,
} from "@/lib/design-profile-ai";

export async function POST(req: Request) {
    try {
        const answers = (await req.json()) as DesignProfileAnswers;

        const profile = await generateArchitecturalDesignProfile(answers);

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Design profile error:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Nu s-a putut genera profilul.",
            },
            { status: 500 }
        );
    }
}