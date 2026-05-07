"use client";

import { motion } from "framer-motion";

const plans = [
    {
        name: "Essential",
        tag: "Concept",
        price: "€450",
        description: "Pentru o direcție estetică limpede și o bază bună de pornire.",
        features: ["Consultare", "Moodboard", "Paletă materiale"],
        highlighted: false,
        animate: { y: [0, -5, 0] },
        duration: 6.5,
    },
    {
        name: "Signature",
        tag: "Complet",
        price: "€1.250",
        description: "Pentru un interior coerent, cu imagine clară și soluții bine legate.",
        features: ["Concept complet", "Plan mobilare", "Randări 3D"],
        highlighted: true,
        animate: { y: [0, 7, 0] },
        duration: 7.5,
    },
    {
        name: "Atelier",
        tag: "Premium",
        price: "€2.400",
        description: "Pentru proiecte cu detalii speciale, finisaje alese și suport extins.",
        features: ["Design complet", "Detalii custom", "Asistență proiect"],
        highlighted: false,
        animate: { y: [0, -4, 0] },
        duration: 6,
    },
];

export default function PricingSection() {
    return (
        <section
            id="pricing"
            className="relative min-h-screen overflow-hidden bg-[#ddd0b8] px-5 py-12 md:px-10 md:py-14 lg:px-16 lg:py-16"
        >
            {/* Tranziție din TeamSection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-[#e7d8bd] to-[#ddd0b8]" />

            {/* Atmosferă subtilă */}
            <div className="pointer-events-none absolute left-[-8%] top-[18%] z-[1] h-[260px] w-[260px] rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-12%] right-[-8%] z-[1] h-[320px] w-[320px] rounded-full bg-[#b39458]/10 blur-3xl" />

            {/* Tranziție către FloorPlan */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-64 bg-gradient-to-b from-transparent via-[#d8c9b1]/70 to-[#d4c4ac]" />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-center">
                <div className="rounded-[26px] border border-white/60 bg-white/20 px-5 py-7 shadow-[0_24px_80px_rgba(45,38,30,0.10),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl md:rounded-[34px] md:px-10 md:py-8 lg:px-12 lg:py-10">
                    {/* Header */}
                    <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.28em] text-[#9a7b3e]">
              04 / Oferte
            </span>

                        <h2 className="text-2xl font-black uppercase leading-[1] tracking-[-0.04em] text-[#2a2420] md:text-4xl md:leading-[0.95] md:tracking-[-0.05em] lg:text-5xl">
                            Pachete create pentru ritmul proiectului tău.
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#5a5145]">
                            Fiecare colaborare poate începe simplu și poate crește firesc,
                            de la direcție estetică până la proiect complet și suport dedicat.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="mt-7 grid gap-4 md:mt-8 md:gap-5 lg:grid-cols-3">
                        {plans.map((plan) => (
                            <motion.article
                                key={plan.name}
                                animate={plan.animate}
                                transition={{
                                    duration: plan.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className={`relative overflow-hidden rounded-[22px] border p-4 shadow-[0_16px_40px_rgba(45,38,30,0.10),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-lg transition duration-300 hover:-translate-y-1 md:rounded-[24px] md:p-5 ${
                                    plan.highlighted
                                        ? "border-[#d6bf86]/70 bg-[#f8f1e5]/70"
                                        : "border-white/60 bg-white/30"
                                }`}
                            >
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-[#b39458]/10" />

                                {plan.highlighted && (
                                    <div className="absolute right-5 top-5 rounded-full border border-[#d6bf86]/60 bg-gradient-to-br from-[#f1deb0] via-[#b69454] to-[#7b5d31] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#17130f] shadow-[0_8px_20px_rgba(78,56,25,0.18)]">
                                        Popular
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9a7b3e]">
                                        {plan.tag}
                                    </p>

                                    <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-[#2a2420]">
                                        {plan.name}
                                    </h3>

                                    <div className="mt-4 flex items-end gap-2">
                    <span className="text-[2.6rem] font-black leading-none tracking-[-0.06em] text-[#2a2420]">
                      {plan.price}
                    </span>
                                        <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6a6054]">
                      / proiect
                    </span>
                                    </div>

                                    <p className="mt-3 min-h-[40px] text-sm leading-6 text-[#5a5145]">
                                        {plan.description}
                                    </p>

                                    <div className="mt-4 space-y-2">
                                        {plan.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-center gap-3 rounded-full border border-white/45 bg-white/20 px-4 py-2"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#b39458]" />
                                                <span className="text-sm text-[#3c352d]">
                          {feature}
                        </span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="#contact"
                                        className={`mt-5 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] transition duration-300 ${
                                            plan.highlighted
                                                ? "border-[#d6bf86]/70 bg-gradient-to-br from-[#f1deb0] via-[#b69454] to-[#7b5d31] text-[#17130f] shadow-[0_10px_22px_rgba(78,56,25,0.20),inset_0_1px_0_rgba(255,255,255,0.65)] hover:brightness-105"
                                                : "border-white/60 bg-white/25 text-[#2a2420] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] hover:bg-white/40"
                                        }`}
                                    >
                                        Alege pachetul
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <p className="mt-7 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[#6a6054]">
                        Prețurile sunt orientative și se ajustează în funcție de spațiu, complexitate și nivelul de detaliu.
                    </p>
                </div>
            </div>
        </section>
    );
}
