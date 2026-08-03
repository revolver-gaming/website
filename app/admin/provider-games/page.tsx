"use client";

import Link from "next/link";
import { useState } from "react";
import { usePaged, Pager } from "../ui";

type Row = {
    id: string;
    provider: string;
    slug: string;
    title: string;
    sort_order: number;
    published: boolean;
};

export default function AdminProviderGames() {
    const [q, setQ] = useState("");
    const { rows, count, page, setPage, error } =
        usePaged<Row>("provider_games", "id, provider, slug, title, sort_order, published", "sort_order", true, q);

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Provider games</h1>
                <Link className="btn btn-fire" href="/admin/provider-games/new">+ New game</Link>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <p className="admin-hint">
                Third-party games shown on /games under “Partner studios”. Order here = order on the site.
            </p>
            <div className="admin-toolbar">
                <input className="admin-search" placeholder="Search by title…" value={q} onChange={(e) => setQ(e.target.value)} />
                <span className="mono">{count} game{count === 1 ? "" : "s"}</span>
            </div>
            <table className="admin-table">
                <thead><tr><th>#</th><th>Provider</th><th>Title</th><th>Status</th><th /></tr></thead>
                <tbody>
                    {rows?.map((r) => (
                        <tr key={r.id}>
                            <td className="mono">{r.sort_order}</td>
                            <td>{r.provider}</td>
                            <td>{r.title}</td>
                            <td>{r.published ? "Live" : <em>Draft</em>}</td>
                            <td className="admin-row-actions">
                                <Link href={`/admin/provider-games/${r.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                    {rows?.length === 0 && (
                        <tr><td colSpan={5} className="admin-empty">{q ? "No matches." : "No provider games yet."}</td></tr>
                    )}
                </tbody>
            </table>
            {!rows && !error && <p className="admin-hint">Loading…</p>}
            <Pager page={page} count={count} onPage={setPage} />
        </section>
    );
}
