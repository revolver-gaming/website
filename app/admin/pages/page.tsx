"use client";

import { useEffect, useState } from "react";
import { sb, slugify, errMsg } from "../lib";

type Row = {
    slug: string;
    title: string;
    content_html: string;
    published: boolean;
};

export default function AdminPages() {
    const [rows, setRows] = useState<Row[] | null>(null);
    const [edit, setEdit] = useState<{ row: Row; isNew: boolean } | null>(null);
    const [error, setError] = useState("");

    const load = async () => {
        const { data, error } = await sb.from("pages").select("*").order("slug");
        if (error) setError(errMsg(error));
        else setRows(data);
    };
    useEffect(() => { load(); }, []);

    if (edit) return <Editor {...edit} done={() => { setEdit(null); load(); }} />;
    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Pages</h1>
                <button className="btn btn-fire" onClick={() =>
                    setEdit({ row: { slug: "", title: "", content_html: "", published: true }, isNew: true })}>
                    + New page
                </button>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <table className="admin-table">
                <thead><tr><th>URL</th><th>Title</th><th>Status</th><th /></tr></thead>
                <tbody>
                    {rows?.map((r) => (
                        <tr key={r.slug}>
                            <td className="mono">/{r.slug}</td>
                            <td>{r.title}</td>
                            <td>{r.published ? "Live" : <em>Draft</em>}</td>
                            <td><button onClick={() => setEdit({ row: r, isNew: false })}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

function Editor({ row: initial, isNew, done }: { row: Row; isNew: boolean; done: () => void }) {
    const [row, setRow] = useState(initial);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
    const set = (patch: Partial<Row>) => setRow((r) => ({ ...r, ...patch }));

    const save = async () => {
        setBusy(true);
        setError("");
        const record = { ...row, slug: row.slug || slugify(row.title), updated_at: new Date().toISOString() };
        const { error } = isNew
            ? await sb.from("pages").insert(record)
            : await sb.from("pages").update(record).eq("slug", initial.slug);
        if (error) { setError(errMsg(error)); setBusy(false); return; }
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"? The URL /${row.slug} will stop working.`)) return;
        const { error } = await sb.from("pages").delete().eq("slug", initial.slug);
        if (error) { setError(errMsg(error)); return; }
        done();
    };

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">{isNew ? "New page" : "Edit page"}</h1>
                <div className="admin-actions">
                    {!isNew && <button className="danger" onClick={remove}>Delete</button>}
                    <button onClick={done}>Cancel</button>
                    <button className="btn btn-fire" disabled={busy || !row.title} onClick={save}>
                        {busy ? "Saving…" : "Save"}
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
                    Slug — the URL: /{row.slug || "…"}
                    <input value={row.slug} disabled={!isNew} onChange={(e) => set({ slug: slugify(e.target.value) })} />
                    {!isNew && <small>Locked: this URL may be shared or indexed.</small>}
                </label>
                <label className="check">
                    <input type="checkbox" checked={row.published} onChange={(e) => set({ published: e.target.checked })} />
                    Published (visible on the site)
                </label>
                <div className="wide">
                    <div className="admin-subhead">
                        <span>Content (HTML)</span>
                        <button onClick={() => setPreview(!preview)}>{preview ? "Edit HTML" : "Preview"}</button>
                    </div>
                    {preview
                        ? <div className="article-body admin-preview" dangerouslySetInnerHTML={{ __html: row.content_html }} />
                        : <textarea className="mono" rows={18} value={row.content_html} onChange={(e) => set({ content_html: e.target.value })} />}
                </div>
            </div>
        </section>
    );
}
