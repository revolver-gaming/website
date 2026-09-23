import type { Metadata } from "next";
import Link from "next/link";
import Accent from "@/components/Accent";
import { getAboutPage, listGames } from "@/lib/cms";
import { PILLARS } from "@/lib/pillars";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "About us — Revolver Gaming",
    description:
        "Revolver Gaming is a fully faceted iGaming products and services provider: licensable slots, brandable originals, RGS licensing, the aggregation platform and bespoke games. London, since 2010.",
};

export default async function About() {
    /* Copy is Ryan's (wireframe v9), edited in /admin/pages/about. */
    const [games, page] = await Promise.all([listGames(), getAboutPage()]);
    const art = page.hero_image || (games.find((g) => g.featured) ?? games[0])?.image;
    return (
        <main>
            <section className="plat-hero art-bg" data-chamber style={{ "--art": `url(${art})` } as React.CSSProperties}>
                {art && <img className="art-peek" src={art} alt="" />}
                <div className="shell">
                    <div className="section-head about-hero">
                        <p className="eyebrow">{page.eyebrow}</p>
                        <h1 className="display"><Accent text={page.title} /></h1>
                        {page.paragraphs.map((text, i) => <p className="lede" key={i}>{text}</p>)}
                    </div>
                    <div className="tag-bar">
                        {page.tags.map((t) => <span key={t}>{t.replace("{slots}", String(games.length))}</span>)}
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">{page.offer.eyebrow}</p>
                        <h2 className="display"><Accent text={page.offer.title} /></h2>
                        <p className="lede">{page.offer.lede}</p>
                    </div>
                    <div className="feat-grid offer-grid">
                        {PILLARS.map((p, i) => {
                            const o = page.offer.cards[p.key];
                            if (!o) return null;
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
                        <p className="eyebrow">{page.principles.eyebrow}</p>
                        <h2 className="display"><Accent text={page.principles.title} /></h2>
                        <p className="lede">{page.principles.lede}</p>
                    </div>
                    <div className="steps">
                        {page.principles.items.map((s, i) => (
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
                        <p className="eyebrow">{page.cta.eyebrow}</p>
                        <h2 className="display"><Accent text={page.cta.title} /></h2>
                        <p className="lede">{page.cta.lede}</p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">{page.cta.label}</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
