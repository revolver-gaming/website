import type { Metadata } from "next";
import Link from "next/link";
import Ticker from "@/components/Ticker";
import { getPlatformStats, listOperators, listPartnerStudios } from "@/lib/cms";
import { GAP_OPERATOR_POINTS, GAP_ROUTES, pillar } from "@/lib/pillars";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Platform — Game Aggregation — Revolver Gaming",
    description:
        "The Revolver Game Aggregation Platform: studios bring games in through one integration, operators take the whole catalogue out — Revolver slots and originals plus every partner studio.",
};

const DAY_ONE = [
    { time: "09:00", title: "Kickoff", text: "A call, credentials and the integration spec. Prefer your own API? We work in reverse and implement yours." },
    { time: "09:47", title: "Adapter built", text: "AI-accelerated tooling maps your wallet to ours in minutes, including the integrations that usually take weeks." },
    { time: "14:00", title: "Tested & certified", text: "Sandbox rounds against a live test operator: bets, wins, rollbacks and the ugly edge cases, signed off together." },
    { time: "18:00", title: "You're live", text: "Games in your lobby the same day, with promotions and reporting included." },
];

export default async function Gap() {
    const [stats, operators, studios] = await Promise.all([getPlatformStats(), listOperators(), listPartnerStudios()]);
    const p = pillar("gap");
    return (
        <main>
            <section className="plat-hero" data-chamber>
                <div className="grid-mask" aria-hidden />
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">{p.kicker}</p>
                        <h1 className="display">{p.title[0]}<br /><em>{p.title[1]}</em></h1>
                        <p className="lede">
                            One platform, two sides. Studios bring their games in. Operators
                            take the whole catalogue out through a single integration.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Book a demo</Link>
                            <Link href="/rgs" className="btn btn-ghost">Meet the engine</Link>
                        </div>
                    </div>
                    <div className="stat-row">
                        {stats.slice(0, 4).map((s) => (
                            <div className="stat" key={s.label}>
                                <b>{s.value}{s.suffix && <em>{s.suffix}</em>}</b>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Ticker items={operators} label="Live across the operator and aggregator network" />

            <section data-chamber className="rings-bg">
                <div className="shell">
                    <div className="flow" data-reveal>
                        <div className="flow-col">
                            <span className="role">Games in</span>
                            <h3>Studios</h3>
                            <p>Bring your own RGS, or build on ours. Either way, one integration.</p>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col flow-hub">
                            <div className="flow-hub-head">
                                <h3>Revolver Platform</h3>
                                <span className="role">One integration</span>
                            </div>
                            <p>Wallet, launch, promotions and reporting, cleared through a UKGC-licensed core.</p>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col">
                            <span className="role">Games out</span>
                            <h3>Operators</h3>
                            <p>Real money, social and sweepstakes lobbies, live day one.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">For studios</p>
                        <h2 className="display">Get your <em>games out</em></h2>
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
                        <h2 className="display">Get every <em>game in</em></h2>
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

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Integration, timed</p>
                        <h2 className="display">In your lobby, <em>same day</em></h2>
                        <p className="lede">
                            Integration is where most platforms lose months, so we made it our
                            fastest move. Here&apos;s what day one looks like.
                        </p>
                    </div>
                    <div className="timeline" data-reveal>
                        {DAY_ONE.map((s) => (
                            <div className="tl-step" key={s.time}>
                                <div className="tl-dot" />
                                <div className="tl-time">{s.time}</div>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="cta-card" data-reveal>
                        <p className="eyebrow">Last chamber</p>
                        <h2 className="display">See it <em>spin.</em></h2>
                        <p className="lede">
                            A demo takes minutes to set up: live games, live back office,
                            your currencies.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Book a demo</Link>
                            <Link href="/games" className="btn btn-ghost">Browse the games</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
