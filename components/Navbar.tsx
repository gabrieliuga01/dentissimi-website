"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { clinic } from "@/lib/clinic";

const navLinks = [
  { label: "Acasă", href: "/#acasa" },
  { label: "Despre Noi", href: "/#despre" },
  { label: "Servicii", href: "/#servicii" },
  { label: "Prima vizită", href: "/#prima-vizita" },
  { label: "Contact", href: "/#contact" },
] as const;

function sectionId(href: string) {
  const hash = href.indexOf("#");
  return hash === -1 ? href : href.slice(hash + 1);
}

const ease = [0.22, 1, 0.36, 1] as const;

const panel: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease, when: "beforeChildren" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease },
  },
};

const list: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06, staggerChildren: 0.07 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const scrollThreshold = 12;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(navLinks[0].href);
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const markerRaw = getComputedStyle(document.documentElement).scrollPaddingTop;
      const marker = Number.parseFloat(markerRaw);
      const line = Number.isFinite(marker) ? marker : 96;
      let current = "";

      for (const link of navLinks) {
        const section = document.getElementById(sectionId(link.href));
        if (!section) continue;
        // A few pixels of slack: scroll-padding parks the section on this line.
        if (section.getBoundingClientRect().top <= line + 4) current = link.href;
      }

      if (!current && document.getElementById(sectionId(navLinks[0].href))) {
        current = navLinks[0].href;
      }

      setIsScrolled(window.scrollY > scrollThreshold);
      setActiveHref((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const previousOverflow = document.body.style.overflow;
    const toggle = document.getElementById("menu-toggle");
    const panelNode = document.getElementById("mobile-menu");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggle?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelNode || !toggle) return;

      const focusable = [
        toggle,
        ...panelNode.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  const goToSection = (href: string) => {
    setIsMenuOpen(false);
    const target = document.getElementById(sectionId(href));

    if (!target) {
      router.push(href);
      return;
    }

    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", withBasePath(href));
    }, 0);
  };

  const solid = isScrolled || isMenuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow] duration-500 ease-out motion-reduce:transition-none ${
          solid
            ? "bg-primary shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
            : "bg-transparent"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-500 motion-reduce:transition-none ${
            solid ? "opacity-80" : "opacity-0"
          }`}
        />

        <nav
          aria-label="Navigare principală"
          className="mx-auto grid h-[var(--navbar-height)] max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:gap-8 lg:px-12"
        >
          <a
            href={withBasePath("/#acasa")}
            onClick={(event) => {
              event.preventDefault();
              goToSection("/#acasa");
            }}
            aria-label="Dentissimi Dental Clinic"
            className="relative inline-flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={751}
              height={544}
              priority
              sizes="128px"
              className="h-16 w-auto sm:h-20"
            />
          </a>

          <ul className="col-start-2 hidden min-w-0 items-center justify-center gap-4 lg:flex xl:gap-6 2xl:gap-10">
            {navLinks.map(({ label, href }) => {
              const isActive = activeHref === href;

              return (
                <li key={href}>
                  <a
                    href={withBasePath(href)}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(href);
                    }}
                    className={`group relative inline-flex py-2 text-[0.68rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:text-[0.72rem] xl:tracking-[0.18em] 2xl:tracking-[0.2em] ${
                      isActive
                        ? "text-champagne"
                        : "text-white/68 hover:text-white"
                    }`}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-center bg-accent transition-transform duration-500 ease-out motion-reduce:transition-none ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3">
            <a
              href={clinic.phoneHref}
              className="hidden items-center gap-2 text-sm tracking-wide text-white/75 transition-colors duration-300 hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:inline-flex"
            >
              <Phone aria-hidden="true" className="size-3.5 text-accent" />
              {clinic.phoneDisplay}
            </a>

            <a
              href={withBasePath("/#contact")}
              onClick={(event) => {
                event.preventDefault();
                goToSection("/#contact");
              }}
              className="hidden h-10 items-center gap-2 rounded-full bg-accent px-5 text-[0.8125rem] font-medium tracking-wide text-primary shadow-[0_8px_24px_rgba(212,175,55,0.22)] transition duration-500 ease-out hover:bg-champagne hover:shadow-[0_12px_28px_rgba(212,175,55,0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:inline-flex"
            >
              <CalendarCheck aria-hidden="true" className="size-4" />
              Programează-te
            </a>

            <button
              id="menu-toggle"
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="relative inline-flex size-11 items-center justify-center rounded-full border border-white/18 text-white transition-[color,border-color,background-color] duration-300 ease-out hover:border-accent/55 hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
            >
              <Menu
                aria-hidden="true"
                className={`size-5 transition duration-300 ease-out motion-reduce:transition-none ${
                  isMenuOpen ? "scale-75 opacity-0" : "scale-100 opacity-100"
                }`}
              />
              <X
                aria-hidden="true"
                className={`absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition duration-300 ease-out motion-reduce:transition-none ${
                  isMenuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            variants={reduceMotion ? undefined : panel}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
            exit={reduceMotion ? undefined : "exit"}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain bg-primary lg:hidden"
            style={{
              top: "calc(var(--navbar-height) + env(safe-area-inset-top, 0px))",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#16325c] blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-full max-w-7xl flex-col px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
              <p className="flex items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase">
                <span aria-hidden="true" className="h-px w-10 bg-accent/80" />
                Meniu
              </p>

              <motion.ul
                variants={reduceMotion ? undefined : list}
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
                className="mt-6"
              >
                {navLinks.map(({ label, href }, index) => {
                  const isActive = activeHref === href;

                  return (
                    <motion.li
                      key={href}
                      variants={reduceMotion ? undefined : item}
                      className="border-b border-white/10"
                    >
                      <a
                        href={withBasePath(href)}
                        aria-current={isActive ? "true" : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          goToSection(href);
                        }}
                        className="group flex min-h-16 items-baseline gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      >
                        <span
                          aria-hidden="true"
                          className="w-7 text-[0.68rem] tracking-[0.22em] text-accent"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-serif text-[2rem] leading-none transition-colors duration-300 sm:text-4xl ${
                            isActive
                              ? "text-champagne italic"
                              : "text-white group-hover:text-champagne"
                          }`}
                        >
                          {label}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div
                variants={reduceMotion ? undefined : item}
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease, delay: 0.28 }}
                className="mt-auto pt-10"
              >
                <a
                  href={clinic.phoneHref}
                  className="inline-flex items-center gap-3 text-base tracking-wide text-white/80 transition-colors duration-300 hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-accent/35 text-accent">
                    <Phone aria-hidden="true" className="size-4" />
                  </span>
                  {clinic.phoneDisplay}
                </a>

                <a
                  href={withBasePath("/#contact")}
                  onClick={(event) => {
                    event.preventDefault();
                    goToSection("/#contact");
                  }}
                  className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-accent text-sm font-medium tracking-wide text-primary shadow-[0_12px_32px_rgba(212,175,55,0.22)] transition duration-500 ease-out hover:bg-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <CalendarCheck aria-hidden="true" className="size-[1.125rem]" />
                  Programează-te
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
