"use client";

// List + editor shared by every long-form section (News, Insights): same table shape,
// differing only in where they live and whether they carry a downloadable PDF.

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sb, slugify, uploadMedia, errMsg } from "./lib";
import { usePaged, Pager, useUnsavedWarning } from "./ui";
import { RichText } from "./RichText";

export type ArticleKind = {
    table: string;      // also the public URL prefix and the media folder
    heading: string;    // "News"
    noun: string;       // "article"
    pdf?: boolean;      // offers a PDF download
    draftFirst?: boolean; // new items start unpublished
};

export const NEWS: ArticleKind = { table: "news", heading: "News", noun: "article" };

// Papers start as drafts: every claim is reviewed before it goes live.
export const INSIGHTS: ArticleKind = { table: "insights", heading: "Insights", noun: "paper", pdf: true, draftFirst: true };

type Row = {
    id?: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content_html: string;
    cover_image: string | null;
    pdf_url?: string | null;
    published_at: string;
    published: boolean;
};

type ListRow = Pick<Row, "slug" | "title" | "published_at" | "published"> & { id: string };

export function ArticleList({ kind }: { kind: ArticleKind }) {
    const [q, setQ] = useState("");
    const { rows, count, page, setPage, error } =
        usePaged<ListRow>(kind.table, "id, slug, title, published_at, published", "published_at", false, q);

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">{kind.heading}</h1>
                <Link className="btn btn-fire" href={`/admin/${kind.table}/new`}>+ New {kind.noun}</Link>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <div className="admin-toolbar">
                <input className="admin-search" placeholder="Search by title…" value={q} onChange={(e) => setQ(e.target.value)} />
                <span className="mono">{count} {kind.noun}{count === 1 ? "" : "s"}</span>
            </div>
            <table className="admin-table">
                <thead><tr><th>Date</th><th>Title</th><th>Status</th><th /></tr></thead>
                <tbody>
                    {rows?.map((r) => (
                        <tr key={r.id}>
                            <td className="mono">{r.published_at.slice(0, 10)}</td>
                            <td>{r.title}</td>
                            <td>{r.published ? "Live" : <em>Draft</em>}</td>
                            <td className="admin-row-actions">
                                {r.published && <a href={`/${kind.table}/${r.slug}`} target="_blank">View ↗</a>}
                                <Link href={`/admin/${kind.table}/${r.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                    {rows?.length === 0 && (
                        <tr><td colSpan={4} className="admin-empty">{q ? "No matches." : `No ${kind.noun}s yet.`}</td></tr>
                    )}
                </tbody>
            </table>
            {!rows && !error && <p className="admin-hint">Loading…</p>}
            <Pager page={page} count={count} onPage={setPage} />
        </section>
    );
}

export function ArticleEdit({ kind }: { kind: ArticleKind }) {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const isNew = id === "new";
    const blank = (): Row => ({
        slug: "", title: "", excerpt: "", content_html: "", cover_image: null,
        ...(kind.pdf ? { pdf_url: null } : {}),
        published_at: new Date().toISOString(), published: !kind.draftFirst,
    });
    const [row, setRow] = useState<Row | null>(isNew ? blank() : null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (isNew) return;
        sb.from(kind.table).select("*").eq("id", id).single()
            .then(({ data, error }) => (error ? setLoadError(errMsg(error)) : setRow(data)));
    }, [id, isNew, kind.table]);

    if (loadError) return <p className="admin-error">{loadError}</p>;
    if (!row) return <p className="admin-hint">Loading…</p>;
    return <Editor kind={kind} initial={row} done={() => router.push(`/admin/${kind.table}`)} />;
}

function Editor({ kind, initial, done }: { kind: ArticleKind; initial: Row; done: () => void }) {
    const [row, setRow] = useState(initial);
    const [dirty, setDirty] = useState(false);
    const [busy, setBusy] = useState("");
    const [error, setError] = useState("");
    const isNew = !initial.id;
    const set = (patch: Partial<Row>) => {
        setDirty(true);
        setRow((r) => ({ ...r, ...patch }));
    };
    useUnsavedWarning(dirty);

    const save = async () => {
        setBusy("save");
        setError("");
        const record = { ...row, slug: row.slug || slugify(row.title), updated_at: new Date().toISOString() };
        const { error } = isNew
            ? await sb.from(kind.table).insert(record)
            : await sb.from(kind.table).update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"? The URL /${kind.table}/${row.slug} will stop working.`)) return;
        setBusy("delete");
        const { error } = await sb.from(kind.table).delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    const upload = async (file: File | undefined, apply: (url: string) => void) => {
        if (!file) return;
        setBusy("upload");
        setError("");
        try { apply(await uploadMedia(kind.table, file)); }
        catch (e) { setError(errMsg(e)); }
        setBusy("");
    };

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">{isNew ? `New ${kind.noun}` : `Edit ${kind.noun}`}</h1>
                <div className="admin-actions">
                    {!isNew && <button className="danger" disabled={!!busy} onClick={remove}>Delete</button>}
                    <button onClick={done}>Cancel</button>
                    <button className="btn btn-fire" disabled={!!busy || !row.title} onClick={save}>
                        {busy === "save" ? "Saving…" : "Save"}
                    </button>
                </div>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <div className="admin-form">
                <label className="wide">
                    Title
                    <input value={row.title} onChange={(e) => set({ title: e.target.value, ...(isNew ? { slug: slugify(e.target.value) } : {}) })} />
                </label>
                <label>
                    Slug — the URL: /{kind.table}/{row.slug || "…"}
                    <input value={row.slug} disabled={!isNew} onChange={(e) => set({ slug: slugify(e.target.value) })} />
                    {!isNew && <small>Locked: this URL may be shared or indexed.</small>}
                </label>
                <label>
                    Publish date
                    <input type="date" value={row.published_at.slice(0, 10)} onChange={(e) => set({ published_at: e.target.value })} />
                </label>
                <label className="check">
                    <input type="checkbox" checked={row.published} onChange={(e) => set({ published: e.target.checked })} />
                    Published (visible on the site)
                </label>
                <label className="wide">
                    Excerpt — short summary for Google & social previews
                    <textarea rows={2} value={row.excerpt ?? ""} onChange={(e) => set({ excerpt: e.target.value })} />
                </label>
                <label className="wide">
                    Cover image
                    {row.cover_image && <img className="admin-thumb" src={row.cover_image} alt="" />}
                    <input type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0], (url) => set({ cover_image: url }))} />
                    {busy === "upload" && <small>Uploading…</small>}
                </label>
                {kind.pdf && (
                    <label className="wide">
                        PDF version — offered as a download under the {kind.noun}
                        {row.pdf_url && <small><a href={row.pdf_url} target="_blank">Current PDF ↗</a></small>}
                        <input type="file" accept="application/pdf" onChange={(e) => upload(e.target.files?.[0], (url) => set({ pdf_url: url }))} />
                        {row.pdf_url && <button type="button" onClick={() => set({ pdf_url: null })}>Remove PDF</button>}
                    </label>
                )}
                <RichText label="Body" value={row.content_html} folder={kind.table} onChange={(content_html) => set({ content_html })} />
            </div>
        </section>
    );
}
