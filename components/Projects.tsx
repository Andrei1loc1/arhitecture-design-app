"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Maison Lumen",
    category: "Residential Interior",
    description:
      "A restrained penthouse interior shaped around limestone, walnut joinery, and calibrated evening light."
  },
  {
    title: "Gallery N-04",
    category: "Cultural Space",
    description:
      "A quiet exhibition environment with monolithic display volumes and a soft circulation rhythm."
  },
  {
    title: "Atelier Court",
    category: "Boutique Workspace",
    description:
      "A studio workplace with layered thresholds, sculptural storage, and warm material contrast."
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.h2
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-[#fff8ec] sm:text-5xl md:text-6xl"
          >
            Selected spatial studies
          </motion.h2>
          <p className="max-w-md text-base leading-7 text-[#aaa195]">
            Conceptual work that explores proportion, material quietness, and
            high-touch interior atmosphere.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ y: 28, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="group border border-white/10 bg-[#11100e]/72 p-7 transition-colors hover:border-[#b99163]/60"
            >
              <div className="mb-12 h-52 overflow-hidden bg-[#1d1a16]">
                <div className="h-full w-full bg-[linear-gradient(135deg,rgba(185,145,99,0.38),transparent_42%),linear-gradient(90deg,#2c2822_0_22%,#4c4338_22%_24%,#171512_24%_100%)] transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#b99163]">
                {project.category}
              </p>
              <h3 className="font-[var(--font-playfair)] text-3xl text-[#fff8ec]">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#aaa195]">
                {project.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
