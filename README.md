# Revolver Gaming — Website (new UI)

New frontend for revolvergaming.com. Next.js 15 (App Router) + React 19, TypeScript, plain CSS — no UI framework.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Design

"White" design system: warm paper (`#faf8f4`) and sand (`#f0ebe4`) sections, ink (`#261028`) for text and the closing dark chambers, plum (`#5a2a60`) italic accents, amber (`#ff9a3d`) reserved for CTAs. Squared, flat, hairline-separated. Type: Archivo (display) / Figtree (body), loaded via `next/font`. Colour is handled with context tokens in `app/globals.css` (`:root`, `.on-bone`, `.on-ink`).

Signature element: the **deck** — the featured games' banners at their native ratio in the hero, one in front and the next three queued beneath it, auto-advancing.

## Structure

- `app/page.tsx` — homepage (hero, games, platform, partners, news, contact)
- `app/games/` — full catalog with filters (originals / partner studios) and search
- `components/` — Nav, Footer, Cylinder (signature hero), GameCard
- `lib/data.ts` — all content (games, partner studios, operators, news, contact)
- `public/games/` — game artwork pulled from the old site

## CMS (next step)

`lib/data.ts` types mirror the planned Supabase tables (`games`, `providers`, `operators`, `news`). Swapping the static arrays for Supabase queries is a drop-in change — no component changes needed.
