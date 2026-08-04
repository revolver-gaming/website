import type { Metadata } from "next";
import Link from "next/link";
import { getPlatformPage, getPlatformStats } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "The Platform — Revolver Gaming",
    description:
        "GAP, the Revolver Game Aggregation Platform: one seamless-wallet API, free spins and jackpots in your bonus dialect, tenant-scoped back office and NIST-tested fairness.",
};

export default async function Platform() {
    const [chapters, stats] = await Promise.all([getPlatformPage(), getPlatformStats()]);
    return (
        <main>
            <section className="plat-hero" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">GAP — Game Aggregation Platform</p>
                        <h1 className="display">Every chamber<br /><em>loaded.</em></h1>
                        <p className="lede">
                            One integration puts our originals and a growing multi-studio
                            portfolio on your floor — with the promotions, reporting and
                            reliability engineering to keep them spinning.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Book a demo</Link>
                            <Link href="/games" className="btn btn-ghost">Browse the games</Link>
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

            {chapters.map((ch, i) => (
                <section data-chamber className={i % 2 === 0 ? "on-bone" : undefined} key={ch.kicker}>
                    <div className="shell">
                        <div className="section-head">
                            <p className="eyebrow">CH.{String(i + 1).padStart(2, "0")} — {ch.kicker}</p>
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
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            <section className="plat-cta" data-chamber>
                <div className="shell">
                    <p className="eyebrow">Last chamber</p>
                    <h2 className="display">See it <em>spin.</em></h2>
                    <p className="lede">
                        A demo takes minutes to set up — live games, live back office,
                        your currencies.
                    </p>
                    <div className="hero-ctas">
                        <Link href="/#contact" className="btn btn-fire">Book a demo</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
