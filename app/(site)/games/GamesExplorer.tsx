"use client";

import { useState } from "react";
import GameCard from "@/components/GameCard";
import type { Game } from "@/lib/cms";

export default function GamesExplorer({ games }: { games: Game[] }) {
    const [query, setQuery] = useState("");

    const q = query.trim().toLowerCase();
    const shown = games.filter(
        (g) =>
            !q ||
            g.title.toLowerCase().includes(q) ||
            g.tags.some((t) => t.toLowerCase().includes(q)),
    );

    return (
        <>
            <div className="shell page-hero">
                <p className="eyebrow">The full arsenal</p>
                <h1 className="display">
                    Every chamber, <em>loaded.</em>
                </h1>

                <div className="filter-bar">
                    <input
                        className="search"
                        type="search"
                        placeholder="Search titles or features…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search games"
                    />
                </div>

                <p className="count-line">
                    Showing <b>{shown.length}</b> {shown.length === 1 ? "title" : "titles"}
                </p>
            </div>

            <section className="shell" style={{ paddingBottom: "clamp(72px, 10vw, 120px)" }}>
                {shown.length > 0 && (
                    <div className="game-grid">
                        {shown.map((g) => <GameCard key={g.slug} game={g} showBlurb />)}
                    </div>
                )}

                {shown.length === 0 && (
                    <p className="empty-note">
                        Nothing in the chamber for “<b>{query}</b>”. Try another title or feature —
                        or clear the search to reload all {games.length} games.
                    </p>
                )}
            </section>
        </>
    );
}
