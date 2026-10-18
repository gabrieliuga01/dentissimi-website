"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const principles = [
  { index: "01", title: "Excelență medicală" },
  { index: "02", title: "Mediu sigur" },
  { index: "03", title: "Atenție la detalii" },
  { index: "04", title: "Răbdare și grijă" },
] as const;

export default function AboutSection() {
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
      id="despre"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-[#f6f1e8] px-5 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl"
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
            Filozofia noastră
          </motion.p>

          <motion.h2
            id="about-heading"
            variants={fadeUp}
            className="mt-6 text-[2.45rem] leading-[1.08] font-medium tracking-[-0.025em] text-balance text-primary sm:text-5xl lg:text-[3.45rem]"
          >
            Mai mult decât{" "}
            <span className="font-serif italic">un tratament.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-serif mt-6 max-w-xl text-xl leading-snug text-primary/80 sm:text-2xl"
          >
            O experiență în care ești ascultat.
          </motion.p>
        </header>

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <motion.figure variants={fadeUp} className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-[1.35rem] bg-[#2c2824] shadow-[0_28px_70px_rgba(10,25,47,0.14)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/dr-roxana-new-image.jpg"
                    alt="Dr. Roxana Conduraru, fondatoarea clinicii Dentissimi"
                    fill
                    sizes="(min-width: 1024px) 460px, (min-width: 640px) 28rem, 92vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-4 left-4 h-6 w-6 border-t border-l border-accent/80"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 bottom-4 h-6 w-6 border-r border-b border-accent/80"
                  />
                </div>
              </div>
            </div>
            <figcaption className="mx-auto mt-6 flex max-w-md items-center justify-between gap-4 border-t border-primary/12 pt-4 lg:mx-0 lg:max-w-none">
              <div>
                <p className="font-serif text-xl leading-none text-primary">
                  Dr. Roxana Conduraru
                </p>
                <p className="mt-2 text-[0.68rem] tracking-[0.24em] text-primary/70 uppercase">
                  Fondatoare
                </p>
              </div>
              <Image
                src="/images/logo.png"
                alt="Dentissimi Dental Clinic"
                width={751}
                height={544}
                sizes="160px"
                className="h-16 w-auto shrink-0 sm:h-20"
              />
            </figcaption>
          </motion.figure>

          <div className="lg:col-span-7">
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-base leading-relaxed text-pretty text-text/80 sm:text-lg sm:leading-[1.8]"
            >
              Sub îndrumarea Dr. Roxana Conduraru, clinica Dentissimi a fost
              creată din dorința de a oferi pacienților excelență medicală
              într-un mediu sigur. Punem accent pe atenția la detalii și pe
              lucrul bine făcut, cu răbdare și grijă pentru fiecare pacient.
            </motion.p>

            <motion.ol
              variants={container}
              className="mt-10 grid gap-px overflow-hidden rounded-[1.35rem] bg-primary/10 ring-1 ring-primary/10 sm:grid-cols-2"
            >
              {principles.map(({ index, title }) => (
                <motion.li
                  key={title}
                  variants={fadeUp}
                  className="group relative bg-white px-6 py-6 sm:px-7 sm:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-5 left-0 w-px origin-center scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  />
                  <p className="flex items-center gap-3 text-[0.68rem] tracking-[0.28em] text-primary/70 uppercase">
                    <span aria-hidden="true" className="h-px w-5 bg-accent" />
                    {index}
                  </p>
                  <p className="font-serif mt-4 text-[1.35rem] leading-snug text-balance text-primary">
                    {title}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
