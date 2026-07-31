"use client";

import { useEffect, useRef, useState } from "react";
import type { Game } from "@/lib/cms";

const STEP = 60; // six chambers

export default function Cylinder({ games }: { games: Game[] }) {
    const [active, setActive] = useState(0);
    const [turns, setTurns] = useState(0); // cumulative so the ring never unwinds
    const paused = useRef(false);

    const fire = (i: number) => {
        setTurns((t) => {
            const delta = ((i - active) % 6 + 9) % 6 - 3; // shortest path, -3..2
            return t + (delta === -3 ? 3 : delta);
        });
        setActive(i);
    };

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            if (!paused.current) {
                setActive((a) => (a + 1) % 6);
                setTurns((t) => t + 1);
            }
        }, 4200);
        return () => clearInterval(id);
    }, []);

    const game = games[active];

    return (
        <div
            className="cylinder-stage"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
        >
            <div className="cylinder">
                <div className="cylinder-pin" />
                <div
                    className="cylinder-ring"
                    style={{ transform: `rotate(${-turns * STEP}deg)` }}
                >
                    {games.slice(0, 6).map((g, i) => (
                        <div
                            key={g.slug}
                            className="slot-arm"
                            style={{ transform: `rotate(${i * STEP}deg) translateY(calc(var(--r) * -1))` }}
                        >
                            <button
                                className={`slot${i === active ? " armed" : ""}`}
                                style={{ transform: `rotate(${(turns * STEP) - i * STEP}deg)` }}
                                onClick={() => fire(i)}
                                aria-label={`Show ${g.title}`}
                                aria-pressed={i === active}
                            >
                                <img src={g.image} alt={g.title} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="cylinder-hub">
                    <img src="/brand/revolver-icon.png" alt="" />
                </div>
            </div>

            <div className="cylinder-readout" aria-live="polite">
                <span className="count">CH.{String(active + 1).padStart(2, "0")} / 06 — IN THE CHAMBER</span>
                <h3>{game.title}</h3>
                <p className="tags">{game.tags.join(" · ")}</p>
                <div className="actions">
                    <a className="btn btn-fire" href={`https://revolvergaming.com/game/${game.slug}/`}>
                        Play demo
                    </a>
                    <a className="btn btn-ghost" href={`https://revolvergaming.com/game/${game.slug}/`}>
                        Details
                    </a>
                </div>
            </div>
        </div>
    );
}

export function HeroBackdrop({ games }: { games: Game[] }) {
    // ambient blurred art behind the hero, synced loosely to the cylinder pace
    const [i, setI] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setI((v) => (v + 1) % 6), 4200);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="hero-bg" aria-hidden>
            {games.slice(0, 6).map((g, k) => (
                <img key={g.slug} src={g.image} alt="" className={k === i ? "live" : ""} />
            ))}
        </div>
    );
}
