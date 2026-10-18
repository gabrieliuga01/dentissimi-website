import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  CalendarCheck,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { clinic, mapsUrl } from "@/lib/clinic";

type IconProps = { className?: string };

function BrandIcon({
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <BrandIcon className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </BrandIcon>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <BrandIcon className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </BrandIcon>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <BrandIcon className={className}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.7 2.6 4.8 5.3 5" />
    </BrandIcon>
  );
}

const pages = [
  { label: "Acasă", href: "/#acasa" },
  { label: "Despre Noi", href: "/#despre" },
  { label: "Servicii", href: "/#servicii" },
  { label: "Recenzii", href: "/#recenzii" },
  { label: "Prima vizită", href: "/#prima-vizita" },
  { label: "Rezultate", href: "/#rezultate" },
  { label: "Contact", href: "/#contact" },
] as const;

const services = [
  "Stomatologie generală",
  "Ortodonție și ortopedie dento-facială",
  "Chirurgie dento-alveolară și implantologie",
  "Parodontologie",
  "Endodonție",
  "Protetică și estetică dentară",
  "Pedodonție",
  "Odontoterapie",
] as const;

const socials = [
  { label: "Facebook", href: clinic.facebook, icon: FacebookIcon },
  { label: "Instagram", href: clinic.instagram, icon: InstagramIcon },
  { label: "TikTok", href: clinic.tiktok, icon: TikTokIcon },
] as const;

const visits: {
  label: string;
  lines: readonly string[];
  href: string;
  icon: LucideIcon;
  external: boolean;
}[] = [
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
];

const textLinkClass =
  "flex min-h-9 items-center text-sm leading-snug tracking-wide text-background/78 underline decoration-transparent decoration-1 underline-offset-[5px] transition-[color,text-decoration-color] duration-300 hover:text-champagne hover:decoration-accent focus-visible:text-champagne focus-visible:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none";

const pageLinkClass =
  "inline-flex min-h-11 items-center text-sm tracking-wide text-background/78 underline decoration-transparent decoration-1 underline-offset-[5px] transition-[color,text-decoration-color] duration-300 hover:text-champagne hover:decoration-accent focus-visible:text-champagne focus-visible:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none";

function ColumnTitle({ id, children }: { id: string; children: string }) {
  return (
    <p
      id={id}
      className="text-[0.68rem] font-medium tracking-[0.28em] text-accent uppercase"
    >
      {children}
      <span aria-hidden="true" className="mt-3 block h-px w-8 bg-accent/80" />
    </p>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 -mt-6 shrink-0 overflow-hidden rounded-t-[1.75rem] bg-primary text-background shadow-[0_-24px_60px_rgba(10,25,47,0.07)] sm:-mt-10 sm:rounded-t-[2.5rem]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl" />
        <div className="absolute right-0 -bottom-28 h-72 w-72 rounded-full bg-[#16325c] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(232,216,176,0.07),transparent_42%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:px-10 sm:pt-16 lg:px-16 lg:pt-20">
        <div
          aria-hidden="true"
          className="mb-12 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent sm:mb-14"
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-16 xl:gap-x-12">
          <div className="order-1 min-w-0 lg:order-none lg:col-span-5">
            <a
              href={withBasePath("/#acasa")}
              aria-label="Dentissimi Dental Clinic"
              className="inline-flex max-w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image
                src="/images/logo.png"
                alt=""
                width={751}
                height={544}
                sizes="200px"
                className="h-28 w-auto max-w-full sm:h-32"
              />
            </a>
            <span
              aria-hidden="true"
              className="mt-7 block h-px w-10 bg-accent/80"
            />
            <p className="mt-6 max-w-sm font-serif text-xl leading-snug text-pretty text-champagne italic sm:text-[1.4rem]">
              Stomatologie premium în Bârlad, cu răbdare și grijă pentru fiecare
              detaliu.
            </p>

            <div className="mt-8">
              <p
                id="footer-social"
                className="text-[0.68rem] font-medium tracking-[0.28em] text-accent uppercase"
              >
                Urmărește-ne
              </p>
              <ul
                aria-labelledby="footer-social"
                className="mt-4 flex flex-wrap gap-2.5"
              >
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/15 pr-4 pl-3.5 text-sm tracking-wide text-background/80 transition-[color,background-color,border-color] duration-300 hover:border-accent hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
                    >
                      <Icon className="size-4" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav
            aria-labelledby="footer-services"
            className="order-3 min-w-0 lg:order-none lg:col-span-3"
          >
            <ColumnTitle id="footer-services">Servicii</ColumnTitle>
            <ul className="mt-4 flex flex-col">
              {services.map((title) => (
                <li key={title}>
                  <a href={withBasePath("/#servicii")} className={textLinkClass}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="order-2 min-w-0 lg:order-none lg:col-span-4">
            <ColumnTitle id="footer-visit">Vizitează-ne</ColumnTitle>
            <address className="mt-2 not-italic">
              <ul className="divide-y divide-white/10">
                {visits.map(({ label, lines, href, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group -mx-3 flex items-center gap-3.5 rounded-2xl px-3 py-3.5 transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/35 text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-primary motion-reduce:transition-none">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.68rem] font-medium tracking-[0.2em] text-accent uppercase">
                          {label}
                        </span>
                        {lines.map((line) => (
                          <span
                            key={line}
                            className="mt-1 block text-sm leading-snug text-background/88"
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

            <a
              href={withBasePath("/#contact")}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium tracking-wide text-primary shadow-[0_8px_24px_rgba(212,175,55,0.22)] transition duration-500 ease-out hover:bg-champagne hover:shadow-[0_12px_28px_rgba(212,175,55,0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
            >
              <CalendarCheck aria-hidden="true" className="size-4" />
              Programează-te
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 sm:mt-16">
          <nav aria-label="Paginile clinicii">
            <ul className="mx-auto grid w-full max-w-xs grid-cols-2 gap-x-6 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-8">
              {pages.map(({ label, href }) => (
                <li key={href} className="text-center sm:text-left">
                  <a href={withBasePath(href)} className={pageLinkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 text-xs tracking-wide text-background/70 sm:text-sm">
                <span>© {year} Clinica Dentissimi. Toate drepturile rezervate.</span>
                <Link
                  href="/confidentialitate"
                  className="underline decoration-accent/60 underline-offset-[5px] transition-colors duration-300 hover:text-champagne focus-visible:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Confidențialitate
                </Link>
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-accent/60 underline-offset-[5px] transition-colors duration-300 hover:text-champagne focus-visible:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  ANPC — Soluționarea alternativă a litigiilor
                </a>
              </p>
              <p className="text-[0.68rem] font-medium tracking-[0.22em] text-background/70 uppercase">
                {clinic.locality} · România
              </p>
            </div>
            <a
              href={withBasePath("/#acasa")}
              className="group inline-flex h-11 w-fit items-center gap-2 text-[0.68rem] font-medium tracking-[0.2em] text-background/80 uppercase transition-colors duration-300 hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Înapoi sus
              <ArrowUp
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
