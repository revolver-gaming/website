"use client";

import { useEffect, useState } from "react";

export function DemoOverlay({ url, title, close }: { url: string; title: string; close: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [close]);

    return (
        <div
            className="overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} demo`}
            onClick={close}
        >
            <button className="overlay-close" aria-label="Close demo">✕</button>
            <iframe
                className="demo-frame"
                src={url}
                title={`${title} demo`}
                allow="fullscreen; autoplay"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
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
