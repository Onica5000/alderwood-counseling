import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SafetyBar } from "@/components/SafetyBar";
import { DemoBanner } from "@/components/DemoBanner";
import { themeBootScript } from "@/components/ThemeToggle";
import { site, fullAddress } from "@/lib/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

/**
 * Where this build is actually served — not the real practice domain, which
 * does not host our assets. The workflow sets it from the Pages base URL.
 *
 * Open Graph URLs are composed from this by hand rather than left relative:
 * when the site lives under a path (a GitHub Pages project site), a leading
 * slash resolves against the origin and drops the path, producing a 404.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const ogImage = `${siteUrl}/rooms/hero.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // "[Demo]" rides along in the browser tab and in every search or share
  // preview, so the notice is not only visible once the page has rendered.
  title: {
    default: `[Demo] ${site.name} — unofficial redesign concept`,
    template: `%s · [Demo] ${site.name}`,
  },
  description: site.description,
  keywords: [
    "counseling Bethlehem PA",
    "therapist Lehigh Valley",
    "DBT program Pennsylvania",
    "child therapy Bethlehem",
    "couples counseling Northampton County",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `[DEMO] ${site.name} — unofficial redesign concept`,
    description:
      "Demonstration site — not Alderwood Counseling's real website. An unofficial design concept with fictional staff details, hours, fees and photographs. The real practice is at alderwoodcounseling.com.",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1248,
        height: 832,
        alt: "A counseling room at Alderwood: two armchairs by a window, with a tree outside",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: [ogImage] },
  // Concept build: keep it out of search results so it cannot be mistaken for
  // the live practice site. See src/app/robots.ts.
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#111a16" },
  ],
  width: "device-width",
  initialScale: 1,
  // Never block pinch-zoom — capping it is one of the most common a11y failures.
  maximumScale: 5,
};

/** Structured data so the practice, its hours and its services are machine-readable. */
const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  foundingDate: "2011-04",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "20:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00" },
  ],
  medicalSpecialty: "Psychiatric",
  availableService: [
    "Cognitive Behavioral Therapy",
    "Dialectical Behavior Therapy",
    "Eco-systemic Structural Family Therapy",
    "Filial Therapy",
    "EMDR",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `data-scroll-behavior` restores Next's override of our global
    // `scroll-behavior: smooth`, so route changes jump instantly while in-page
    // anchors still glide. Without it, Next 16 lets every navigation smooth-scroll.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Runs before paint so the page never flashes the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <meta name="geo.placename" content={fullAddress} />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-clay focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        {/* First in the document: anyone who lands here is told this is not the
            practice's site before they can read a fee or an opening time. */}
        <DemoBanner />
        <SafetyBar />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
