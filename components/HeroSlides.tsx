"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Accent from "./Accent";
import HeroArt from "./HeroArt";
import type { HeroSlide } from "@/lib/cms";

/* Rotating slide copy on the left; the art on the right follows the active slide.
   Slides are CMS-driven (site_content "hero_slides", edited in /admin/hero). */
export default function HeroSlides({ slides }: { slides: HeroSlide[] }) {
    const [active, setActive] = useState(0);
    const paused = useRef(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            // hold the slide while hovered or while a demo is open over it
            if (!paused.current && !document.querySelector(".overlay")) setActive((a) => (a + 1) % slides.length);
        }, 6500);
        return () => clearInterval(id);
    }, [slides.length]);

    const current = slides[active];

    return (
        <div
            className="hero-grid"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
        >
            <div className="hero-copy">
                <div className="hero-slides">
                    {slides.map((s, i) => (
                        <div
                            className={`hero-slide${i === active ? " active" : ""}`}
                            key={i}
                            aria-hidden={i !== active}
                        >
                            <p className="eyebrow">{s.kicker}</p>
                            <h1 className="display">
                                <Accent text={s.title} />
                            </h1>
                            <p>{s.lede}</p>
                            <div className="hero-ctas">
                                {s.ctas.map((c) => (
                                    <Link
                                        key={c.label + c.href}
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
                    {slides.map((s, i) => (
                        <button
                            key={i}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={s.kicker}
                            className={i === active ? "active" : undefined}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </div>
            </div>
            <div className="hero-visual" key={active}><HeroArt src={current?.image} alt={current?.image_alt} /></div>
        </div>
    );
}
