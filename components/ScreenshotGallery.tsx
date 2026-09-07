"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ScreenshotGallery({ shots, title }: { shots: string[]; title: string }) {
    const [index, setIndex] = useState<number | null>(null);
    const open = index !== null;
    const step = useCallback(
        (d: number) => setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
        [shots.length],
    );

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIndex(null);
            if (e.key === "ArrowLeft") step(-1);
            if (e.key === "ArrowRight") step(1);
        };
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, step]);

    return (
        <>
            <div className="shot-grid">
                {shots.map((s, i) => (
                    <button key={s} className="shot" onClick={() => setIndex(i)} aria-label={`Open screenshot ${i + 1}`}>
                        <img src={s} alt={`${title} screenshot ${i + 1}`} loading="lazy" />
                    </button>
                ))}
            </div>
            {index !== null && createPortal(
                <div
                    className="overlay lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} screenshots`}
                    onClick={() => setIndex(null)}
                >
                    <button className="overlay-close" aria-label="Close" autoFocus>✕</button>
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
                </div>,
                document.body,
            )}
        </>
    );
}
