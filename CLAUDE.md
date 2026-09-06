# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The new public website for **revolvergaming.com** (replacing the old WordPress site and the earlier wireframe at games.platforms.revolvergaming.com/website). Revolver Gaming is **both**:

- a **game studio** (RGS) — 31+ original HTML5 slots, real money / social / sweepstakes, UKGC licensed;
- a **gaming aggregation platform** (GAP) — many third-party provider studios and a large roster of casino operators.

**The mission of this site:** when a potential operator (a casino or a casino holding) sees it once, they should want Revolver in their portfolio. It must showcase our games, the GAP's capabilities and feature set, the speed and quality of our team and platform, and our scalability. The current features/capabilities content is thin — expanding it into something stunning is the active goal. When adding content or sections, always frame them for that operator audience: what we offer, how fast we integrate, how well we scale.

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # also the de-facto type check — run before committing
npm start
```

No test suite or linter is configured. `npm run build` is the verification step.

**Stack: Next.js on Vercel + Supabase.** Deploys go through Vercel (unlike the rest of the Revolver ecosystem, which is GCP Cloud Run) — pushes to `main` deploy to production. Keep the site compatible with Vercel's model: ISR/revalidation for freshness, no long-running servers or local file writes.

Supabase credentials come from `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`). The Supabase MCP server is connected for schema/data work.

## Architecture

Next.js 15 App Router + React 19, TypeScript, **plain CSS** — no Tailwind, no UI framework. All styles live in `app/globals.css` (~2000 lines). Only dependency beyond Next/React is `@supabase/supabase-js`.

Two route groups, two Supabase clients:

- **`app/(site)/`** — the public site, fully **server-rendered from Supabase** via `lib/cms.ts`. That module creates a client whose fetch is capped at `revalidate: 300` (5-min ISR), so CMS edits appear without redeploys. Everything is CMS-driven: games, news, jobs, generic pages, partner studios, operators, contact/socials/footer (the last three as JSON values in the `site_content` key/value table).
- **`app/admin/`** — a client-side CMS admin (CRUD for news, games, jobs, pages, settings). Uses its own browser client in `app/admin/lib.ts` (keeps the Supabase Auth session, no fetch caching). `AdminShell` gates everything behind Supabase email/password login; the layout sets `robots: noindex`. Media uploads go to the public `media` storage bucket via `uploadMedia`.

Supabase tables: `news`, `games`, `jobs`, `pages`, `partner_studios`, `operators`, `site_content`. Types in `lib/cms.ts` mirror them; DB columns are snake_case, sometimes aliased in selects (e.g. `image:card_image`, `knownFor:known_for`).

### URL compatibility with the old site (do not break)

- **Slugs must match the old WordPress URLs** — `/news/{slug}`, `/game/{slug}`, `/{slug}` for generic pages — so previously shared links keep resolving. `lib/slug.ts` has the canonical `slugify`.
- `next.config.ts` holds permanent redirects for old paths (`/media/pdf/*` → Supabase storage, `/about-us` → `/`, `/news-archived` → `/news`). Add new redirects there when retiring old URLs.
- `app/(site)/[slug]/page.tsx` is the catch-all for CMS "pages" (terms, privacy, etc.) — check it before adding a new static route that could collide.

## Site structure (pillars)

Ryan's brief (Sept 2026): the site is organised around product **pillars**, each with its own page, and must stay visual rather than text-heavy — game imagery, motion and backgrounds, only details an operator or studio would care about (no deep tech). The wireframe he supplied is the source of truth for section order and content shape.

| Pillar | Route | What it sells |
|--------|-------|---------------|
| Slots | `/games` (`/slots` redirects here) | Our original slots, licensable and brandable |
| Originals | `/originals` | Brandable casual originals (crash, dice, mines, plinko…), provably fair + RNG |
| RGS | `/rgs` | RGS licensing: **Independent** (run it yourself) or **Managed service** |
| Platform (GAP) | `/gap` | Labelled "Platform" everywhere user-facing — "GAP" means nothing to outsiders. Aggregation: studios in (RGS↔RGS, or Game→RGS where we host), operators out with one integration |
| Exclusives | `/exclusives` | Custom-built / branded games on our tech |
| News, Contact | `/news`, `/#contact` (no contact page; the nav button anchors to the homepage section) | Footer carries Careers, Terms, Privacy, Fairness, socials |

Pillar copy (titles, ledes, option cards, originals list, value props) lives in `lib/pillars.ts` and is shared by the nav, hero slides and pillar pages. **Homepage section copy is Ryan's, taken verbatim from the wireframe** — don't rewrite it; new sections need his words, not invented ones. Games, news, operators, partner studios, stats and contact stay CMS-driven. Homepage order follows the wireframe: hero (rotating pillar slides + banner deck) → operator ticker → value props ("Tech that fires on every cylinder") → about → slots (with New/Flagship/Branded/Seasonal filters) → originals → RGS (two options, engine room, operator roster) → GAP (flow, for studios, for operators, studio roster) → exclusives banner → news → contact.

Visual system helpers in `globals.css`: `.art-bg` (blurred game art behind a section, via `--art`), `.art-peek`, `.dots-bg`, `.rings-bg`, `[data-reveal]` (scroll-in via `components/Reveal.tsx`). Don't claim licences we don't hold (the wireframe's "MGA" was dropped) and never publish invented testimonials.

## Design language

Palette and voice come from the old site: velvet aubergine `#301630`, muzzle-flash amber `#ffa755`, bone cream `#f4f0e3`. Fonts via `next/font`: Big Shoulders (display), Instrument Sans (body), IBM Plex Mono (labels/eyebrows).

The hero visual is the **deck** (`components/HeroDeck.tsx`): the featured games' banners at their native 680×440 ratio, stacked and auto-advancing. (The earlier revolver-cylinder carousel was dropped: cropping the banner art into circular chambers didn't suit the thumbnails, and Ryan didn't like it.) The revolver metaphor runs through the copy — "Our arsenal", "Four chambers, one platform", "Last chamber" for CTAs. New sections should extend this metaphor and tone, not fight it.

Brand assets (logos, emblem) are in `public/brand/`; game art is served from Supabase storage.
