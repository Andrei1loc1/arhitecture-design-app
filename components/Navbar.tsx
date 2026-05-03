"use client";

import Image from "next/image";

const navItems = [
    { label: "Despre noi", href: "#about" },
    { label: "Echipă", href: "#team" },
    { label: "Ofertă", href: "#pricing" },
    { label: "MindPsihology", href: "#design-profile" },
];

export default function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-5 z-50 mx-auto flex h-20 max-w-7xl items-center rounded-2xl px-5 sm:px-8">
            <div className="absolute inset-0 rounded-2xl bg-[#f7efe3]/55 backdrop-blur-md" />

            <div className="absolute inset-0 rounded-2xl shadow-[0_16px_40px_rgba(65,52,38,0.14),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(120,100,75,0.10)]" />

            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/35 via-white/10 to-transparent" />

            <div className="relative z-10 flex w-full items-center justify-between">
                <a href="#" className="group flex items-center gap-4">
                    <Image
                        src="/images/logo.png"
                        alt="MindSpace Studio logo"
                        width={64}
                        height={64}
                        priority
                        className="h-14 w-14 object-contain opacity-95 transition duration-300 group-hover:scale-105"
                    />

                    <span className="text-sm font-bold uppercase tracking-[0.24em] text-[#2d261f]">
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
                    mind of world
                </a>
            </div>
        </nav>
    );
}