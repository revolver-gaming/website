"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DemoOverlay } from "./DemoLauncher";
import type { Game } from "@/lib/cms";

function useCarousel(count: number) {
    const [active, setActive] = useState(0);
    const paused = useRef(false);
    const held = useRef(false); // demo overlay open
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            if (!paused.current && !held.current) setActive((a) => (a + 1) % count);
        }, 4200);
        return () => clearInterval(id);
    }, [count]);
    return { active, setActive, paused, held };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Readout({ games, active, onDemo }: {
    games: Game[]; active: number; onDemo: (g: Game) => void;
}) {
    const game = games[active];
    return (
        <div className="cylinder-readout" aria-live="polite">
            <span className="count">{pad(active + 1)} / {pad(games.length)} — IN THE CHAMBER</span>
            <h3>{game.title}</h3>
            <p className="tags">{game.tags.join(" · ")}</p>
            <div className="actions">
                {game.demo_url && (
                    <button className="btn btn-fire" onClick={() => onDemo(game)}>
                        Play demo
                    </button>
                )}
                <Link className="btn btn-ghost" href={`/game/${game.slug}`}>
                    Details
                </Link>
            </div>
        </div>
    );
}

/* ?hero=2 — full landscape banner in a chamber bezel + cartridge-tray switcher */
export function HeroMarquee({ games }: { games: Game[] }) {
    const shown = games.slice(0, 6);
    const { active, setActive, paused, held } = useCarousel(shown.length);
    const [demo, setDemo] = useState<Game | null>(null);
    held.current = demo !== null;
    return (
        <div
            className="marquee-stage"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
        >
            <div className="marquee-frame">
                {shown.map((g, i) => (
                    <img key={g.slug} src={g.image} alt={g.title}
                        className={i === active ? "armed" : undefined} />
                ))}
                {shown[active].year >= 2026 && <span className="new-flag">New</span>}
            </div>
            <div className="marquee-strip" aria-label="Featured games">
                {shown.map((g, i) => (
                    <button key={g.slug} className={i === active ? "armed" : undefined}
                        onClick={() => setActive(i)}
                        aria-label={`Show ${g.title}`} aria-pressed={i === active}>
                        <img src={g.image} alt="" />
                    </button>
                ))}
            </div>
            <Readout games={shown} active={active} onDemo={setDemo} />
            {demo?.demo_url && (
                <DemoOverlay url={demo.demo_url} title={demo.title} close={() => setDemo(null)} />
            )}
        </div>
    );
}

/* ?hero=3 — banners fanned like a held hand of cards; click one to draw it */
export function HeroFan({ games }: { games: Game[] }) {
    const shown = games.slice(0, 6);
    const n = shown.length;
    const { active, setActive, paused, held } = useCarousel(n);
    const [demo, setDemo] = useState<Game | null>(null);
    held.current = demo !== null;
    return (
        <div
            className="fan-stage"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
        >
            <div className="fan">
                {shown.map((g, i) => {
                    const k = (i - active + n) % n;
                    const s = k <= n / 2 ? k : k - n; // signed spread, 0 = front
                    return (
                        <button key={g.slug}
                            className={`fan-card${s === 0 ? " armed" : ""}`}
                            style={{
                                transform: `rotate(${s * 7}deg)`,
                                zIndex: n - Math.abs(s),
                                filter: s === 0 ? undefined : `brightness(${1 - Math.abs(s) * 0.18})`,
                            }}
                            onClick={() => setActive(i)}
                            aria-label={`Show ${g.title}`} aria-pressed={s === 0}>
                            <img src={g.image} alt={g.title} />
                            {s === 0 && g.year >= 2026 && <span className="new-flag">New</span>}
                        </button>
                    );
                })}
            </div>
            <Readout games={shown} active={active} onDemo={setDemo} />
            {demo?.demo_url && (
                <DemoOverlay url={demo.demo_url} title={demo.title} close={() => setDemo(null)} />
            )}
        </div>
    );
}
