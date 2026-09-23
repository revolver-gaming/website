"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sb } from "./lib";

const cards = [
    ["/admin/hero", "Hero", null, "Homepage hero slides: titles, text, buttons, images"],
    ["/admin/news", "News", "news", "Articles on /news and the homepage"],
    ["/admin/games", "Games", "games", "Game pages, cards, screenshots, PDFs"],
    ["/admin/originals", "Originals", "originals", "Casual originals: specs, features, art, demos"],
    ["/admin/jobs", "Jobs", "jobs", "Careers postings on /job"],
    ["/admin/pages", "Pages", "pages", "About, Exclusives, Terms, Privacy and other pages"],
    ["/admin/partners", "Partners", "operators", "Operator & studio logos: ticker and rosters"],
    ["/admin/settings", "Settings", null, "Contact, socials, footer, stats, page copy"],
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
