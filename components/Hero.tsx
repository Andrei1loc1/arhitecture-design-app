"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

export default function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#f4eee3]">
            <div className="absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat" />

            <div className="absolute inset-0 bg-gradient-to-b from-[#f7f0e6]/10 via-transparent to-[#e7dccb]/10" />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-10">
                <div className="relative [perspective:1200px]">
                    <motion.div
                        className="absolute left-1/2 top-[86%] z-0 h-16 w-[95%] -translate-x-1/2 rounded-full bg-[#1f160f]/60 blur-2xl"
                        animate={{
                            scaleX: [0.75, 1.18, 0.75],
                            scaleY: [0.85, 0.65, 0.85],
                            opacity: [0.22, 0.46, 0.22],
                            x: [-28, 18, -28],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <MotionImage
                        src="/images/title_mind.png"
                        alt="MindSpace Studio"
                        width={1000}
                        height={600}
                        priority
                        draggable={false}
                        className="relative z-10 h-auto w-[min(56vw,800px)] origin-center -translate-y-6 select-none object-contain drop-shadow-[0_18px_30px_rgba(35,30,22,0.22)]"
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                        animate={{
                            rotateY: [0, 24, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                <p className="mt-5 text-center text-sm font-medium uppercase tracking-[0.22em] text-[#2d261f] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)] md:text-base">
                    Architectural design redefined. Crafting future spaces.
                </p>

                <a
                    href="#projects"
                    className="mt-10 bg-gradient-to-r from-[#b99163] via-[#d8c28a] to-[#b99163] rounded-lg inline-flex items-center justify-center px-12 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#2a2420] transition-colors hover:border-[#b99163] hover:bg-[#b99163]/10"
                >
                    Explore Our Vision
                </a>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-b from-transparent via-[#f4eee3]/70 to-[#f4eee3]" />
        </section>
    );
}