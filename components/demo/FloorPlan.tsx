"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import confetti from "canvas-confetti";
import { generateDesignFromFloorPlan } from "@/lib/floorplan-ai";

type PixazoTextResponse = {
    imageUrl: string;
    requestId?: string;
};

export default function FloorPlan() {
    const [sourcePreview, setSourcePreview] = useState<string | null>(null);
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [textPrompt, setTextPrompt] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        setSourceFile(file);
        setResult(null);
        setErrorMessage(null);
        setSourcePreview(URL.createObjectURL(file));
    }

    function launchConfetti() {
        const duration = 2500;
        const end = Date.now() + duration;

        const colors = ["#f1deb0", "#b69454", "#7b5d31", "#f7efe3", "#2a2420"];

        const frame = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.75 },
                colors,
            });

            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.75 },
                colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }

    function timeout(ms: number) {
        return new Promise<never>((_, reject) => {
            setTimeout(() => {
                reject(new Error("Timeout generare. Afișez varianta demo."));
            }, ms);
        });
    }

    async function generateFromText(prompt: string) {
        const finalPrompt = `
Premium interior architecture render.

User description:
${prompt}

Design direction:
- warm minimalist interior design
- premium architecture studio aesthetic
- elegant, refined, realistic interior visualization
- ivory, beige, soft wood, natural stone, champagne lighting
- clean composition
- realistic light and shadows
- no text, no logo, no watermark
`;

        const response = await fetch("/api/pixazo-text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: finalPrompt,
                width: 768,
                height: 768,
                num_steps: 4,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Nu s-a putut genera imaginea din text.");
        }

        return data as PixazoTextResponse;
    }

    async function handleGenerate() {
        const cleanPrompt = textPrompt.trim();

        if (!sourceFile && !cleanPrompt) return;

        try {
            setLoading(true);
            setResult(null);
            setErrorMessage(null);

            if (cleanPrompt) {
                const response = await generateFromText(cleanPrompt);

                setResult(response.imageUrl);
                launchConfetti();
                return;
            }

            if (!sourceFile) {
                setErrorMessage("Încarcă un plan sau scrie o descriere.");
                return;
            }

            const response = await Promise.race([
                generateDesignFromFloorPlan(sourceFile, {
                    feeling: "calm, protected, refined",
                    lifestyle: "relaxation, comfort, and elegant daily living",
                    atmosphere: "warm minimalist, premium, natural, soft lighting",
                }),
                timeout(8000),
            ]);

            setResult(response.src);
            launchConfetti();
        } catch (error) {
            console.error("Eroare la generare:", error);

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Model indisponibil. Afișez varianta demo."
            );

            setResult("/images/camera_demo.png");
            launchConfetti();
        } finally {
            setLoading(false);
        }
    }

    const canGenerate = Boolean(sourceFile || textPrompt.trim());

    return (
        <section
            id="design-ai"
            className="relative overflow-hidden bg-[#d4c4ac] px-6 py-24 md:px-10 lg:px-16"
        >
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-b from-transparent via-[#d0c0a8]/70 to-[#cfc0a8]" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="rounded-[34px] border border-white/60 bg-white/20 p-6 shadow-[0_24px_80px_rgba(45,38,30,0.10),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl md:p-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-[#9a7b3e]">
                            Demo AI
                        </span>

                        <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-[#2a2420] md:text-5xl">
                            Transformă un plan 2D sau o idee într-un design 3D
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#5a5145]">
                            Încarcă un plan sau descrie spațiul dorit, iar aplicația generează automat o variantă demo
                            de design interior.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-2">
                        <div className="rounded-[28px] border border-white/60 bg-white/25 p-5">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#9a7b3e]">
                                Plan încărcat
                            </p>

                            <label className="flex h-[360px] cursor-pointer items-center justify-center overflow-hidden rounded-[22px] border border-dashed border-[#9a7b3e]/45 bg-white/20 text-center text-sm text-[#5a5145] transition hover:bg-white/30">
                                {sourcePreview ? (
                                    <img
                                        src={sourcePreview}
                                        alt="Plan încărcat"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center px-6 text-center">
                                        <div className="relative mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#d6bf86]/50 bg-white/25 shadow-[0_12px_30px_rgba(78,56,25,0.10),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md">
                                            <span className="text-2xl text-[#9a7b3e]">+</span>
                                            <div className="absolute inset-[-8px] rounded-full border border-[#d6bf86]/20" />
                                        </div>

                                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2a2420]">
                                            Încarcă planul
                                        </p>

                                        <p className="mt-3 max-w-xs text-sm leading-6 text-[#6a6054]">
                                            Alege o imagine cu planul 2D al spațiului tău.
                                        </p>

                                        <div className="mt-5 rounded-full border border-white/55 bg-white/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a7b3e] backdrop-blur-md">
                                            PNG · JPG · WEBP
                                        </div>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>

                            <div className="mt-5 rounded-[22px] border border-white/55 bg-white/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b3e]">
                                        MIND to reality
                                    </p>

                                    <span className="rounded-full border border-[#d6bf86]/50 bg-[#f7efe3]/35 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8f733d]">
                                        ARHITECTURE PLAN
                                    </span>
                                </div>

                                <textarea
                                    value={textPrompt}
                                    onChange={(event) => {
                                        setTextPrompt(event.target.value);
                                        setErrorMessage(null);
                                    }}
                                    placeholder="Ex: Living modern minimalist, pereți crem, atmosferă relaxantă"
                                    className="mt-4 h-14 w-full resize-none rounded-[18px] border border-white/50 bg-[#f7efe3]/45 px-4 py-3.5 text-sm leading-6 text-[#3a332b] outline-none placeholder:text-[#8a7d70] transition focus:border-[#b39458]/60 focus:bg-[#f7efe3]/60"
                                />
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-white/60 bg-white/25 p-5">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#9a7b3e]">
                                Design generat
                            </p>

                            <div className="flex h-[560px] items-center justify-center overflow-hidden rounded-[22px] border border-white/50 bg-white/20">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center gap-5">
                                        <div className="relative h-16 w-16">
                                            <div className="absolute inset-0 rounded-full border border-[#b39458]/20" />
                                            <div className="absolute inset-2 animate-spin rounded-full border border-transparent border-t-[#b39458]" />
                                            <div className="absolute inset-5 rounded-full bg-[#b39458]/30 blur-sm" />
                                        </div>

                                        <div className="text-center">
                                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2a2420]">
                                                Generăm atmosfera
                                            </p>
                                            <p className="mt-2 text-sm text-[#6a6054]">
                                                Construim imaginea pe baza planului sau descrierii.
                                            </p>
                                        </div>
                                    </div>
                                ) : result ? (
                                    <img
                                        src={result}
                                        alt="Design generat"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
                                        <div className="pointer-events-none absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-[#b39458]/35 to-transparent" />
                                        <div className="pointer-events-none absolute left-1/2 top-10 h-[70%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/40 to-transparent" />

                                        <div className="relative mb-6 grid h-16 w-16 place-items-center rounded-full border border-white/60 bg-white/20 shadow-[0_12px_30px_rgba(78,56,25,0.08),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md">
                                            <span className="text-xl text-[#9a7b3e]">✦</span>
                                            <div className="absolute inset-[-10px] rounded-full border border-[#d6bf86]/20" />
                                        </div>

                                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2a2420]">
                                            Designul se va construi aici
                                        </p>

                                        <p className="mt-3 max-w-xs text-sm leading-6 text-[#6a6054]">
                                            După generare, AI-ul va transforma planul sau descrierea într-o propunere
                                            vizuală de interior.
                                        </p>

                                        <div className="mt-5 flex gap-2">
                                            <span className="h-2 w-2 rounded-full bg-[#b39458]/45" />
                                            <span className="h-2 w-2 rounded-full bg-[#b39458]/30" />
                                            <span className="h-2 w-2 rounded-full bg-[#b39458]/20" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#7b3f2a]">
                            {errorMessage}
                        </p>
                    )}

                    <div className="mt-8 flex justify-center">
                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={!canGenerate || loading}
                            className="inline-flex items-center justify-center rounded-full border border-[#d6bf86]/70 bg-gradient-to-br from-[#f1deb0] via-[#b69454] to-[#7b5d31] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#17130f] shadow-[0_10px_22px_rgba(78,56,25,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Generez..." : "Generează design"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}