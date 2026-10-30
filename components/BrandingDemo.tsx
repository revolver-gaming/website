"use client";

import { useState } from "react";
import type { Original } from "@/lib/cms";
import { media } from "@/lib/media";

/* Live re-theme of an originals game, mirroring bet4.win/branding: a name, two colours,
   a typeface and a currency make one theme, and every game in the switcher wears it. */
const FONTS = {
    Condensed: "var(--font-d)",
    Serif: "Georgia, 'Times New Roman', serif",
    Rounded: "ui-rounded, 'Arial Rounded MT Bold', 'Trebuchet MS', sans-serif",
};
const CURRENCIES = ["EUR", "USD", "GBP", "BRL", "INR"];
const HEX = /^#[0-9a-f]{6}$/i;

// Dark or light text, whichever reads on the accent
const inkOn = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#111111" : "#ffffff";
};

const initials = (name: string) =>
    name.split(/\s+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "YB";

const KENO_PICKS = new Set([3, 7, 12, 18, 21, 26, 30, 35]);
const KENO_DRAWN = new Set([7, 9, 12, 15, 21, 24, 30, 33]);
const KENO_PAYS = [["1.5×", 3], ["4×", 4], ["10×", 5], ["50×", 6], ["200×", 7], ["1000×", 8]];
const GEMS = new Set([1, 7, 8, 13, 17, 21]);
const PLINKO_PAYS = [10, 3, 1.5, 1, 0.5, 1, 1.5, 3, 10];

const Keno = () => (
    <>
        <div className="bp-keno">
            {Array.from({ length: 40 }, (_, i) => {
                const n = i + 1;
                const state = KENO_PICKS.has(n) ? (KENO_DRAWN.has(n) ? "hit" : "pick") : KENO_DRAWN.has(n) ? "drawn" : undefined;
                return <span key={n} className={state}>{n}</span>;
            })}
        </div>
        <div className="bp-pays">
            {KENO_PAYS.map(([x, hits]) => <span key={hits}><b>{x}</b>{hits} hits</span>)}
        </div>
    </>
);

const Mines = () => (
    <div className="bp-mines">
        {Array.from({ length: 25 }, (_, i) => <span key={i} className={GEMS.has(i) ? "gem" : undefined} />)}
    </div>
);

const Plinko = () => (
    <>
        <svg className="bp-plinko" viewBox="0 0 180 120">
            {Array.from({ length: 8 }, (_, row) =>
                Array.from({ length: row + 3 }, (_, col) => (
                    <circle key={`${row}-${col}`} cx={90 + (col - (row + 2) / 2) * 18} cy={10 + row * 14} r="2.2" />
                )),
            )}
            <circle className="ball" cx="99" cy="66" r="4.5" />
        </svg>
        <div className="bp-buckets">
            {PLINKO_PAYS.map((x, i) => <span key={i} style={{ "--hot": `${Math.min(x, 10) * 9}%` } as React.CSSProperties}>{x}×</span>)}
        </div>
    </>
);

const Dice = () => (
    <div className="bp-dice">
        <b className="bp-big">52.81</b>
        <div className="bp-track"><i style={{ left: "52.81%" }} /></div>
        <div className="bp-stats">
            <span>Multiplier<b>1.98×</b></span>
            <span>Roll over<b>50.50</b></span>
            <span>Win chance<b>49.50%</b></span>
        </div>
    </div>
);

const Crash = () => (
    <div className="bp-crash">
        <svg viewBox="0 0 200 110" preserveAspectRatio="none">
            <path className="area" d="M0 110 Q120 105 200 10 L200 110 Z" />
            <path className="line" d="M0 110 Q120 105 200 10" />
        </svg>
        <b className="bp-big">2.47×</b>
    </div>
);

const Wheel = () => (
    <div className="bp-wheel">
        <div className="disc"><b>2.00×</b></div>
    </div>
);

const STAGES: Record<string, () => React.ReactElement> = { keno: Keno, mines: Mines, plinko: Plinko, dice: Dice, crash: Crash, wheel: Wheel };

function ColorField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (hex: string) => void }) {
    const [draft, setDraft] = useState(value);
    return (
        <div className="brand-field">
            <label htmlFor={id}>{label}</label>
            <div className="brand-color">
                <input type="color" aria-label={`${label} picker`} value={value} onChange={(e) => { setDraft(e.target.value); onChange(e.target.value); }} />
                <input
                    id={id}
                    value={draft}
                    maxLength={7}
                    spellCheck={false}
                    onChange={(e) => { setDraft(e.target.value); if (HEX.test(e.target.value)) onChange(e.target.value); }}
                />
            </div>
        </div>
    );
}

