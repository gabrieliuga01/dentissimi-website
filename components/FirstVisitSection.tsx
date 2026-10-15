"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    index: "01",
    text: "Ne scrii sau ne suni și spui ce te preocupă.",
  },
  {
    index: "02",
    text: "Îți propunem o oră și confirmăm telefonic.",
  },
  {
    index: "03",
    text: "La cabinet ești ascultat, fără grabă, iar planul ți se explică înainte de tratament.",
  },
] as const;

export default function FirstVisitSection() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.9, ease },
    },
  };

  return (
    <section
      id="prima-vizita"
      aria-labelledby="first-visit-heading"
      className="relative overflow-hidden bg-[#f6f1e8] px-5 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-6xl"
      >
        <header className="max-w-3xl">
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] text-primary uppercase sm:text-xs"
          >
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            Prima vizită
          </motion.p>

          <motion.h2
            id="first-visit-heading"
            variants={fadeUp}
            className="mt-6 text-[2.15rem] leading-[1.12] font-medium tracking-[-0.025em] text-balance text-primary sm:text-[2.75rem] lg:text-[3.15rem]"
          >
            Așa începe{" "}
            <span className="font-serif italic">totul.</span>
          </motion.h2>
        </header>

        <motion.ol
          variants={container}
          className="mt-14 grid grid-cols-1 gap-10 sm:mt-16 lg:mt-20 lg:grid-cols-3 lg:items-start lg:gap-8 xl:gap-14"
        >
          {steps.map(({ index, text }) => (
            <motion.li
              key={index}
              variants={fadeUp}
              className="border-t border-accent/80 pt-6"
            >
              <p className="font-serif text-[1.75rem] leading-none text-accent italic">
                {index}
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-text/80 sm:text-lg sm:leading-[1.75] lg:max-w-none">
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}
