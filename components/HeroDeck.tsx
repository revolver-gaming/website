"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DemoOverlay } from "./DemoLauncher";
import type { Game } from "@/lib/cms";

/* The featured banners at their native 680×440 ratio: one in front, the
   next three queued beneath it. Advances on its own; pauses on hover,
   keyboard focus, or while a demo is open. */
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
    const queue = Array.from({ length: Math.min(3, n - 1) }, (_, i) => games[(active + i + 1) % n]);

    return (
        <div
            className="deck"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
            onFocus={() => (paused.current = true)}
            onBlur={() => (paused.current = false)}
        >
            <div className="deck-main">
                {games.map((g, i) => (
                    <img
                        key={g.slug}
                        src={g.image}
                        alt={i === active ? `${g.title} artwork` : ""}
                        className={i === active ? "on" : undefined}
                        aria-hidden={i !== active}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : undefined}
                        width={680}
                        height={440}
                    />
                ))}
            </div>
            {queue.length > 0 && (
                <div className="deck-queue">
                    {queue.map((g) => (
                        <button key={g.slug} onClick={() => setActive(games.indexOf(g))} aria-label={`Show ${g.title}`}>
                            <img src={g.image} alt="" loading="lazy" width={680} height={440} />
                        </button>
                    ))}
                </div>
            )}
            <div className="deck-readout">
                <h3 aria-live="polite">{game.title}</h3>
                <div className="actions">
                    {game.demo_url && (
                        <button className="btn btn-ghost btn-xs" onClick={() => setDemo(game)}>Play demo</button>
                    )}
                    <Link className="btn btn-ghost btn-xs" href={`/game/${game.slug}`}>Details</Link>
                </div>
            </div>
            {demo?.demo_url && (
                <DemoOverlay url={demo.demo_url} title={demo.title} close={() => setDemo(null)} />
            )}
        </div>
    );
}
