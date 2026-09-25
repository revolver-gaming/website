"use client";

import { useMemo, useState } from "react";
import GameCard from "@/components/GameCard";
import type { Game } from "@/lib/cms";

export default function GamesExplorer({ games, filters }: { games: Game[]; filters: string[] }) {
    const [query, setQuery] = useState("");
    const [tag, setTag] = useState<string | null>(null);

    // Hide filters no published game carries, so a chip never leads to an empty grid.
    const chips = useMemo(() => filters.filter((f) => games.some((g) => g.tags.includes(f))), [filters, games]);

    const q = query.trim().toLowerCase();
    const shown = games.filter(
        (g) =>
            (!tag || g.tags.includes(tag)) &&
            (!q ||
                g.title.toLowerCase().includes(q) ||
                g.tags.some((t) => t.toLowerCase().includes(q))),
    );

    return (
        <>
            <div className="shell page-hero">
                <p className="eyebrow">Games · our core</p>
                <h1 className="display">Games people <em>remember.</em></h1>
                <p className="lede">
                    Every title built in-house — concept, maths, art and sound — in HTML5,
                    available across real money, social and sweepstakes platforms.
                </p>
                <div className="filter-bar" role="group" aria-label="Filter games">
                    <button className={`chip${tag === null ? " on" : ""}`} onClick={() => setTag(null)}>
                        All
                    </button>
                    {chips.map((t) => (
                        <button
                            key={t}
                            className={`chip${tag === t ? " on" : ""}`}
                            onClick={() => setTag(tag === t ? null : t)}
                        >
                            {t}
                        </button>
                    ))}
                    <input
                        className="search"
                        type="search"
                        placeholder="Search titles or features…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search games"
                    />
                </div>
            </div>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    {shown.length > 0 ? (
                        <div className="game-grid">
                            {shown.map((g) => <GameCard key={g.slug} game={g} />)}
                        </div>
                    ) : (
                        <p className="empty-note">
                            Nothing in the chamber for “<b>{query}</b>”. Try another title or
                            feature — or clear the filters to reload every title.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}
