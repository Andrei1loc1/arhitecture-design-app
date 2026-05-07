"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
    {
        name: "O cameră",
        tag: "Start",
        price: "€450",
        description: "Pentru o cameră care merită mai mult decât o simplă reamenajare.",
        features: ["Stare clară pentru spațiu", "Culori și texturi alese", "Idei ușor de pus în practică"],
        highlighted: false,
        animate: { y: [0, -5, 0] },
        duration: 6.5,
    },
    {
        name: "Apartament",
        tag: "Complet",
        price: "€1.350",
        description: "Pentru un apartament care se simte legat, aerisit și bine gândit.",
        features: ["Fiecare cameră în aceeași poveste", "Mobilare cu sens", "Imagine clară înainte de execuție"],
        highlighted: true,
        animate: { y: [0, 7, 0] },
        duration: 7.5,
    },
    {
        name: "Casă",
        tag: "Premium",
        price: "€3.050",
        description: "Pentru o casă care se simte unitară, elegantă și gândită până la ultimul detaliu.",
        features: ["Identitate vizuală pentru întreaga locuință", "Finisaje, accente și detalii memorabile", "Ghidaj dedicat de la concept la rezultat"],
        highlighted: false,
        animate: { y: [0, -4, 0] },
        duration: 6,
    },
];

const customRooms = [
    "Living",
    "Dormitor",
    "Bucătărie",
    "Baie",
    "Birou",
    "Hol",
    "Dressing",
    "Terasă",
    "Alt spațiu",
];

export default function PricingSection() {
    const [isCustomOpen, setIsCustomOpen] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
    const [customDescription, setCustomDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function toggleRoom(room: string) {
        setSubmitted(false);
        setSelectedRooms((current) =>
            current.includes(room)
                ? current.filter((item) => item !== room)
                : [...current, room]
        );
    }

    function openCustomModal() {
        setIsCustomOpen(true);
    }

    function closeCustomModal() {
        setIsCustomOpen(false);
        setSelectedRooms([]);
        setCustomDescription("");
        setSubmitted(false);
    }

    function handleCustomSubmit() {
        setSubmitted(true);
    }

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
                        Prețurile sunt orientative și se ajustează în funcție de suprafață, complexitate și nivelul de detaliu.
                    </p>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={openCustomModal}
                            className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/25 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2a2420] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition duration-300 hover:bg-white/40"
                        >
                            Vreau un pachet personalizat
                        </button>
                    </div>
                </div>
            </div>

            {isCustomOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#17130f]/45 px-5 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/60 bg-[#f7efe3]/90 p-5 shadow-[0_24px_80px_rgba(23,19,15,0.22),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl md:p-7"
                    >
                        <button
                            type="button"
                            onClick={closeCustomModal}
                            aria-label="Închide modalul"
                            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/35 text-sm font-black text-[#2a2420] transition hover:bg-white/55"
                        >
                            ×
                        </button>

                        {submitted ? (
                            <div className="flex min-h-[420px] flex-col items-center justify-center px-3 py-12 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9a7b3e]">
                                    Cerere primită
                                </p>

                                <h3 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.05em] text-[#2a2420] md:text-6xl">
                                    Confirmat
                                </h3>

                                <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#5a5145]">
                                    Am primit descrierea ta și revenim cu o propunere potrivită
                                    pentru spațiul tău.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a7b3e]">
                                    Cerere specială
                                </p>

                                <h3 className="mt-4 pr-10 text-3xl font-black uppercase leading-none tracking-[-0.05em] text-[#2a2420] md:text-4xl">
                                    Pachet personalizat
                                </h3>

                                <p className="mt-4 max-w-xl text-sm leading-6 text-[#5a5145]">
                                    Alege spațiile care te interesează și lasă-ne câteva detalii despre
                                    atmosfera, funcționalitatea sau stilul pe care îl ai în minte.
                                </p>

                                <div className="mt-6">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b3e]">
                                        Camere
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {customRooms.map((room) => {
                                            const selected = selectedRooms.includes(room);

                                            return (
                                                <button
                                                    key={room}
                                                    type="button"
                                                    onClick={() => toggleRoom(room)}
                                                    className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition ${
                                                        selected
                                                            ? "border-[#d6bf86]/80 bg-[#d6bf86]/45 text-[#2a2420] shadow-[0_8px_20px_rgba(78,56,25,0.12)]"
                                                            : "border-white/60 bg-white/30 text-[#5a5145] hover:bg-white/45"
                                                    }`}
                                                >
                                                    {room}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <label className="mt-6 block">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b3e]">
                                        Descriere
                                    </span>

                                    <textarea
                                        value={customDescription}
                                        onChange={(event) => {
                                            setCustomDescription(event.target.value);
                                            setSubmitted(false);
                                        }}
                                        placeholder="Ex: Vreau un living cald, luminos, cu zonă de relaxare, depozitare discretă și materiale naturale."
                                        className="mt-4 min-h-32 w-full resize-none rounded-[20px] border border-white/60 bg-white/35 px-4 py-4 text-sm leading-6 text-[#3a332b] outline-none placeholder:text-[#8a7d70] transition focus:border-[#b39458]/70 focus:bg-white/45"
                                    />
                                </label>

                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs leading-5 text-[#6a6054]">
                                        Spune-ne ce îți dorești, iar noi conturăm o ofertă potrivită spațiului tău.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleCustomSubmit}
                                        className="inline-flex items-center justify-center rounded-full border border-[#d6bf86]/70 bg-gradient-to-br from-[#f1deb0] via-[#b69454] to-[#7b5d31] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#17130f] shadow-[0_10px_22px_rgba(78,56,25,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:brightness-105"
                                    >
                                        Contactează-ne
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </section>
    );
}
