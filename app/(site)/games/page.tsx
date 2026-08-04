import type { Metadata } from "next";
import Link from "next/link";
import GamesExplorer from "./GamesExplorer";
import { getStudioOffer, listGames } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Games — Revolver Gaming",
    description: "The full catalogue of Revolver Gaming original slots.",
};

export default async function GamesPage() {
    const [games, offer] = await Promise.all([listGames(), getStudioOffer()]);
    return (
        <main>
            <GamesExplorer games={games} />

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">{offer.kicker}</p>
                        <h2 className="display">{offer.title}</h2>
                        <p className="lede">{offer.intro}</p>
                    </div>
                    <div className="feat-grid">
                        {offer.cards.map((c) => (
                            <div className="feat-card" key={c.title}>
                                <h3>{c.title}</h3>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="studio-note">
                        <div>
                            <h3>{offer.studio_note.title}</h3>
                            <p>{offer.studio_note.text}</p>
                        </div>
                        <Link href="/#contact" className="btn btn-fire">Talk to us</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
