"use client";

import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section id="contact" className="px-5 pb-10 sm:px-8">
      <motion.div
        initial={{ y: 26, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-7xl border border-white/10 bg-[#f4efe6] px-6 py-16 text-[#11100e] sm:px-10 lg:px-16 lg:py-20"
      >
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-3xl font-[var(--font-playfair)] text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Let&apos;s define the atmosphere of your next space.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f574d]">
              Share a site, a floor plan, or a raw idea. The first conversation
              turns ambition into spatial direction.
            </p>
          </div>
          <a
            href="mailto:studio@mindspace.example"
            className="inline-flex shrink-0 justify-center bg-[#11100e] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#f4efe6] transition-transform hover:-translate-y-0.5"
          >
            Contact Studio
          </a>
        </div>
      </motion.div>
      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 py-8 text-xs uppercase tracking-[0.18em] text-[#776f66] sm:flex-row">
        <p>MindSpace Studio</p>
        <p>Architecture & Interior Design</p>
      </footer>
    </section>
  );
}
