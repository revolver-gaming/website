import Link from "next/link";
import Cylinder, { HeroBackdrop } from "@/components/Cylinder";
import GameCard from "@/components/GameCard";
import {
    getContact, getPlatformStats, getSocials, listGames, listNews,
    listOperators, listPartnerStudios, newsDate,
} from "@/lib/cms";

const tickerItems = [
    "UKGC licensed", "31 original titles", "300+ aggregated games",
    "16 operator integrations", "185+ currencies", "100% HTML5",
    "Real money · Social · Sweepstakes", "Studio + Aggregator", "London, W1",
];

const capabilities = [
    {
        title: "Licensed & regulation-ready",
        blurb: "UKGC licensed, with per-license configuration profiles so each jurisdiction's rules are applied as config — not as a custom build.",
    },
    {
        title: "Wide distribution network",
        blurb: "One integration into a live operator network — 16+ wallet integrations, 22 launch routes, and games in a new operator's lobby the same day.",
    },
    {
        title: "Promotions engine",
        blurb: "Free spins, flexible free spins and four-tier progressive jackpots — served in your platform's own bonus API dialect.",
    },
    {
        title: "Back office & BI",
        blurb: "Tenant-scoped dashboards, transaction search with one-click Excel export, round replay and a live broken-rounds register.",
    },
    {
        title: "Reliability & fairness",
        blurb: "Self-healing rounds, RNG re-tested against the NIST suite every 12 hours, and synthetics playing our own games in production 24/7.",
    },
    {
        title: "Global reach",
        blurb: "185+ currencies across fiat, crypto and social coins, games in 18 languages, and a dedicated sweepstakes stack.",
    },
];

export const revalidate = 300;

