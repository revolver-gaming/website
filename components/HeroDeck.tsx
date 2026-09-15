"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DemoOverlay } from "./DemoLauncher";

export type DeckItem = { key: string; title: string; image: string; href: string; demo_url: string | null };

/* A stack of game art at its native ratio (slot banners, or square originals art).
   The front card advances every few seconds; the rest fan back behind it. */
export default function HeroDeck({ items, square = false }: { items: DeckItem[]; square?: boolean }) {
    const [active, setActive] = useState(0);
    const [demo, setDemo] = useState<DeckItem | null>(null);
    const paused = useRef(false);
    const demoOpen = useRef(false);
    demoOpen.current = demo !== null;
    const n = items.length;

    useEffect(() => {
        if (n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            if (!paused.current && !demoOpen.current) setActive((a) => (a + 1) % n);
        }, 4500);
        return () => clearInterval(id);
    }, [n]);

    const item = items[active];
    if (!item) return null;

    return (
        <div
            className="deck-stage"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
        >
            <div className={`deck${square ? " deck-square" : ""}`}>
                {items.map((g, i) => (
                    <button
                        key={g.key}
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
                <h3>{item.title}</h3>
                <div className="actions">
                    {item.demo_url && (
                        <button className="btn btn-fire" onClick={() => setDemo(item)}>Play demo</button>
                    )}
                    <Link className="btn btn-ghost" href={item.href}>Details</Link>
                </div>
            </div>
            {demo?.demo_url && (
                <DemoOverlay url={demo.demo_url} title={demo.title} close={() => setDemo(null)} />
            )}
        </div>
    );
}
