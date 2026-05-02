"use client";

const navItems = [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Studio", href: "#about1" },
    { label: "Contact", href: "#contact" }
];

export default function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-5 z-50 mx-auto flex h-20 max-w-7xl items-center rounded-2xl px-5 sm:px-8">
            <div className="absolute inset-0 rounded-2xl bg-[#f7efe3]/55 backdrop-blur-md" />

            <div
                className="
          absolute inset-0 rounded-2xl

          shadow-[0_16px_40px_rgba(65,52,38,0.14),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(120,100,75,0.10)]
        "
            />

            <div
                className="
          pointer-events-none absolute inset-0 rounded-2xl
          bg-gradient-to-b from-white/35 via-white/10 to-transparent
        "
            />

            <div className="relative z-10 flex w-full items-center justify-between">
                <a href="#" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center border border-[#b99163]/60 text-sm font-semibold text-[#2d261f] transition-colors group-hover:border-[#f2d7b5]">
            MS
          </span>

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
                    href="#contact"
                    className="bg-gradient-to-r from-[#b99163] via-[#d8c28a] to-[#b99163] rounded-lg hidden px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2a2420] transition-colors hover:border-[#b99163] hover:bg-[#b99163]/10 sm:inline-flex"
                >
                    Inquire
                </a>
            </div>
        </nav>
    );
}