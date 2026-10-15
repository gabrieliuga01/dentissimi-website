"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { clinic, mapsEmbedSrc, mapsUrl } from "@/lib/clinic";

const ease = [0.22, 1, 0.36, 1] as const;

const contactDetails = [
  {
    label: "Telefon",
    lines: [clinic.phoneDisplay],
    href: clinic.phoneHref,
    icon: Phone,
    external: false,
  },
  {
    label: "WhatsApp",
    lines: ["Scrie-ne un mesaj"],
    href: clinic.whatsappHref,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Adresă",
    lines: [clinic.street, `${clinic.locality}, ${clinic.region}`],
    href: mapsUrl,
    icon: MapPin,
    external: true,
  },
] as const;

const serviceOptions = [
  "Stomatologie generală",
  "Ortodonție și ortopedie dento-facială",
  "Chirurgie dento-alveolară și implantologie",
  "Parodontologie",
  "Endodonție",
  "Protetică și estetică dentară",
  "Pedodonție",
  "Odontoterapie",
  "Nu știu încă / Altele",
];

type ContactFormValues = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const emptyForm: ContactFormValues = {
  name: "",
  phone: "",
  service: "",
  message: "",
};

const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;

async function sendContactRequest(values: ContactFormValues): Promise<void> {
  if (!webhookUrl) {
    // Until a webhook is configured, resolve so the UI flow stays testable.
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed with status ${response.status}`);
  }
}

const inputClassName =
  "w-full rounded-2xl border border-primary/10 bg-[#f6f1e8] px-4 py-3.5 text-base text-text transition-[border-color,background-color,box-shadow] duration-300 outline-none placeholder:text-text/45 focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.16)] disabled:cursor-not-allowed disabled:opacity-60";

function FieldLabel({
  htmlFor,
  optional = false,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 flex items-baseline justify-between gap-3 text-[0.68rem] font-medium tracking-[0.22em] text-primary/75 uppercase"
    >
      <span>
        {children}
        {optional ? null : (
          <>
            <span aria-hidden="true" className="text-accent">
              {" "}
              *
            </span>
            <span className="sr-only"> (obligatoriu)</span>
          </>
        )}
      </span>
      {optional ? (
        <span className="text-[0.65rem] tracking-[0.16em] text-primary/45">
          Opțional
        </span>
      ) : null}
    </label>
  );
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<ContactFormValues>(emptyForm);
  const [consent, setConsent] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.14 },
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setState((previous) =>
      previous === "success" || previous === "error" ? "idle" : previous,
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("submitting");

    try {
      await sendContactRequest(values);
      setValues(emptyForm);
      setConsent(false);
      setState("success");
    } catch {
      setState("error");
    }
  };

  const isSubmitting = state === "submitting";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[#f6f1e8] px-5 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-6xl"
      >
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-[1.75rem] shadow-[0_28px_80px_rgba(10,25,47,0.12)] ring-1 ring-primary/10 before:pointer-events-none before:absolute before:inset-x-10 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/80 before:to-transparent lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
        >
          <div className="relative flex min-w-0 flex-col bg-primary px-6 py-10 sm:px-10 sm:py-12 lg:h-full lg:px-12 lg:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-accent/12 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[#16325c] blur-3xl"
            />

            <div className="relative">
              <p className="flex items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase sm:text-xs">
                <span aria-hidden="true" className="h-px w-10 bg-accent/80" />
                Contact
              </p>
              <h2
                id="contact-heading"
                className="mt-6 text-[2.15rem] leading-[1.12] font-medium tracking-[-0.025em] text-balance text-background sm:text-4xl lg:text-[2.75rem]"
              >
                Suntem aici{" "}
                <span className="font-serif text-champagne italic">
                  când ești gata.
                </span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-background/70">
                Spune-ne ce te preocupă și revenim cu o propunere de programare.
                Dacă preferi, sună sau scrie-ne pe WhatsApp.
              </p>
            </div>

            <address className="relative mt-10 not-italic">
              <ul className="divide-y divide-white/10">
                {contactDetails.map(({ label, lines, href, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group -mx-3 flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/35 text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-primary">
                        <Icon aria-hidden="true" className="size-[1.05rem]" strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.68rem] font-medium tracking-[0.22em] text-accent uppercase">
                          {label}
                        </span>
                        {lines.map((line) => (
                          <span
                            key={line}
                            className="mt-1 block text-base text-background/90 sm:text-lg"
                          >
                            {line}
                          </span>
                        ))}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>

            <p className="relative mt-auto pt-10 text-sm leading-relaxed text-background/65">
              Te contactăm noi, de la cabinet.
            </p>
          </div>

          <div className="relative flex min-w-0 flex-col bg-white px-6 py-10 sm:px-10 sm:py-12 lg:h-full lg:px-12 lg:py-14">
            <p className="text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase sm:text-xs">
              Programare
            </p>
            <h3 className="mt-4 text-[1.85rem] leading-tight font-medium text-primary sm:text-[2.15rem]">
              Solicită o programare
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-text/75 sm:text-base">
              Câteva detalii sunt de ajuns. Îți propunem o oră și confirmăm
              telefonic.
            </p>

            <form
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
              className="mt-8 flex flex-1 flex-col"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <FieldLabel htmlFor="contact-name">Nume și prenume</FieldLabel>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Ex. Maria Ionescu"
                    className={inputClassName}
                  />
                </div>

                <div className="min-w-0">
                  <FieldLabel htmlFor="contact-phone">Telefon</FieldLabel>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="07xx xxx xxx"
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="mt-5">
                <FieldLabel htmlFor="contact-service">Serviciul dorit</FieldLabel>
                <div className="relative">
                  <select
                    id="contact-service"
                    name="service"
                    required
                    value={values.service}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`${inputClassName} appearance-none pr-11 ${
                      values.service ? "text-text" : "text-text/50"
                    }`}
                  >
                    <option value="" disabled>
                      Alege un serviciu
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option} className="text-text">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-accent"
                  />
                </div>
              </div>

              <div className="mt-5">
                <FieldLabel htmlFor="contact-message" optional>
                  Mesaj
                </FieldLabel>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Spune-ne pe scurt ce te aduce la clinică."
                  className={`resize-none ${inputClassName}`}
                />
              </div>

              <div className="mt-7">
                <div className="mb-5">
                  <label
                    htmlFor="contact-consent"
                    className="flex items-start gap-3 text-sm leading-relaxed text-text/80"
                  >
                    <input
                      id="contact-consent"
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      disabled={isSubmitting}
                      className="mt-0.5 size-4 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <span>
                      Sunt de acord cu{" "}
                      <Link
                        href="/confidentialitate"
                        className="font-medium text-primary underline decoration-accent decoration-1 underline-offset-[3px] transition-colors duration-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      >
                        politica de confidențialitate
                      </Link>
                      <span aria-hidden="true" className="text-accent">
                        {" "}
                        *
                      </span>
                      <span className="sr-only"> (obligatoriu)</span>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium tracking-wide text-primary shadow-[0_12px_32px_rgba(212,175,55,0.22)] transition duration-500 ease-out hover:bg-champagne hover:shadow-[0_16px_40px_rgba(212,175,55,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none sm:text-base"
                >
                  {isSubmitting ? (
                    <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
                  ) : (
                    <Send
                      aria-hidden="true"
                      className="size-5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  )}
                  {isSubmitting ? "Se trimite..." : "Trimite solicitarea"}
                </button>

                <p
                  id="contact-status"
                  aria-live="polite"
                  className="mt-4 min-h-6 text-sm leading-relaxed"
                >
                  {state === "success" ? (
                    <span className="text-primary">
                      Mulțumim. Am primit solicitarea și te contactăm în cel mai
                      scurt timp.
                    </span>
                  ) : null}
                  {state === "error" ? (
                    <span className="text-red-800">
                      Trimiterea nu a reușit. Te rugăm să încerci din nou sau să
                      ne suni la {clinic.phoneDisplay}.
                    </span>
                  ) : null}
                  {state === "idle" || state === "submitting" ? (
                    <span className="text-text/65">
                      Te sunăm noi pentru a confirma ora.
                    </span>
                  ) : null}
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.figure
          variants={fadeUp}
          className="relative mt-5 h-72 overflow-hidden rounded-[1.75rem] bg-primary shadow-[0_24px_70px_rgba(10,25,47,0.1)] ring-1 ring-primary/10 sm:mt-6 sm:h-80"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
          />
          {mapVisible ? (
            <iframe
              title="Hartă Google — Dentissimi, Bulevardul Republicii 134, Bârlad"
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] border-0"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase">
                Hartă
              </p>
              <p className="mt-3 font-serif text-2xl leading-snug text-champagne italic sm:text-[1.7rem]">
                {clinic.street}
              </p>
              <p className="mt-2 text-sm text-background/70 sm:text-base">
                {clinic.locality}, {clinic.region}
              </p>
              <button
                type="button"
                onClick={() => setMapVisible(true)}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium tracking-wide text-primary shadow-[0_12px_32px_rgba(212,175,55,0.22)] transition duration-500 ease-out hover:bg-champagne hover:shadow-[0_16px_40px_rgba(212,175,55,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
              >
                <MapPin aria-hidden="true" className="size-4" />
                Arată harta
              </button>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-background/55">
                Se încarcă de la Google și poate seta cookie-uri.
              </p>
            </div>
          )}
          <figcaption className="absolute top-4 right-4 z-10">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3.5 py-2 text-[0.68rem] font-medium tracking-[0.16em] text-champagne uppercase ring-1 ring-accent/40 backdrop-blur-md transition-colors duration-300 hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Indicații
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}
