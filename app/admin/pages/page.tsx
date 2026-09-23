"use client";

import Link from "next/link";
import { useState } from "react";
import { usePaged, Pager } from "../ui";

type Row = { slug: string; title: string; published: boolean };

// Coded pages whose copy/art lives in site_content; they have their own editors.
const BUILT_IN = [["about", "About us"], ["exclusives", "Exclusives"]];

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
                    {!q && BUILT_IN.map(([slug, title]) => (
                        <tr key={slug}>
                            <td className="mono">/{slug}</td>
                            <td>{title}</td>
                            <td><em>Built-in</em></td>
                            <td className="admin-row-actions">
                                <a href={`/${slug}`} target="_blank">View ↗</a>
                                <Link href={`/admin/pages/${slug}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
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
