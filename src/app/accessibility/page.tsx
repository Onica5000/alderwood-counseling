import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Breadcrumb, Callout, PageHeader, Section } from "@/components/ui";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How this site and the Alderwood building are built to be usable — keyboard navigation, contrast, reduced motion, step-free access, and how to report a barrier.",
};

const web = [
  { title: "Keyboard", body: "Every control — menus, the matcher, the booking grid, the gallery lightbox — is reachable and operable by keyboard alone, with a visible focus ring that meets 3:1 contrast against its background." },
  { title: "Screen readers", body: "Landmarks, heading order and form labels are explicit. Filters and multi-step flows announce their results through live regions, and each step moves focus to the new heading rather than silently swapping content." },
  { title: "Contrast", body: "Body text meets WCAG AA at 4.5:1 and large text at 3:1, in both light and dark themes. Colour is never the only carrier of meaning — status is always also stated in words." },
  { title: "Motion", body: "Every animation is opt-out. With `prefers-reduced-motion` set, transitions collapse and scroll-triggered reveals render immediately rather than never." },
  { title: "Zoom and reflow", body: "Pinch-zoom is never disabled. The layout reflows to 320px and to 400% zoom without horizontal scrolling, and form fields use a 16px minimum so iOS does not zoom on focus." },
  { title: "Touch targets", body: "Interactive elements are at least 44×44 CSS pixels, including the filter chips and the appointment slot buttons." },
];

const building = [
  "Step-free entrance from the Alder Court lot",
  "All counseling rooms on the ground floor",
  "Accessible restroom with grab rails",
  "Hearing loop installed in the group room",
  "Fragrance-free policy throughout the building",
  "Seating with and without arms in every room",
  "No fluorescent tube lighting anywhere",
  "Dimmable lighting in the quiet room",
  "Two accessible parking spaces nearest the step-free door",
  "A quiet corner in the waiting area, away from the door",
];

export default function AccessibilityPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Accessibility" }]} />
      <PageHeader
        eyebrow="Support"
        title="Accessibility"
        lede="A counseling practice that is hard to reach is not a counseling practice for the people who most need one. This covers both the website and the building — and how to tell us when we have got something wrong."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl">This website</h2>
            <p className="ow-prose mt-3 text-ink-soft">
              Built to meet WCAG 2.2 Level AA. Where we fall short of that we would rather know
              than not.
            </p>
            <dl className="mt-8 space-y-6">
              {web.map((w) => (
                <div key={w.title}>
                  <dt className="flex items-center gap-2 font-display text-lg text-ink">
                    <Icon name="check" className="h-5 w-5 text-olive" />
                    {w.title}
                  </dt>
                  <dd className="ow-prose mt-1.5 pl-7 text-sm leading-relaxed text-ink-soft">
                    {w.body}
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-14 text-2xl sm:text-3xl">The building</h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {building.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                  {b}
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-2xl sm:text-3xl">Accommodations on request</h2>
            <p className="ow-prose mt-3 leading-relaxed text-ink-soft">
              Ask when you schedule. Interpreters including ASL, large-print or plain-language
              forms, a specific room, extra time, a support person in the session, a phone
              session instead of video, or a first appointment at the quietest hour of the day.
              Several items on the list above exist because a client told us they were missing.
            </p>
          </div>

          <aside className="space-y-6">
            <Callout title="Found a barrier?" icon="alert">
              Tell us and we will fix it. Call {site.phone} or email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline">{site.email}</a>.
              Describe what you were trying to do and what happened — you do not need to know
              the technical term for it.
            </Callout>

            <div className="ow-card p-6">
              <h3 className="text-lg">Known limitations</h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-ink-soft">
                <li className="flex gap-2.5">
                  <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  Room images are illustrations rather than photographs, so they convey layout
                  but not the real texture of a space.
                </li>
                <li className="flex gap-2.5">
                  <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  The location map is a stylised graphic, not an interactive map. Directions are
                  given in text alongside it and it links out to Google Maps.
                </li>
                <li className="flex gap-2.5">
                  <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  Interactive tools — the matcher, estimator and screeners — require JavaScript.
                  All the underlying information is also available in plain text elsewhere on
                  the site, and by phone.
                </li>
              </ul>
            </div>

            <div className="ow-card p-6">
              <h3 className="text-lg">Standards</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Target conformance: WCAG 2.2 Level AA. Tested with keyboard-only navigation,
                VoiceOver and NVDA, 400% zoom, and forced-colors mode.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
