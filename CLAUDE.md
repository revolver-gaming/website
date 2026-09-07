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

Pillar copy (titles, ledes, option cards, originals list, value props) lives in `lib/pillars.ts` and is shared by the nav, hero slides and pillar pages. **Homepage section copy is Ryan's, taken verbatim from the wireframe** — don't rewrite it; new sections need his words, not invented ones. Games, news, operators, partner studios, stats and contact stay CMS-driven. Homepage order follows the wireframe: hero (rotating pillar slides + banner deck) → operator band → value props ("Tech that fires on every cylinder") → about → slots (with New/Flagship/Branded/Seasonal filters) → originals → RGS (two options, engine room, operator roster) → GAP (flow, for studios, for operators, studio roster) → exclusives banner → news → contact.

Scroll-in motion comes from `[data-reveal]` (`components/Reveal.tsx`); there are no decorative backgrounds in this design. Don't claim licences we don't hold (the wireframe's "MGA" was dropped) and never publish invented testimonials.

## Design language

The "hybrid" editorial template (Sep 2026, from a Claude Design export): deep plum `#24102b` base with cream `#f5f1ea` sections, a single orange accent `#f5923e` (`#c4581c` on cream), Manrope for everything (800-weight headings, not uppercase) and IBM Plex Mono for eyebrows. Hairline borders, 6px radii, no shadows, gradients or decorative backgrounds.

The layout signature is a 260px mono label column beside every block of content: `LabelRow` / `.lc` for labelled rows, `.indent` (or `.shell.indent`) for content that should line up under them, `SectionHead` for section openers, `PageHero` for subpage openers, `CtaBlock` for the "Last chamber" closer. `globals.css` is built on context tokens (`:root` dark, `.on-bone` cream) — components read `--bg/--card/--fg/--fg-muted/--em/--line/--ghost` and never branch on the section they sit in; extend with tokens, not `.on-bone .x` overrides. Table-style grids (`.tgrid`) have cells that draw their own hairline so a partial last row stays clean.

The hero is the featured deck (`components/HeroDeck.tsx`): one banner at its native 680×440 ratio, a readout underneath, and the rest queued as thumbnails, auto-advancing. Overlays (demo iframe, screenshot lightbox) are portalled to `<body>` so they sit above the sticky nav. Don't put `data-reveal` on items of a filterable list — re-mounted items would stay invisible — put it on the wrapper. The revolver metaphor runs through the copy — "Our arsenal", "Latest from the barrel", "Last chamber" for CTAs. New sections should extend this metaphor and tone, not fight it.

Brand assets (logos, emblem) are in `public/brand/`; game art is served from Supabase storage.
