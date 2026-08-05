import Link from "next/link";
import Cylinder from "@/components/Cylinder";
import GameCard from "@/components/GameCard";
import {
    getContact, getPlatformStats, listGames, listNews,
    listOperators, listPartnerStudios, newsDateShort,
} from "@/lib/cms";

const gapChips = [
    "Wallet routing", "Auth & launch", "Free spins & jackpots",
    "Rollback & recovery", "Reporting & BI",
];

const capabilities = [
    {
        title: "Same-day integration.",
        text: "The easiest hookup in the business — AI-accelerated adapters map even the hardest wallet APIs in minutes, and we happily work in reverse against your own spec.",
    },
    {
        title: "Promotions engine.",
        text: "Free spins and four-tier jackpots, served in your platform's own bonus API dialect.",
    },
    {
        title: "Back office & BI.",
        text: "Tenant-scoped dashboards, round replay, one-click Excel export.",
    },
    {
        title: "Reliability & fairness.",
        text: "Self-healing rounds; RNG re-tested against the NIST suite every 12 hours.",
    },
    {
        title: "Regulation-ready.",
        text: "UKGC licensed with per-license configuration profiles.",
    },
    {
        title: "Global reach.",
        text: "Games in 18 languages and a dedicated sweepstakes stack.",
    },
];

export const revalidate = 300;

