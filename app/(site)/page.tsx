import Link from "next/link";
import HeroSlides from "@/components/HeroSlides";
import GameCard from "@/components/GameCard";
import { OriginalsShowcase, liveCount } from "@/components/Originals";
import BespokeBanner from "@/components/BespokeBanner";
import NewsCards from "@/components/NewsCards";
import ContactPanel from "@/components/ContactPanel";
import PartnerLogo from "@/components/PartnerLogo";
import Ticker from "@/components/Ticker";
import {
    getHeroSlides, getStudioOffer, listGames, listNews, listOperators, listOriginals, listPartnerStudios,
} from "@/lib/cms";
import {
    GAP_OPERATOR_POINTS, GAP_ROUTES, OPERATOR_INTEGRATIONS, RGS_ENGINE, RGS_OPTIONS, THIRD_PARTY_GAMES, pillar,
} from "@/lib/pillars";

export const revalidate = 300;

/* Section copy follows Ryan's homepage wireframe (revolver-gaming-redesign-v9). */
export default async function Home() {
    const [news, games, studios, operators, originalGames, offer, slides] = await Promise.all([
        listNews(3), listGames(), listPartnerStudios(), listOperators(), listOriginals(), getStudioOffer(), getHeroSlides(),
    ]);
    const featured = games.filter((g) => g.featured);
    const originals = pillar("originals"), rgs = pillar("rgs");
    const live = featured.filter((g) => !g.coming_soon);
    return (
        <main>
            {/* hero */}
            <section className="hero" data-chamber id="top">
                <div className="grid-mask" aria-hidden />
                <div className="shell">
                    <HeroSlides slides={slides} />
                    <div className="hero-meta">
                        <span>Games studio</span>
                        <span>Branded originals</span>
                        <span>Licensed RGS</span>
                        <span>Game aggregation + distribution</span>
                    </div>
                </div>
            </section>

            <Ticker items={operators} label="Connected across the operator and aggregator network" />

            {/* about */}
            <section className="on-bone" data-chamber id="about">
                <div className="shell split">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Since 2010</p>
                        <h2 className="display">Where a games studio became a <em>platform.</em></h2>
                        <p className="lede">
                            Established in 2010, Revolver is a licensed games software
                            provider, built on a games portfolio operators come back for. That
                            is still the core, and still the thing most platforms can&apos;t offer.
                        </p>
                        <p className="lede">
                            Today it sits inside a full stack: brandable casual originals, a
                            licensable RGS with distribution, and the aggregation platform.
                            Founder-led, close to the detail, no legacy weight.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/rgs" className="btn btn-ghost">How it works</Link>
                        </div>
                    </div>
                    <div className="mini-stats" data-reveal>
                        <div className="wordmark"><b>UKGC + MGA</b><span>Licensed &amp; compliant</span></div>
                        <div><b>{games.length}+</b><span>Original games</span></div>
                        <div><b>{liveCount(originalGames)}+</b><span>Casual originals</span></div>
                        <div><b>{THIRD_PARTY_GAMES}</b><span>3rd-party games</span></div>
                        <div><b>{OPERATOR_INTEGRATIONS}</b><span>Operator integrations</span></div>
                        <div><b>RGS</b><span>License &amp; distribution</span></div>
                    </div>
                </div>
            </section>

            {/* slots */}
            <section className="art-bg" data-chamber id="slots" style={{ "--art": `url(${live[0]?.image})` } as React.CSSProperties}>
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">Games · our core</p>
                            <h2 className="display">The <em>arsenal.</em></h2>
                            <p className="lede">
                                Original games built in-house from concept to cabinet, ready to
                                license and brand as your own. Flagship Irish Coins, branded IP
                                collaborations and seasonal editions engineered for real uplift.
                                This is the business we were founded on.
                            </p>
                        </div>
                        <Link href="/games" className="btn btn-ghost">See all titles →</Link>
                    </div>
                    <div className="tag-bar" data-reveal>
                        {["Licensable", "Brandable", "Proven performers", "RNG & Game Certified"].map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <div className="game-grid game-grid-mini game-grid-dark">
                        {games.slice(0, 6).map((g, i) => (
                            <div key={g.slug} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                                <GameCard game={g} />
                            </div>
                        ))}
                    </div>
                    <div className="see-more"><Link href="/games" className="btn btn-ghost">See more titles →</Link></div>
                </div>
            </section>

            {/* originals */}
            <section data-chamber id="originals" className="dots-bg">
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">{originals.kicker}</p>
                            <h2 className="display">{originals.title[0]} <em>{originals.title[1]}</em></h2>
                            <p className="lede">{originals.lede}</p>
                        </div>
                        <Link href={originals.href} className="btn btn-ghost">{originals.cta} →</Link>
                    </div>
                    <div className="tag-bar" data-reveal>
                        {["Provably fair", "Fully brandable", "New releases monthly"].map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <OriginalsShowcase items={originalGames} limit={8} />
                    <div className="see-more"><Link href={originals.href} className="btn btn-ghost">See more titles →</Link></div>
                </div>
            </section>

            {/* rgs */}
            <section className="on-bone" data-chamber id="rgs">
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">{rgs.kicker}</p>
                            <h2 className="display">{rgs.title[0]} <em>{rgs.title[1]}</em></h2>
                            <p className="lede">
                                Have games but no server, or want to serve your players exclusive
                                content? License the Revolver RGS and reach the market through our
                                distribution network. Independent, managed or hybrid models to
                                suit your individual requirements.
                            </p>
                        </div>
                        <Link href={rgs.href} className="btn btn-ghost">{rgs.cta} →</Link>
                    </div>
                    <div className="opt-grid">
                        {RGS_OPTIONS.map((o, i) => (
                            <div className="opt-card" key={o.tag} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
                                <span className="tag">{o.tag}</span>
                                <h3>{o.title}</h3>
                                <p>{o.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="section-head sub-head" data-reveal>
                        <p className="eyebrow">More than an RGS</p>
                        <h2 className="display">The full engine room.</h2>
                    </div>
                    <div className="feat-grid">
                        {RGS_ENGINE.map((f, i) => (
                            <div className="feat-card" key={f.title} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="section-head sub-head" data-reveal>
                        <p className="eyebrow">Plug into the network</p>
                        <h2 className="display">Distribution, ready on day one.</h2>
                        <p className="lede">
                            License the Revolver RGS and you inherit our reach. Connected across
                            leading operators and aggregators, with new hook-ups added fast.
                        </p>
                    </div>
                    <div className="roster" data-reveal>
                        {operators.map((o) => <div key={o.name}><PartnerLogo {...o} /></div>)}
                        <div className="more"><b>+ More</b></div>
                    </div>
                </div>
            </section>

            {/* gap */}
            <section data-chamber id="gap" className="rings-bg">
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">Platform · aggregation</p>
                            <h2 className="display">The Game Aggregation <em>Platform.</em></h2>
                            <p className="lede">
                                One platform, two sides. Studios bring their games in. Operators
                                take the whole catalogue out through a single integration.
                            </p>
                        </div>
                        <Link href="/gap" className="btn btn-ghost">Join the platform →</Link>
                    </div>

                    <div className="flow" data-reveal>
                        <div className="flow-col">
                            <span className="role">Games in</span>
                            <h3>Studios</h3>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col flow-hub">
                            <div className="flow-hub-head">
                                <h3>Revolver Platform</h3>
                                <span className="role">One integration</span>
                            </div>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col">
                            <span className="role">Games out</span>
                            <h3>Operators</h3>
                        </div>
                    </div>

                    <div className="gap-side" data-reveal>
                        <p className="eyebrow">For studios</p>
                        <h3 className="sub-display">Get your games out.</h3>
                        <p className="lede">
                            Onboard to the platform and reach our operator network, whichever way
                            your tech is set up.
                        </p>
                        <div className="opt-grid">
                            {GAP_ROUTES.map((r) => (
                                <div className="opt-card" key={r.tag}>
                                    <span className="tag">{r.tag}</span>
                                    <h3>{r.title}</h3>
                                    <p>{r.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="gap-side" data-reveal>
                        <p className="eyebrow">For operators</p>
                        <h3 className="sub-display">Get every game in.</h3>
                        <p className="lede">
                            One integration to the platform and your lobby fills with Revolver&apos;s
                            own games and originals plus every partner studio on the platform.
                        </p>
                        <ul className="checks">
                            {GAP_OPERATOR_POINTS.map((pt) => <li key={pt}>{pt}</li>)}
                        </ul>
                        <div className="roster roster-studios">
                            <div><PartnerLogo name="Revolver Gaming" logo="/brand/logo-horizontal-white.svg" logoScale={1.2} /><span>Games &amp; originals</span></div>
                            {studios.map((s) => <div key={s.name}><PartnerLogo {...s} /><span>{s.knownFor} · {s.genre}</span></div>)}
                            <div className="more"><b>+ More</b></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* exclusives */}
            <section data-chamber id="exclusives" className="on-bone">
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">Exclusives · bespoke</p>
                            <h2 className="display">Built for you. <em>Branded as you.</em></h2>
                            <p className="lede">{offer.intro}</p>
                        </div>
                        <Link href="/exclusives" className="btn btn-ghost">How it works →</Link>
                    </div>
                    <div className="feat-grid feat-grid-4 excl-cards">
                        {offer.cards.map((c, i) => (
                            <div className="feat-card" key={c.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                                <h3>{c.title}</h3>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                    <BespokeBanner games={games} />
                </div>
            </section>

            {/* news */}
            <section data-chamber id="news">
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">Dispatches</p>
                            <h2 className="display">Latest from the <em>barrel.</em></h2>
                        </div>
                        <Link href="/news" className="btn btn-ghost">All news →</Link>
                    </div>
                    <NewsCards items={news} />
                </div>
            </section>

            {/* contact */}
            <section data-chamber id="contact">
                <div className="shell">
                    <ContactPanel />
                </div>
            </section>
        </main>
    );
}
