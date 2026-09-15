import Link from "next/link";
import { Icon } from "./Icon";
import { Logo, Wordmark } from "./Logo";
import { footerColumns } from "./nav";
import { site, fullAddress } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="ow-shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2.2fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-11 w-11" />
              <Wordmark className="text-xl" />
            </div>
            <p className="ow-prose mt-4 text-sm leading-relaxed text-ink-soft">
              Evidence-based counseling for ages two through senior adulthood, in a Bethlehem
              building chosen specifically for how little it resembles a clinic.
            </p>

            <address className="mt-6 space-y-2.5 not-italic">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ow-tap flex items-start gap-2.5 text-sm text-ink transition-colors hover:text-olive"
              >
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </a>
              <a href={site.phoneHref} className="ow-tap flex items-center gap-2.5 text-sm text-ink hover:text-olive">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-olive" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="ow-tap flex items-center gap-2.5 text-sm text-ink hover:text-olive">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-olive" />
                {site.email}
              </a>
            </address>

            <div className="mt-6 rounded-card border border-crisis/25 bg-crisis-soft p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-crisis">
                <Icon name="alert" className="h-4 w-4" />
                In a crisis
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                Call 911, or call or text <a href="tel:988" className="font-semibold text-crisis underline underline-offset-2">988</a>.
                Lehigh County <a href="tel:+16107823127" className="font-semibold text-crisis underline underline-offset-2">610-782-3127</a> ·
                Northampton County <a href="tel:+16102529060" className="font-semibold text-crisis underline underline-offset-2">610-252-9060</a>.
                Olivewood does not provide 24-hour crisis coverage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="ow-eyebrow">{col.title}</h2>
                <ul className="mt-3 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-[32px] items-center text-sm text-ink-soft transition-colors hover:text-olive"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} {site.name}. Founded {site.founded}.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
            {site.hours.slice(0, 3).map((h) => (
              <span key={h.days}>
                <span className="font-medium text-ink">{h.days}</span> {h.time}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 max-w-4xl text-xs leading-relaxed text-ink-soft/80">
          Nothing on this site is medical advice, and using it does not create a
          therapist–client relationship. Screening tools here are educational and are not
          diagnostic instruments. If you are in immediate danger, call 911.
        </p>
      </div>
    </footer>
  );
}
