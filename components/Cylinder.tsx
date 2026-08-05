"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DemoOverlay } from "./DemoLauncher";
import type { Game } from "@/lib/cms";

const STEP = 60; // six chambers
const BOLT_ANGLES = [30, 90, 150, 210, 270, 330]; // between the chambers

export default function Cylinder({ games }: { games: Game[] }) {
    const [active, setActive] = useState(0);
    const [turns, setTurns] = useState(0); // cumulative so the ring never unwinds
    const [demo, setDemo] = useState<Game | null>(null);
    const paused = useRef(false);
    const demoOpen = useRef(false);
    demoOpen.current = demo !== null;

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
            if (!paused.current && !demoOpen.current) {
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
                <div className="cylinder-pointer" />
                <div
                    className="cylinder-ring"
                    style={{ transform: `rotate(${-turns * STEP}deg)` }}
                >
                    <div className="cylinder-face" />
                    {BOLT_ANGLES.map((a) => (
                        <div
                            key={a}
                            className="cylinder-bolt"
                            style={{ "--a": `${a}deg` } as React.CSSProperties}
                        />
                    ))}
                    {games.slice(0, 6).map((g, i) => (
                        <div
                            key={g.slug}
                            className="slot-arm"
                            style={{ transform: `rotate(${i * STEP}deg) translateY(calc(var(--r) * -1))` }}
                        >
                            <button
                                className={`slot${i === active ? " armed" : ""}`}
                                style={{ transform: `rotate(${(turns * STEP) - i * STEP}deg) scale(${i === active ? 1.08 : 1})` }}
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
                    <img src="/brand/emblem-white.svg" alt="" />
                </div>
            </div>

            <div className="cylinder-readout" aria-live="polite">
                <span className="count">CH.{String(active + 1).padStart(2, "0")} / 06 — IN THE CHAMBER</span>
                <h3>{game.title}</h3>
                <p className="tags">{game.tags.join(" · ")}</p>
                <div className="actions">
                    {game.demo_url && (
                        <button className="btn btn-fire" onClick={() => setDemo(game)}>
                            Play demo
                        </button>
                    )}
                    <Link className="btn btn-ghost" href={`/game/${game.slug}`}>
                        Details
                    </Link>
                </div>
            </div>
            {demo?.demo_url && (
                <DemoOverlay url={demo.demo_url} title={demo.title} close={() => setDemo(null)} />
            )}
        </div>
    );
}
