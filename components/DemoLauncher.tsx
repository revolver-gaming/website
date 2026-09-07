"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* Full-screen iframe for a game demo. Portalled to <body> so it escapes any
   stacking context the launching section creates (the nav is z-index 50). */
export function DemoOverlay({ url, title, close }: { url: string; title: string; close: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [close]);

    return createPortal(
        <div
            className="overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} demo`}
            onClick={close}
        >
            <button className="overlay-close" aria-label="Close demo" autoFocus>✕</button>
            <iframe
                className="demo-frame"
                src={url}
                title={`${title} demo`}
                allow="fullscreen; autoplay"
                onClick={(e) => e.stopPropagation()}
            />
        </div>,
        document.body,
    );
}

export default function DemoLauncher({ url, title }: { url: string; title: string }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button className="btn btn-fire" onClick={() => setOpen(true)}>
                Play demo
            </button>
            {open && <DemoOverlay url={url} title={title} close={() => setOpen(false)} />}
        </>
    );
}
