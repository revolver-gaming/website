import type { Metadata } from "next";
import Link from "next/link";
import CtaBlock from "@/components/CtaBlock";
import GameCard from "@/components/GameCard";
import LabelRow from "@/components/LabelRow";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
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
        <main id="main">
            <PageHero
                kicker={p.kicker}
                title={<>{p.title[0]} <em>{p.title[1]}</em></>}
                lede={<>{offer.intro} Ask for a game nobody else has, and we&apos;ll build it on the same certified engine as everything we ship.</>}
            >
                <div className="hero-ctas">
                    <Link href="/#contact" className="btn btn-fire">{p.cta}</Link>
                    <Link href="/games" className="btn btn-ghost">See the catalogue</Link>
                </div>
            </PageHero>

            {hero && (
                <section data-chamber>
                    <div className="shell indent">
                        <div className="bespoke-art hero-art" data-reveal>
                            <img src={hero.image} alt={`${hero.title} artwork`} />
                            <span className="bespoke-cap">Pictured: {hero.title}</span>
                        </div>
                    </div>
                </section>
            )}

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <SectionHead kicker={offer.kicker} title={offer.title} />
                    <div className="indent feat-grid feat-grid-4" data-reveal>
                        {offer.cards.map((c) => (
                            <div className="feat" key={c.title}>
                                <h3>{c.title}</h3>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {examples.length > 0 && (
                <section data-chamber>
                    <div className="shell">
                        <SectionHead
                            kicker="Already in the chamber"
                            title={<>Branded and seasonal <em>editions.</em></>}
                            lede="Live examples: brand collaborations and seasonal variants of top performers, built for a specific partner or calendar moment."
                        />
                        <div className="indent game-grid" data-reveal>
                            {examples.map((g) => <GameCard key={g.slug} game={g} />)}
                        </div>
                    </div>
                </section>
            )}

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <LabelRow label="How it works" reveal>
                        <h2 className="display sub-h2">From brief to <em>exclusive.</em></h2>
                        <div className="feat-grid feat-grid-4">
                            {BESPOKE_STEPS.map((s) => (
                                <div className="feat" key={s.title}>
                                    <h3>{s.title}</h3>
                                    <p>{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </LabelRow>
                </div>
            </section>

            <CtaBlock
                title={<>Name the <em>game.</em></>}
                lede="Bring a brand, a theme or just a hunch about what your players want. We'll come back with a concept and a timeline."
            >
                <Link href="/#contact" className="btn btn-fire">{p.cta}</Link>
            </CtaBlock>
        </main>
    );
}
