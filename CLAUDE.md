@AGENTS.md

# alderwood-counseling

A complete website for **Alderwood Counseling, a fictional practice** — built as a web
design demonstration. Real practice websites were studied for the brief; nothing
identifying was carried across.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · static export (`output: "export"`)
**Deploy:** GitHub Pages via `.github/workflows/deploy.yml` on push to `main`
**Commands:** `npm run dev` · `npm run build` (→ `out/`) · `npm run lint`

## Rules for this project

| Rule | Why |
|---|---|
| **Everything org-specific stays fictional** — practice name, staff names, address, phone, fax, email, hours, rates | The whole point of the de-identification pass. Never reintroduce a real practice's details |
| **Phone numbers stay in the 555-01xx range; email stays on a `.example` domain** | Reserved for fiction — they can never reach a real person |
| **Crisis numbers stay REAL** (988, 610-782-3127, 610-252-9060) | Someone in distress must never be sent to a dead line because the rest of the page is a demo |
| **All content lives in `src/lib/data/`** — never hardcode a name, rate or number into a page | One edit propagates everywhere |
| **Reference `/public` through `asset()`** (`src/lib/asset.ts`) — never a bare `src="/..."` | Next applies `basePath` to `next/link` and `next/image` but NOT to raw `<img>`; bare paths 404 on a Pages project site while links still work, so local dev looks fine. `scripts/check-asset-paths.mjs` fails the build on this |
| **Static export only** — no server actions, route handlers, ISR, or `next/image` optimization | It has to build to plain files for Pages |
| **Mobile first.** 16px gutter, 44×44 touch targets, no horizontal scroll at 320px | Explicit user requirement |
| **No `setState` inside `useEffect`** — the React Compiler lint rule errors | Use `useSyncExternalStore`, adjust-during-render, or CSS state (`Reveal`, `ThemeToggle`, `FaqSearch`) |
| **Never add analytics, tracking, embedded maps or third-party scripts** | The privacy page states there are none; that claim must stay true |
| **Interactive tools stay client-side only** | The matcher, estimator and screeners promise nothing leaves the browser |
| **Never remove `<DemoBanner />` from `layout.tsx`** without being asked | It is the only thing telling a visitor the practice is invented. Removing it for a screenshot is fine; committing that is not |
| **Keep the crisis affordances** — safety bar, quick exit, PHQ-9 item-9 interstitial | Safety features, not decoration |
| **Portrait marks stay generated** (`Avatar.tsx`) — never AI faces for named clinicians | An invented room is a placeholder; an invented face attached to a name is a different claim |
| **Compress any new image**: `magick f.jpg -strip -resize '1400x1400>' -interlace JPEG -quality 80 f.jpg` | Raw generations are ~300 KB each; this took the set from 2.4 MB to 592 KB |

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

> **Folder name is the old one.** The directory is still `olivewood-site` from before the
> de-identification pass; the GitHub repo and the site are `alderwood-counseling`.
