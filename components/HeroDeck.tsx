"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DemoOverlay } from "./DemoLauncher";
import type { Game } from "@/lib/cms";

/* Featured banner at its native 680×440 ratio, a readout underneath, and the
   rest of the deck queued as thumbnails. Advances on its own until hovered,
   a thumbnail is picked, or a demo is open. */
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
        }, 5000);
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
            <div className="deck-main">
                {games.map((g, i) => (
                    <img
                        key={g.slug}
                        className={i === active ? "on" : undefined}
                        src={g.image}
                        alt={i === active ? `${g.title} artwork` : ""}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : undefined}
                    />
                ))}
            </div>

            <div className="deck-readout">
                <div>
                    <span className="label">Featured</span>
                    <h3>{game.title}</h3>
                </div>
                <div className="actions">
                    {game.demo_url && (
                        <button className="btn btn-ghost btn-sm" onClick={() => setDemo(game)}>Play demo</button>
                    )}
                    <Link className="btn btn-ghost btn-sm" href={`/game/${game.slug}`}>Details</Link>
                </div>
            </div>

            {n > 1 && (
                <div
                    className="deck-queue"
                    role="tablist"
                    aria-label="Featured games"
                    style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
                >
                    {games.map((g, i) => (
                        <button
                            key={g.slug}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={`Show ${g.title}`}
                            onClick={() => setActive(i)}
                        >
                            <img src={g.image} alt="" loading="lazy" />
                        </button>
                    ))}
                </div>
            )}

            {demo?.demo_url && (
                <DemoOverlay url={demo.demo_url} title={demo.title} close={() => setDemo(null)} />
            )}
        </div>
    );
}
