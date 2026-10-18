import type { Metadata } from "next";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Confidențialitate | Clinica Dentissimi",
  description:
    "Cum prelucrează Clinica Dentissimi datele din formularul de programare: ce colectăm, de ce, cât timp le păstrăm și ce drepturi ai.",
};

const updated = "15 octombrie 2026";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Confidențialitate",
  inLanguage: "ro",
  dateModified: "2026-10-15",
  description:
    "Cum prelucrează Clinica Dentissimi datele din formularul de programare.",
  publisher: {
    "@type": "Dentist",
    name: clinic.name,
    telephone: "+40724565527",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.street,
      addressLocality: clinic.locality,
      addressRegion: clinic.region,
      addressCountry: clinic.country,
    },
  },
};

export default function ConfidentialitatePage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative overflow-hidden bg-primary">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[#16325c] blur-3xl" />
          <div className="absolute top-8 -right-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(232,216,176,0.08),transparent_46%)]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-5 pt-[calc(var(--navbar-height)+env(safe-area-inset-top,0px)+2.5rem)] pb-16 sm:px-8 sm:pb-20">
          <p className="flex items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase sm:text-xs">
            <span aria-hidden="true" className="h-px w-10 bg-accent/80" />
            {clinic.name}
          </p>
          <h1 className="mt-6 text-[2.6rem] leading-[1.08] font-medium tracking-[-0.025em] text-balance text-background sm:text-5xl">
            Confidențialitate
          </h1>
          <p className="mt-5 max-w-xl font-serif text-xl leading-snug text-pretty text-champagne italic sm:text-2xl">
            Cum folosim datele din cererea de programare.
          </p>
          <p className="mt-6 text-[0.68rem] font-medium tracking-[0.22em] text-background/55 uppercase">
            Actualizat la {updated}
          </p>
        </div>
      </header>

      <article className="relative bg-[#f6f1e8] px-5 py-16 sm:px-8 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
        />

        <div className="mx-auto max-w-3xl">
          <section aria-labelledby="operator-heading">
            <h2
              id="operator-heading"
              className="text-[1.7rem] leading-tight font-medium text-primary sm:text-3xl"
            >
              Operatorul
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Operatorul datelor este {clinic.name}. Pentru o cerere legată de
              datele tale, sună-ne sau vino la cabinet.
            </p>
            <address className="mt-5 text-base leading-relaxed text-text/80 not-italic">
              <span className="block">{clinic.street}</span>
              <span className="block">
                {clinic.locality}, județul {clinic.region}
              </span>
              <a
                href={clinic.phoneHref}
                className="mt-3 inline-flex font-medium text-primary underline decoration-accent decoration-1 underline-offset-[3px] transition-colors duration-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {clinic.phoneDisplay}
              </a>
            </address>
          </section>

          <section aria-labelledby="data-heading" className="mt-12">
            <h2
              id="data-heading"
              className="text-[1.7rem] leading-tight font-medium text-primary sm:text-3xl"
            >
              Ce date colectăm
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Formularul de programare de pe site cere:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-text/80 marker:text-accent">
              <li>numele și prenumele</li>
              <li>numărul de telefon</li>
              <li>serviciul dorit</li>
              <li>un mesaj, pe care îl poți lăsa necompletat</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Nu îți cerem alte informații prin acest formular.
            </p>
          </section>

          <section aria-labelledby="purpose-heading" className="mt-12">
            <h2
              id="purpose-heading"
              className="text-[1.7rem] leading-tight font-medium text-primary sm:text-3xl"
            >
              De ce le folosim
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Folosim aceste date ca să programăm o vizită. Te sunăm de la
              cabinet, îți propunem o oră și o confirmăm. Temeiul este cererea
              ta de programare.
            </p>
          </section>

          <section aria-labelledby="health-heading" className="mt-12">
            <h2
              id="health-heading"
              className="text-[1.7rem] leading-tight font-medium text-primary sm:text-3xl"
            >
              Date despre sănătate
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Mesajul poate conține date despre sănătatea ta dentară, de
              exemplu o durere sau un tratament deja început. Le citim doar ca
              să înțelegem motivul vizitei. Pentru aceste detalii, temeiul este
              acordul tău, bifat în formular înainte de trimitere.
            </p>
          </section>

          <section aria-labelledby="retention-heading" className="mt-12">
            <h2
              id="retention-heading"
              className="text-[1.7rem] leading-tight font-medium text-primary sm:text-3xl"
            >
              Cât timp le păstrăm
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Păstrăm cererea cel mult 12 luni de la data trimiterii, apoi o
              ștergem. Dacă legea cere un termen mai lung pentru documentele
              medicale, îl respectăm. Poți cere ștergerea și înainte de aceste
              12 luni.
            </p>
          </section>

          <section aria-labelledby="rights-heading" className="mt-12">
            <h2
              id="rights-heading"
              className="text-[1.7rem] leading-tight font-medium text-primary sm:text-3xl"
            >
              Drepturile tale
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Ne poți cere, la telefonul clinicii:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-text/80 marker:text-accent">
              <li>accesul la datele tale</li>
              <li>rectificarea datelor inexacte</li>
              <li>ștergerea</li>
              <li>restricționarea prelucrării</li>
              <li>opoziția față de prelucrare</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Îți răspundem în cel mult o lună. Dacă nu ești mulțumit de
              răspuns, poți depune o plângere la Autoritatea Națională de
              Supraveghere a Prelucrării Datelor cu Caracter Personal
              (ANSPDCP).
            </p>
            <p className="mt-4 text-base leading-relaxed text-text/80">
              <a
                href="https://www.dataprotection.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline decoration-accent decoration-1 underline-offset-[3px] transition-colors duration-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                www.dataprotection.ro
              </a>
            </p>
          </section>

          <section aria-labelledby="cookies-heading" className="mt-12">
            <h2
              id="cookies-heading"
              className="text-[1.7rem] leading-tight font-medium text-primary sm:text-3xl"
            >
              Cookie-uri
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Fonturile site-ului sunt găzduite de noi. Browserul nu le
              descarcă de la un serviciu extern.
            </p>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Harta Google nu se încarcă singură. Apare doar după ce apeși
              „Arată harta”. Din acel moment, Google poate seta cookie-uri
              proprii.
            </p>
            <p className="mt-4 text-base leading-relaxed text-pretty text-text/80">
              Nu folosim servicii de analiză a traficului și nu folosim pixeli
              de urmărire.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
