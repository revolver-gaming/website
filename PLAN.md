# Website Content Plan — making the platform story land

Goal: an operator (casino or holding) who sees this site once should want Revolver in their portfolio.
Today the site is games-first; the GAP story is one thin section (CH.03, ~12 words of bullets).
The codebase audit (Aug 2026) found dozens of real, citable capabilities that never made it to the site.

Sources: current site, old revolvergaming.com, colleague's wireframe (weak visually, good content
skeleton), and a full capability sweep of the `~/RevolverGaming` workspace.

---

## 1. Positioning fix (homepage)

Keep the cylinder + 6-chamber structure, but rebalance: today it reads "studio with a platform
attached". It should read "studio **and** platform, either one alone worth the meeting".

- **CH.03 Platform** becomes a teaser with real numbers + link to a new `/platform` page:
  16 operator wallet integrations · 22 launch integrations · 9 studios / 300+ games aggregated ·
  ~200 currencies (fiat / crypto / social) · 18 game languages · 10,000+ tx/min pipeline.
- Add a **proof ticker/stat strip** fed from `site_content` so numbers are CMS-editable.
- Add **"Book a demo"** as the primary nav CTA (wireframe had this right). Demo Area in the RGS
  backoffice can spin up disposable demo players — a demo is genuinely cheap for us to give.
- Segmented contact: Operator / Aggregator / Studio / Investor (mailto with subject prefill, or a
  form later).

## 2. New page: `/platform` (the GAP pitch — the main gap today)

One long, chaptered page (reuse CH.xx labels). Sections, each backed by live capability:

**Integrate once**
- One seamless-wallet API (auth / balance / debit / credit / debitAndCredit / rollback);
  standardized error codes across every operator dialect.
- New operator = config, not a project — templated integration playbook; adapters for
  BetConstruct, EveryMatrix, Pariplay, Relax, PlayTech, Digitain, Groove, Slotegrator, UP AGG, etc.
- Both directions: operators plug in, and studios reverse-integrate (Aviator-style).
- Documented, versioned API specs for both sides.

**Promotions engine**
- Free spins + **Flexible Free Spins** (any game, any bet, any count — no campaign setup).
- Free-spin API spoken in 10 operator-native dialects ("we speak your bonus API, not ours").
- Full award lifecycle, idempotent award IDs, wallet-neutral free rounds (never touch player funds).
- **4-tier progressive jackpots** per brand, visible + hidden pools (LIVE, RGS side).
- Roadmap (label clearly as coming): network jackpots pooling across operators; self-serve
  promotions backoffice; tournaments / cash races / missions ("engine-supported" phrasing only).

**Back office & reporting**
- Purpose-built dashboards: monthly report, MoM growth, game performance, launches, explorer.
- Embedded BI, tenant-scoped server-side — operators see only their own data.
- Transaction search over the warehouse (billions of rows) with one-click Excel export.
- Broken-rounds register: every incomplete round visible and actionable.
- Granular permissions (internal / operator / provider / brand / game / portfolio) + IP allow-listing.
- Round Replay (frame-by-frame dispute resolution) + player-facing game history in 15 locales.
- Everything the console does is also available over API.

**Reliability & fairness** (the trust chapter — nobody in the space shows this; we can)
- Self-healing: unfinished rounds settle themselves; failed operator notifications retry until they land.
- RNG re-tested against the full NIST suite every 12h; chi-square every 3 minutes; a game that
  fails takes itself offline automatically.
- Provably fair: players can set their own seed and verify any past round.
- We play our own games in production around the clock (synthetics) and alert before players notice.
- 10,000+ transactions/minute into the warehouse with zero-loss design; instant high-win alerts.
- Serverless autoscaling, WAF-protected, fully Terraform'd; 6 isolated environments including a
  dedicated **social/sweepstakes stack**; formal change- & incident-management policies.

**Reach**
- ~200 currencies incl. crypto and social coins; multi-source FX with daily audit snapshots;
  per-brand economics without new builds.
- 18 game languages; real money · social · sweepstakes; regulated + .com routes.

## 3. Studio story upgrades (games side)

- Game detail pages: surface RTP variants (90/92/94/96 per market), volatility, max win,
  bonus-buy editions, and the marketing-kit download (data already structured in RGS).
- New section/page: **branded & seasonal reskins** — "we'll reskin a proven title for your brand"
  (1XBET, Hollywood, McLuck, Xmas/Easter editions exist as proof).
- Production cadence + custom/bespoke development as a service (old site mentioned it, new one doesn't).
- "For studios" block: distribute through GAP with a single integration, either direction.

## 4. Trust & compliance page

- Licensing: **verify before publishing.** Old site claims UKGC (#000-039989-R-320008-001,
  Lazinco Technologies); the codebase only evidences MGA context and GLI / iTech Labs certification
  paths. Route the exact claims through compliance — do not copy the old site's badge blindly.
- Responsible gambling, policies on file, provably-fair explainer.

## 5. CMS & build notes

- All new copy/stats CMS-driven: extend `site_content` (jsonb) with keys like `platform_stats`,
  `platform_features`, or add a `capabilities` table; admin gets a matching section.
- Numbers from the audit are **staging snapshots (mid-2025)** — confirm against production before
  publishing any figure (operator count especially; 325 games / 185+ currencies are safer).
- Keep roadmap items visually distinct (e.g. "In the chamber" label — on-brand for "coming soon").

## 6. Phasing

1. ✅ **Copy & stats pass** (Aug 2026) — CH.03 rework + capability cards, richer ticker, CMS
   `platform_stats` strip, Book-a-demo CTA, segmented contact chips.
2. ✅ **`/platform` page** (Aug 2026) — five chapters from CMS `platform_page`, roadmap badges,
   nav/footer links, admin editor.
3. ✅ **Studio upgrades** (Aug 2026) — `games.rtp/volatility/layout` columns (auto-extracted from
   scraped features) + spec strip on game pages + admin fields; "Made to order" section on /games
   from CMS `studio_offer`.
4. **Trust page + polish** — partially done (Aug 2026): `/fairness` explainer page (copy in JSX,
   not CMS) and the animated wallet-flow on /platform (`components/WalletFlow.tsx`, includes a
   recovery-drill cycle). **Remaining: trust & compliance page — BLOCKED on licensing answer**
   (UKGC per old site vs MGA per codebase; confirm with compliance first). Optional: live-style
   dashboard mock.
