import Link from "next/link";
import type { Original } from "@/lib/cms";

// Line icons stand in for card art until each title's artwork is uploaded.
const ICONS: Record<string, React.ReactNode> = {
    crash: <path d="M4 18 10 11l4 3 6-9M16 5h4v4" />,
    punch: <path d="M4 12h6l2-3 2 6 2-3h4M12 3l2 3M12 21l2-3" />,
    dragon: <path d="M6 20h12M8 16h8M10 12h4M11 8h2M12 4v4" />,
    mines: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M4 15h16M10 4v16M15 4v16" /></>,
    plinko: <><circle cx="12" cy="5" r="1" /><circle cx="8" cy="11" r="1" /><circle cx="16" cy="11" r="1" /><circle cx="5" cy="17" r="1" /><circle cx="12" cy="17" r="1" /><circle cx="19" cy="17" r="1" /></>,
    dice: <><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="9" cy="9" r="1.2" fill="currentColor" /><circle cx="15" cy="15" r="1.2" fill="currentColor" /><circle cx="15" cy="9" r="1.2" fill="currentColor" /><circle cx="9" cy="15" r="1.2" fill="currentColor" /></>,
    limbo: <path d="M4 14h16M9 9l3 4 3-4M12 3v10" />,
    keno: <><circle cx="12" cy="12" r="8" /><path d="M9 12h6M12 9v6" /></>,
    wheel: <><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16M6 6l12 12M18 6 6 18" /></>,
    diamonds: <path d="M6 3h12l4 6-10 12L2 9zM2 9h20M9 3l3 6 3-6M8 9l4 12 4-12" />,
    hilo: <><rect x="6" y="3" width="12" height="18" rx="2" /><path d="m9 10 3-3 3 3M9 14l3 3 3-3" /></>,
    coin: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.5" /></>,
    "video-poker": <><rect x="3" y="6" width="7" height="12" rx="1.5" /><rect x="14" y="6" width="7" height="12" rx="1.5" /><path d="M6.5 10v4M17.5 10v4" /></>,
    blackjack: <><rect x="4" y="6" width="10" height="14" rx="2" /><path d="M10 4h8a2 2 0 0 1 2 2v12" /></>,
    baccarat: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3" /></>,
    roulette: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v5M12 15v5M4 12h5M15 12h5M6.5 6.5l3 3M14.5 14.5l3 3" /></>,
    "american-roulette": <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v5M12 15v5M4 12h5M15 12h5M17.5 6.5l-3 3M9.5 14.5l-3 3" /></>,
    chicken: <path d="M12 3c4 0 7 6 7 11a7 7 0 0 1-14 0c0-5 3-11 7-11z" />,
};

export function OriginalArt({ o }: { o: Original }) {
    if (o.card_image) return <img className="o-art" src={o.card_image} alt={`${o.title} artwork`} />;
    return (
        <div className="o-art o-art-ph" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[o.slug] ?? ICONS.coin}
            </svg>
        </div>
    );
}

function OriginalStats({ o }: { o: Original }) {
    const stats = [["Max win", o.max_win], ["RTP", o.rtp], ["Vol", o.volatility]].filter(([, v]) => v);
    return (
        <dl className="o-stats">
            {stats.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
    );
}

export function OriginalCard({ o }: { o: Original }) {
    return (
        <Link className={`o-card${o.coming_soon ? " is-soon" : ""}`} href={o.coming_soon ? "/#contact" : `/originals/${o.slug}`}>
            {(o.is_new || o.coming_soon) && <span className="tag-badge">{o.coming_soon ? "Coming soon" : "New"}</span>}
            <OriginalArt o={o} />
            <div className="o-meta">
                <h3>{o.title}</h3>
                {o.coming_soon ? <p className="o-soon">Coming · next drop</p> : <OriginalStats o={o} />}
                <span className="o-view">{o.coming_soon ? "New original →" : "View game →"}</span>
            </div>
        </Link>
    );
}

export function OriginalsGrid({ items }: { items: Original[] }) {
    return (
        <div className="o-grid" data-reveal>
            {items.map((o) => <OriginalCard key={o.slug} o={o} />)}
        </div>
    );
}

export function OriginalFeature({ o }: { o: Original }) {
    return (
        <div className="o-feature" data-reveal>
            <OriginalArt o={o} />
            <div>
                <p className="eyebrow">Featured original</p>
                <h3 className="display">{o.title}</h3>
                <p className="lede">{o.blurb}</p>
                <OriginalStats o={o} />
                <div className="hero-ctas">
                    <Link className="btn btn-fire" href={`/originals/${o.slug}`}>View game</Link>
                    <Link className="btn btn-ghost" href="/#contact">Add to your lobby</Link>
                </div>
            </div>
        </div>
    );
}

// Featured title up top, everything else (coming-soon last, by sort order) in the grid, optionally capped.
export function OriginalsShowcase({ items, limit }: { items: Original[]; limit?: number }) {
    const featured = items.find((o) => o.featured && !o.coming_soon);
    return (
        <>
            {featured && <OriginalFeature o={featured} />}
            <OriginalsGrid items={items.filter((o) => o !== featured).slice(0, limit)} />
        </>
    );
}

export const liveCount = (items: Original[]) => items.filter((o) => !o.coming_soon).length;
