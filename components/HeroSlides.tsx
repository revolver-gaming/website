"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PILLARS } from "@/lib/pillars";

type Slide = {
    kicker: string;
    title: [string, string];
    lede: string;
    ctas: { label: string; href: string; fire?: boolean }[];
};

const SLIDES: Slide[] = [
    {
        kicker: "Games software provider · since 2010",
        title: ["The studio that became the", "platform."],
        lede: "Revolver started by building slots operators come back for. Today that core sits inside a full platform: licensable slots, brandable originals, our RGS and an aggregation network.",
        ctas: [
            { label: "See the slots", href: "/games", fire: true },
            { label: "Explore the platform", href: "/gap" },
        ],
    },
    ...PILLARS.map((p) => ({
        kicker: p.kicker,
        title: p.title,
        lede: p.lede,
        ctas: [{ label: p.cta, href: p.href, fire: true }],
    })),
];

export default function HeroSlides() {
    const [active, setActive] = useState(0);
    const paused = useRef(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            if (!paused.current) setActive((a) => (a + 1) % SLIDES.length);
        }, 6500);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="hero-copy"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
        >
            <div className="hero-slides">
                {SLIDES.map((s, i) => (
                    <div
                        className={`hero-slide${i === active ? " active" : ""}`}
                        key={s.kicker}
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
                        key={s.kicker}
                        role="tab"
                        aria-selected={i === active}
                        aria-label={s.kicker}
                        className={i === active ? "active" : undefined}
                        onClick={() => setActive(i)}
                    />
                ))}
            </div>
        </div>
    );
}
