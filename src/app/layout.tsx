import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SafetyBar } from "@/components/SafetyBar";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.olivewoodcounseling.com"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
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
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: "/rooms/hero.jpg",
        width: 1248,
        height: 832,
        alt: "A counseling room at Olivewood: two armchairs by a window, with an olive tree outside",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/rooms/hero.jpg"] },
  robots: { index: true, follow: true },
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
