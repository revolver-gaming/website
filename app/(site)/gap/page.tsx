import type { Metadata } from "next";
import Link from "next/link";
import CtaBlock from "@/components/CtaBlock";
import OperatorBand from "@/components/OperatorBand";
import PageHero from "@/components/PageHero";
import { Flow, StudioRoster } from "@/components/Platform";
import SectionHead from "@/components/SectionHead";
import { listOperators, listPartnerStudios } from "@/lib/cms";
import { GAP_OPERATOR_POINTS, GAP_ROUTES, pillar } from "@/lib/pillars";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Platform — Game Aggregation — Revolver Gaming",
    description:
        "The Revolver Game Aggregation Platform: studios bring games in through one integration, operators take the whole catalogue out — Revolver slots and originals plus every partner studio.",
};

/* Copy is Ryan's (wireframe v7). Nothing here that isn't in his text. */
export default async function Gap() {
    const [operators, studios] = await Promise.all([listOperators(), listPartnerStudios()]);
    const p = pillar("gap");
    return (
        <main id="main">
            <PageHero
                kicker={p.kicker}
                title={<>The Game Aggregation <em>Platform.</em></>}
                lede="One platform, two sides. Studios bring their games in. Operators take the whole catalogue out through a single integration."
            >
                <div className="hero-ctas">
                    <Link href="/#contact" className="btn btn-fire">Talk to the team</Link>
                    <Link href="/rgs" className="btn btn-ghost">License the RGS</Link>
                </div>
            </PageHero>

            <OperatorBand items={operators} label="Connected across the operator and aggregator network" />

            <section data-chamber>
                <div className="shell indent">
                    <Flow />
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <SectionHead
                        kicker="For studios"
                        title={<>Get your <em>games out.</em></>}
                        lede="Onboard to the platform and reach our operator network, whichever way your tech is set up."
                    />
                    <div className="indent opt-grid" data-reveal>
                        {GAP_ROUTES.map((r) => (
                            <div className="opt-card" key={r.tag}>
                                <span className="tag">{r.tag}</span>
                                <h3>{r.title}</h3>
                                <p>{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <SectionHead
                        kicker="For operators"
                        title={<>Get every <em>game in.</em></>}
                        lede="One integration to the platform and your lobby fills with Revolver's own slots and originals plus every partner studio on the platform."
                    />
                    <div className="indent" data-reveal>
                        <ul className="checks">
                            {GAP_OPERATOR_POINTS.map((pt) => <li key={pt}>{pt}</li>)}
                        </ul>
                        <StudioRoster studios={studios} />
                    </div>
                </div>
            </section>

            <CtaBlock
                title={<>Loaded and <em>ready?</em></>}
                lede="Tell us what you're building and we'll show you how fast it can be live."
            >
                <Link href="/#contact" className="btn btn-fire">Talk to the team</Link>
                <Link href="/games" className="btn btn-ghost">See the slots</Link>
            </CtaBlock>
        </main>
    );
}
