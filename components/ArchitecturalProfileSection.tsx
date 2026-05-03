"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Answers = {
    retreatFeeling: string;
    dailyRhythm: string;
    visualOrder: string;
    socialEnergy: string;
    materialPreference: string;
};

type GeneratedProfile = {
    profileName: string;
    shortDescription: string;
    atmosphere: string;
    colorPalette: string[];
    materials: string[];
    lighting: string;
    spatialLogic: string;
    designRecommendation: string;
};

const questions = [
    {
        key: "retreatFeeling",
        eyebrow: "01 / Stare",
        question: "Cum vrei să te simți când intri în spațiul tău?",
        options: [
            "Calm și protejat",
            "Inspirat și creativ",
            "Energizat și productiv",
            "Elegant și în control",
        ],
    },
    {
        key: "dailyRhythm",
        eyebrow: "02 / Ritm",
        question: "Care este ritmul tău zilnic acasă?",
        options: [
            "Lent, relaxat, orientat spre liniște",
            "Dinamic, între lucru și pauze scurte",
            "Social, cu invitați și conversații",
            "Practic, organizat și eficient",
        ],
    },
    {
        key: "visualOrder",
        eyebrow: "03 / Ordine",
        question: "Ce tip de ordine vizuală te ajută să te simți bine?",
        options: [
            "Spații foarte aerisite și curate",
            "Obiecte puține, dar cu personalitate",
            "Texturi calde și detalii naturale",
            "Compoziții elegante, simetrice și controlate",
        ],
    },
    {
        key: "socialEnergy",
        eyebrow: "04 / Energie",
        question: "Cum preferi să funcționeze spațiul social?",
        options: [
            "Intim și discret",
            "Deschis, dar nu aglomerat",
            "Primitor și cald pentru invitați",
            "Flexibil, ușor de adaptat",
        ],
    },
    {
        key: "materialPreference",
        eyebrow: "05 / Materiale",
        question: "Ce materiale te atrag instinctiv?",
        options: [
            "Lemn deschis, in, bumbac, piatră caldă",
            "Marmură, metal champagne, sticlă, texturi fine",
            "Beton cald, microciment, lemn închis",
            "Materiale naturale brute și forme organice",
        ],
    },
] as const;

