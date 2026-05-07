"use client";

import Image from "next/image";

export default function ConceptSection() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-[#f4eee3] px-5 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                {/* Left text */}
                <div className="max-w-xl">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.28em] text-[#b39458]">
            02 / Concept
          </span>

                    <h2 className="text-3xl font-black uppercase leading-[0.98] tracking-[-0.04em] text-[#2a2420] md:text-6xl md:leading-[0.95] md:tracking-[-0.05em]">
                        Designul începe cu felul în care trăiești.
                    </h2>

                    <p className="mt-6 text-base leading-7 text-[#5a5145] md:mt-7 md:text-lg md:leading-8">
                        MindSpace Studio creează interioare în care estetica, funcționalitatea
                        și atmosfera lucrează împreună. Fiecare spațiu este construit cu
                        atenție la lumină, proporții, materiale și felul în care se simte
                        viața de zi cu zi.
                    </p>

                    <p className="mt-5 text-base leading-7 text-[#6a6054] md:leading-8">
                        Ne dorim ca un interior să fie frumos fără să fie rece, elegant
                        fără să devină rigid și personal fără să pară încărcat. Designul
                        bun se simte natural, chiar înainte să îl explici.
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-3 md:mt-10 md:gap-4">
                        <div>
                            <p className="text-2xl font-black text-[#2a2420]">01</p>
                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6a6054]">
                                Atmosferă
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-black text-[#2a2420]">02</p>
                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6a6054]">
                                Funcție
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-black text-[#2a2420]">03</p>
                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6a6054]">
                                Detaliu
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right image */}
                <div className="relative">
                    <div className="relative overflow-hidden border border-white/60 bg-white/25 p-3 shadow-[0_24px_70px_rgba(45,38,30,0.14),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md">
                        <Image
                            src="/images/concept-house.webp"
                            alt="Casă arhitecturală modernă"
                            width={1200}
                            height={900}
                            className="h-[320px] w-full object-cover md:h-[560px]"
                        />
                    </div>

                    <div className="absolute -bottom-6 left-8 hidden border border-white/60 bg-[#f7efe3]/80 px-6 py-4 shadow-[0_14px_35px_rgba(45,38,30,0.12)] backdrop-blur-md md:block">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b39458]">
                            Interioare cu identitate
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
