"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Comparison = {
  id: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  focus: string;
  sizes: string;
};

const frontal: Comparison = {
  id: "frontal",
  beforeSrc: "/images/before_and_after_photos/7.jpeg",
  afterSrc: "/images/before_and_after_photos/11.jpeg",
  beforeAlt:
    "Zâmbet frontal înainte de tratamentul estetic la Clinica Dentissimi",
  afterAlt:
    "Același zâmbet frontal după tratament, cu dinți uniformi și nuanță luminoasă",
  focus: "object-[center_30%]",
  sizes: "(min-width: 1024px) 40rem, 92vw",
};

const reconstruction: Comparison = {
  id: "reconstructie",
  beforeSrc: "/images/before_and_after_photos/1.jpeg",
  afterSrc: "/images/before_and_after_photos/2.jpeg",
  beforeAlt:
    "Arcadă dentară înainte de reconstrucție, cu restaurări vechi și uzură vizibilă",
  afterAlt:
    "Arcadă dentară după reconstrucție, cu dinți aliniați și o nuanță naturală",
  focus: "object-center",
  sizes: "(min-width: 1024px) 52rem, 94vw",
};

const anglePair = {
  beforeSrc: "/images/before_and_after_photos/5.jpeg",
  afterSrc: "/images/before_and_after_photos/8.jpeg",
  beforeAlt:
    "Zâmbet din trei sferturi înainte de tratamentul estetic la Clinica Dentissimi",
  afterAlt:
    "Același zâmbet din trei sferturi după tratament, cu dinți aliniați și luminoși",
};

