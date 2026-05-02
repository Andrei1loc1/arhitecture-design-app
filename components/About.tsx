"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75 }}
          className="aspect-[4/5] border border-white/10 bg-[linear-gradient(160deg,#191714,#30281f_42%,#a68058_43%,#11100e_44%)]"
        />
        <div>
          <h2 className="font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-[#fff8ec] sm:text-5xl md:text-6xl">
            An architectural studio with an interior sensibility.
          </h2>
          <p className="mt-8 text-lg leading-9 text-[#cfc7bc]">
            Atelier Forma works at the intersection of architecture, interior
            design, and visual narrative. Every project begins with proportion,
            light, and material restraint, then develops into a complete spatial
            language that feels composed rather than decorated.
          </p>
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              ["12+", "Years"],
              ["38", "Projects"],
              ["6", "Countries"]
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-[var(--font-playfair)] text-4xl text-[#f4efe6]">
                  {value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#aaa195]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
