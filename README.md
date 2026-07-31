# Revolver Gaming — Website (new UI)

New frontend for revolvergaming.com. Next.js 15 (App Router) + React 19, TypeScript, plain CSS — no UI framework.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Design

Palette and content come from the old site: velvet aubergine (`#301630`), muzzle-flash amber (`#ffa755`), bone cream (`#f4f0e3`). Type: Big Shoulders (display) / Instrument Sans (body) / IBM Plex Mono (labels), loaded via `next/font`.

Signature element: the **cylinder** — a revolver-chamber carousel in the hero holding the six newest games. Six chambers also structure the homepage (CH.01–CH.06 section labels).

## Structure

- `app/page.tsx` — homepage (hero, games, platform, partners, news, contact)
- `app/games/` — full catalog with filters (originals / partner studios) and search
- `components/` — Nav, Footer, Cylinder (signature hero), GameCard
- `lib/data.ts` — all content (games, partner studios, operators, news, contact)
- `public/games/` — game artwork pulled from the old site

## CMS (next step)

`lib/data.ts` types mirror the planned Supabase tables (`games`, `providers`, `operators`, `news`). Swapping the static arrays for Supabase queries is a drop-in change — no component changes needed.
