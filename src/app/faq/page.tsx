import type { Metadata } from "next";
import { FaqSearch } from "@/components/FaqSearch";
import { Icon } from "@/components/Icon";
import { Breadcrumb, ButtonLink, Callout, PageHeader, Section } from "@/components/ui";
import { faqs } from "@/lib/data/faq";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Searchable answers about starting counseling at Alderwood — costs, insurance, confidentiality, teen privacy, cancellation, telehealth and crisis care.",
};

/** FAQPage structured data, so answers can surface directly in search results. */
const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "FAQ" }]} />
      <PageHeader
        eyebrow="Resources"
        title="The questions people actually ask"
        lede="Including the ones about money, which most practice websites leave off. Search it, or filter by topic."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-12">
          <FaqSearch />

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Callout title="In a crisis right now" tone="crisis" icon="alert">
              <ul className="mt-2 space-y-2">
                {site.crisis.map((c) => (
                  <li key={c.label} className="flex items-center justify-between gap-3">
                    <span>{c.label}</span>
                    <a href={c.href} className="shrink-0 font-semibold text-crisis underline">
                      {c.value}
                    </a>
                  </li>
                ))}
              </ul>
            </Callout>

            <div className="ow-card p-6">
              <h2 className="text-lg">Still not answered?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Call and ask. You will reach a person, and if it is a good question it tends to
                end up on this page.
              </p>
              <a
                href={site.phoneHref}
                className="ow-tap mt-4 flex items-center justify-center gap-2 rounded-pill bg-olive px-5 py-3 text-sm font-semibold text-white"
              >
                <Icon name="phone" className="h-4 w-4" />
                {site.phone}
              </a>
            </div>

            <div className="ow-card p-6">
              <h2 className="text-lg">Related</h2>
              <div className="mt-4 space-y-2">
                <ButtonLink href="/fees/" tone="secondary" icon="arrow" className="w-full">
                  Estimate your cost
                </ButtonLink>
                <ButtonLink href="/first-visit/" tone="secondary" icon="arrow" className="w-full">
                  Your first visit
                </ButtonLink>
                <ButtonLink href="/privacy/" tone="secondary" icon="arrow" className="w-full">
                  Privacy &amp; HIPAA
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
