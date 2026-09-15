"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { PILLARS } from "@/lib/pillars";

type Slide = {
    key: string;
    kicker: string;
    title: [string, string];
    lede: string;
    ctas: { label: string; href: string; fire?: boolean }[];
};

const SLIDES: Slide[] = [
    {
        key: "intro",
        kicker: "Games software provider · since 2010",
        title: ["The studio that became the", "platform."],
        lede: "Revolver started by building slots operators come back for. Today that core sits inside a full platform: licensable slots, brandable originals, our RGS and an aggregation network.",
        ctas: [
            { label: "See the slots", href: "/games", fire: true },
            { label: "Explore the platform", href: "/gap" },
        ],
    },
    ...PILLARS.map((p) => ({
        key: p.key,
        kicker: p.kicker,
        title: p.title,
        lede: p.lede,
        ctas: [{ label: p.cta, href: p.href, fire: true }],
    })),
];

/* Rotating pillar copy on the left; the visual on the right follows the active slide.
   `visuals` is keyed by slide key: "intro" plus each pillar key. */
export default function HeroSlides({ visuals }: { visuals: Record<string, ReactNode> }) {
    const [active, setActive] = useState(0);
    const paused = useRef(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            // hold the slide while hovered or while a demo is open over it
            if (!paused.current && !document.querySelector(".overlay")) setActive((a) => (a + 1) % SLIDES.length);
        }, 6500);
        return () => clearInterval(id);
    }, []);

    const current = SLIDES[active];

    return (
        <div
            className="hero-grid"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
        >
            <div className="hero-copy">
                <div className="hero-slides">
                    {SLIDES.map((s, i) => (
                        <div
                            className={`hero-slide${i === active ? " active" : ""}`}
                            key={s.key}
                            aria-hidden={i !== active}
                        >
                            <p className="eyebrow">{s.kicker}</p>
                            <h1 className="display">
                                {s.title[0]} <em>{s.title[1]}</em>
                            </h1>
                            <p>{s.lede}</p>
                            <div className="hero-ctas">
                                {s.ctas.map((c) => (
                                    <Link
                                        key={c.label}
                                        href={c.href}
                                        className={`btn ${c.fire ? "btn-fire" : "btn-ghost"}`}
                                        tabIndex={i === active ? 0 : -1}
                                    >
                                        {c.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hero-dots" role="tablist" aria-label="Hero slides">
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.key}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={s.kicker}
                            className={i === active ? "active" : undefined}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </div>
            </div>
            <div className="hero-visual" key={current.key}>{visuals[current.key]}</div>
        </div>
    );
}
