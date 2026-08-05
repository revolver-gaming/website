"use client";

import { useMemo, useState } from "react";
import GameCard from "@/components/GameCard";
import type { Game } from "@/lib/cms";

export default function GamesExplorer({ games }: { games: Game[] }) {
    const [query, setQuery] = useState("");
    const [tag, setTag] = useState<string | null>(null);

    const topTags = useMemo(() => {
        const counts = new Map<string, number>();
        for (const g of games) for (const t of g.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
        return [...counts.entries()]
            .filter(([, n]) => n > 1)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([t]) => t);
    }, [games]);

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
                <p className="eyebrow">The Arsenal — {games.length} original titles</p>
                <h1 className="display">Slots people <em>remember.</em></h1>
                <p className="lede">
                    Every title built in-house — concept, maths, art and sound — in HTML5,
                    available across real money, social and sweepstakes platforms.
                </p>
                <div className="filter-bar" role="group" aria-label="Filter games">
                    <button className={`chip${tag === null ? " on" : ""}`} onClick={() => setTag(null)}>
                        All
                    </button>
                    {topTags.map((t) => (
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
                            feature — or clear the filters to reload all {games.length} games.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}
