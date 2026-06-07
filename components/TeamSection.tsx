"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
    {
        name: "Lighezan Adina",
        role: "Tehnician Design interior",
        image: "/images/team-2.jpeg",
        className: "relative h-40 w-40 md:absolute md:left-[8%] md:top-[12%] md:h-48 md:w-48",
        animate: { y: [0, -18, 0], x: [0, 10, 0] },
        duration: 7,
    },
    {
        name: "Nicolaescu Adina",
        role: "Administrator & relația cu clienții",
        image: "/images/team-lider1.jpeg",
        className: "relative h-52 w-52 md:absolute md:left-[38%] md:top-[38%] md:h-64 md:w-64",
        animate: { y: [0, 16, 0], x: [0, -12, 0] },
        duration: 8,
    },
    {
        name: "Mențe Maia",
        role: "Coordonator proiecte & promovare",
        image: "/images/team-3.jpeg",
        className: "relative h-36 w-36 md:absolute md:right-[0%] md:top-[16%] md:h-44 md:w-44",
        animate: { y: [0, -14, 0], x: [0, 8, 0] },
        duration: 6.5,
    },
];

export default function TeamSection() {
    return (
        <section
            id="team"
            className="relative z-10 overflow-hidden bg-[#e7d8bd] px-5 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-52 bg-gradient-to-b from-[#f4eee3] via-[#eee0cb] to-[#e7d8bd]" />
            {/* glow subtil background */}
            <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[320px] w-[320px] rounded-full bg-white/40 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[0%] right-[-8%] h-[360px] w-[360px] rounded-full bg-[#c7a85f]/15 blur-3xl" />

            <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
                {/* Left content */}
                <div className="relative z-10 max-w-xl">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.28em] text-[#b39458]">
            03 / Echipa
          </span>

                    <h2 className="text-3xl font-black uppercase leading-[0.98] tracking-[-0.04em] text-[#2a2420] md:text-6xl md:leading-[0.95] md:tracking-[-0.05em]">
                        O echipă atentă la spații și la oameni.
                    </h2>

                    <p className="mt-6 max-w-lg text-base leading-7 text-[#5a5145] md:mt-7 md:text-lg md:leading-8">
                        MindSpace Studio reunește arhitectură, design interior, coordonare
                        de proiect și comunicare clară. Ne uităm la spațiu cu ochi tehnic,
                        dar îl tratăm cu sensibilitate, astfel încât fiecare decizie să aibă
                        sens estetic și practic.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <div className="rounded-full border border-white/60 bg-white/30 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6a6054] shadow-[0_8px_25px_rgba(45,38,30,0.08)] backdrop-blur-md">
                            Arhitectură
                        </div>
                        <div className="rounded-full border border-white/60 bg-white/30 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6a6054] shadow-[0_8px_25px_rgba(45,38,30,0.08)] backdrop-blur-md">
                            Interior
                        </div>
                        <div className="rounded-full border border-white/60 bg-white/30 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6a6054] shadow-[0_8px_25px_rgba(45,38,30,0.08)] backdrop-blur-md">
                            Coordonare
                        </div>
                    </div>
                </div>

                {/* Right floating circles */}
                <div className="relative flex min-h-0 flex-col items-center gap-24 pb-16 pt-4 md:block md:min-h-[620px] md:pb-0 md:pt-0">
                    {/* linii/cercuri decorative */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b39458]/15 md:block" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8b765c]/10 md:block" />

                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.name}
                            className={member.className}
                            animate={member.animate}
                            transition={{
                                duration: member.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="group relative h-full w-full rounded-full border border-white/60 bg-white/25 p-2 shadow-[0_20px_55px_rgba(45,38,30,0.14),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md">
                                <div className="relative h-full w-full overflow-hidden rounded-full">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/45 via-transparent to-white/10" />
                                </div>

                                <div className="absolute -bottom-18 left-1/2 w-[260px] -translate-x-1/2 text-center">
                                    <p className="text-sm font-black uppercase tracking-[0.08em] text-[#2a2420]">
                                        {member.name}
                                    </p>

                                    <p className="mx-auto mt-2 max-w-[230px] text-[11px] font-medium uppercase leading-5 tracking-[0.16em] text-[#7a6d5d]">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* cerc decorativ mic */}
                    <motion.div
                        className="absolute bottom-[8%] left-[20%] hidden h-16 w-16 rounded-full border border-[#d6bf86]/45 bg-white/20 backdrop-blur-sm md:block"
                        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="absolute bottom-[18%] right-[18%] hidden h-8 w-8 rounded-full bg-[#c7a85f]/35 blur-[1px] md:block"
                        animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </section>
    );
}
