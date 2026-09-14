"use client";

import Link from "next/link";
import { useState } from "react";
import { usePaged, Pager } from "../ui";

type Row = {
    id: string;
    slug: string;
    title: string;
    category: string;
    featured: boolean;
    coming_soon: boolean;
    sort_order: number;
    published: boolean;
};

export default function AdminOriginals() {
    const [q, setQ] = useState("");
    const { rows, count, page, setPage, error } =
        usePaged<Row>("originals", "id, slug, title, category, featured, coming_soon, sort_order, published", "sort_order", true, q);

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Originals</h1>
                <Link className="btn btn-fire" href="/admin/originals/new">+ New original</Link>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <p className="admin-hint">Order here = order on the site (edit “Position”). The featured original leads the Originals section.</p>
            <div className="admin-toolbar">
                <input className="admin-search" placeholder="Search by title…" value={q} onChange={(e) => setQ(e.target.value)} />
                <span className="mono">{count} original{count === 1 ? "" : "s"}</span>
            </div>
            <table className="admin-table">
                <thead><tr><th>#</th><th>Category</th><th>Title</th><th>Status</th><th /></tr></thead>
                <tbody>
                    {rows?.map((r) => (
                        <tr key={r.id}>
                            <td className="mono">{r.sort_order}</td>
                            <td className="mono">{r.category}</td>
                            <td>{r.title} {r.featured && <em>★ featured</em>} {r.coming_soon && <em>coming soon</em>}</td>
                            <td>{r.published ? "Live" : <em>Draft</em>}</td>
                            <td className="admin-row-actions">
                                {r.published && !r.coming_soon && <a href={`/originals/${r.slug}`} target="_blank">View ↗</a>}
                                <Link href={`/admin/originals/${r.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                    {rows?.length === 0 && (
                        <tr><td colSpan={5} className="admin-empty">{q ? "No matches." : "No originals yet."}</td></tr>
                    )}
                </tbody>
            </table>
            {!rows && !error && <p className="admin-hint">Loading…</p>}
            <Pager page={page} count={count} onPage={setPage} />
        </section>
    );
}
