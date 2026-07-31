"use client";

import { useEffect, useState } from "react";

export default function DemoLauncher({ url, title }: { url: string; title: string }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <button className="btn btn-fire" onClick={() => setOpen(true)}>
                Play demo
            </button>
            {open && (
                <div
                    className="overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} demo`}
                    onClick={() => setOpen(false)}
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
            )}
        </>
    );
}
