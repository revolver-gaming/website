import type { Metadata } from "next";
import Link from "next/link";
import { listGames } from "@/lib/cms";
import { OPERATOR_INTEGRATIONS, PILLARS } from "@/lib/pillars";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "About us — Revolver Gaming",
    description:
        "Revolver Gaming is a fully faceted iGaming products and services provider: licensable slots, brandable originals, RGS licensing, the aggregation platform and bespoke games. London, since 2010.",
};

/* Copy is Ryan's (wireframe v9), with MGA and "GAP" adapted to what we claim and call it. */
const OFFERINGS: Record<string, { title: string; text: string; cta: string }> = {
    slots: { title: "Original slots", text: "Proven, licensable, brandable slots built in-house, led by flagship Irish Coins and a growing line of branded and seasonal titles.", cta: "Explore slots" },
    originals: { title: "Casual originals", text: "A full lobby of brandable casual games, crash, dice, mines, plinko and more, every round provably fair, with a new title every month.", cta: "Explore originals" },
    rgs: { title: "Remote Gaming Server", text: "License our RGS, independent, managed or hybrid, and plug straight into our distribution network of operators and aggregators.", cta: "Explore RGS" },
    gap: { title: "Game Aggregation Platform", text: "Studios bring their games in, operators take the whole catalogue out, Revolver's own games plus every partner studio, through one integration.", cta: "Explore the platform" },
    exclusives: { title: "Custom & branded games", text: "Branded reskins, seasonal editions and fully bespoke games, built in-house on the certified engine and exclusive to your casino.", cta: "Explore exclusives" },
};

const PRINCIPLES = [
    { title: "Founder-led", text: "Close to the detail, fast to decide, straight to deal with." },
    { title: "Studio-first", text: "We make the games, so we know what makes them perform." },
    { title: "Licensed & compliant", text: "UKGC licensed, built for regulated markets." },
    { title: "Lean & fast", text: "No legacy, no bloat. Speed and precision as standard." },
];

export default async function About() {
    const games = await listGames();
    const hero = games.find((g) => g.featured) ?? games[0];
    return (
        <main>
            <section className="plat-hero art-bg" data-chamber style={{ "--art": `url(${hero?.image})` } as React.CSSProperties}>
                {hero && <img className="art-peek" src={hero.image} alt="" />}
                <div className="shell">
                    <div className="section-head about-hero">
                        <p className="eyebrow">About Revolver</p>
                        <h1 className="display">A fully faceted iGaming <em>products and services</em> provider.</h1>
                        <p className="lede">
                            Revolver Gaming has been a licensed games software provider since 2010.
                            We started as a slots studio, and every layer we&apos;ve added since has
                            been built on the same standard: make games operators want, and run the
                            tech that gets them live.
                        </p>
                        <p className="lede">
                            Today we&apos;re a full-stack, multi-layered iGaming business. Licensable
                            slots, brandable casual originals, a Remote Gaming Server we license with
                            distribution, the aggregation platform that connects studios and
                            operators, and bespoke games built exclusively to brief. One team, close
                            to the detail, across the whole chain from concept to lobby.
                        </p>
                        <p className="lede">
                            Founder-led, UKGC licensed, and lean by design. No bloat, no legacy
                            weight, no excuses.
                        </p>
                    </div>
                    <div className="tag-bar">
                        {["Since 2010", "UKGC licensed", `${games.length} original slots`, `${OPERATOR_INTEGRATIONS} operator integrations`].map((t) => <span key={t}>{t}</span>)}
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Every layer of the business</p>
                        <h2 className="display">What we <em>do.</em></h2>
                        <p className="lede">Five connected offerings under one licensed roof. Explore each in detail.</p>
                    </div>
                    <div className="feat-grid offer-grid">
                        {PILLARS.map((p, i) => {
                            const o = OFFERINGS[p.key];
                            return (
                                <Link className="feat-card offer-card" href={p.href} key={p.key} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                                    <span className="offer-kicker">{p.kicker}</span>
                                    <h3>{o.title}</h3>
                                    <p>{o.text}</p>
                                    <span className="feat-more">{o.cta} →</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section data-chamber className="rings-bg">
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">How we work</p>
                        <h2 className="display">We live and breathe <em>iGaming.</em></h2>
                        <p className="lede">
                            Years of hands-on experience across games, technology and the commercial
                            side of the business.
                        </p>
                    </div>
                    <div className="steps">
                        {PRINCIPLES.map((s, i) => (
                            <div className="step" key={s.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
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
                        <h2 className="display">Loaded and <em>ready?</em></h2>
                        <p className="lede">
                            Tell us what you&apos;re building and we&apos;ll show you how fast it can be live.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Talk to the team</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
