"use client";

import Link from "next/link";
import { useState } from "react";
import { usePaged, Pager } from "../ui";

type Row = { id: string; slug: string; title: string; published_at: string; published: boolean };

export default function AdminJobs() {
    const [q, setQ] = useState("");
    const { rows, count, page, setPage, error } =
        usePaged<Row>("jobs", "id, slug, title, published_at, published", "published_at", false, q);

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Jobs</h1>
                <Link className="btn btn-fire" href="/admin/jobs/new">+ New job</Link>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <div className="admin-toolbar">
                <input className="admin-search" placeholder="Search by title…" value={q} onChange={(e) => setQ(e.target.value)} />
                <span className="mono">{count} job{count === 1 ? "" : "s"}</span>
            </div>
            <table className="admin-table">
                <thead><tr><th>Posted</th><th>Role</th><th>Status</th><th /></tr></thead>
                <tbody>
                    {rows?.map((r) => (
                        <tr key={r.id}>
                            <td className="mono">{r.published_at.slice(0, 10)}</td>
                            <td>{r.title}</td>
                            <td>{r.published ? "Live" : <em>Draft</em>}</td>
                            <td className="admin-row-actions">
                                {r.published && <a href={`/job/${r.slug}`} target="_blank">View ↗</a>}
                                <Link href={`/admin/jobs/${r.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                    {rows?.length === 0 && (
                        <tr><td colSpan={4} className="admin-empty">{q ? "No matches." : "No jobs yet."}</td></tr>
                    )}
                </tbody>
            </table>
            {!rows && !error && <p className="admin-hint">Loading…</p>}
            <Pager page={page} count={count} onPage={setPage} />
        </section>
    );
}
