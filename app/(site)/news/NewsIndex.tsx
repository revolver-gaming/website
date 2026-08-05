import Link from "next/link";
import { notFound } from "next/navigation";
import { listNewsPage, newsDateShort, type NewsListItem } from "@/lib/cms";

const pageHref = (p: number) => (p === 1 ? "/news" : `/news/page/${p}`);

export default async function NewsIndex({ page }: { page: number }) {
    const { items, pages } = await listNewsPage(page);
    if (items.length === 0) notFound();
    const [lead, ...rest] = items;
    const listed = page === 1 ? rest : items;
    const byYear = listed.reduce<[number, NewsListItem[]][]>((groups, n) => {
        const year = new Date(n.published_at).getFullYear();
        const last = groups.at(-1);
        if (last && last[0] === year) last[1].push(n);
        else groups.push([year, [n]]);
        return groups;
    }, []);
    return (
        <main>
            <div className="shell page-hero">
                <p className="eyebrow">Dispatches{page > 1 && ` — page ${page} of ${pages}`}</p>
                <h1 className="display">From the chamber</h1>
                <p className="lede">
                    Game launches, partnerships and announcements from the studio.
                </p>

                {page === 1 && (
                    <Link className="news-feat" href={`/news/${lead.slug}`}>
                        {lead.cover_image && <img src={lead.cover_image} alt="" />}
                        <div className="news-feat-copy">
                            <div className="feat-badges">
                                <span className="badge-latest">LATEST</span>
                                <span className="date">{newsDateShort(lead.published_at)}</span>
                            </div>
                            <h2>{lead.title}</h2>
                            {lead.excerpt && <p>{lead.excerpt}</p>}
                            <span className="read-on">Read the story →</span>
                        </div>
                    </Link>
                )}
            </div>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    {byYear.map(([year, articles]) => (
                        <div key={year}>
                            <p className="year-tag">{year}</p>
                            <div className="news-list">
                                {articles.map((n) => (
                                    <Link className="news-row" key={n.slug} href={`/news/${n.slug}`}>
                                        <span className="date">{newsDateShort(n.published_at)}</span>
                                        <h3>{n.title}</h3>
                                        <span className="arrow">→</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

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
            </section>
        </main>
    );
}
