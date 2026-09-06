import type { Metadata } from "next";
import Link from "next/link";
import Ticker from "@/components/Ticker";
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
        <main>
            <section className="plat-hero" data-chamber>
                <div className="grid-mask" aria-hidden />
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">{p.kicker}</p>
                        <h1 className="display">The Game Aggregation<br /><em>Platform.</em></h1>
                        <p className="lede">
                            One platform, two sides. Studios bring their games in. Operators
                            take the whole catalogue out through a single integration.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Talk to the team</Link>
                            <Link href="/rgs" className="btn btn-ghost">License the RGS</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Ticker items={operators} label="Connected across the operator and aggregator network" />

            <section data-chamber className="rings-bg">
                <div className="shell">
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
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">For studios</p>
                        <h2 className="display">Get your <em>games out.</em></h2>
                        <p className="lede">Onboard to the platform and reach our operator network, whichever way your tech is set up.</p>
                    </div>
                    <div className="opt-grid">
                        {GAP_ROUTES.map((r, i) => (
                            <div className="opt-card" key={r.tag} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
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
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">For operators</p>
                        <h2 className="display">Get every <em>game in.</em></h2>
                        <p className="lede">
                            One integration to the platform and your lobby fills with Revolver&apos;s
                            own slots and originals plus every partner studio on the platform.
                        </p>
                    </div>
                    <ul className="checks" data-reveal>
                        {GAP_OPERATOR_POINTS.map((pt) => <li key={pt}>{pt}</li>)}
                    </ul>
                    <div className="roster roster-studios" data-reveal>
                        <div><b>Revolver</b><span>Slots &amp; originals</span></div>
                        {studios.map((s) => <div key={s.name}><b>{s.name}</b><span>{s.knownFor} · {s.genre}</span></div>)}
                        <div className="more"><b>+ More</b><span>Added continuously</span></div>
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="cta-card" data-reveal>
                        <p className="eyebrow">Last chamber</p>
                        <h2 className="display">Loaded and <em>ready?</em></h2>
                        <p className="lede">
                            Tell us what you&apos;re building and we&apos;ll show you how fast it can be live.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Talk to the team</Link>
                            <Link href="/games" className="btn btn-ghost">See the slots</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
