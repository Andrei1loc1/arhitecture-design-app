"use client";

import Image from "next/image";

const navItems = [
    { label: "Despre noi", href: "#about" },
    { label: "Echipă", href: "#team" },
    { label: "Ofertă", href: "#pricing" },
    { label: "Experiență", href: "#design-profile" },
];

export default function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-4 z-50 mx-auto flex h-16 w-[calc(100%-1.5rem)] max-w-7xl items-center rounded-2xl px-4 sm:w-[calc(100%-3rem)] sm:px-8 md:top-5 md:h-20 lg:w-full">
            <div className="absolute inset-0 rounded-2xl bg-[#f7efe3]/55 backdrop-blur-md" />

            <div className="absolute inset-0 rounded-2xl shadow-[0_16px_40px_rgba(65,52,38,0.14),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(120,100,75,0.10)]" />

            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/35 via-white/10 to-transparent" />

            <div className="relative z-10 flex w-full items-center justify-between">
                <a href="#" className="group flex min-w-0 items-center gap-4">
                    <Image
                        src="/images/logo.png"
                        alt="MindSpace Studio logo"
                        width={64}
                        height={64}
                        priority
                        className="h-12 w-12 object-contain opacity-95 transition duration-300 group-hover:scale-105 md:h-14 md:w-14"
                    />

                    <span className="truncate text-xs font-bold uppercase tracking-[0.16em] text-[#2d261f] md:text-sm md:tracking-[0.24em]">
            MindSpace Studio
          </span>
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-xs font-medium uppercase tracking-[0.22em] text-[#4a3f35] transition-colors hover:text-[#2a2420]"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <a
                    href="#design-profile"
                    className="hidden rounded-lg bg-gradient-to-r from-[#b99163] via-[#d8c28a] to-[#b99163] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2a2420] shadow-[0_8px_18px_rgba(95,70,35,0.18),inset_0_1px_0_rgba(255,255,255,0.45)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:inline-flex"
                >
                    Explorează stilul
                </a>
            </div>
        </nav>
    );
}
