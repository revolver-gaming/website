"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DemoOverlay } from "./DemoLauncher";
import type { Game } from "@/lib/cms";

/* A stack of game banners at their native ratio. The front card advances
   every few seconds; the rest fan back behind it. */
export default function HeroDeck({ games }: { games: Game[] }) {
    const [active, setActive] = useState(0);
    const [demo, setDemo] = useState<Game | null>(null);
    const paused = useRef(false);
    const demoOpen = useRef(false);
    demoOpen.current = demo !== null;
    const n = games.length;

    useEffect(() => {
        if (n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            if (!paused.current && !demoOpen.current) setActive((a) => (a + 1) % n);
        }, 4500);
        return () => clearInterval(id);
    }, [n]);

    const game = games[active];
    if (!game) return null;

    return (
        <div
            className="deck-stage"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
        >
            <div className="deck">
                {games.map((g, i) => (
                    <button
                        key={g.slug}
                        className="deck-card"
                        data-pos={Math.min((i - active + n) % n, 3)}
                        onClick={() => setActive(i)}
                        aria-label={`Show ${g.title}`}
                        aria-pressed={i === active}
                        tabIndex={i === active ? -1 : 0}
                    >
                        <img src={g.image} alt={g.title} loading={i === 0 ? "eager" : "lazy"} />
                    </button>
                ))}
            </div>

            <div className="deck-readout" aria-live="polite">
                <h3>{game.title}</h3>
                <div className="actions">
                    {game.demo_url && (
                        <button className="btn btn-ghost" onClick={() => setDemo(game)}>Play demo</button>
                    )}
                    <Link className="btn btn-ghost" href={`/game/${game.slug}`}>Details</Link>
                </div>
            </div>
            {demo?.demo_url && (
                <DemoOverlay url={demo.demo_url} title={demo.title} close={() => setDemo(null)} />
            )}
        </div>
    );
}
