import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ButtonLink, Section } from "@/components/ui";
import { site } from "@/lib/data/site";

const routes = [
  { href: "/services/", label: "Services", blurb: "Ages two to ninety, individual through family." },
  { href: "/about/staff/", label: "Our Clinicians", blurb: "Eight therapists, filterable by specialty." },
  { href: "/find-a-therapist/", label: "Find a Therapist", blurb: "Six questions, ranked matches." },
  { href: "/fees/", label: "Fees & Insurance", blurb: "Estimate your cost before you call." },
  { href: "/faq/", label: "FAQ", blurb: "Searchable, including the money questions." },
  { href: "/contact/", label: "Contact", blurb: "Address, hours and a message form." },
];

export default function NotFound() {
  return (
    <Section className="!py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-6xl text-olive sm:text-7xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">That page is not here</h1>
        <p className="ow-prose mx-auto mt-4 leading-relaxed text-ink-soft">
          A link may be out of date, or the address may have a typo in it. Nothing has gone
          wrong on your end.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" icon="arrow">Back to the homepage</ButtonLink>
          <a
            href={site.phoneHref}
            className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink"
          >
            <Icon name="phone" className="h-4 w-4 text-olive" />
            {site.phone}
          </a>
        </div>
      </div>

      <ul className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
        {routes.map((r) => (
          <li key={r.href}>
            <Link
              href={r.href}
              className="ow-card group flex h-full items-start justify-between gap-3 p-5 transition-colors hover:border-olive/40"
            >
              <span>
                <span className="block font-display text-base text-ink">{r.label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-soft">{r.blurb}</span>
              </span>
              <Icon
                name="arrow"
                className="mt-1 h-4 w-4 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-olive"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
