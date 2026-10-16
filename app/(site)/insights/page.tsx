import type { Metadata } from "next";
import Link from "next/link";
import { listInsights, newsDateShort } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Insights — Revolver Gaming",
    description:
        "White papers for casino operators and game studios: choosing an RGS, distributing games through one integration, and growing a lobby with original and branded content.",
    alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
    const papers = await listInsights();
    return (
        <main>
            <div className="shell page-hero">
                <p className="eyebrow">Insights · white papers</p>
                <h1 className="display">
                    Straight <em>answers.</em>
                </h1>
                <p className="lede">
                    In-depth papers for operators and studios on licensing an RGS, distributing games
                    and building a lobby that pays its way.
                </p>
            </div>
            <section className="on-bone" data-chamber>
                <div className="shell">
                    {papers.length > 0 ? (
                        <div className="news-list">
                            {papers.map((p) => (
                                <Link className="news-row" key={p.slug} href={`/insights/${p.slug}`}>
                                    <span className="date">{newsDateShort(p.published_at)}</span>
                                    <h3>{p.title}</h3>
                                    <span className="arrow">→</span>
                                    {p.excerpt && <p className="excerpt">{p.excerpt}</p>}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="lede">The first papers are on their way.</p>
                    )}
                </div>
            </section>
        </main>
    );
}
