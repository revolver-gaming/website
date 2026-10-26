import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getInsight, listInsights, newsDate } from "@/lib/cms";
import { safeHtml } from "@/lib/html";
import { absolute, publisher } from "@/lib/seo";
import { media } from "@/lib/media";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return (await listInsights()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const paper = await getInsight((await params).slug);
    if (!paper) return {};
    return {
        title: `${paper.title} — Revolver Gaming`,
        description: paper.excerpt ?? undefined,
        alternates: { canonical: `/insights/${paper.slug}` },
        openGraph: {
            type: "article",
            title: paper.title,
            description: paper.excerpt ?? undefined,
            publishedTime: paper.published_at,
            modifiedTime: paper.updated_at,
            images: paper.cover_image ? [paper.cover_image] : undefined,
        },
    };
}

export default async function InsightPage({ params }: Props) {
    const paper = await getInsight((await params).slug);
    if (!paper) notFound();
    return (
        <main>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "Article",
                headline: paper.title,
                description: paper.excerpt ?? undefined,
                url: absolute(`/insights/${paper.slug}`),
                image: paper.cover_image ?? undefined,
                datePublished: paper.published_at,
                dateModified: paper.updated_at,
                author: publisher,
                publisher,
            }} />
            <article className="shell article">
                <Link className="article-back" href="/insights">← All insights</Link>
                <p className="article-date">White paper · {newsDate(paper.published_at)}</p>
                <h1 className="display">{paper.title}</h1>
                {paper.excerpt && <p className="article-lede">{paper.excerpt}</p>}
                {paper.cover_image && (
                    <img className="article-cover" src={media(paper.cover_image, 1200)} alt={paper.title} />
                )}
                <div
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: safeHtml(paper.content_html) }}
                />
                <p className="article-ctas">
                    <Link className="btn btn-fire" href="/#contact">Talk to us</Link>
                    {paper.pdf_url && (
                        <a className="btn btn-ghost" href={paper.pdf_url} target="_blank" rel="noopener">Download PDF</a>
                    )}
                </p>
            </article>
        </main>
    );
}
