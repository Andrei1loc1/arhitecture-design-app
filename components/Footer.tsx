"use client";

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#cfc0a8] px-6 pb-8 pt-20 md:px-10 lg:px-16">
            {/* glow-uri subtile */}
            <div className="pointer-events-none absolute left-[-8%] top-[8%] h-[220px] w-[220px] rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-10%] right-[-6%] h-[260px] w-[260px] rounded-full bg-[#b39458]/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="rounded-[30px] border border-white/55 bg-white/15 px-6 py-8 shadow-[0_20px_60px_rgba(45,38,30,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl md:px-8 md:py-10 lg:px-10">
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
                        {/* Brand */}
                        <div className="max-w-md">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/images/logo.png"
                                    alt="MindSpace Studio logo"
                                    width={64}
                                    height={64}
                                    priority
                                    className="h-14 w-14 object-contain opacity-95 transition duration-300 group-hover:scale-105"
                                />

                                <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#2a2420]">
                  MindSpace Studio
                </span>
                            </div>

                            <p className="mt-6 max-w-sm text-sm leading-7 text-[#5a5145]">
                                Spații arhitecturale construite cu claritate, echilibru și
                                intenție. Design interior, concept și vizualizare 3D într-un
                                limbaj calm, premium și contemporan.
                            </p>
                        </div>

                        {/* Navigare */}
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9a7b3e]">
                                Navigare
                            </p>

                            <div className="mt-5 flex flex-col gap-3">
                                <a
                                    href="#about"
                                    className="text-sm uppercase tracking-[0.14em] text-[#3f372f] transition hover:text-[#1f1a16]"
                                >
                                    Despre noi
                                </a>

                                <a
                                    href="#services"
                                    className="text-sm uppercase tracking-[0.14em] text-[#3f372f] transition hover:text-[#1f1a16]"
                                >
                                    Servicii
                                </a>

                                <a
                                    href="#team"
                                    className="text-sm uppercase tracking-[0.14em] text-[#3f372f] transition hover:text-[#1f1a16]"
                                >
                                    Echipă
                                </a>

                                <a
                                    href="#pricing"
                                    className="text-sm uppercase tracking-[0.14em] text-[#3f372f] transition hover:text-[#1f1a16]"
                                >
                                    Oferte
                                </a>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9a7b3e]">
                                Contact
                            </p>

                            <div className="mt-5 flex flex-col gap-3">
                                <a
                                    href="mailto:contact@mindspacestudio.ro"
                                    className="text-sm text-[#3f372f] transition hover:text-[#1f1a16]"
                                >
                                    contact@mindspacestudio.ro
                                </a>

                                <a
                                    href="tel:+40712345678"
                                    className="text-sm text-[#3f372f] transition hover:text-[#1f1a16]"
                                >
                                    +40 712 345 678
                                </a>

                                <p className="text-sm text-[#5a5145]">București, România</p>
                            </div>

                            <a
                                href="#contact"
                                className="mt-6 inline-flex items-center justify-center rounded-full border border-[#d6bf86]/70 bg-gradient-to-br from-[#f1deb0] via-[#b69454] to-[#7b5d31] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#17130f] shadow-[0_10px_22px_rgba(78,56,25,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:brightness-105"
                            >
                                Solicită ofertă
                            </a>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-10 border-t border-white/40 pt-5">
                        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-[#6a6054]">
                                © 2025 MindSpace Studio. Toate drepturile rezervate.
                            </p>

                            <div className="flex items-center justify-center gap-5 md:justify-end">
                                <a
                                    href="#"
                                    className="text-[11px] uppercase tracking-[0.16em] text-[#6a6054] transition hover:text-[#2a2420]"
                                >
                                    Instagram
                                </a>

                                <a
                                    href="#"
                                    className="text-[11px] uppercase tracking-[0.16em] text-[#6a6054] transition hover:text-[#2a2420]"
                                >
                                    Behance
                                </a>

                                <a
                                    href="#"
                                    className="text-[11px] uppercase tracking-[0.16em] text-[#6a6054] transition hover:text-[#2a2420]"
                                >
                                    Pinterest
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}