import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import PartnerLogo from "@/components/PartnerLogo";
import { getRgsStats, listOperators } from "@/lib/cms";
import { OPERATOR_INTEGRATIONS, RGS_ENGINE, RGS_OPTIONS, pillar } from "@/lib/pillars";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "RGS licensing — Revolver Gaming",
    description:
        "License the Revolver Remote Gaming Server, independent, managed or hybrid. 60+ operator integrations, 185+ currencies, built-in promo tools, auto-scaling cloud infrastructure and regulated-market compliance.",
};

/* Every claim below is backed by the RGS/GAP codebase — check there before adding more. */
const PROMO_TOOLS = ["Free spins", "Flexible free spins", "Campaigns", "Progressive jackpots"];

const PROMO_POINTS = [
    { title: "Operator API", text: "Award free spins and run campaigns straight from your own platform through the promotions API." },
    { title: "Back office control", text: "Set up, schedule and track campaigns and jackpots from the back office, no code needed." },
    { title: "Hands-free lifecycle", text: "Campaigns start, expire and tidy up on schedule, handled by background jobs." },
];

const INTEGRATIONS = [
    { value: "2-way", title: "Standard & reverse", text: "Plug into casinos directly, or into the aggregators and hubs they already use." },
    { value: "API", title: "Back office API", text: "Free spins, game details and round replays available to operators by API." },
    { value: "185+", title: "Currencies", text: "Live exchange rates, refreshed automatically." },
    { value: "21", title: "Languages", text: "Games localised for players across every major market." },
];

const RELIABILITY = [
    { title: "Infrastructure as code", text: "Every environment is defined in Terraform and built from code, never by hand." },
    { title: "Auto-scaling up and down", text: "Services scale out for traffic peaks and back in afterwards, with no manual intervention." },
    { title: "Self-healing rounds", text: "Broken rounds, failed payouts and rollbacks are retried and resolved automatically." },
    { title: "DDoS protection & global CDN", text: "Cloud Armor at the edge, and game assets served fast from a global CDN." },
    { title: "Monitored around the clock", text: "RTP and RNG are tested continuously. A game that drifts is switched off automatically." },
];

/* Logos from Simple Icons 16.31.0 in public/tech/ (CC0; OpenTelemetry CC BY 4.0), shown monochrome.
   Cloud and data first, then languages and services. Only tech the RGS/GAP repos actually use. */
const STACK = [
    { name: "Google Cloud", logo: "googlecloud" },
    { name: "Terraform", logo: "terraform" },
    { name: "BigQuery", logo: "googlebigquery" },
    { name: "Node.js", logo: "nodedotjs" },
    { name: "TypeScript", logo: "typescript" },
    { name: "React", logo: "react" },
    { name: "NestJS", logo: "nestjs" },
    { name: "Docker", logo: "docker" },
    { name: "Redis", logo: "redis" },
    { name: "MySQL", logo: "mysql" },
    { name: "Pub/Sub", logo: "googlepubsub" },
    { name: "New Relic", logo: "newrelic" },
    { name: "OpenTelemetry", logo: "opentelemetry" },
    { name: "Fastify", logo: "fastify" },
    { name: "Vite", logo: "vite" },
];

const COMPLIANCE = [
    { title: "UKGC licensed", text: "Built and operated to Gambling Commission standards." },
    { title: "NIST RNG monitoring", text: "Continuous statistical testing of every RNG-enabled game." },
    { title: "RTP monitoring", text: "Live RTP tracking with alerts and automatic disable and re-enable." },
    { title: "Reality check & game history", text: "Player-protection prompts and full in-game round history." },
    { title: "Round replay", text: "Replay any round visually for support and audit." },
    { title: "Restricted territories", text: "Country-level geo-blocking, plus operator and brand whitelists." },
];

export default async function Rgs() {
    const [stats, operators] = await Promise.all([getRgsStats(), listOperators()]);
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
                            distribution network. Independent, managed or hybrid.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Talk licensing</Link>
                            <Link href="/gap" className="btn btn-ghost">See the distribution</Link>
                        </div>
                    </div>
                    <div className="stat-row">
                        {stats.map((s) => (
                            <div className={`stat${/^\d/.test(s.value) ? "" : " stat-word"}`} key={s.label}>
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
                        <p className="eyebrow">Ways to run it</p>
                        <h2 className="display">Run it <em>your way</em></h2>
                        <p className="lede">Independent, managed or hybrid models to suit your individual requirements.</p>
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
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Player engagement</p>
                        <h2 className="display">Promo tools, <em>built in</em></h2>
                    </div>
                    <div className="promo-lead" data-reveal>
                        <h3>Ready to go on every game</h3>
                        <ul>{PROMO_TOOLS.map((t) => <li key={t}>{t}</li>)}</ul>
                    </div>
                    <div className="feat-grid">
                        {PROMO_POINTS.map((f, i) => (
                            <div className="feat-card" key={f.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber className="dots-bg">
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Integrations</p>
                        <h2 className="display"><em>{OPERATOR_INTEGRATIONS}</em> operator integrations</h2>
                    </div>
                    <div className="int-band" data-reveal>
                        {INTEGRATIONS.map((f) => (
                            <div key={f.title}>
                                <b>{f.value}</b>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Plug into the network</p>
                        <h2 className="display">Distribution, ready <em>on day one</em></h2>
                        <p className="lede">
                            License the Revolver RGS and you inherit our reach. Connected
                            across leading operators and aggregators, with new hook-ups added fast.
                        </p>
                    </div>
                    <div className="roster" data-reveal>
                        {operators.map((o) => <div key={o.name}><PartnerLogo {...o} /></div>)}
                        <div className="more"><b>+ More</b><span>Added continuously</span></div>
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell split">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Infrastructure</p>
                        <h2 className="display">Scalable <em>&amp; reliable</em></h2>
                        <p className="lede">
                            Cloud-native on Google Cloud, automated end to end, and watched
                            every minute of the day.
                        </p>
                    </div>
                    <ol className="scale-list">
                        {RELIABILITY.map((r, i) => (
                            <li key={r.title} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                                <h3>{r.title}</h3>
                                <p>{r.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section data-chamber className="rings-bg">
                <div className="shell">
                    <div className="modular" data-reveal>
                        <p className="eyebrow">Modular</p>
                        <p className="modular-text">
                            Independent microservices for launch, wallet, game engines, promotions
                            and reporting, each deployed and scaled on its own. The platform
                            evolves piece by piece, <em>never a re-platform.</em>
                        </p>
                    </div>
                    <div className="tech" data-reveal>
                        <div className="section-head">
                            <p className="eyebrow">Built with modern technologies</p>
                            <h2 className="display">A proven, <em>modern stack</em></h2>
                            <p className="lede">
                                Widely supported technologies with a deep talent pool, so the
                                platform stays fast to build on and easy to support.
                            </p>
                        </div>
                        <ul className="tech-chips">
                            {STACK.map((t) => (
                                <li key={t.name} style={{ "--logo": `url(/tech/${t.logo}.svg)` } as CSSProperties}>
                                    <span className="tech-logo" aria-hidden="true" />
                                    <span className="tech-name">{t.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Compliance</p>
                        <h2 className="display">Regulated <em>markets ready</em></h2>
                    </div>
                    <ul className="checks checks-3" data-reveal>
                        {COMPLIANCE.map((c) => (
                            <li key={c.title}><div><b>{c.title}</b><span>{c.text}</span></div></li>
                        ))}
                    </ul>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="cta-card rgs-cta" data-reveal>
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
