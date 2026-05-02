"use client";

import Image from "next/image";

export default function ConceptSection() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-[#f4eee3] px-6 py-24 md:px-10 lg:px-16 lg:py-32"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                {/* Left text */}
                <div className="max-w-xl">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.28em] text-[#b39458]">
            02 / Concept
          </span>

                    <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-[#2a2420] md:text-6xl">
                        Spații cu claritate, echilibru și scop.
                    </h2>

                    <p className="mt-7 text-base leading-8 text-[#5a5145] md:text-lg">
                        MindSpace Studio creează spații arhitecturale construite în jurul
                        liniștii, funcționalității și atmosferei. Fiecare proiect este redus
                        la ceea ce contează cu adevărat: proporție, lumină, material și
                        flux.
                    </p>

                    <p className="mt-5 text-base leading-8 text-[#6a6054]">
                        Ideea este simplă: designul nu trebuie să încarce spațiul. El
                        trebuie să ghideze, să susțină și să ridice discret modul în care
                        oamenii trăiesc, lucrează și se mișcă.
                    </p>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        <div>
                            <p className="text-2xl font-black text-[#2a2420]">01</p>
                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6a6054]">
                                Claritate
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
                                Emoție
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
                            className="h-[420px] w-full object-cover md:h-[560px]"
                        />
                    </div>

                    <div className="absolute -bottom-6 left-8 hidden border border-white/60 bg-[#f7efe3]/80 px-6 py-4 shadow-[0_14px_35px_rgba(45,38,30,0.12)] backdrop-blur-md md:block">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b39458]">
                            Identitate arhitecturală
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}