export default async function Home() {
    const [news, games, partnerStudios, operators, contact, socials, stats] = await Promise.all([
        listNews(6), listGames(), listPartnerStudios(), listOperators(),
        getContact(), getSocials(), getPlatformStats(),
    ]);
    const featuredGames = games.filter((g) => g.featured);
    return (
        <main>
            {/* CH.01 — the cylinder */}
            <section className="hero" data-chamber id="top">
                <HeroBackdrop games={featuredGames} />
                <div className="shell hero-grid">
                    <div className="hero-copy">
                        <p className="eyebrow">CH.01 — London, W1</p>
                        <h1 className="display">
                            <span className="line">Lock,</span>
                            <span className="line">Slot <span className="amp">&amp;</span></span>
                            <span className="line">Barrel.</span>
                        </h1>
                        <p>
                            We build slots people remember — and run the aggregation platform
                            that puts them, and our partner studios, in front of operators
                            worldwide. Every chamber loaded.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/games" className="btn btn-fire">Explore the arsenal</Link>
                            <a href="#platform" className="btn btn-ghost">See the platform</a>
                        </div>
                    </div>
                    <Cylinder games={featuredGames} />
                </div>
            </section>

            <div className="ticker" aria-hidden>
                <div className="ticker-track">
                    {[0, 1].map((n) => (
                        <span key={n}>
                            {tickerItems.map((t) => <span key={t}>{t}</span>)}
                        </span>
                    ))}
                </div>
            </div>

            {/* CH.02 — platform */}
            <section className="on-bone" data-chamber id="platform">
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">CH.02 — The Platform</p>
                        <h2 className="display">One platform,<br />both sides of the deal</h2>
                        <p className="lede">
                            Revolver is a UKGC-licensed game studio and an aggregator. Our
                            RGS engine runs the games; our Game Aggregation Platform (GAP)
                            connects them — and our partner studios — to a wide operator
                            network through a single integration.
                        </p>
                    </div>

                    <div className="flow">
                        <div className="flow-col">
                            <h3>Studios</h3>
                            <span className="role">Game providers</span>
                            <ul>
                                <li>Revolver originals</li>
                                <li>Third-party partners</li>
                                <li>One integration, every client</li>
                            </ul>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col flow-hub">
                            <h3>GAP</h3>
                            <span className="role">Game Aggregation Platform</span>
                            <ul>
                                <li>Player auth &amp; game launch</li>
                                <li>Seamless wallet routing</li>
                                <li>Free spins &amp; jackpots</li>
                                <li>Automatic rollback &amp; recovery</li>
                                <li>Reporting, BI &amp; back office</li>
                            </ul>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col">
                            <h3>Operators</h3>
                            <span className="role">Casinos &amp; platforms</span>
                            <ul>
                                <li>One integration, 300+ games</li>
                                <li>Real money &amp; sweepstakes</li>
                                <li>Promotions in your API dialect</li>
                            </ul>
                        </div>
                    </div>

                    <div className="cap-grid">
                        {capabilities.map((c) => (
                            <div className="cap-card" key={c.title}>
                                <h3>{c.title}</h3>
                                <p>{c.blurb}</p>
                            </div>
                        ))}
                    </div>

                    <p className="cap-more">
                        <Link href="/rgs" className="btn btn-ghost">Meet the RGS →</Link>{" "}
                        <Link href="/gap" className="btn btn-ghost">Explore the GAP →</Link>
                    </p>

                    <div className="stat-row">
                        <div className="stat"><b>{games.length}<em>+</em></b><span>Original titles</span></div>
                        {stats.map((s) => (
                            <div className="stat" key={s.label}>
                                <b>{s.value}{s.suffix && <em>{s.suffix}</em>}</b>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CH.03 — games */}
            <section data-chamber id="games">
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">CH.03 — The Arsenal</p>
                        <div className="games-head">
                            <h2 className="display">Our games</h2>
                            <Link href="/games" className="btn btn-ghost">All {games.length} titles</Link>
                        </div>
                        <p className="lede">
                            Original HTML5 slots built in-house — concept, maths, art and sound —
                            available across real money, social and sweepstakes platforms.
                        </p>
                    </div>
                    <div className="game-grid">
                        {games.slice(0, 8).map((g) => <GameCard key={g.slug} game={g} />)}
                    </div>
                </div>
            </section>

            {/* CH.04 — partners */}
            <section data-chamber id="partners">
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">CH.04 — The Network</p>
                        <h2 className="display">Studios in, operators out</h2>
                    </div>
                    <div className="partner-split">
                        <div className="studio-list">
                            {partnerStudios.map((s) => (
                                <div className="studio-card" key={s.name}>
                                    <div>
                                        <h3>{s.name}</h3>
                                        <p className="known">{s.knownFor}</p>
                                    </div>
                                    <span className="genre">{s.genre}</span>
                                </div>
                            ))}
                            <p className="studio-cta">
                                Building games? Distribute them through GAP with a single
                                integration. <a href="#contact">Become a partner studio</a>
                            </p>
                        </div>
                        <div>
                            <div className="operator-wall">
                                {operators.map((o, i) => (
                                    <span key={o}>
                                        {o}
                                        {i < operators.length - 1 && <span className="sep"> ● </span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CH.05 — news */}
            <section data-chamber id="news">
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">CH.05 — Dispatches</p>
                        <h2 className="display">Latest news</h2>
                    </div>
                    <div className="news-list">
                        {news.map((n) => (
                            <Link className="news-row" key={n.slug} href={`/news/${n.slug}`}>
                                <span className="date">{newsDate(n.published_at)}</span>
                                <h3>{n.title}</h3>
                                <span className="arrow">→</span>
                            </Link>
                        ))}
                    </div>
                    <Link className="news-all" href="/news">View all news →</Link>
                </div>
            </section>

            {/* CH.06 — contact */}
            <section data-chamber id="contact">
                <div className="shell contact-grid">
                    <div className="contact-copy">
                        <p className="eyebrow">CH.06 — Last Chamber</p>
                        <h2 className="display">Talk<br /><em>business.</em></h2>
                        <p>
                            Operators, aggregators and studios — tell us what you're loading up,
                            and a member of the team will get back to you fast.
                        </p>
                        <div className="contact-segments">
                            {[
                                ["I run a casino", "Operator enquiry — book a demo"],
                                ["I'm an aggregator", "Aggregator enquiry"],
                                ["I build games", "Studio partnership enquiry"],
                            ].map(([label, subject]) => (
                                <a key={label} className="segment-chip"
                                    href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}`}>
                                    {label} <span className="arrow">→</span>
                                </a>
                            ))}
                        </div>
                        <div className="contact-facts">
                            <div className="fact">
                                <b>Email</b>
                                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                            </div>
                            <div className="fact">
                                <b>Phone</b>
                                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                            </div>
                            <div className="fact">
                                <b>Office</b>
                                {contact.address.map((l) => <div key={l}>{l}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="contact-reach">
                        <a className="btn btn-fire" href={`mailto:${contact.email}`}>Email the team</a>
                        <div className="social-block">
                            <h3>Follow the studio</h3>
                            <p>Launches, partnerships and news from the chamber.</p>
                            <ul className="social-list">
                                {socials.map((s) => (
                                    <li key={s.label}>
                                        <a href={s.url} target="_blank" rel="noopener">
                                            {s.label}
                                            <span className="arrow">→</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
