import type { Metadata } from "next";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import { brandedGame } from "@/components/BespokeBanner";
import { getStudioOffer, listGames } from "@/lib/cms";
import { BESPOKE_STEPS, pillar } from "@/lib/pillars";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Exclusives & bespoke games — Revolver Gaming",
    description:
        "Custom-built and branded slots powered by Revolver's tech and studio: branded reskins, seasonal editions, market-tuned maths and fully bespoke games, exclusive to your casino.",
};

export default async function Exclusives() {
    const [games, offer] = await Promise.all([listGames(), getStudioOffer()]);
    const p = pillar("exclusives");
    const hero = brandedGame(games);
    const examples = games.filter((g) => g.tags.some((t) => /brand|seasonal/i.test(t))).slice(0, 6);
    return (
        <main>
            <section className="plat-hero art-bg" data-chamber style={{ "--art": `url(${hero?.image})` } as React.CSSProperties}>
                {hero && <img className="art-peek" src={hero.image} alt="" />}
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">{p.kicker}</p>
                        <h1 className="display">{p.title[0]}<br /><em>{p.title[1]}</em></h1>
                        <p className="lede">
                            {offer.intro} Ask for a game nobody else has, and we&apos;ll build
                            it on the same certified engine as everything we ship.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">{p.cta}</Link>
                            <Link href="/games" className="btn btn-ghost">See the catalogue</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">{offer.kicker}</p>
                        <h2 className="display">{offer.title}</h2>
                    </div>
                    <div className="feat-grid feat-grid-4">
                        {offer.cards.map((c, i) => (
                            <div className="feat-card" key={c.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                                <h3>{c.title}</h3>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {examples.length > 0 && (
                <section data-chamber className="dots-bg">
                    <div className="shell">
                        <div className="section-head" data-reveal>
                            <p className="eyebrow">Already in the chamber</p>
                            <h2 className="display">Branded and seasonal <em>editions</em></h2>
                            <p className="lede">
                                Live examples: brand collaborations and seasonal variants of
                                top performers, built for a specific partner or calendar moment.
                            </p>
                        </div>
                        <div className="game-grid game-grid-mini game-grid-dark">
                            {examples.map((g, i) => (
                                <div key={g.slug} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                                    <GameCard game={g} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">How it works</p>
                        <h2 className="display">From brief to <em>exclusive</em></h2>
                    </div>
                    <div className="steps">
                        {BESPOKE_STEPS.map((s, i) => (
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
                        <h2 className="display">Name the <em>game.</em></h2>
                        <p className="lede">
                            Bring a brand, a theme or just a hunch about what your players
                            want. We&apos;ll come back with a concept and a timeline.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">{p.cta}</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
