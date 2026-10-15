"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const parallax = { stiffness: 36, damping: 22, mass: 0.7 };

export default function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-1);
  const pointerY = useMotionValue(-1);
  const shown = useMotionValue(0);

  const normX = useTransform(pointerX, (value) => {
    if (value < 0 || typeof window === "undefined") return 0;
    const next = (value / window.innerWidth - 0.5) * 2;
    return Math.max(-1, Math.min(1, next));
  });
  const normY = useTransform(pointerY, (value) => {
    if (value < 0 || typeof window === "undefined") return 0;
    const next = (value / window.innerHeight - 0.5) * 2;
    return Math.max(-1, Math.min(1, next));
  });

  const meshX = useSpring(
    useTransform(normX, (value) => value * -18),
    parallax,
  );
  const meshY = useSpring(
    useTransform(normY, (value) => value * -12),
    parallax,
  );
  const goldX = useSpring(
    useTransform(normX, (value) => value * -36),
    parallax,
  );
  const goldY = useSpring(
    useTransform(normY, (value) => value * -24),
    parallax,
  );
  const champagneX = useSpring(
    useTransform(normX, (value) => value * -56),
    parallax,
  );
  const champagneY = useSpring(
    useTransform(normY, (value) => value * -38),
    parallax,
  );
  const warmX = useSpring(
    useTransform(normX, (value) => value * 22),
    parallax,
  );
  const warmY = useSpring(
    useTransform(normY, (value) => value * 16),
    parallax,
  );

  const echoX = useSpring(pointerX, { stiffness: 14, damping: 16, mass: 1.15 });
  const echoY = useSpring(pointerY, { stiffness: 14, damping: 16, mass: 1.15 });
  const haloX = useSpring(pointerX, { stiffness: 42, damping: 20, mass: 0.7 });
  const haloY = useSpring(pointerY, { stiffness: 42, damping: 20, mass: 0.7 });
  const coreX = useSpring(pointerX, { stiffness: 140, damping: 24, mass: 0.35 });
  const coreY = useSpring(pointerY, { stiffness: 140, damping: 24, mass: 0.35 });
  const glowOpacity = useSpring(shown, { stiffness: 70, damping: 22 });

  const echo = useMotionTemplate`radial-gradient(34rem circle at ${echoX}px ${echoY}px, rgba(212, 175, 55, 0.18), transparent 70%)`;
  const halo = useMotionTemplate`radial-gradient(18rem circle at ${haloX}px ${haloY}px, rgba(212, 175, 55, 0.28), transparent 68%)`;
  const core = useMotionTemplate`radial-gradient(7.5rem circle at ${coreX}px ${coreY}px, rgba(244, 228, 188, 0.42), transparent 72%)`;

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      shown.set(1);
    };

    const onLeave = () => {
      shown.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerX, pointerY, reduceMotion, shown]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[15] overflow-hidden mix-blend-screen"
      >
        <motion.div className="absolute inset-0" style={{ x: meshX, y: meshY }}>
          <div className="ambient-mesh" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ x: goldX, y: goldY }}>
          <div className="ambient-orb ambient-orb-gold" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          style={{ x: champagneX, y: champagneY }}
        >
          <div className="ambient-orb ambient-orb-champagne" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ x: warmX, y: warmY }}>
          <div className="ambient-orb ambient-orb-warm" />
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[16] overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: echo, opacity: glowOpacity }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: halo, opacity: glowOpacity }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: core, opacity: glowOpacity }}
        />
      </div>
    </>
  );
}
