import { Icon } from "./Icon";
import { site } from "@/lib/data/site";

/**
 * The first thing in the document, on every page.
 *
 * This build carries Olivewood's real name, address and phone alongside
 * invented hours, rates, credentials and AI-generated photography. It is
 * noindexed, but a link can still be forwarded, so anyone who lands here has to
 * be told immediately — before they read a fee or an opening time — that this
 * is not the practice's website, and where the real one is.
 *
 * Deliberately not dismissible and deliberately not `no-print`: a screenshot or
 * a printout has to carry the notice too.
 *
 * To remove it for an internal presentation, delete the <DemoBanner /> line in
 * layout.tsx. Nothing else depends on it.
 */
export function DemoBanner() {
  return (
    <aside
      aria-label="Important notice about this website"
      className="relative z-50 bg-[hsl(20_85%_22%)] text-[hsl(30_60%_96%)]"
    >
      <div className="ow-shell flex flex-col gap-2 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="flex items-start gap-2.5 text-xs leading-snug sm:items-center sm:text-sm">
          <Icon name="alert" className="mt-px h-4 w-4 shrink-0 sm:mt-0" />
          <span>
            <strong className="font-semibold">
              Demonstration site — this is not Olivewood Counseling&rsquo;s real website.
            </strong>{" "}
            <span className="text-[hsl(30_40%_86%)]">
              It is an unofficial design concept. Staff details, hours, fees, insurance
              information and all photographs on it are fictional. Do not rely on anything here.
            </span>
          </span>
        </p>

        <a
          href="https://www.olivewoodcounseling.com/"
          className="ow-tap inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-[hsl(30_60%_96%)] px-4 py-2 text-xs font-semibold text-[hsl(20_85%_22%)] transition-transform hover:scale-[1.02] sm:text-sm"
        >
          Go to the real Olivewood site
          <Icon name="external" className="h-3.5 w-3.5" />
        </a>
      </div>
    </aside>
  );
}

/** The fuller version, in the footer, where there is room to explain properly. */
export function DemoNotice() {
  return (
    <aside
      aria-label="About this demonstration site"
      className="rounded-card border-2 border-[hsl(20_60%_45%)] bg-[hsl(20_60%_45%)]/10 p-5"
    >
      <h2 className="flex items-center gap-2 font-display text-base text-ink">
        <Icon name="alert" className="h-5 w-5 shrink-0 text-[hsl(20_70%_42%)] dark:text-clay" />
        About this website
      </h2>
      <div className="mt-2 space-y-2 text-xs leading-relaxed text-ink-soft">
        <p>
          This is an <strong className="text-ink">unofficial demonstration</strong> — a
          redesign concept for Olivewood Counseling, built to show what the practice&rsquo;s
          website could look like. It is not operated by, endorsed by, or affiliated with
          Olivewood Counseling.
        </p>
        <p>
          The practice is real. Almost everything else on these pages is not: clinician
          biographies, degrees and certifications, office hours, session fees, insurance
          figures, appointment availability, group seat counts and every photograph are all
          invented or AI-generated. Two of the staff members listed do not exist.
          <strong className="text-ink"> Nothing here should be relied on.</strong>
        </p>
        <p>
          For real information about the practice, including whether they are taking clients
          and what your insurance covers, go to the practice directly.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href="https://www.olivewoodcounseling.com/"
          className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill bg-clay px-4 py-2.5 text-xs font-semibold text-white"
        >
          olivewoodcounseling.com
          <Icon name="external" className="h-3.5 w-3.5" />
        </a>
        <a
          href={site.phoneHref}
          className="ow-tap inline-flex items-center justify-center gap-2 rounded-pill border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-ink"
        >
          <Icon name="phone" className="h-3.5 w-3.5 text-olive" />
          {site.phone}
        </a>
      </div>

      <p className="mt-3 text-[0.7rem] leading-relaxed text-ink-soft/80">
        The crisis numbers on this site (988 and the Lehigh and Northampton county lines) are
        real and correct. If you are in crisis, use them — regardless of anything else here.
      </p>
    </aside>
  );
}
