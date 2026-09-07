import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { listJobs, newsDate } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Careers — Revolver Gaming",
    description: "Open roles at Revolver Gaming, the London-based slot studio and aggregation platform.",
};

export default async function CareersPage() {
    const jobs = await listJobs();
    return (
        <main id="main">
            <PageHero
                kicker="Careers"
                title={<>Join the <em>posse.</em></>}
                lede="A founder-led London studio building slots, originals and the platform behind them."
            />
            <section data-chamber>
                <div className="shell indent">
                    {jobs.length > 0 ? (
                        <div className="news-list">
                            {jobs.map((j) => (
                                <Link className="news-row" key={j.slug} href={`/job/${j.slug}`}>
                                    <span className="date">{newsDate(j.published_at)}</span>
                                    <h3>{j.title}</h3>
                                    <span className="arrow" aria-hidden>→</span>
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
            </section>
        </main>
    );
}
