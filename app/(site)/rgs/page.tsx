import type { Metadata } from "next";
import Link from "next/link";
import CtaBlock from "@/components/CtaBlock";
import LabelRow from "@/components/LabelRow";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { getContact, getRgsStats, listOperators } from "@/lib/cms";
import { RGS_ENGINE, RGS_OPTIONS, pillar } from "@/lib/pillars";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "RGS licensing — Revolver Gaming",
    description:
        "License the Revolver Remote Gaming Server, independent or fully managed. A UKGC-licensed engine with a multiplayer-ready GDK, promo and jackpot tools, and distribution built in.",
};

export default async function Rgs() {
    const [stats, contact, operators] = await Promise.all([getRgsStats(), getContact(), listOperators()]);
    const p = pillar("rgs");
    return (
        <main id="main">
            <PageHero
                kicker={p.kicker}
                title={<>{p.title[0]} <em>{p.title[1]}</em></>}
                lede="Have games but no server, or want to serve your players exclusive content? License the Revolver RGS and reach the market through our distribution network. Two ways to run it."
            >
                <div className="hero-ctas">
                    <Link href="/#contact" className="btn btn-fire">Talk licensing</Link>
                    <Link href="/gap" className="btn btn-ghost">See the distribution</Link>
                </div>
            </PageHero>

            <section data-chamber>
                <div className="shell indent">
                    <div className="stats row" data-reveal>
                        {stats.map((s) => (
                            <div key={s.label}>
                                <b>{s.value}{s.suffix && <em>{s.suffix}</em>}</b>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <SectionHead kicker="Two ways to run it" title={<>Independent or <em>managed.</em></>} />
                    <div className="indent opt-grid" data-reveal>
                        {RGS_OPTIONS.map((o) => (
                            <div className="opt-card" key={o.tag}>
                                <span className="tag">{o.tag}</span>
                                <h3>{o.title}</h3>
                                <p>{o.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <SectionHead kicker="More than an RGS" title={<>The full <em>engine room.</em></>} />
                    <div className="indent">
                        <div className="feat-grid" data-reveal>
                            {RGS_ENGINE.map((f) => (
                                <div className="feat" key={f.title}>
                                    <h3>{f.title}</h3>
                                    <p>{f.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="trust" data-reveal>
                            <b className="mark">UKGC</b>
                            <p>
                                {contact.license} Regulation isn&apos;t bolted on afterwards —
                                it&apos;s the standard the whole engine is built to.
                            </p>
                            <a className="btn btn-ghost btn-sm" href={contact.license_url} target="_blank" rel="noopener">
                                View the register →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <LabelRow label="Plug into the network" reveal>
                        <h2 className="display sub-h2 lead-in">Distribution, ready <em>on day one.</em></h2>
                        <p className="lede">
                            License the Revolver RGS and you inherit our reach. Connected
                            across leading operators and aggregators, with new hook-ups added fast.
                        </p>
                        <div className="tgrid roster">
                            {operators.map((o) => <div key={o}>{o}</div>)}
                            <div className="more"><b>+ More</b><span>Added continuously</span></div>
                        </div>
                    </LabelRow>
                </div>
            </section>

            <CtaBlock
                title={<>Load it <em>your way.</em></>}
                lede="Tell us what you're building and how you want to run it. We'll show you the engine live, with your games on it."
            >
                <Link href="/#contact" className="btn btn-fire">Talk licensing</Link>
                <Link href="/gap" className="btn btn-ghost">Explore the platform</Link>
            </CtaBlock>
        </main>
    );
}
