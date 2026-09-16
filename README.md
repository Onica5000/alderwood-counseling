# Alderwood Counseling — a counseling practice website, built end to end

A complete, working website for a **fictional** counseling practice: 48 prerendered
pages with a therapist matcher, a booking flow, a fee estimator, clinical screeners and
a full crisis-safety layer.

> **Alderwood Counseling does not exist.** The practice, its ten staff members and their
> biographies, degrees and certifications, the address, the phone and fax numbers, office
> hours, session fees, insurance figures, appointment availability, group seat counts,
> the testimonials and every photograph are all invented. Nothing here can be booked and
> no one here can be called.
>
> The phone numbers use the 555-01xx range reserved for fiction, and the email uses the
> `.example` TLD reserved by RFC 2606, so neither can ever reach a real person. The crisis
> numbers (988 and the two county lines) are **real and correct** — deliberately, because
> no one should be sent to a dead line by a demo.

The design brief came from studying a real practice's website — a 2015-era Squarespace
site — to understand what this kind of site has to do. No identifying detail from it
appears here.

---

## What it demonstrates

| | Typical small-practice site | This build |
|---|---|---|
| Pages | ~10 flat pages | 48 prerendered routes |
| Find the right clinician | Read every bio | Six-question matcher that ranks the roster and shows its reasoning, for and against |
| Book | A phone number | Clinician → live slot grid → details → confirmation |
| Cost | Not mentioned | Estimator across 10 plans and 6 session types, with the arithmetic shown |
| Crisis support | A line in the FAQ | Persistent crisis bar, quick exit, safety interstitial on the screeners |
| Self-assessment | — | PHQ-9 and GAD-7, scored in-browser |
| Search | — | Staff, FAQ and resource library all filterable |
| Dark mode | — | Yes, no flash |
| Accessibility | Not addressed | WCAG 2.2 AA target, documented on `/accessibility` |

### Pages

Home · Mission · Founders · Clinicians (+ a page each) · Facility · Services (+ a page
each) · Groups & Workshops · Find a Therapist · Request an Appointment · Your First
Visit · Fees & Insurance · Self-Check · Resource Library · FAQ · Testimonials · News
(+ a page each) · Contact · Accessibility · Privacy & HIPAA · 404

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
npm run lint
```

Next.js 16 · React 19 · TypeScript · Tailwind v4 · static export, no server required.

---

## Publishing

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to
`main`. Enable it once at **Settings → Pages → Source: GitHub Actions**.

The workflow takes the base path from `actions/configure-pages`, so it works unchanged
as a project site or on a custom domain. To reproduce a project-site build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/<repo> NEXT_PUBLIC_SITE_URL=https://<user>.github.io/<repo> npm run build
```

The site sets `noindex` throughout and ships a `robots.txt` disallow. It is a
demonstration, not something that should be competing in search results.

---

## Structure

```
src/
  app/                    Routes. One folder per page, [slug] for generated ones.
  components/             UI. Client components are marked "use client".
  lib/
    data/                 All content as typed records — staff, services, faq,
                          testimonials, news, fees, programs, screeners, rooms, site.
    match.ts              Therapist matching and scoring.
    slots.ts              Appointment slot generation.
    asset.ts              Resolves /public paths against the deployment base path.
scripts/
  check-asset-paths.mjs   Fails the build if an asset reference would 404 under a base path.
```

Content and presentation are kept apart: every page reads from `lib/data/`, so changing
a bio, a rate or a phone extension is a one-line edit that propagates everywhere.

### Things worth looking at

- **`lib/match.ts`** — the matcher's scoring. Weights are fixed and every contribution
  produces a sentence, so the results page explains itself instead of printing a number.
  Age is a hard constraint; concern weighting is capped so a long checklist cannot
  brute-force a match.
- **`components/Screener.tsx`** — PHQ-9 item 9 surfaces crisis resources the moment it is
  answered non-zero, before submission and regardless of the total.
- **`components/SafetyBar.tsx`** — quick exit: buries the page in history, then redirects.
  Also bound to three Escape presses.
- **`lib/data/fees.ts`** — `estimate()` returns the number *and* the plain-language
  explanation of how it got there, including an unmet deductible.
- **`components/Avatar.tsx`** — deterministic generated portrait marks. Staff are never
  shown as AI-generated faces.

### Privacy properties

The matcher, estimator and screeners run entirely client-side. Nothing is transmitted,
stored or logged. No analytics, no third-party scripts, no ad pixels, no embedded map.
The only browser storage used is the theme preference.

---

## Imagery

The eight interior and exterior photographs in `public/rooms/` were generated with xAI's
`grok-imagine-image` and depict no real place. They are optimized to 592 KB in total.

Staff portraits are deliberately **not** generated this way — they are abstract marks
from `Avatar.tsx`. A plausible invented room is a placeholder; a plausible invented face
attached to a named clinician is a different kind of claim.

To swap in real photography: drop a file into `public/rooms/`, point the matching record
in `src/lib/data/rooms.ts` at it via `image`, and reference it through `asset()`.
Removing the `image` field falls back to the generated SVG interiors in `RoomGallery.tsx`.
