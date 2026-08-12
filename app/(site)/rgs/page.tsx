import type { Metadata } from "next";
import Link from "next/link";
import { getContact, getRgsPage, getRgsStats } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "RGS — Remote Gaming Server — Revolver Gaming",
    description:
        "The UKGC-licensed engine behind every Revolver game: flexible bet configurations, per-license regulation profiles, custom operator setups and continuously tested RNG — every market is a configuration, not a project.",
};

export default async function Rgs() {
    const [chapters, stats, contact] = await Promise.all([
        getRgsPage(), getRgsStats(), getContact(),
    ]);
    return (
        <main>
            <section className="plat-hero" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">RGS — Remote Gaming Server</p>
                        <h1 className="display">One engine,<br /><em>every market.</em></h1>
                        <p className="lede">
                            The licensed core that runs every Revolver game. Bet ladders,
                            limits, currencies and jurisdiction rules are all configuration —
                            so a new market, brand or regulation is a config change,
                            not a rebuild.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Book a demo</Link>
                            <Link href="/gap" className="btn btn-ghost">See the distribution</Link>
                        </div>
                    </div>

                    <div className="trust-band">
                        <b className="mark">UKGC</b>
                        <p>
                            {contact.license} Regulation isn&apos;t an afterthought bolted onto
                            the engine — it&apos;s the standard the whole engine is built to.
                        </p>
                        <a className="btn btn-ghost" href={contact.license_url} target="_blank" rel="noopener">
                            View the register →
                        </a>
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
                        <p className="eyebrow">How it scales</p>
                        <h2 className="display">Build once, configure everywhere</h2>
                        <p className="lede">
                            A single game build fans out to every operator, brand, currency and
                            license through the configuration layer — no forks, no per-market builds.
                        </p>
                    </div>
                    <div className="flow">
                        <div className="flow-col">
                            <span className="role">Per game</span>
                            <h3>One build</h3>
                            <ul>
                                <li>Single HTML5 build</li>
                                <li>Certified maths model</li>
                                <li>18 languages, validated at launch</li>
                            </ul>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col flow-hub">
                            <span className="role">Everything casino-side</span>
                            <h3>RGS config engine</h3>
                            <ul>
                                <li>Bet ladders, limits &amp; multipliers</li>
                                <li>Per-license regulation profiles</li>
                                <li>Per-operator &amp; per-brand overrides</li>
                                <li>Currency precision &amp; exchange</li>
                                <li>Custom configs on request</li>
                            </ul>
                        </div>
                        <div className="flow-arrow" aria-hidden>→</div>
                        <div className="flow-col">
                            <span className="role">Live from config</span>
                            <h3>Every market</h3>
                            <ul>
                                <li>Regulated real money</li>
                                <li>Social &amp; sweepstakes</li>
                                <li>Fiat, crypto &amp; social coins</li>
                            </ul>
                        </div>
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
                        <h2 className="display">Load it <em>your way.</em></h2>
                        <p className="lede">
                            Tell us your license, currencies and bet rules — we&apos;ll show you
                            the engine running your configuration, live.
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
