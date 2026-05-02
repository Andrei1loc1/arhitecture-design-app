"use client";

import { motion } from "framer-motion";

const services = [
  "Interior Design",
  "Residential Architecture",
  "Commercial Spaces",
  "3D Visualization"
];

export default function Services() {
  return (
    <section id="services" className="border-y border-white/10 bg-[#0d0c0a] px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-[var(--font-playfair)] text-4xl font-semibold text-[#fff8ec] sm:text-5xl">
            Services for complete spatial direction
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-[#aaa195]">
            From early concept to photorealistic visualization, the studio
            creates cohesive environments with architectural discipline and
            interior warmth.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="bg-[#0d0c0a] p-8"
            >
              <span className="text-sm text-[#b99163]">0{index + 1}</span>
              <h3 className="mt-10 text-2xl font-medium text-[#f4efe6]">
                {service}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
