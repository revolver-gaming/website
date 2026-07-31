import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, listNews, newsDate } from "@/lib/cms";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const items = await listNews();
    return items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = await getNews((await params).slug);
    if (!article) return {};
    return {
        title: `${article.title} — Revolver Gaming`,
        description: article.excerpt ?? undefined,
        alternates: { canonical: `/news/${article.slug}` },
        openGraph: {
            type: "article",
            title: article.title,
            description: article.excerpt ?? undefined,
            publishedTime: article.published_at,
            images: article.cover_image ? [article.cover_image] : undefined,
        },
    };
}

export default async function NewsArticlePage({ params }: Props) {
    const article = await getNews((await params).slug);
    if (!article) notFound();
    return (
        <main>
            <article className="shell article">
                <Link className="article-back" href="/news">← All news</Link>
                <p className="article-date">{newsDate(article.published_at)}</p>
                <h1 className="display">{article.title}</h1>
                {article.cover_image && (
                    <img className="article-cover" src={article.cover_image} alt={article.title} />
                )}
                <div
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: article.content_html }}
                />
            </article>
        </main>
    );
}
