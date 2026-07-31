import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob, listJobs, newsDate } from "@/lib/cms";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return (await listJobs()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const job = await getJob((await params).slug);
    if (!job) return {};
    return {
        title: `${job.title} — Careers — Revolver Gaming`,
        alternates: { canonical: `/job/${job.slug}` },
    };
}

export default async function JobPage({ params }: Props) {
    const job = await getJob((await params).slug);
    if (!job) notFound();
    return (
        <main>
            <article className="shell article">
                <Link className="article-back" href="/job">← All open roles</Link>
                <p className="article-date">Posted {newsDate(job.published_at)}</p>
                <h1 className="display">{job.title}</h1>
                <div
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: job.content_html }}
                />
                <p className="job-apply">
                    <a className="btn btn-fire" href={`mailto:hello@revolvergaming.com?subject=Application: ${job.title}`}>
                        Apply for this role
                    </a>
                </p>
            </article>
        </main>
    );
}