export default async function Home() {
    const [news, games, partnerStudios, operators, contact, stats] = await Promise.all([
        listNews(3), listGames(), listPartnerStudios(), listOperators(),
        getContact(), getPlatformStats(),
    ]);
    const featuredGames = games.filter((g) => g.featured);
    const studios = partnerStudios.slice(0, 3);
    const moreStudios = partnerStudios.length - studios.length;
    return (
        <main>
            {/* CH.01 — hero */}
            <section className="hero" data-chamber id="top">
                <div className="shell hero-grid">
                    <div className="hero-copy">
                        <p className="eyebrow">CH.01 — London, W1</p>
                        <h1 className="display">
                            One integration.<br />
                            <span className="amp">300+ games.</span>
                        </h1>
                        <p>
                            Our originals, our partner studios and a UKGC-licensed engine —
                            routed into your lobby through GAP, the Revolver Game Aggregation
                            Platform. Live the same day.
                        </p>
                        <div className="hero-ctas">
                            <a href="#contact" className="btn btn-fire">Book a demo</a>
                            <Link href="/gap" className="btn btn-ghost">See the platform</Link>
                        </div>
                        <div className="hero-meta">
                            <span>UKGC licensed</span>
                            <span>{games.length} originals</span>
                            <span>{operators.length}+ operators</span>
                            <span>Since 2010</span>
                        </div>
                    </div>
                    <Cylinder games={featuredGames} />
                </div>
            </section>

            {/* CH.02 — platform */}
            <section data-chamber id="platform">
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">CH.02 — The Platform</p>
                        <h2 className="display">One platform, both sides of the deal</h2>
                        <p className="lede">
                            A UKGC-licensed studio and an aggregator in one. Our RGS runs the
                            games; GAP connects them to the operator network through a single
                            integration.
                        </p>
                    </div>

                    <div className="flow">
                        <div className="flow-col">
                            <span className="role">Games in</span>
                            <h3>Studios</h3>
                            <p>
                                Revolver originals plus {partnerStudios.length} partner
                                studios — 300+ titles ready to route.
                            </p>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col flow-hub">
                            <div className="flow-hub-head">
                                <h3>GAP</h3>
                                <span className="role">One integration</span>
                            </div>
                            <div className="flow-chips">
                                {gapChips.map((c) => <span key={c}>{c}</span>)}
                            </div>
                            <p>Per-jurisdiction rules applied as config, not custom builds.</p>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col">
                            <span className="role">Games out</span>
                            <h3>Operators</h3>
                            <p>
                                Real money, social and sweepstakes casinos — live in the
                                lobby day one.
                            </p>
                        </div>
                    </div>

                    <div className="stat-row">
                        {stats.map((s) => (
                            <div className="stat" key={s.label}>
                                <b>{s.value}{s.suffix && <em>{s.suffix}</em>}</b>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="cap-rows">
                        {capabilities.map((c) => (
                            <div className="cap-row" key={c.title}>
                                <b>{c.title}</b> {c.text}
                            </div>
                        ))}
                        <div className="cap-row links">
                            <Link href="/gap">Explore the GAP →</Link>
                            <Link href="/rgs">Meet the RGS →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CH.03 — games */}
            <section className="on-bone" data-chamber id="games">
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head">
                            <p className="eyebrow">CH.03 — The Arsenal</p>
                            <h2 className="display">Our games</h2>
                            <p className="lede">
                                Original HTML5 slots built in-house — concept, maths, art
                                and sound.
                            </p>
                        </div>
                        <Link href="/games" className="btn btn-ghost">All {games.length} titles →</Link>
                    </div>
                    <div className="game-grid game-grid-mini">
                        {games.slice(0, 6).map((g) => <GameCard key={g.slug} game={g} />)}
                    </div>
                </div>
            </section>

            {/* CH.04 — network */}
            <section data-chamber id="partners">
                <div className="shell network-split">
                    <div className="section-head">
                        <p className="eyebrow">CH.04 — The Network</p>
                        <h2 className="display">Studios in, operators out</h2>
                        <p className="lede">
                            Building games? Distribute them through GAP with a single
                            integration.
                        </p>
                        <a href="#contact" className="network-cta">Become a partner studio →</a>
                    </div>
                    <div className="studio-list">
                        {studios.map((s) => (
                            <div className="studio-card" key={s.name}>
                                <div>
                                    <h3>{s.name}</h3>
                                    <p className="known">{s.knownFor}</p>
                                </div>
                                <span className="genre">{s.genre}</span>
                            </div>
                        ))}
                        {moreStudios > 0 && (
                            <p className="studio-more">
                                + {moreStudios} more studios · 300+ titles routed through GAP
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <div className="ticker" aria-hidden>
                <div className="ticker-track">
                    {[0, 1].map((n) => (
                        <span key={n}>
                            {operators.map((o) => <span key={o}>{o}</span>)}
                        </span>
                    ))}
                </div>
            </div>

            {/* CH.05 — news */}
            <section data-chamber id="news">
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head">
                            <p className="eyebrow">CH.05 — Dispatches</p>
                            <h2 className="display">Latest news</h2>
                        </div>
                        <Link href="/news" className="btn btn-ghost">All news →</Link>
                    </div>
                    <div className="news-list">
                        {news.map((n) => (
                            <Link className="news-row" key={n.slug} href={`/news/${n.slug}`}>
                                <span className="date">{newsDateShort(n.published_at)}</span>
                                <h3>{n.title}</h3>
                                <span className="arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CH.06 — contact */}
            <section data-chamber id="contact">
                <div className="shell">
                    <div className="contact-panel">
                        <div className="contact-copy">
                            <p className="eyebrow">CH.06 — Last Chamber</p>
                            <h2 className="display">Talk business<em>.</em></h2>
                            <p>
                                Tell us what you&apos;re loading up, and a member of the team
                                gets back to you fast.
                            </p>
                            <div className="contact-line">
                                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                {" · "}
                                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                                <br />
                                {contact.address.join(", ")}
                            </div>
                        </div>
                        <div className="contact-pills">
                            {[
                                ["I run a casino", "Operator enquiry", true],
                                ["I'm an aggregator", "Aggregator enquiry", false],
                                ["I build games", "Studio partnership", false],
                            ].map(([label, subject, fire]) => (
                                <a
                                    key={label as string}
                                    className={`contact-pill${fire ? " fire" : ""}`}
                                    href={`mailto:${contact.email}?subject=${encodeURIComponent(subject as string)}`}
                                >
                                    <span>{label}</span><span>→</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
