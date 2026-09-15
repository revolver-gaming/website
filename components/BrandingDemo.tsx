"use client";

import { useState } from "react";
import type { Original } from "@/lib/cms";

/* Live re-skin of a mock originals lobby: one palette change lands on every
   surface, so operators can picture the product under their own brand. */
const THEMES = [
    { name: "Ember", bg: "#1c0f0a", surface: "#2d1a11", text: "#fff3e8", accent: "#ff7a1a" },
    { name: "Jade", bg: "#07171a", surface: "#10272c", text: "#e8fff8", accent: "#2fd6a4" },
    { name: "Royal", bg: "#0e0d26", surface: "#1a193d", text: "#efecff", accent: "#9483ff" },
    { name: "Gold", bg: "#15120a", surface: "#261f10", text: "#fff8e3", accent: "#e8b923" },
];

const GEMS = new Set([1, 7, 8, 13, 17, 21]);

export default function BrandingDemo({ items }: { items: Original[] }) {
    const [theme, setTheme] = useState(THEMES[0]);
    const [accent, setAccent] = useState(theme.accent);
    const [brand, setBrand] = useState("Your Casino");
    const tiles = items.filter((o) => o.card_image && !o.coming_soon).slice(0, 6);
    const style = {
        "--b-bg": theme.bg, "--b-surface": theme.surface, "--b-text": theme.text, "--b-accent": accent,
    } as React.CSSProperties;

    return (
        <div className="brand-demo" data-reveal>
            <div className="brand-controls">
                <p className="eyebrow">Try it</p>
                <div className="brand-swatches" role="group" aria-label="Palette">
                    {THEMES.map((t) => (
                        <button
                            key={t.name}
                            aria-pressed={t === theme}
                            onClick={() => { setTheme(t); setAccent(t.accent); }}
                            style={{ "--sw": t.accent, "--sw-bg": t.bg } as React.CSSProperties}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>
                <label>
                    Your brand colour
                    <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} />
                </label>
                <label>
                    Your casino name
                    <input value={brand} maxLength={18} onChange={(e) => setBrand(e.target.value)} />
                </label>
                <p className="brand-note">
                    Palette, logo and naming are set once and carried across every original in the lobby.
                </p>
            </div>

            <div className="brand-preview" style={style} aria-label={`Originals lobby branded as ${brand || "your casino"}`}>
                <div className="bp-bar">
                    <b>{brand || "Your Casino"}</b>
                    <span>Balance <em>1,000.00</em></span>
                </div>
                <div className="bp-main">
                    <div className="bp-game" aria-hidden>
                        <div className="bp-head"><span>Mines</span><span>3 mines</span></div>
                        <div className="bp-grid">
                            {Array.from({ length: 25 }, (_, i) => <span key={i} className={GEMS.has(i) ? "gem" : undefined} />)}
                        </div>
                        <div className="bp-controls">
                            <span className="bp-bet">Bet 1.00</span>
                            <span>½</span>
                            <span>2×</span>
                            <span className="bp-play">Cash out 2.47×</span>
                        </div>
                    </div>
                    <div className="bp-lobby">
                        {tiles.map((o) => (
                            <figure key={o.slug}>
                                <img src={o.card_image!} alt="" loading="lazy" />
                                <figcaption>{o.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
