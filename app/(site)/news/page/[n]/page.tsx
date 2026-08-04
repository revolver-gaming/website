import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import NewsIndex from "../../NewsIndex";
import { listNewsPage } from "@/lib/cms";

export const revalidate = 300;

type Props = { params: Promise<{ n: string }> };

export async function generateStaticParams() {
    const { pages } = await listNewsPage(1);
    return Array.from({ length: pages - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { n } = await params;
    return {
        title: `News — page ${n} — Revolver Gaming`,
        description: "Game launches, partnerships and announcements from Revolver Gaming.",
        alternates: { canonical: `/news/page/${n}` },
    };
}

export default async function NewsPageN({ params }: Props) {
    const { n } = await params;
    const page = Number(n);
    if (!Number.isInteger(page) || page < 1) notFound();
    if (page === 1) redirect("/news");
    return <NewsIndex page={page} />;
}
