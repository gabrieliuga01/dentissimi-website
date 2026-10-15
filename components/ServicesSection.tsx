"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Baby,
  Bone,
  Crown,
  HeartPulse,
  Microscope,
  ScanFace,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { clinic } from "@/lib/clinic";

const ease = [0.22, 1, 0.36, 1] as const;

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Stomatologie generală",
    description:
      "Consultații, prevenție, obturații (plombe) și tratamente uzuale.",
    icon: Stethoscope,
  },
  {
    title: "Ortodonție și ortopedie dento-facială",
    description:
      "Îndreptarea dinților și corectarea mușcăturii cu aparate dentare.",
    icon: ScanFace,
  },
  {
    title: "Chirurgie dento-alveolară și implantologie",
    description:
      "Extracții, molari de minte, tratamente chirurgicale ale țesuturilor din jurul dinților și implanturi dentare.",
    icon: Bone,
  },
  {
    title: "Parodontologie",
    description:
      "Prevenirea și tratarea bolilor gingiilor și ale osului care susține dinții.",
    icon: HeartPulse,
  },
  {
    title: "Endodonție",
    description:
      "Tratamentul canalelor radiculare („tratamentul de canal”).",
    icon: Microscope,
  },
  {
    title: "Protetică și estetică dentară",
    description:
      "Coroane, fațete, punți, proteze și reabilitări orale complexe, plus tratamente profesionale de albire.",
    icon: Crown,
  },
  {
    title: "Pedodonție",
    description: "Stomatologie pentru copii și adolescenți.",
    icon: Baby,
  },
  {
    title: "Odontoterapie",
    description: "Tratamentul cariilor și restaurarea dinților.",
    icon: ShieldCheck,
  },
];

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
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
      id="servicii"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-background px-5 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="relative overflow-hidden rounded-[1.75rem] bg-primary px-7 py-10 shadow-[0_28px_80px_rgba(10,25,47,0.16)] sm:px-10 sm:py-12 lg:px-14 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-28 h-72 w-72 rounded-full bg-accent/12 blur-3xl"
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="min-w-0 flex-1">
              <motion.p
                variants={fadeUp}
                className="flex items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase sm:text-xs"
              >
                <span aria-hidden="true" className="h-px w-10 bg-accent/80" />
                Specialități
              </motion.p>

              <motion.h2
                id="services-heading"
                variants={fadeUp}
                className="mt-6 text-[2.15rem] leading-[1.12] font-medium text-balance text-background sm:text-[2.75rem] lg:text-[2.45rem] xl:text-[3.15rem]"
              >
                Tratamente complete,{" "}
                <span className="font-serif text-champagne italic">
                  executate cu precizie și răbdare.
                </span>
              </motion.h2>
            </div>

            <motion.div variants={fadeUp} className="shrink-0 lg:pb-1 lg:text-right">
              <p
                aria-hidden="true"
                className="font-serif text-[4.5rem] leading-none text-champagne/35 italic sm:text-[5.5rem]"
              >
                {String(services.length).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[0.68rem] tracking-[0.28em] text-champagne uppercase">
                Specialități
                <span aria-hidden="true" className="px-2 text-accent/70">
                  ·
                </span>
                {clinic.locality}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-4 grid gap-px overflow-hidden rounded-[1.75rem] bg-primary/10 shadow-[0_24px_70px_rgba(10,25,47,0.06)] ring-1 ring-primary/10 sm:mt-5 lg:grid-cols-2"
        >
          {services.map(({ title, description, icon: Icon }, index) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="group relative bg-white px-6 py-8 transition-colors duration-500 hover:bg-[#f7f4ec] sm:px-8 sm:py-10"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-7 left-0 w-px origin-center scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
              />

              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="font-serif text-[1.75rem] leading-none text-accent italic sm:text-[2rem]"
                >
                  {indexLabel(index)}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-accent/30 text-accent transition-colors duration-500 group-hover:border-primary group-hover:bg-primary"
                >
                  <Icon className="size-[1.1rem]" strokeWidth={1.5} />
                </span>
              </div>

              <h3 className="mt-8 text-[1.45rem] leading-snug font-medium text-balance text-primary sm:text-[1.7rem]">
                {title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-text/75 sm:text-[0.95rem] sm:leading-[1.7]">
                {description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
