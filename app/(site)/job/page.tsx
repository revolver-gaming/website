import type { Metadata } from "next";
import Link from "next/link";
import { listJobs, newsDate } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Careers — Revolver Gaming",
    description: "Open roles at Revolver Gaming, the London-based slot studio and aggregation platform.",
};

export default async function CareersPage() {
    const jobs = await listJobs();
    return (
        <main>
            <div className="shell page-hero">
                <p className="eyebrow">Careers</p>
                <h1 className="display">
                    Join the <em>posse.</em>
                </h1>
            </div>
            <div className="shell">
                {jobs.length > 0 ? (
                    <div className="news-list">
                        {jobs.map((j) => (
                            <Link className="news-row" key={j.slug} href={`/job/${j.slug}`}>
                                <span className="date">{newsDate(j.published_at)}</span>
                                <h3>{j.title}</h3>
                                <span className="arrow">→</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="empty-note">
                        No open roles right now — but great people are always worth talking to.
                        Say hello at <a href="mailto:hello@revolvergaming.com">hello@revolvergaming.com</a>.
                    </p>
                )}
            </div>
        </main>
    );
}
