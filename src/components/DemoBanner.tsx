import { Icon } from "./Icon";
import { site } from "@/lib/data/site";

/**
 * The first thing in the document, on every page.
 *
 * Alderwood Counseling does not exist. The practice, its staff, address, phone
 * number and photographs are all invented — but the design is deliberately
 * convincing, so anyone who lands here has to be told before they read a fee or
 * an opening time and act on it.
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
              Demonstration site — Alderwood Counseling is not a real practice.
            </strong>{" "}
            <span className="text-[hsl(30_40%_86%)]">
              This is a web design portfolio piece. The practice, its clinicians, address,
              phone number, fees and photographs are all invented. Nothing here can be booked
              and no one here can be called.
            </span>
          </span>
        </p>

        <a
          href="#about-this-site"
          className="ow-tap inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-[hsl(30_60%_96%)] px-4 py-2 text-xs font-semibold text-[hsl(20_85%_22%)] transition-transform hover:scale-[1.02] sm:text-sm"
        >
          What this is
          <Icon name="chevron" className="h-3.5 w-3.5" />
        </a>
      </div>
    </aside>
  );
}

/** The fuller version, in the footer, where there is room to explain properly. */
export function DemoNotice() {
  return (
    <aside
      id="about-this-site"
      aria-label="About this demonstration site"
      className="scroll-mt-28 rounded-card border-2 border-[hsl(20_60%_45%)] bg-[hsl(20_60%_45%)]/10 p-5"
    >
      <h2 className="flex items-center gap-2 font-display text-base text-ink">
        <Icon name="alert" className="h-5 w-5 shrink-0 text-[hsl(20_70%_42%)] dark:text-clay" />
        About this website
      </h2>
      <div className="mt-2 space-y-2 text-xs leading-relaxed text-ink-soft">
        <p>
          <strong className="text-ink">{site.name} is not a real counseling practice.</strong>{" "}
          This site is a web design demonstration — a portfolio piece showing what a modern
          practice website could look like, built end to end.
        </p>
        <p>
          Everything on it is invented: the practice, its ten clinicians and their
          biographies, degrees and certifications, the address, the phone and fax numbers,
          office hours, session fees, insurance figures, appointment availability, group seat
          counts, the client testimonials, and every photograph. No one listed here exists. The
          building shown does not exist. Nothing can be booked and no one can be called.
        </p>
        <p>
          It is set in the Lehigh Valley because a design has to be grounded somewhere
          specific to be worth judging. It is not a depiction of any practice operating there.
        </p>
        <p className="text-ink-soft/80">
          The layout and page structure were developed by studying a real practice&rsquo;s
          website. No identifying detail from it was carried across.
        </p>
      </div>

      <p className="mt-4 rounded-lg border border-crisis/25 bg-crisis-soft p-3 text-[0.7rem] leading-relaxed text-ink-soft">
        <strong className="text-crisis">One exception, deliberately.</strong> The crisis
        numbers on this site — 988, and the Lehigh and Northampton county lines — are real,
        current and correct. If you need them, use them, regardless of everything else above.
      </p>
    </aside>
  );
}