export default function ArchitecturalProfileSection() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({
        retreatFeeling: "",
        dailyRhythm: "",
        visualOrder: "",
        socialEnergy: "",
        materialPreference: "",
    });
    const [profile, setProfile] = useState<GeneratedProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const currentQuestion = questions[step];
    const currentKey = currentQuestion.key as keyof Answers;

    const progress = useMemo(() => {
        return ((step + 1) / questions.length) * 100;
    }, [step]);

    function selectAnswer(value: string) {
        setAnswers((prev) => ({
            ...prev,
            [currentKey]: value,
        }));
    }

    async function handleNext() {
        if (!answers[currentKey]) return;

        if (step < questions.length - 1) {
            setStep((prev) => prev + 1);
            return;
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            setProfile(null);

            const response = await fetch("/api/design-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(answers),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Nu s-a putut genera profilul.");
            }

            setProfile(data);
        } catch (error) {
            console.error(error);
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "A apărut o eroare la generare."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleBack() {
        if (profile) {
            setProfile(null);
            return;
        }

        setStep((prev) => Math.max(prev - 1, 0));
    }

    function handleRestart() {
        setStep(0);
        setProfile(null);
        setErrorMessage(null);
        setAnswers({
            retreatFeeling: "",
            dailyRhythm: "",
            visualOrder: "",
            socialEnergy: "",
            materialPreference: "",
        });
    }

    return (
        <section
            id="design-profile"
            className="relative overflow-hidden bg-[#c9b89f] px-6 py-24 md:px-10 lg:px-16 lg:py-32"
        >
            {/* tranziție din FloorPlan */}
            <div className="pointer-events-none absolute inset-x-0 -top-20 z-0 h-64 bg-gradient-to-b from-[#d4c4ac] via-[#cdbca4] to-[#c9b89f]" />

            {/* tranziție către Footer */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 bg-gradient-to-b from-transparent via-[#cdbca4]/70 to-[#cfc0a8]" />

            {/* atmosferă / cercuri */}
            <div className="pointer-events-none absolute left-[-10%] top-[18%] h-[340px] w-[340px] rounded-full bg-white/25 blur-3xl" />
            <div className="pointer-events-none absolute right-[-8%] top-[10%] h-[380px] w-[380px] rounded-full bg-[#b39458]/12 blur-3xl" />

            <motion.div
                className="pointer-events-none absolute left-[8%] top-[22%] h-24 w-24 rounded-full border border-white/45 bg-white/10 backdrop-blur-sm"
                animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="pointer-events-none absolute bottom-[18%] right-[12%] h-16 w-16 rounded-full border border-[#d6bf86]/45 bg-white/15 backdrop-blur-sm"
                animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
                {/* Left intro */}
                <div className="max-w-xl">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.28em] text-[#8f733d]">
            06 / Profil arhitectural
          </span>

                    <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-[#2a2420] md:text-6xl">
                        Descoperă atmosfera care ți se potrivește.
                    </h2>

                    <p className="mt-7 max-w-lg text-base leading-8 text-[#5a5145] md:text-lg">
                        Răspunde la 5 întrebări simple, iar AI-ul îți construiește un profil
                        de design bazat pe ritmul, preferințele și energia ta spațială.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        {["Mind", "Atmosferă", "Materiale"].map((item) => (
                            <div
                                key={item}
                                className="rounded-full border border-white/60 bg-white/25 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6a6054] shadow-[0_8px_25px_rgba(45,38,30,0.08)] backdrop-blur-md"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right card */}
                <div className="relative">
                    <div className="rounded-[34px] border border-white/60 bg-white/20 p-6 shadow-[0_24px_80px_rgba(45,38,30,0.12),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl md:p-8">
                        {!profile ? (
                            <>
                                <div className="mb-8">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8f733d]">
                                            Întrebarea {step + 1} din {questions.length}
                                        </p>

                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6a6054]">
                                            {Math.round(progress)}%
                                        </p>
                                    </div>

                                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/35">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-[#f1deb0] via-[#b69454] to-[#7b5d31]"
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -18 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                    >
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a7b3e]">
                                            {currentQuestion.eyebrow}
                                        </p>

                                        <h3 className="mt-4 text-2xl font-black uppercase leading-tight tracking-[-0.04em] text-[#2a2420] md:text-4xl">
                                            {currentQuestion.question}
                                        </h3>

                                        <div className="mt-8 grid gap-3">
                                            {currentQuestion.options.map((option) => {
                                                const selected = answers[currentKey] === option;

                                                return (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => selectAnswer(option)}
                                                        className={`group flex items-center justify-between rounded-full border px-5 py-4 text-left text-sm font-medium transition duration-300 ${
                                                            selected
                                                                ? "border-[#d6bf86]/80 bg-[#f7efe3]/55 text-[#2a2420] shadow-[0_12px_30px_rgba(78,56,25,0.10)]"
                                                                : "border-white/55 bg-white/20 text-[#4a4438] hover:bg-white/35"
                                                        }`}
                                                    >
                                                        <span>{option}</span>
                                                        <span
                                                            className={`h-2.5 w-2.5 rounded-full transition ${
                                                                selected ? "bg-[#b39458]" : "bg-[#b39458]/25"
                                                            }`}
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {errorMessage && (
                                            <p className="mt-5 text-sm font-medium text-[#7b3f2a]">
                                                {errorMessage}
                                            </p>
                                        )}

                                        <div className="mt-8 flex items-center justify-between gap-4">
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                disabled={step === 0 || loading}
                                                className="rounded-full border border-white/55 bg-white/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4a4438] transition hover:bg-white/35 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Înapoi
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={!answers[currentKey] || loading}
                                                className="rounded-full border border-[#d6bf86]/70 bg-gradient-to-br from-[#f1deb0] via-[#b69454] to-[#7b5d31] px-7 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#17130f] shadow-[0_10px_22px_rgba(78,56,25,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {loading
                                                    ? "Generez..."
                                                    : step === questions.length - 1
                                                        ? "Generează profil"
                                                        : "Continuă"}
                                            </button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a7b3e]">
                                    Profil generat
                                </p>

                                <h3 className="mt-4 text-3xl font-black uppercase leading-none tracking-[-0.05em] text-[#2a2420] md:text-5xl">
                                    {profile.profileName}
                                </h3>

                                <p className="mt-5 text-base leading-8 text-[#5a5145]">
                                    {profile.shortDescription}
                                </p>

                                <div className="mt-8 grid gap-4 md:grid-cols-2">
                                    <div className="rounded-[24px] border border-white/55 bg-white/20 p-5">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b3e]">
                                            Atmosferă
                                        </p>
                                        <p className="mt-3 text-sm leading-6 text-[#3a332b]">
                                            {profile.atmosphere}
                                        </p>
                                    </div>

                                    <div className="rounded-[24px] border border-white/55 bg-white/20 p-5">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b3e]">
                                            Lumină
                                        </p>
                                        <p className="mt-3 text-sm leading-6 text-[#3a332b]">
                                            {profile.lighting}
                                        </p>
                                    </div>

                                    <div className="rounded-[24px] border border-white/55 bg-white/20 p-5">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b3e]">
                                            Paletă
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {profile.colorPalette.map((color) => (
                                                <span
                                                    key={color}
                                                    className="rounded-full border border-white/50 bg-white/25 px-3 py-2 text-xs text-[#3a332b]"
                                                >
                          {color}
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-[24px] border border-white/55 bg-white/20 p-5">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b3e]">
                                            Materiale
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {profile.materials.map((material) => (
                                                <span
                                                    key={material}
                                                    className="rounded-full border border-white/50 bg-white/25 px-3 py-2 text-xs text-[#3a332b]"
                                                >
                          {material}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 rounded-[24px] border border-[#d6bf86]/45 bg-[#f7efe3]/30 p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b3e]">
                                        Logică spațială
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-[#3a332b]">
                                        {profile.spatialLogic}
                                    </p>
                                </div>

                                <div className="mt-5 rounded-[24px] border border-[#d6bf86]/45 bg-[#f7efe3]/40 p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b3e]">
                                        Recomandare
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-[#3a332b]">
                                        {profile.designRecommendation}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleRestart}
                                    className="mt-8 rounded-full border border-white/55 bg-white/25 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4a4438] transition hover:bg-white/40"
                                >
                                    Reia testul
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}