import type { Metadata } from "next";
import Link from "next/link";
import { listNews, newsDate } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "News — Revolver Gaming",
    description: "Game launches, partnerships and announcements from Revolver Gaming.",
};

export default async function NewsPage() {
    const items = await listNews();
    return (
        <main>
            <div className="shell page-hero">
                <p className="eyebrow">Dispatches</p>
                <h1 className="display">
                    Hot off the <em>barrel.</em>
                </h1>
            </div>
            <div className="shell">
                <div className="news-list">
                    {items.map((n) => (
                        <Link className="news-row" key={n.slug} href={`/news/${n.slug}`}>
                            <span className="date">{newsDate(n.published_at)}</span>
                            <h3>{n.title}</h3>
                            <span className="arrow">→</span>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
