import Link from "next/link";
import HeroDeck from "@/components/HeroDeck";
import HeroSlides from "@/components/HeroSlides";
import HomeSlots from "@/components/HomeSlots";
import ValueProps from "@/components/ValueProps";
import OriginalsTiles from "@/components/OriginalsTiles";
import BespokeBanner from "@/components/BespokeBanner";
import NewsCards from "@/components/NewsCards";
import ContactPanel from "@/components/ContactPanel";
import Ticker from "@/components/Ticker";
import { listGames, listNews, listOperators, listPartnerStudios } from "@/lib/cms";
import {
    GAP_OPERATOR_POINTS, GAP_ROUTES, RGS_ENGINE, RGS_OPTIONS, pillar,
} from "@/lib/pillars";

export const revalidate = 300;

/* Section copy follows Ryan's homepage wireframe (revolver-gaming-redesign-v7). */
export default async function Home() {
    const [news, games, studios, operators] = await Promise.all([
        listNews(3), listGames(), listPartnerStudios(), listOperators(),
    ]);
    const featured = games.filter((g) => g.featured);
    const originals = pillar("originals"), rgs = pillar("rgs");
    return (
        <main>
            {/* hero */}
            <section className="hero" data-chamber id="top">
                <div className="grid-mask" aria-hidden />
                <div className="shell hero-grid">
                    <HeroSlides />
                    <HeroDeck games={featured} />
                </div>
                <div className="shell">
                    <div className="hero-meta">
                        <span>UKGC licensed</span>
                        <span>{games.length} original slots</span>
                        <span>Brandable originals</span>
                        <span>RGS + distribution</span>
                    </div>
                </div>
            </section>

            <Ticker items={operators} label="Connected across the operator and aggregator network" />

            {/* value props */}
            <section data-chamber id="why">
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Precision engineered</p>
                        <h2 className="display">Tech that fires on <em>every cylinder.</em></h2>
                    </div>
                    <ValueProps games={featured} />
                </div>
            </section>

            {/* about */}
            <section className="on-bone" data-chamber id="about">
                <div className="shell split">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Since 2010</p>
                        <h2 className="display">Where a slots studio became a <em>platform.</em></h2>
                        <p className="lede">
                            Revolver has been a licensed games software provider since 2010,
                            built on a slots portfolio operators come back for. That is still
                            the core, and still the thing most platforms can&apos;t offer.
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
                        <div><b>UKGC</b><span>Licensed &amp; regulated</span></div>
                        <div><b>{games.length}</b><span>Original slots</span></div>
                        <div><b>2</b><span>Platform integration routes</span></div>
                        <div><b>{operators.length}+</b><span>Operator integrations</span></div>
                    </div>
                </div>
            </section>

            {/* slots */}
            <section className="art-bg" data-chamber id="slots" style={{ "--art": `url(${featured[0]?.image})` } as React.CSSProperties}>
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">Slots · our core</p>
                            <h2 className="display">The <em>arsenal.</em></h2>
                            <p className="lede">
                                Original slots built in-house from concept to cabinet, ready to
                                license and brand as your own. Flagship Irish Coins, branded IP
                                collaborations and seasonal editions engineered for real uplift.
                                This is the business we were founded on.
                            </p>
                        </div>
                        <Link href="/games" className="btn btn-ghost">See all {games.length} titles →</Link>
                    </div>
                    <div className="tag-bar" data-reveal>
                        {["Licensable", "Brandable", "Proven performers", "UKGC licensed"].map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <HomeSlots games={games.slice(0, 6)} />
                </div>
            </section>

            {/* originals */}
            <section data-chamber id="originals" className="dots-bg">
                <div className="shell">
                    <div className="section-row">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">{originals.kicker}</p>
                            <h2 className="display">{originals.title[0]} <em>{originals.title[1]}</em></h2>
                            <p className="lede">
                                Fast, modern casual games in provably fair and RNG formats, every
                                one brandable to your casino. We can stand up a complete originals
                                lobby under your brand, with new titles landing every month.
                            </p>
                        </div>
                        <Link href={originals.href} className="btn btn-ghost">{originals.cta} →</Link>
                    </div>
                    <div className="tag-bar" data-reveal>
                        {["Provably fair + RNG", "Fully brandable", "Full lobby", "New titles monthly"].map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <OriginalsTiles />
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
                                distribution network. Two ways to run it.
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
                        {operators.map((o) => <div key={o}><b>{o}</b></div>)}
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
                            own slots and originals plus every partner studio on the platform.
                        </p>
                        <ul className="checks">
                            {GAP_OPERATOR_POINTS.map((pt) => <li key={pt}>{pt}</li>)}
                        </ul>
                        <div className="roster roster-studios">
                            <div><b>Revolver</b><span>Slots &amp; originals</span></div>
                            {studios.map((s) => <div key={s.name}><b>{s.name}</b><span>{s.knownFor} · {s.genre}</span></div>)}
                            <div className="more"><b>+ More</b><span>Added continuously</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* exclusives */}
            <section data-chamber id="exclusives" className="tight">
                <div className="shell">
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
