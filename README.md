# Olivewood Counseling — website redesign concept

A complete, working redesign of [olivewoodcounseling.com](https://www.olivewoodcounseling.com/),
built as a demonstration for the Olivewood team.

> **This is a concept build, not the live site.** It carries Olivewood's real name,
> address and clinician names so the team can judge it as their own site. Everything
> else — extended biographies, credentials, rates, insurance figures, seat counts,
> appointment slots, several staff members and several news posts — is **invented** to
> fill out the design. Nothing here has been verified with the practice and no number
> on it should be quoted to anyone.
>
> **The photographs are AI-generated and are not Olivewood's rooms or building.**
> They are placeholders showing the intended feel. Replace them before this is ever
> shown to the public. See [Fictional content](#fictional-content).

---

## What it is

The original is a 2015-era Squarespace site: ten pages of flat text, no interactivity,
no booking, no search, no cost information, and no accessibility affordances. This
rebuild keeps every page and nearly all of the original copy, then adds the things a
counseling practice website is actually asked for.

| | Original | This build |
|---|---|---|
| Pages | 10 | 48 prerendered routes |
| Find the right clinician | Read 8 bios | Six-question matcher that ranks the roster and shows its reasoning, for and against |
| Book | Phone number only | Clinician → live slot grid → details → confirmation |
| Cost | Not mentioned | Estimator across 10 plans and 6 session types, with the arithmetic shown |
| Crisis support | One FAQ line | Persistent crisis bar, quick exit, safety interstitial on the screeners |
| Self-assessment | — | PHQ-9 and GAD-7, scored in-browser |
| Search | — | Staff, FAQ and resource library all filterable |
| Dark mode | — | Yes, no flash |
| Photography | 9 interior shots | 8 generated placeholders, optimized to 592 KB total |
| Accessibility | Not addressed | WCAG 2.2 AA target, documented on `/accessibility` |

### Pages

**From the original:** Home · Mission · Founders · Staff · Facility · Services · FAQ ·
Testimonials · News · Contact

**Added:** Find a Therapist · Request an Appointment · Your First Visit · Fees &
Insurance · Self-Check · Groups & Workshops · Resource Library · Accessibility ·
Privacy & HIPAA · per-clinician profiles · per-service pages · per-post pages · 404

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

## Publishing to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`. The workflow builds the static export and deploys it.

The workflow reads the base path from `actions/configure-pages`, so it works unchanged
whether you publish to `user.github.io/olivewood-site` (a project site) or to a custom
domain. To build a project-site bundle locally, set the base path yourself:

```bash
NEXT_PUBLIC_BASE_PATH=/olivewood-site npm run build
```

For a private preview, make the repo private and use a Pages visibility setting your
plan supports, or share the `out/` directory directly — it is a plain static site and
opens from any web server.

---

## Structure

```
src/
  app/                    Routes. One folder per page, [slug] for generated ones.
  components/             UI. Client components are marked "use client".
  lib/
    data/                 All content lives here as typed records —
                          staff, services, faq, testimonials, news, fees,
                          programs, screeners, rooms, site.
    match.ts              Therapist matching and scoring.
    slots.ts              Appointment slot generation.
```

Content and presentation are kept apart deliberately: every page reads from
`lib/data/`, so correcting a bio, a rate or a phone extension is a one-line edit that
propagates to every page that mentions it.

### Things worth looking at

- **`lib/match.ts`** — the matcher's scoring. Weights are fixed and each contribution
  produces a sentence, so the results page can explain itself rather than show a number.
- **`components/SafetyBar.tsx`** — quick exit: buries the page in history and
  redirects. Also bound to three Escape presses.
- **`components/Screener.tsx`** — PHQ-9 item 9 surfaces crisis resources the moment
  it is answered, not after submission.
- **`components/Avatar.tsx`** — deterministic generated portrait marks, so no card
  ever shows a face that is not the person named beside it.
- **`lib/data/fees.ts`** — `estimate()` returns the number *and* the plain-language
  explanation of how it got there.

### Privacy properties

The matcher, estimator and screeners run entirely client-side. Nothing is transmitted,
stored or logged. There are no analytics, no third-party scripts, no ad pixels and no
embedded map. The only browser storage used is the theme preference.

---

## Fictional content

Real, from the original site: the practice name, address, phone number, tagline,
mission statement, founding story and date, service descriptions, therapeutic
modalities, FAQ substance, testimonials, and the names and specialties of Sue Dietrich,
Becky Richendollar, Amy Esch, John Weaver, Marie Schneller, Rachel Heckler, Megan
Flechsig and Leslie Habecker.

**Invented for the demo:** all extended biographies · all degrees, schools, years and
certifications · phone extensions · fax and email · office hours · availability
statuses and appointment slots · Daniel Okafor and Priya Raman · all rates, CPT codes
and insurance figures · group schedules and seat counts · resource library contents ·
three of the six news posts · room descriptions and access notes · quotations
attributed to staff.

**The images too.** Every photograph in `public/rooms/` was generated with xAI's
`grok-imagine-image`. They depict no real place — not the interior, and not the
building at 510 Delaware Avenue. They are there to show the intended tone, and they
are the first thing that should be swapped for real photography.

To replace them: drop a file into `public/rooms/` and point the matching record in
`src/lib/data/rooms.ts` at it via its `image` field. Removing the field falls the
gallery back to the generated SVG interiors, which are still in `RoomGallery.tsx`.

Crisis numbers (988, 610-782-3127, 610-252-9060) are real and correct.

---

## Attribution

Original site content © Olivewood Counseling. This redesign was produced with Claude
Code as a demonstration, and is offered to the practice for its own use.
