@AGENTS.md

# alderwood-counseling

Website for **Alderwood Counseling, a fictional practice** — a web design demonstration.
Real practice sites were studied for the brief; nothing identifying was carried across.
**Folder name `olivewood-site` is the old one**; the repo and site are `alderwood-counseling`.

## Rules

| Rule | Why |
|---|---|
| **Everything org-specific stays fictional** — practice, staff, address, phone, fax, email, hours, rates | The point of the de-identification pass. Never reintroduce a real practice's details |
| **Phones stay 555-01xx; email stays on a `.example` domain** | Reserved for fiction — can never reach a real person |
| **Crisis numbers stay REAL** (988, 610-782-3127, 610-252-9060) | Someone in distress must never hit a dead line because the rest is a demo |
| **Keep the crisis affordances** — safety bar, quick exit, PHQ-9 item-9 interstitial | Safety features, not decoration |
| **Never remove `<DemoBanner />` from `layout.tsx`** unless asked | Only thing telling a visitor the practice is invented. Removing for a screenshot is fine; committing that is not |
| **Never add analytics, tracking, embedded maps, third-party scripts** | The privacy page says there are none |
| **Interactive tools stay client-side only** | Matcher, estimator, screeners promise nothing leaves the browser |
| **Portrait marks stay generated** (`Avatar.tsx`) — never AI faces for named clinicians | An invented face attached to a name is a different claim than a placeholder room |
| **Reference `/public` through `asset()`** (`src/lib/asset.ts`), never bare `src="/..."` | `basePath` applies to `next/link`/`next/image` but NOT raw `<img>` — bare paths 404 on Pages while local dev looks fine. `scripts/check-asset-paths.mjs` fails the build |
| **No `setState` inside `useEffect`** — React Compiler lint errors | Use `useSyncExternalStore`, adjust-during-render, or CSS state (`Reveal`, `ThemeToggle`, `FaqSearch`) |
| **Static export only** — no server actions, route handlers, ISR, `next/image` optimization | Must build to plain files for Pages |
| **All content in `src/lib/data/`** — never hardcode a name, rate or number in a page | One edit propagates everywhere |
| **Mobile first** — 16px gutter, 44×44 touch targets, no horizontal scroll at 320px | Explicit user requirement |
| **Compress new images**: `magick f.jpg -strip -resize '1400x1400>' -interlace JPEG -quality 80 f.jpg` | Raw generations ~300 KB each; took the set from 2.4 MB to 592 KB |

## Commands

`npm run dev` · `npm run build` (→ `out/`) · `npm run lint`
**Stack:** Next.js 16 · React 19 · TS · Tailwind v4 · `output: "export"` · **Deploy:** Pages via `.github/workflows/deploy.yml` on push to `main`

## Where things are

```
src/app/            One folder per route; [slug] folders are generated
src/components/     UI; "use client" marks the interactive ones
src/lib/data/       All content, typed
src/lib/match.ts    Therapist scoring — weights fixed, each emits a sentence
src/lib/slots.ts    Deterministic appointment slots (swap for a real API)
src/lib/asset.ts    Base-path-aware /public resolver
scripts/            Build-time checks
```
