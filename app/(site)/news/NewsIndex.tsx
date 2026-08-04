import Link from "next/link";
import { notFound } from "next/navigation";
import { listNewsPage, newsDate } from "@/lib/cms";

const pageHref = (p: number) => (p === 1 ? "/news" : `/news/page/${p}`);

export default async function NewsIndex({ page }: { page: number }) {
    const { items, pages } = await listNewsPage(page);
    if (items.length === 0) notFound();
    const [lead, ...rest] = items;
    const grid = page === 1 ? rest : items;
    return (
        <main>
            <div className="shell page-hero">
                <p className="eyebrow">Dispatches{page > 1 && ` — page ${page} of ${pages}`}</p>
                <h1 className="display">
                    Hot off the <em>barrel.</em>
                </h1>
            </div>
            <div className="shell news-index">
                {page === 1 && (
                    <Link className="news-feat" href={`/news/${lead.slug}`}>
                        {lead.cover_image && <img src={lead.cover_image} alt="" />}
                        <div className="news-feat-copy">
                            <span className="date">{newsDate(lead.published_at)}</span>
                            <h2>{lead.title}</h2>
                            {lead.excerpt && <p>{lead.excerpt}</p>}
                            <span className="read-on">Read the story →</span>
                        </div>
                    </Link>
                )}

                <div className="news-grid">
                    {grid.map((n) => (
                        <Link className="news-card" key={n.slug} href={`/news/${n.slug}`}>
                            {n.cover_image && <img src={n.cover_image} alt="" loading="lazy" />}
                            <span className="date">{newsDate(n.published_at)}</span>
                            <h3>{n.title}</h3>
                            {n.excerpt && <p>{n.excerpt}</p>}
                        </Link>
                    ))}
                </div>

                {pages > 1 && (
                    <nav className="pager" aria-label="News pages">
                        {page > 1
                            ? <Link className="pager-step" href={pageHref(page - 1)}>← Newer</Link>
                            : <span className="pager-step off">← Newer</span>}
                        {Array.from({ length: pages }, (_, i) => i + 1).map((p) =>
                            p === page
                                ? <span className="pager-num on" key={p} aria-current="page">{p}</span>
                                : <Link className="pager-num" key={p} href={pageHref(p)}>{p}</Link>,
                        )}
                        {page < pages
                            ? <Link className="pager-step" href={pageHref(page + 1)}>Older →</Link>
                            : <span className="pager-step off">Older →</span>}
                    </nav>
                )}
            </div>
        </main>
    );
}
