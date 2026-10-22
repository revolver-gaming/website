"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SeasonIcon, seasonsOf } from "./Seasons";

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

type Demo = { url: string; title: string };

// Play demo, split with a menu of the seasonal versions (Bet4Win's Halloween/Christmas builds).
function SeasonSplit({ main, seasons, launch }: { main: Demo; seasons: Record<string, string>; launch: (d: Demo) => void }) {
    const [menu, setMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const variants = seasonsOf(seasons);

    useEffect(() => {
        if (!menu) return;
        const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setMenu(false);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [menu]);

    const pick = (d: Demo) => {
        setMenu(false);
        launch(d);
    };

    return (
        <div className="btn-split" ref={ref}>
            <button className="btn btn-fire" onClick={() => pick(main)}>Play demo</button>
            <button className="btn btn-fire split-end" aria-haspopup="menu" aria-expanded={menu}
                aria-label="Choose a seasonal version" onClick={() => setMenu(!menu)}>
                {variants.map((s) => <SeasonIcon key={s.key} s={s} />)}
                <svg className="split-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {menu && (
                <ul className="split-menu" role="menu">
                    {variants.map((s) => (
                        <li key={s.key} role="none">
                            <button role="menuitem" onClick={() => pick({ url: seasons[s.key], title: `${main.title} ${s.label}` })}>
                                <SeasonIcon s={s} />
                                {s.label} version
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* The overlay renders into <body>: the launcher sits inside the sticky .game-panel,
   and position:sticky always creates a stacking context, which would otherwise trap
   the overlay's z-index behind the nav and the cards further down the page. */
export default function DemoLauncher({ url, title, seasons = {} }: { url: string; title: string; seasons?: Record<string, string> }) {
    const [open, setOpen] = useState<Demo | null>(null);
    const main = { url, title };
    return (
        <>
            {seasonsOf(seasons).length > 0
                ? <SeasonSplit main={main} seasons={seasons} launch={setOpen} />
                : <button className="btn btn-fire" onClick={() => setOpen(main)}>Play demo</button>}
            {open && createPortal(
                <DemoOverlay url={open.url} title={open.title} close={() => setOpen(null)} />,
                document.body,
            )}
        </>
    );
}