function Mount({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-accent/35 bg-gradient-to-br from-white via-[#f4ead4] to-white p-2 shadow-[0_24px_60px_rgba(10,25,47,0.1)] sm:rounded-[1.7rem] sm:p-2.5">
      {children}
    </div>
  );
}

function CaseTitle({
  index,
  title,
  text,
}: {
  index: string;
  title: string;
  text?: string;
}) {
  return (
    <div>
      <p className="font-serif text-[1.75rem] leading-none text-accent italic sm:text-[2rem]">
        {index}
      </p>
      <h3 className="mt-3 text-[1.55rem] leading-snug font-medium text-balance text-primary sm:text-[1.85rem]">
        {title}
      </h3>
      {text ? (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-text/70 sm:text-[0.98rem] sm:leading-[1.7]">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function ComparisonSlider({
  comparison,
  label,
  aspectClass,
}: {
  comparison: Comparison;
  label: string;
  aspectClass: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<"undecided" | "slide" | "scroll">("undecided");
  const origin = useRef({ x: 0, y: 0 });
  const hintId = useId();
  const position = useMotionValue(50);
  const [positionLabel, setPositionLabel] = useState(50);
  const [dragging, setDragging] = useState(false);
  const clipPath = useTransform(position, (value) => {
    const clamped = Math.min(100, Math.max(0, value));
    return `inset(0 ${100 - clamped}% 0 0)`;
  });
  const lineLeft = useTransform(position, (value) => `${value}%`);

  useMotionValueEvent(position, "change", (value) => {
    setPositionLabel(Math.round(value));
  });

  const setFromClientX = useCallback(
    (clientX: number) => {
      const frame = frameRef.current;
      if (!frame) return;

      const { left, width } = frame.getBoundingClientRect();
      if (width <= 0) return;

      const next = ((clientX - left) / width) * 100;
      position.set(Math.min(100, Math.max(0, next)));
    },
    [position],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      gesture.current = "undecided";
      origin.current = { x: event.clientX, y: event.clientY };
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && gesture.current !== "slide") {
      if (gesture.current === "scroll") return;

      const dx = Math.abs(event.clientX - origin.current.x);
      const dy = Math.abs(event.clientY - origin.current.y);
      if (dx < 8 && dy < 8) return;

      if (dy > dx) {
        gesture.current = "scroll";
        return;
      }

      gesture.current = "slide";
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }

    if (event.pointerType === "touch" && gesture.current !== "slide") return;
    if (
      event.pointerType !== "touch" &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      return;
    }

    setFromClientX(event.clientX);
  };

  const stopDragging = () => {
    gesture.current = "undecided";
    setDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 8 : 3;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      position.set(Math.max(0, position.get() - step));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      position.set(Math.min(100, position.get() + step));
    }
    if (event.key === "Home") {
      event.preventDefault();
      position.set(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      position.set(100);
    }
  };

  return (
    <div>
      <Mount>
        <div
          ref={frameRef}
          role="slider"
          tabIndex={0}
          aria-describedby={hintId}
          aria-label={`Comparație înainte și după: ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={positionLabel}
          aria-valuetext={`${positionLabel} la sută din imaginea de dinainte`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onLostPointerCapture={stopDragging}
          onKeyDown={handleKeyDown}
          className={`group relative cursor-ew-resize touch-pan-y overflow-hidden rounded-[1.15rem] bg-[#16130f] outline-none select-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e4] ${aspectClass}`}
        >
          <Image
            src={comparison.afterSrc}
            alt={comparison.afterAlt}
            fill
            draggable={false}
            className={`object-cover ${comparison.focus}`}
            sizes={comparison.sizes}
          />

          <motion.div
            style={{ clipPath }}
            className="absolute inset-0 will-change-[clip-path]"
          >
            <Image
              src={comparison.beforeSrc}
              alt={comparison.beforeAlt}
              fill
              draggable={false}
              className={`object-cover ${comparison.focus}`}
              sizes={comparison.sizes}
            />
          </motion.div>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
          />

          <motion.div
            style={{ left: lineLeft }}
            className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_12px_rgba(255,255,255,0.85)]"
            />
            <span
              aria-hidden="true"
              className={`absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/50 bg-primary/90 text-accent shadow-[0_10px_28px_rgba(10,25,47,0.4)] ring-2 ring-white/80 transition-transform duration-300 sm:size-12 ${
                dragging ? "scale-110" : "group-hover:scale-105"
              }`}
            >
              <ChevronsLeftRight className="size-4 sm:size-[1.15rem]" strokeWidth={1.75} />
            </span>
          </motion.div>
        </div>

        <div className="flex items-center justify-between gap-3 px-2 pt-3 pb-0.5 sm:px-3">
          <span className="text-[0.62rem] tracking-[0.22em] text-primary/70 uppercase sm:text-[0.68rem]">
            Înainte
          </span>
          <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-accent/45" />
          <span className="text-[0.62rem] tracking-[0.22em] text-primary/70 uppercase sm:text-[0.68rem]">
            După
          </span>
        </div>
      </Mount>

      <p
        id={hintId}
        className="mt-4 text-center text-[0.68rem] tracking-[0.22em] text-text/45 uppercase"
      >
        Trage linia pentru a descoperi rezultatul
      </p>
    </div>
  );
}

function AnglePhoto({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <figure className="min-w-0">
      <Mount>
        <div className="relative aspect-[2/3] overflow-hidden rounded-[1.15rem] bg-[#16130f]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 16rem, 44vw"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
          />
        </div>
        <figcaption className="px-2 pt-3 pb-0.5 text-center text-[0.62rem] tracking-[0.22em] text-primary/70 uppercase sm:text-[0.68rem]">
          {label}
        </figcaption>
      </Mount>
    </figure>
  );
}

export default function BeforeAfterSlider() {
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
      transition: { duration: reduceMotion ? 0 : 0.95, ease },
    },
  };

  return (
    <section
      id="rezultate"
      aria-labelledby="before-after-heading"
      className="relative overflow-hidden bg-background px-5 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-6xl"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase sm:text-xs"
            >
              <span aria-hidden="true" className="h-px w-10 bg-accent/80" />
              Rezultate
            </motion.p>
            <motion.h2
              id="before-after-heading"
              variants={fadeUp}
              className="mt-6 text-[2.15rem] leading-[1.12] font-medium text-balance text-primary sm:text-[2.75rem] lg:text-[3.15rem]"
            >
              Transformări pe care le poți vedea.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-text/70 sm:text-lg"
            >
              Trage linia și descoperă diferența. Fiecare detaliu e lucrat cu
              răbdare, până când zâmbetul arată ca al tău — doar mai luminos.
            </motion.p>
          </div>

          <motion.p
            variants={fadeUp}
            aria-hidden="true"
            className="font-serif hidden shrink-0 text-right text-[3.25rem] leading-[0.9] text-accent/30 italic lg:block"
          >
            înainte
            <br />
            <span className="text-accent/55">&amp;</span> după
          </motion.p>
        </div>

        <div className="mt-16 grid items-center gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          <motion.div variants={fadeUp} className="min-w-0 lg:col-span-7">
            <CaseTitle index="01" title="Zâmbet frontal" />
            <div className="mt-6">
              <ComparisonSlider
                comparison={frontal}
                label="Zâmbet frontal"
                aspectClass="aspect-[3/4] sm:aspect-[4/5]"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="min-w-0 lg:col-span-5">
            <CaseTitle
              index="02"
              title="Trei sferturi"
              text="Același zâmbet, privit dintr-un unghi în care se vede linia dinților."
            />
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <AnglePhoto
                src={anglePair.beforeSrc}
                alt={anglePair.beforeAlt}
                label="Înainte"
              />
              <AnglePhoto
                src={anglePair.afterSrc}
                alt={anglePair.afterAlt}
                label="După"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-16 border-t border-primary/10 pt-14 sm:mt-20 sm:pt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-14 lg:pt-20"
        >
          <div className="lg:col-span-4">
            <CaseTitle
              index="03"
              title="Reconstrucție"
              text="Restaurări vechi, readuse la o linie clară și o nuanță naturală."
            />
          </div>
          <div className="mt-8 min-w-0 lg:col-span-8 lg:mt-0">
            <ComparisonSlider
              comparison={reconstruction}
              label="Reconstrucție"
              aspectClass="aspect-[3/2]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
