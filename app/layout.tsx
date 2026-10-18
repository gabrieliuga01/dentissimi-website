import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import AmbientBackground from "@/components/AmbientBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { clinic } from "@/lib/clinic";
import { getSiteUrl, pageUrl } from "@/lib/site";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const title = "Clinica Dentissimi | Stomatologie în Bârlad";
const description =
  "Clinica Dentissimi, stomatologie în Bârlad, Bulevardul Republicii 134.";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "ro_RO",
    type: "website",
    siteName: clinic.name,
    ...(siteUrl ? { url: "/" } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const dentistJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  telephone: clinic.phoneHref.replace(/^tel:/, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.street,
    addressLocality: clinic.locality,
    addressRegion: clinic.region,
    addressCountry: clinic.country,
  },
  ...(siteUrl
    ? {
        url: pageUrl("/", siteUrl),
        logo: pageUrl("/images/logo.png", siteUrl),
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dentistJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <AmbientBackground />
        <Navbar />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
