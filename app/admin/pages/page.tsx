"use client";

import Link from "next/link";
import { useState } from "react";
import { usePaged, Pager } from "../ui";

type Row = { slug: string; title: string; published: boolean };

export default function AdminPages() {
    const [q, setQ] = useState("");
    const { rows, count, page, setPage, error } =
        usePaged<Row>("pages", "slug, title, published", "slug", true, q);

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Pages</h1>
                <Link className="btn btn-fire" href="/admin/pages/new">+ New page</Link>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <div className="admin-toolbar">
                <input className="admin-search" placeholder="Search by title…" value={q} onChange={(e) => setQ(e.target.value)} />
                <span className="mono">{count} page{count === 1 ? "" : "s"}</span>
            </div>
            <table className="admin-table">
                <thead><tr><th>URL</th><th>Title</th><th>Status</th><th /></tr></thead>
                <tbody>
                    {rows?.map((r) => (
                        <tr key={r.slug}>
                            <td className="mono">/{r.slug}</td>
                            <td>{r.title}</td>
                            <td>{r.published ? "Live" : <em>Draft</em>}</td>
                            <td className="admin-row-actions">
                                {r.published && <a href={`/${r.slug}`} target="_blank">View ↗</a>}
                                <Link href={`/admin/pages/${r.slug}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                    {rows?.length === 0 && (
                        <tr><td colSpan={4} className="admin-empty">{q ? "No matches." : "No pages yet."}</td></tr>
                    )}
                </tbody>
            </table>
            {!rows && !error && <p className="admin-hint">Loading…</p>}
            <Pager page={page} count={count} onPage={setPage} />
        </section>
    );
}
