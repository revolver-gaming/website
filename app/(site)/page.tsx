import Link from "next/link";
import HeroDeck from "@/components/HeroDeck";
import HeroSlides from "@/components/HeroSlides";
import HomeSlots from "@/components/HomeSlots";
import ValueProps from "@/components/ValueProps";
import OriginalsTiles from "@/components/OriginalsTiles";
import BespokeBanner from "@/components/BespokeBanner";
import NewsCards from "@/components/NewsCards";
import ContactPanel from "@/components/ContactPanel";
import OperatorBand from "@/components/OperatorBand";
import LabelRow from "@/components/LabelRow";
import SectionHead from "@/components/SectionHead";
import { Flow, StudioRoster } from "@/components/Platform";
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
    const featured = games.filter((g) => g.featured).slice(0, 6);
    const originals = pillar("originals"), rgs = pillar("rgs");
    return (
        <main id="main">
            {/* hero */}
            <section className="hero" id="top">
                <div className="shell hero-grid">
                    <HeroSlides />
                    <HeroDeck games={featured.length ? featured : games.slice(0, 6)} />
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

            <OperatorBand items={operators} label="Connected across the operator and aggregator network" />

            {/* value props */}
            <section data-chamber id="why">
                <div className="shell">
                    <LabelRow label="Precision engineered" head reveal>
                        <h2 className="display sec-h2">Tech that fires on <em>every cylinder.</em></h2>
                    </LabelRow>
                    <ValueProps />
                </div>
            </section>

            {/* about */}
            <section className="on-bone" data-chamber id="about">
                <div className="shell">
                    <LabelRow label="Since 2010" reveal>
                        <div className="split">
                            <div className="split-copy">
                                <h2 className="display">Where a slots studio became a <em>platform.</em></h2>
                                <p>
                                    Revolver has been a licensed games software provider since 2010,
                                    built on a slots portfolio operators come back for. That is still
                                    the core, and still the thing most platforms can&apos;t offer.
                                </p>
                                <p>
                                    Today it sits inside a full stack: brandable casual originals, a
                                    licensable RGS with distribution, and the aggregation platform.
                                    Founder-led, close to the detail, no legacy weight.
                                </p>
                                <Link href="/rgs" className="btn btn-ghost">How it works</Link>
                            </div>
                            <div className="stats">
                                <div><b>UKGC</b><span>Licensed &amp; regulated</span></div>
                                <div><b>{games.length}</b><span>Original slots</span></div>
                                <div><b>2</b><span>Platform integration routes</span></div>
                                <div><b>{operators.length}+</b><span>Operator integrations</span></div>
                            </div>
                        </div>
                    </LabelRow>
                </div>
            </section>

            {/* slots */}
            <section data-chamber id="slots">
                <div className="shell">
                    <SectionHead
                        kicker="Slots · our core"
                        title={<>The <em>arsenal.</em></>}
                        lede="Original slots built in-house from concept to cabinet, ready to license and brand as your own. Flagship Irish Coins, branded IP collaborations and seasonal editions engineered for real uplift. This is the business we were founded on."
                        tags={["Licensable", "Brandable", "Proven performers", "UKGC licensed"]}
                        cta={{ label: `See all ${games.length} titles`, href: "/games" }}
                    />
                    <div className="indent">
                        <HomeSlots games={games.slice(0, 6)} />
                    </div>
                </div>
            </section>

            {/* originals */}
            <section data-chamber id="originals">
                <div className="shell">
                    <SectionHead
                        kicker={originals.kicker}
                        title={<>{originals.title[0]} <em>{originals.title[1]}</em></>}
                        lede="Fast, modern casual games in provably fair and RNG formats, every one brandable to your casino. We can stand up a complete originals lobby under your brand, with new titles landing every month."
                        tags={["Provably fair + RNG", "Fully brandable", "Full lobby", "New titles monthly"]}
                        cta={{ label: originals.cta, href: originals.href }}
                    />
                    <div className="indent">
                        <OriginalsTiles />
                    </div>
                </div>
            </section>

            {/* rgs */}
            <section className="on-bone" data-chamber id="rgs">
                <div className="shell">
                    <SectionHead
                        kicker={rgs.kicker}
                        title={<>{rgs.title[0]} <em>{rgs.title[1]}</em></>}
                        lede="Have games but no server, or want to serve your players exclusive content? License the Revolver RGS and reach the market through our distribution network. Two ways to run it."
                        cta={{ label: rgs.cta, href: rgs.href }}
                    />
                    <div className="indent opt-grid" data-reveal>
                        {RGS_OPTIONS.map((o) => (
                            <div className="opt-card" key={o.tag}>
                                <span className="tag">{o.tag}</span>
                                <h3>{o.title}</h3>
                                <p>{o.text}</p>
                            </div>
                        ))}
                    </div>

                    <LabelRow label="More than an RGS" sub reveal>
                        <h2 className="display sub-h2">The full engine room.</h2>
                        <div className="feat-grid">
                            {RGS_ENGINE.map((f) => (
                                <div className="feat" key={f.title}>
                                    <h3>{f.title}</h3>
                                    <p>{f.text}</p>
                                </div>
                            ))}
                        </div>
                    </LabelRow>

                    <LabelRow label="Plug into the network" sub reveal>
                        <h2 className="display sub-h2 lead-in">Distribution, ready on day one.</h2>
                        <p className="lede">
                            License the Revolver RGS and you inherit our reach. Connected across
                            leading operators and aggregators, with new hook-ups added fast.
                        </p>
                        <div className="tgrid roster">
                            {operators.map((o) => <div key={o}>{o}</div>)}
                        </div>
                    </LabelRow>
                </div>
            </section>

            {/* gap */}
            <section data-chamber id="gap">
                <div className="shell">
                    <SectionHead
                        kicker="Platform · aggregation"
                        title={<>The Game Aggregation <em>Platform.</em></>}
                        lede="One platform, two sides. Studios bring their games in. Operators take the whole catalogue out through a single integration."
                        cta={{ label: "Join the platform", href: "/gap" }}
                    />
                    <div className="indent">
                        <Flow />
                    </div>

                    <LabelRow label="For studios" sub reveal>
                        <h3 className="display sub-h2 lead-in">Get your games out.</h3>
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
                    </LabelRow>

                    <LabelRow label="For operators" sub reveal>
                        <h3 className="display sub-h2 lead-in">Get every game in.</h3>
                        <p className="lede">
                            One integration to the platform and your lobby fills with Revolver&apos;s
                            own slots and originals plus every partner studio on the platform.
                        </p>
                        <ul className="checks">
                            {GAP_OPERATOR_POINTS.map((pt) => <li key={pt}>{pt}</li>)}
                        </ul>
                        <StudioRoster studios={studios} />
                    </LabelRow>
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
                    <SectionHead
                        kicker="Dispatches"
                        title={<>Latest from the <em>barrel.</em></>}
                        cta={{ label: "All news", href: "/news" }}
                    />
                    <div className="indent">
                        <NewsCards items={news} />
                    </div>
                </div>
            </section>

            {/* contact */}
            <section className="on-bone" data-chamber id="contact">
                <div className="shell">
                    <LabelRow label="Contact">
                        <ContactPanel />
                    </LabelRow>
                </div>
            </section>
        </main>
    );
}
