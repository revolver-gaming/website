"use client";

import { useEffect, useRef, useState } from "react";

/* A snap-scrolling strip of screenshots; any shot opens the lightbox. */
export default function ScreenshotGallery({ shots, title }: { shots: string[]; title: string }) {
    const [index, setIndex] = useState<number | null>(null);
    const track = useRef<HTMLDivElement>(null);
    const open = index !== null;
    const step = (d: number) => setIndex((i) => (i! + d + shots.length) % shots.length);
    const slide = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.75, behavior: "smooth" });

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIndex(null);
            if (e.key === "ArrowLeft") step(-1);
            if (e.key === "ArrowRight") step(1);
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <div className="shot-carousel">
                <div className="shot-track" ref={track}>
                    {shots.map((s, i) => (
                        <button key={s} className="shot" onClick={() => setIndex(i)} aria-label={`Open screenshot ${i + 1}`}>
                            <img src={s} alt={`${title} screenshot ${i + 1}`} loading="lazy" />
                        </button>
                    ))}
                </div>
                {shots.length > 1 && (
                    <div className="shot-nav">
                        <button onClick={() => slide(-1)} aria-label="Previous screenshots">‹</button>
                        <button onClick={() => slide(1)} aria-label="Next screenshots">›</button>
                    </div>
                )}
            </div>
            {open && (
                <div
                    className="overlay lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} screenshots`}
                    onClick={() => setIndex(null)}
                >
                    <button className="overlay-close" aria-label="Close">✕</button>
                    <button
                        className="lightbox-nav prev"
                        aria-label="Previous screenshot"
                        onClick={(e) => { e.stopPropagation(); step(-1); }}
                    >
                        ‹
                    </button>
                    <figure onClick={(e) => e.stopPropagation()}>
                        <img src={shots[index]} alt={`${title} screenshot ${index + 1}`} />
                        <figcaption>{index + 1} / {shots.length}</figcaption>
                    </figure>
                    <button
                        className="lightbox-nav next"
                        aria-label="Next screenshot"
                        onClick={(e) => { e.stopPropagation(); step(1); }}
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
}
