"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  city: string;
  treatment: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Elena Munteanu",
    city: "Bârlad",
    treatment: "Fațete ceramice",
    quote:
      "Am venit cu o teamă veche de dentist și am plecat zâmbind. Dr. Roxana m-a ascultat, a explicat fiecare pas, iar fațetele arată atât de natural încât prietenii întreabă doar de ce par mai odihnită.",
  },
  {
    name: "Andrei Popa",
    city: "Vaslui",
    treatment: "Implantologie",
    quote:
      "După ani cu un dinte lipsă, evitam orice poză. Implantul a fost planificat fără grabă, fără durere, și am uitat că a lipsit ceva. Mănânc din nou fără să mă gândesc la el.",
  },
  {
    name: "Ioana Stanciu",
    city: "Bârlad",
    treatment: "Albire profesională",
    quote:
      "Voiam un alb curat, nu artificial. Rezultatul e exact ce am cerut: luminos, elegant, potrivit tenului meu. O vizită în clinică, un zâmbet pe care îl port cu recunoștință.",
  },
  {
    name: "Mihai Vasilescu",
    city: "Tecuci",
    treatment: "Tratament endodontic",
    quote:
      "Credeam că dintele e pierdut. Tratamentul de canal, făcut sub magnificație, l-a salvat. Nicio durere, nicio grabă. Atât de rar găsești răbdarea asta.",
  },
  {
    name: "Carmen Ionescu",
    city: "Bârlad",
    treatment: "Profilaxie",
    quote:
      "Vin de doi ani la detartraj și de fiecare dată plec cu aceeași liniște. E curat, e calm, și nimeni nu te face să te simți judecat pentru că ai amânat.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

function Stars({ className = "size-3.5" }: { className?: string }) {
  return (
    <div className="flex gap-1" role="img" aria-label="5 din 5 stele">
      {Array.from({ length: 5 }, (_, star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={`${className} fill-accent text-accent`}
        />
      ))}
    </div>
  );
}

function Monogram({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/12 font-serif text-lg text-accent ring-1 ring-accent/35"
    >
      {name.charAt(0)}
    </span>
  );
}

function FeaturedReview({ testimonial }: { testimonial: Testimonial }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      aria-labelledby="review-0-name"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease }}
      className="relative overflow-hidden rounded-[1.75rem] border border-accent/35 bg-[#10233f] shadow-[0_28px_70px_rgba(0,0,0,0.28)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-accent/[0.09]"
      />

      <div className="relative grid gap-8 px-6 py-8 sm:px-10 sm:py-11 lg:grid-cols-12 lg:items-stretch lg:gap-0 lg:px-12 lg:py-12">
        <blockquote className="lg:col-span-8 lg:pr-12">
          <span
            aria-hidden="true"
            className="mb-4 block font-serif text-5xl leading-none text-accent"
          >
            “
          </span>
          <p className="font-serif text-[1.35rem] leading-[1.45] text-pretty text-background italic sm:text-[1.6rem] lg:text-[1.85rem] lg:leading-[1.42]">
            {testimonial.quote}
          </p>
        </blockquote>

        <footer className="flex flex-col gap-6 border-t border-white/12 pt-6 lg:col-span-4 lg:justify-between lg:border-t-0 lg:border-l lg:border-white/12 lg:pt-0 lg:pl-10">
          <p className="font-serif text-2xl leading-none text-accent italic">
            {indexLabel(0)}
          </p>
          <div>
            <Stars className="size-4" />
            <div className="mt-5 flex items-center gap-4">
              <Monogram name={testimonial.name} />
              <div className="min-w-0">
                <h3
                  id="review-0-name"
                  className="font-serif text-xl leading-none text-background"
                >
                  {testimonial.name}
                </h3>
                <p className="mt-2 text-[0.68rem] tracking-[0.18em] text-champagne/85 uppercase">
                  {`${testimonial.treatment} · ${testimonial.city}`}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </motion.article>
  );
}

function ReviewCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      aria-labelledby={`review-${index}-name`}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduceMotion ? 0 : 0.85,
        delay: reduceMotion ? 0 : (index - 1) * 0.06,
        ease,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#10233f] px-6 py-7 transition-colors duration-500 hover:border-accent/35 hover:bg-[#132844] sm:px-7 sm:py-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-6 left-0 w-px origin-center scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
      />

      <div className="flex items-center justify-between gap-4">
        <p className="font-serif text-xl leading-none text-accent italic">
          {indexLabel(index)}
        </p>
        <Stars />
      </div>

      <p className="mt-5 text-[0.68rem] tracking-[0.2em] text-champagne/85 uppercase">
        {testimonial.treatment}
      </p>

      <blockquote className="mt-4 flex-1">
        <p className="text-[0.97rem] leading-[1.75] text-pretty text-background/88">
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-5">
        <Monogram name={testimonial.name} />
        <div className="min-w-0">
          <h3
            id={`review-${index}-name`}
            className="font-serif text-lg leading-none text-background"
          >
            {testimonial.name}
          </h3>
          <p className="mt-2 text-[0.68rem] tracking-[0.18em] text-champagne/75 uppercase">
            {testimonial.city}
          </p>
        </div>
      </footer>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

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
      id="recenzii"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-primary px-5 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(232,216,176,0.09),transparent_46%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-[22rem] w-[22rem] rounded-full bg-accent/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase sm:text-xs"
            >
              <span aria-hidden="true" className="h-px w-10 bg-accent/80" />
              Recenzii
            </motion.p>
            <motion.h2
              id="testimonials-heading"
              variants={fadeUp}
              className="mt-6 text-[2.15rem] leading-[1.12] font-medium text-balance text-background sm:text-[2.75rem] lg:text-[3.15rem]"
            >
              Cuvintele{" "}
              <span className="text-champagne italic">pacienților noștri.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-background/70 sm:text-lg"
            >
              Fiecare recenzie vine de la oameni care au trecut pragul clinicii
              din Bârlad.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            role="img"
            aria-label="Evaluare medie 5 din 5, din cinci recenzii"
            className="shrink-0 lg:pb-1 lg:text-right"
          >
            <div aria-hidden="true">
              <div className="lg:ml-auto lg:w-fit">
                <Stars className="size-4" />
              </div>
              <p className="mt-3 font-serif text-[3.75rem] leading-none text-champagne italic sm:text-[4.75rem]">
                5,0
              </p>
              <p className="mt-3 text-[0.68rem] tracking-[0.28em] text-champagne uppercase">
                Nota medie
                <span aria-hidden="true" className="px-2 text-accent/70">
                  ·
                </span>
                cinci recenzii
              </p>
            </div>
          </motion.div>
        </motion.header>

        {featured ? (
          <div className="mt-14 lg:mt-16">
            <FeaturedReview testimonial={featured} />
          </div>
        ) : null}

        <div className="mt-4 grid gap-4 sm:mt-5 md:grid-cols-2">
          {rest.map((testimonial, index) => (
            <ReviewCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
