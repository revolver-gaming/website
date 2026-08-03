"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GameCard from "@/components/GameCard";
import ProviderGameCard from "@/components/ProviderGameCard";
import { slugify } from "@/lib/slug";
import type { Game, PartnerStudio, ProviderGame } from "@/lib/cms";

type Filter = "all" | "originals" | "partners";

const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "originals", label: "Revolver originals" },
    { key: "partners", label: "Partner studios" },
];

// Shareable demo link: /games?play={provider-slug}/{game-slug}
const playKey = (g: ProviderGame) => `${slugify(g.provider)}/${g.slug}`;

export default function GamesExplorer(
    { games, partnerStudios, providerGames }:
    { games: Game[]; partnerStudios: PartnerStudio[]; providerGames: ProviderGame[] },
) {
    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();
    const [query, setQuery] = useState("");

    const providers = [...new Set(providerGames.map((g) => g.provider))];

    // Tab, provider and open demo all live in the URL so every view is shareable:
    // /games?tab=partners · /games?tab=partners&provider=bet-4-win · /games?play=bet-4-win/crash
    const playing = search.get("play");
    const tabParam = search.get("tab");
    const filter: Filter =
        tabParam === "originals" || tabParam === "partners" ? tabParam
        : playing && providerGames.some((g) => playKey(g) === playing) ? "partners"
        : "all";
    const provider = filter === "partners"
        ? providers.find((p) => slugify(p) === search.get("provider")) ?? null
        : null;

    const go = (next: { tab: Filter; provider: string | null; play: string | null }) => {
        const params = new URLSearchParams();
        if (next.tab !== "all") params.set("tab", next.tab);
        if (next.tab === "partners" && next.provider) params.set("provider", slugify(next.provider));
        if (next.play) params.set("play", next.play);
        router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false });
    };
    const setPlaying = (key: string | null) => go({ tab: filter, provider, play: key });

    const q = query.trim().toLowerCase();
    const shown = filter === "partners" ? [] : games.filter(
        (g) =>
            !q ||
            g.title.toLowerCase().includes(q) ||
            g.tags.some((t) => t.toLowerCase().includes(q)),
    );
    const shownProvider = filter === "originals" ? [] : providerGames.filter(
        (g) =>
            (filter !== "partners" || !provider || g.provider === provider) &&
            (!q ||
                g.title.toLowerCase().includes(q) ||
                g.provider.toLowerCase().includes(q) ||
                g.tags.some((t) => t.toLowerCase().includes(q))),
    );
    const shownStudios = filter !== "partners" || provider ? [] : partnerStudios.filter(
        (s) => !q || s.name.toLowerCase().includes(q) || s.knownFor.toLowerCase().includes(q),
    );
    const total = shown.length + shownProvider.length + shownStudios.length;

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
                            onClick={() => go({ tab: f.key, provider: null, play: null })}
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

                {filter === "partners" && providers.length > 0 && (
                    <div className="filter-bar sub" role="group" aria-label="Filter by provider">
                        <button
                            className={`chip${provider === null ? " on" : ""}`}
                            onClick={() => go({ tab: "partners", provider: null, play: null })}
                            aria-pressed={provider === null}
                        >
                            All providers
                        </button>
                        {providers.map((p) => (
                            <button
                                key={p}
                                className={`chip${provider === p ? " on" : ""}`}
                                onClick={() => go({ tab: "partners", provider: p, play: null })}
                                aria-pressed={provider === p}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}

                <p className="count-line">
                    Showing <b>{total}</b> {total === 1 ? "title" : "titles"}
                    {filter === "partners" && provider && (
                        <>
                            {" · "}
                            <Link href={`/provider/${slugify(provider)}`}>
                                {provider} page →
                            </Link>
                        </>
                    )}
                </p>
            </div>

            <section className="shell" style={{ paddingBottom: "clamp(72px, 10vw, 120px)" }}>
                {shown.length > 0 && (
                    <div className="game-grid">
                        {shown.map((g) => <GameCard key={g.slug} game={g} showBlurb />)}
                    </div>
                )}

                {shownProvider.length > 0 && (
                    <>
                        {filter === "all" && shown.length > 0 && (
                            <div className="grid-break">
                                <p className="eyebrow">Partner studios — via GAP</p>
                            </div>
                        )}
                        <div className="game-grid">
                            {shownProvider.map((g) => (
                                <ProviderGameCard
                                    key={g.id}
                                    game={g}
                                    open={playing === playKey(g)}
                                    onOpenChange={(open) => setPlaying(open ? playKey(g) : null)}
                                />
                            ))}
                        </div>
                    </>
                )}

                {shownStudios.length > 0 && (
                    <div className="game-grid" style={{ marginTop: shownProvider.length ? 24 : 0 }}>
                        {shownStudios.map((s) => (
                            <div className="partner-tile" key={s.name}>
                                <span className="via">Partner studio · via GAP</span>
                                <div>
                                    <h3>{s.name}</h3>
                                    <p className="sub">{s.knownFor} — {s.genre}</p>
                                    <p className="soon">Portfolio coming soon</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {total === 0 && (
                    <p className="empty-note">
                        Nothing in the chamber for “<b>{query}</b>”. Try another title or feature —
                        or clear the search to reload all {games.length + providerGames.length} games.
                    </p>
                )}
            </section>
        </main>
    );
}
