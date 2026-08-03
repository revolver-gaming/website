"use client";

import { useState } from "react";
import { DemoOverlay } from "./DemoLauncher";
import type { ProviderGame } from "@/lib/cms";

// `open`/`onOpenChange` let a parent sync the demo popup with the URL
// (?play=…) so demo links are shareable; uncontrolled otherwise.
export default function ProviderGameCard(
    { game, open, onOpenChange }:
    { game: ProviderGame; open?: boolean; onOpenChange?: (open: boolean) => void },
) {
    const [selfOpen, setSelfOpen] = useState(false);
    const isOpen = open ?? selfOpen;
    const setOpen = onOpenChange ?? setSelfOpen;
    return (
        <>
            <button
                className="game-card provider-card"
                onClick={() => game.demo_url && setOpen(true)}
                aria-label={`Play ${game.title} demo`}
            >
                <span className="provider-flag">{game.provider}</span>
                <div className="art">
                    <img src={game.image} alt={`${game.title} artwork`} loading="lazy" />
                    <span className="play-hint">Play demo</span>
                </div>
                <div className="meta">
                    <h3>{game.title}</h3>
                    <p className="info">
                        {game.tags.map((t) => <span key={t}>{t}</span>)}
                    </p>
                </div>
            </button>
            {isOpen && game.demo_url && (
                <DemoOverlay url={game.demo_url} title={game.title} close={() => setOpen(false)} />
            )}
        </>
    );
}
