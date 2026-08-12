import type { Metadata } from "next";
import Link from "next/link";
import { getPlatformPage, getPlatformStats } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "GAP — Game Aggregation Platform — Revolver Gaming",
    description:
        "GAP, the Revolver Game Aggregation Platform: one seamless-wallet integration into a live network of operators and studios, free spins and jackpots in your bonus dialect, tenant-scoped back office and a UKGC-licensed engine at the core.",
};

export default async function Gap() {
    const [chapters, stats] = await Promise.all([getPlatformPage(), getPlatformStats()]);
    return (
        <main>
            <section className="plat-hero" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">GAP — Game Aggregation Platform</p>
                        <h1 className="display">Every chamber<br /><em>loaded.</em></h1>
                        <p className="lede">
                            One integration opens a live distribution network — our originals,
                            a growing multi-studio portfolio, and an operator roster that keeps
                            expanding. All on a UKGC-licensed engine, with integration measured
                            in hours, not months.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Book a demo</Link>
                            <Link href="/rgs" className="btn btn-ghost">Meet the engine</Link>
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
                    <div className="section-head">
                        <p className="eyebrow">Integration, timed</p>
                        <h2 className="display">In your lobby, same day</h2>
                        <p className="lede">
                            Integration is where most platforms lose months — so we made it
                            our fastest move. One standard contract, adapters built with
                            AI-accelerated tooling, and a team that has done it dozens of
                            times. Here&apos;s what day one looks like.
                        </p>
                    </div>
                    <div className="timeline">
                        {[
                            {
                                time: "09:00",
                                title: "Kickoff",
                                text: "A call, credentials and our seamless-wallet spec. Prefer your own API? We work in reverse too — our adapter implements your spec instead.",
                            },
                            {
                                time: "09:47",
                                title: "Adapter built",
                                text: "AI-accelerated tooling maps your wallet API to ours in minutes — including the complex integrations that traditionally take weeks.",
                            },
                            {
                                time: "14:00",
                                title: "Tested & certified",
                                text: "Sandbox rounds against a live test operator: bets, wins, rollbacks and the ugly edge cases — signed off together.",
                            },
                            {
                                time: "18:00",
                                title: "You're live",
                                text: "Our games in your lobby the same day — full portfolio, promotions and reporting included.",
                            },
                        ].map((s) => (
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

            {chapters.map((ch, i) => (
                <section data-chamber className={i % 2 === 1 ? "on-bone" : undefined} key={ch.kicker}>
                    <div className="shell">
                        <div className="section-head">
                            <p className="eyebrow">{ch.kicker}</p>
                            <h2 className="display">{ch.title}</h2>
                            <p className="lede">{ch.intro}</p>
                        </div>
                        <div className="feat-grid">
                            {ch.features.map((f) => (
                                <div className="feat-card" key={f.title}>
                                    <h3>
                                        {f.title}
                                        {f.roadmap && <span className="badge-roadmap">In the chamber</span>}
                                    </h3>
                                    <p>{f.text}</p>
                                    {f.href && <Link className="feat-more" href={f.href}>Learn more →</Link>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            <section className="plat-cta" data-chamber>
                <div className="shell">
                    <div className="cta-card">
                        <p className="eyebrow">Last chamber</p>
                        <h2 className="display">See it <em>spin.</em></h2>
                        <p className="lede">
                            A demo takes minutes to set up — live games, live back office,
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
