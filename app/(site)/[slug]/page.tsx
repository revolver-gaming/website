import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, listPages } from "@/lib/cms";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return listPages();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await getPage((await params).slug);
    if (!page) return {};
    return {
        title: `${page.title} — Revolver Gaming`,
        alternates: { canonical: `/${page.slug}` },
    };
}

export default async function ContentPage({ params }: Props) {
    const page = await getPage((await params).slug);
    if (!page) notFound();
    return (
        <main>
            <article className="shell article">
                <h1 className="display">{page.title}</h1>
                <div
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: page.content_html }}
                />
            </article>
        </main>
    );
}
