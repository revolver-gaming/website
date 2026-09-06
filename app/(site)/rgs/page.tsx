import type { Metadata } from "next";
import Link from "next/link";
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
        <main>
            <section className="plat-hero rings-bg" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">{p.kicker}</p>
                        <h1 className="display">{p.title[0]}<br /><em>{p.title[1]}</em></h1>
                        <p className="lede">
                            Have games but no server, or want to serve your players exclusive
                            content? License the Revolver RGS and reach the market through our
                            distribution network. Two ways to run it.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Talk licensing</Link>
                            <Link href="/gap" className="btn btn-ghost">See the distribution</Link>
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
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Two ways to run it</p>
                        <h2 className="display">Independent or <em>managed</em></h2>
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
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">More than an RGS</p>
                        <h2 className="display">The full <em>engine room</em></h2>
                    </div>
                    <div className="feat-grid">
                        {RGS_ENGINE.map((f, i) => (
                            <div className="feat-card" key={f.title} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="trust-band" data-reveal>
                        <b className="mark">UKGC</b>
                        <p>
                            {contact.license} Regulation isn&apos;t bolted on afterwards —
                            it&apos;s the standard the whole engine is built to.
                        </p>
                        <a className="btn btn-ghost" href={contact.license_url} target="_blank" rel="noopener">
                            View the register →
                        </a>
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Plug into the network</p>
                        <h2 className="display">Distribution, ready <em>on day one</em></h2>
                        <p className="lede">
                            License the Revolver RGS and you inherit our reach. Connected
                            across leading operators and aggregators, with new hook-ups added fast.
                        </p>
                    </div>
                    <div className="roster" data-reveal>
                        {operators.map((o) => <div key={o}><b>{o}</b></div>)}
                        <div className="more"><b>+ More</b><span>Added continuously</span></div>
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="cta-card" data-reveal>
                        <p className="eyebrow">Last chamber</p>
                        <h2 className="display">Load it <em>your way.</em></h2>
                        <p className="lede">
                            Tell us what you&apos;re building and how you want to run it.
                            We&apos;ll show you the engine live, with your games on it.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Talk licensing</Link>
                            <Link href="/gap" className="btn btn-ghost">Explore the platform</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
