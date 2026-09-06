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
        <>
            <div className="filter-bar" role="group" aria-label="Filter slots" data-reveal>
                {FILTERS.map(([name]) => (
                    <button
                        key={name}
                        className={`chip${filter === name ? " on" : ""}`}
                        onClick={() => setFilter(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <div className="game-grid game-grid-mini game-grid-dark">
                {shown.map((g, i) => (
                    <div key={g.slug} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                        <GameCard game={g} />
                    </div>
                ))}
            </div>
        </>
    );
}
