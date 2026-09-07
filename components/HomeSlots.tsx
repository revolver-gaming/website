"use client";

import { useState } from "react";
import GameCard from "./GameCard";
import type { Game } from "@/lib/cms";

/* Ryan's wireframe filters: All · New · Flagship · Branded · Seasonal.
   Derived from CMS data until games carry an explicit category. */
const FILTERS: [string, (g: Game, games: Game[]) => boolean][] = [
    ["All", () => true],
    ["New", (g, games) => g.year === Math.max(...games.map((x) => x.year))],
    ["Flagship", (g) => g.featured],
    ["Branded", (g) => g.tags.some((t) => /brand/i.test(t))],
    ["Seasonal", (g) => g.tags.some((t) => /seasonal/i.test(t))],
];

export default function HomeSlots({ games }: { games: Game[] }) {
    const [filter, setFilter] = useState("All");
    const match = FILTERS.find(([name]) => name === filter)![1];
    const shown = games.filter((g) => match(g, games));
    return (
        <div data-reveal>
            <div className="tabs" role="tablist" aria-label="Filter slots">
                <div className="tabs-scroll">
                    {FILTERS.map(([name]) => (
                        <button
                            key={name}
                            role="tab"
                            aria-selected={filter === name}
                            className={`tab${filter === name ? " on" : ""}`}
                            onClick={() => setFilter(name)}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
            {shown.length > 0 ? (
                <div className="game-grid">
                    {shown.map((g) => <GameCard key={g.slug} game={g} />)}
                </div>
            ) : (
                <p className="empty-note">Nothing in the chamber under <b>{filter}</b> yet.</p>
            )}
        </div>
    );
}
