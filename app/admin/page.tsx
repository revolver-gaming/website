"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sb } from "./lib";

const cards = [
    ["/admin/news", "News", "news", "Articles on /news and the homepage"],
    ["/admin/games", "Games", "games", "Game pages, cards, screenshots, PDFs"],
    ["/admin/provider-games", "Provider games", "provider_games", "Third-party games on /games"],
    ["/admin/jobs", "Jobs", "jobs", "Careers postings on /job"],
    ["/admin/pages", "Pages", "pages", "Terms, Privacy and other simple pages"],
    ["/admin/settings", "Settings", null, "Contact, socials, footer, studios, operators"],
] as const;

export default function AdminHome() {
    const [counts, setCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        for (const [, , table] of cards) {
            if (!table) continue;
            sb.from(table).select("*", { count: "exact", head: true }).then(({ count }) =>
                setCounts((c) => ({ ...c, [table]: count ?? 0 })),
            );
        }
    }, []);

    return (
        <section>
            <h1 className="display">Content</h1>
            <p className="admin-hint">Changes go live on the website within 5 minutes.</p>
            <div className="admin-cards">
                {cards.map(([href, label, table, hint]) => (
                    <Link key={href} href={href} className="admin-card">
                        <h3>{label} {table && counts[table] !== undefined && <em>{counts[table]}</em>}</h3>
                        <p>{hint}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