export default function BrandingDemo({ items }: { items: Original[] }) {
    const games = Object.keys(STAGES)
        .map((slug) => items.find((o) => o.slug === slug && o.card_image))
        .filter((o): o is Original => !!o);
    const [game, setGame] = useState(games[0]?.slug ?? "keno");
    const [brand, setBrand] = useState("Rose Royale");
    const [accent, setAccent] = useState("#ff5c8a");
    const [surface, setSurface] = useState("#3b1a46");
    const [font, setFont] = useState<keyof typeof FONTS>("Condensed");
    const [currency, setCurrency] = useState("EUR");
    const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency });
    const Stage = STAGES[game];
    const style = {
        "--b-accent": accent, "--b-surface": surface, "--b-ink": inkOn(accent), "--b-font": FONTS[font],
    } as React.CSSProperties;

    return (
        <div className="brand-demo" data-reveal>
            <div className="brand-studio">
                <div className="brand-preview" style={style} aria-label={`${game} preview branded as ${brand || "your brand"}`}>
                    <div className="bp-bar">
                        <div className="bp-logo">
                            <span>{initials(brand)}</span>
                            <b>{brand || "Your brand"}</b>
                        </div>
                        <span className="bp-balance">{money(1000)}</span>
                    </div>
                    <div className="bp-stage" aria-hidden><Stage /></div>
                    <div className="bp-controls" aria-hidden>
                        <span className="bp-bet">{money(10)}</span>
                        <span>½</span>
                        <span>2×</span>
                        <span className="bp-play">Bet</span>
                    </div>
                </div>

                <aside className="brand-controls" aria-labelledby="theme-heading">
                    <h3 id="theme-heading">Your theme</h3>
                    <p className="brand-note">
                        This is a very simplified preview of the branding approach. The completed branding
                        reaches much further to include the brand logo, backgrounds and in-game art.
                    </p>
                    <div className="brand-field">
                        <label htmlFor="brand-name">Brand name</label>
                        <input id="brand-name" value={brand} maxLength={18} placeholder="Your brand" onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div className="brand-pair">
                        <ColorField id="brand-accent" label="Accent" value={accent} onChange={setAccent} />
                        <ColorField id="brand-surface" label="Surface" value={surface} onChange={setSurface} />
                    </div>
                    <div className="brand-field" role="group" aria-labelledby="brand-type">
                        <span id="brand-type">Typeface</span>
                        <div className="brand-chips">
                            {(Object.keys(FONTS) as (keyof typeof FONTS)[]).map((f) => (
                                <button key={f} type="button" aria-pressed={f === font} onClick={() => setFont(f)} style={{ fontFamily: FONTS[f] }}>{f}</button>
                            ))}
                        </div>
                    </div>
                    <div className="brand-field">
                        <label htmlFor="brand-currency">Currency</label>
                        <select id="brand-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <p className="brand-note">
                        Live, it arrives with the game launch as your brand&apos;s theme, so one change reaches
                        every title at once.
                    </p>
                </aside>
            </div>

            {games.length > 1 && (
                <div className="brand-switch">
                    <p>The same theme on other games. Pick one to preview it:</p>
                    <div role="group" aria-label="Preview game">
                        {games.map((o) => (
                            <button key={o.slug} type="button" aria-pressed={o.slug === game} onClick={() => setGame(o.slug)}>
                                <img src={media(o.card_image, 256)} alt="" loading="lazy" />
                                <span>{o.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
