@AGENTS.md

# olivewood-site

Redesign concept for [olivewoodcounseling.com](https://www.olivewoodcounseling.com/),
built to show the Olivewood team what their site could be. **Not the live site.**

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · static export (`output: "export"`)
**Deploy:** GitHub Pages via `.github/workflows/deploy.yml` on push to `main`
**Commands:** `npm run dev` · `npm run build` (→ `out/`) · `npm run lint`

## Rules for this project

| Rule | Why |
|---|---|
| **All content lives in `src/lib/data/`** — never hardcode a name, rate or phone number into a page | One edit propagates everywhere that mentions it |
| **Static export only** — no server actions, route handlers, ISR, or `next/image` optimization | It has to build to plain files for Pages |
| **Mobile first.** 16px gutter, 44×44 touch targets, no horizontal scroll at 320px | The user asked for this explicitly |
| **No `setState` inside `useEffect`** — the React Compiler lint rule is on and errors | Use `useSyncExternalStore`, adjust-during-render, or CSS state (see `Reveal`, `ThemeToggle`, `FaqSearch`) |
| **Never add analytics, tracking, embedded maps or third-party scripts** | The privacy page states there are none; that claim must stay true |
| **Interactive tools stay client-side only** | The matcher, estimator and screeners promise nothing leaves the browser |
| **Never remove `<DemoBanner />` from `layout.tsx`** without being asked | It is the only thing telling a stranger this is not the practice's real site. Removing it for an internal screenshot is fine; committing that removal is not |
| **Keep the crisis affordances** — safety bar, quick exit, PHQ-9 item-9 interstitial | Safety features, not decoration |
| **Portrait marks stay generated** (`Avatar.tsx`) unless real headshots are supplied | Never show a face that is not the person named beside it |
| **Room photos are AI-generated placeholders**, not Olivewood's rooms — keep that disclosed in the README | They are convincing enough to be mistaken for the real building |
| **Reference /public through `asset()`** (`src/lib/asset.ts`) — never a bare `src="/..."` | Next applies `basePath` to `next/link` and `next/image` but NOT to raw `<img>`; bare paths 404 on the Pages project site while links still work, so local dev looks fine. `scripts/check-asset-paths.mjs` fails the build on this |
| **Compress any new image**: `magick f.jpg -strip -resize '1400x1400>' -interlace JPEG -quality 80 f.jpg` | Raw generations are ~300 KB each; this cut the set from 2.4 MB to 592 KB |

## Fictional vs. real

Real branding, real staff names, real crisis numbers. **Everything else is invented** —
bios, credentials, rates, insurance figures, hours, extensions, seat counts, two staff
members, three news posts. The README has the full breakdown. Keep that section current
if you add content; it is the thing that stops this being mistaken for the real site.

## Where things are

```
src/app/            One folder per route; [slug] folders are generated
src/components/     UI; "use client" marks the interactive ones
src/lib/data/       All content, typed
src/lib/match.ts    Therapist scoring — weights are fixed and each emits a sentence
src/lib/slots.ts    Deterministic appointment slots (swap for a real API)
```
