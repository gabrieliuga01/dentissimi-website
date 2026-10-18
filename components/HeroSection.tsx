"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { clinic, mapsUrl } from "@/lib/clinic";

const headline = [
  { text: "Zâmbete perfecte.", accent: false },
  { text: "Detalii impecabile.", accent: false },
  { text: "Grijă ca în familie.", accent: true },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.12, staggerChildren: 0.12 },
  },
};

const reveal: Variants = {
  hidden: { y: "108%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.95, ease },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const portrait: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease, delay: 0.28 },
  },
};

export default function HeroSection() {
  return (
    <section
      id="acasa"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-primary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-[#16325c]/80 blur-3xl" />
        <div className="absolute top-[18%] -right-24 h-[32rem] w-[32rem] rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(232,216,176,0.09),transparent_46%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-svh w-full max-w-7xl content-center gap-14 px-5 pt-[calc(var(--navbar-height)+env(safe-area-inset-top,0px)+1.75rem)] pb-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-12 lg:pb-20 xl:gap-14">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 xl:col-span-6"
        >
          <motion.p
            variants={fade}
            className="flex items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase sm:text-xs"
          >
            <span aria-hidden="true" className="h-px w-10 bg-accent/80 sm:w-12" />
            Clinica Dentissimi Bârlad
          </motion.p>

          <h1
            id="hero-heading"
            className="mt-7 max-w-xl text-[2.55rem] leading-[1.06] font-medium tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.35rem] xl:text-[3.7rem]"
          >
            {headline.map(({ text, accent }) => (
              <span key={text} className="block overflow-hidden py-[0.06em]">
                <motion.span
                  variants={reveal}
                  className={`block ${accent ? "font-serif text-champagne italic" : ""}`}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fade}
            className="mt-7 max-w-md text-base leading-relaxed text-pretty text-white/72 sm:text-lg"
          >
            La Dentissimi Bârlad, credem că un rezultat frumos începe cu
            încredere și răbdare. Experimentează stomatologia premium, fără
            teamă.
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium tracking-wide text-primary shadow-[0_12px_32px_rgba(212,175,55,0.22)] transition duration-500 ease-out hover:bg-champagne hover:shadow-[0_16px_40px_rgba(212,175,55,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <CalendarCheck
                aria-hidden="true"
                className="size-[1.125rem] transition-transform duration-500 ease-out group-hover:scale-110"
              />
              Programează-te
            </a>
            <a
              href={clinic.phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/18 px-6 py-3.5 text-sm tracking-wide text-white/90 transition duration-500 ease-out hover:border-accent/55 hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Phone aria-hidden="true" className="size-4 text-accent" />
              {clinic.phoneDisplay}
            </a>
          </motion.div>

          <motion.div
            variants={fade}
            className="mt-11 grid max-w-lg gap-5 border-t border-white/12 pt-6 sm:grid-cols-2 sm:gap-6"
          >
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-accent"
              />
              <address className="not-italic">
                <span className="block text-[0.65rem] tracking-[0.24em] text-accent uppercase">
                  Cabinet
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-white/75 transition-colors duration-300 group-hover:text-white">
                  {clinic.street}
                  <span className="mt-0.5 block">
                    {clinic.locality}, {clinic.region}
                  </span>
                </span>
              </address>
            </a>
            <p className="flex items-start gap-3 sm:border-l sm:border-white/12 sm:pl-6">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>
                <span className="block text-[0.65rem] tracking-[0.24em] text-accent uppercase">
                  Medic fondator
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-white/75">
                  Dr. Roxana Conduraru
                </span>
              </span>
            </p>
          </motion.div>
        </motion.div>

        <motion.figure
          variants={portrait}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-md lg:col-span-6 lg:mx-0 lg:max-w-none lg:justify-self-end xl:max-w-[34rem]"
        >
          <div
            aria-hidden="true"
            className="absolute -top-3 right-2 -bottom-3 left-5 rounded-[1.85rem] border border-accent/30 sm:-top-4 sm:right-3 sm:-bottom-4 sm:left-10"
          />
          <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#10233f] shadow-[0_28px_80px_rgba(0,0,0,0.42)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/hero.jpeg"
                alt="Dr. Roxana Conduraru îngrijind un copil în cabinetul Dentissimi"
                fill
                priority
                sizes="(min-width: 1280px) 540px, (min-width: 1024px) 46vw, 92vw"
                className="object-cover"
                style={{
                  objectPosition: "43% 50%",
                  transform: "scale(1.62)",
                  transformOrigin: "43% 50%",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,25,47,0.9)_0%,rgba(10,25,47,0.42)_16%,rgba(10,25,47,0)_40%)]"
              />
              <span
                aria-hidden="true"
                className="absolute top-4 left-4 h-7 w-7 border-t border-l border-accent/80"
              />
              <span
                aria-hidden="true"
                className="absolute top-4 right-4 h-7 w-7 border-t border-r border-accent/80"
              />
            </div>
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 sm:px-7 sm:pb-6">
            <p className="font-serif max-w-[14rem] text-[1.55rem] leading-[1.12] text-champagne italic sm:text-[1.7rem]">
              Excelență în
              <span className="block">fiecare zâmbet</span>
            </p>
            <Image
              src="/images/logo.png"
              alt="Dentissimi Dental Clinic"
              width={751}
              height={544}
              sizes="148px"
              className="mt-4 h-[4.25rem] w-auto"
            />
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
