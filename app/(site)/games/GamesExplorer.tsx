"use client";

import { useState } from "react";
import GameCard from "@/components/GameCard";
import type { Game, PartnerStudio } from "@/lib/cms";

type Filter = "all" | "originals" | "partners";

const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "originals", label: "Revolver originals" },
    { key: "partners", label: "Partner studios" },
];

export default function GamesExplorer(
    { games, partnerStudios }: { games: Game[]; partnerStudios: PartnerStudio[] },
) {
    const [filter, setFilter] = useState<Filter>("all");
    const [query, setQuery] = useState("");

    const q = query.trim().toLowerCase();
    const shown = filter === "partners" ? [] : games.filter(
        (g) =>
            !q ||
            g.title.toLowerCase().includes(q) ||
            g.tags.some((t) => t.toLowerCase().includes(q)),
    );
    const shownStudios = filter === "originals" ? [] : partnerStudios.filter(
        (s) => !q || s.name.toLowerCase().includes(q) || s.knownFor.toLowerCase().includes(q),
    );

    return (
        <main>
            <div className="shell page-hero">
                <p className="eyebrow">The full arsenal</p>
                <h1 className="display">
                    Every chamber, <em>loaded.</em>
                </h1>

                <div className="filter-bar" role="group" aria-label="Filter games">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            className={`chip${filter === f.key ? " on" : ""}`}
                            onClick={() => setFilter(f.key)}
                            aria-pressed={filter === f.key}
                        >
                            {f.label}
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

                <p className="count-line">
                    Showing <b>{shown.length + shownStudios.length}</b>{" "}
                    {filter === "partners" ? "partner studios" : "titles"}
                </p>
            </div>

            <section className="shell" style={{ paddingBottom: "clamp(72px, 10vw, 120px)" }}>
                <div className="game-grid">
                    {shown.map((g) => <GameCard key={g.slug} game={g} showBlurb />)}
                    {shownStudios.map((s) => (
                        <a className="partner-tile" key={s.name} href="/#contact">
                            <span className="via">Partner studio · via GAP</span>
                            <div>
                                <h3>{s.name}</h3>
                                <p className="sub">{s.knownFor} — {s.genre}</p>
                            </div>
                        </a>
                    ))}
                </div>
                {shown.length + shownStudios.length === 0 && (
                    <p className="empty-note">
                        Nothing in the chamber for “<b>{query}</b>”. Try another title or feature —
                        or clear the search to reload all {games.length} games.
                    </p>
                )}
            </section>
        </main>
    );
}
