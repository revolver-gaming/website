// Seasonal re-skins of an original, mirroring Bet4Win's Halloween and Christmas builds.
// Each is a separate game with its own demo launch URL, kept per title in `originals.seasons`.
export const SEASONS = [
    {
        key: "halloween",
        label: "Halloween",
        color: "#ff7518",
        icon: <><path d="M5 21V11a7 7 0 0 1 14 0v10l-2.3-1.8-2.3 1.8-2.4-1.8-2.4 1.8-2.3-1.8z" /><path d="M9.5 11h.01M14.5 11h.01" strokeWidth="2.6" /></>,
    },
    {
        key: "christmas",
        label: "Christmas",
        color: "#89cff0",
        icon: <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9.5 3.5 12 5l2.5-1.5M9.5 20.5 12 19l2.5 1.5M3.4 10.3l2.5-1.5V6M18.1 18v-2.8l2.5-1.5M3.4 13.7l2.5 1.5V18M18.1 6v2.8l2.5 1.5" />,
    },
];

export type Season = (typeof SEASONS)[number];

export const seasonsOf = (seasons: Record<string, string>) => SEASONS.filter((s) => seasons[s.key]);

export function SeasonIcon({ s }: { s: Season }) {
    return (
        <svg className="season-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" style={{ "--season": s.color } as React.CSSProperties} aria-hidden>
            {s.icon}
        </svg>
    );
}

// Icons for every season; a lone season also gets its name, as on Bet4Win.
export function SeasonBadge({ seasons }: { seasons: Record<string, string> }) {
    const list = seasonsOf(seasons);
    if (list.length === 0) return null;
    return (
        <span className="season-badge" role="img" aria-label={`Seasonal versions: ${list.map((s) => s.label).join(", ")}`}>
            {list.map((s) => <SeasonIcon key={s.key} s={s} />)}
            {list.length === 1 && <span style={{ color: list[0].color }}>{list[0].label}</span>}
        </span>
    );
}
