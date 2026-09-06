import Link from "next/link";
import { newsDateShort, type NewsListItem } from "@/lib/cms";

export default function NewsCards({ items }: { items: NewsListItem[] }) {
    return (
        <div className="news-cards">
            {items.map((n, i) => (
                <Link className="news-card" key={n.slug} href={`/news/${n.slug}`} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                    {n.cover_image
                        ? <img src={n.cover_image} alt="" loading="lazy" />
                        : <div className="news-card-blank" aria-hidden />}
                    <div className="body">
                        <span className="date">{newsDateShort(n.published_at)}</span>
                        <h3>{n.title}</h3>
                        <span className="rm">Read the story →</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
