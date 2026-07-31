"use client";

import { useEffect, useState } from "react";
import { sb, slugify, errMsg } from "../lib";

type Row = {
    id?: string;
    slug: string;
    title: string;
    content_html: string;
    published_at: string;
    published: boolean;
};

const blank = (): Row => ({
    slug: "", title: "", content_html: "", published_at: new Date().toISOString(), published: true,
});

export default function AdminJobs() {
    const [rows, setRows] = useState<Row[] | null>(null);
    const [edit, setEdit] = useState<Row | null>(null);
    const [error, setError] = useState("");

    const load = async () => {
        const { data, error } = await sb.from("jobs").select("*").order("published_at", { ascending: false });
        if (error) setError(errMsg(error));
        else setRows(data);
    };
    useEffect(() => { load(); }, []);

    if (edit) return <Editor initial={edit} done={() => { setEdit(null); load(); }} />;
    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Jobs</h1>
                <button className="btn btn-fire" onClick={() => setEdit(blank())}>+ New job</button>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <table className="admin-table">
                <thead><tr><th>Posted</th><th>Role</th><th>Status</th><th /></tr></thead>
                <tbody>
                    {rows?.map((r) => (
                        <tr key={r.id}>
                            <td className="mono">{r.published_at.slice(0, 10)}</td>
                            <td>{r.title}</td>
                            <td>{r.published ? "Live" : <em>Draft</em>}</td>
                            <td><button onClick={() => setEdit(r)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

function Editor({ initial, done }: { initial: Row; done: () => void }) {
    const [row, setRow] = useState(initial);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
    const isNew = !initial.id;
    const set = (patch: Partial<Row>) => setRow((r) => ({ ...r, ...patch }));

    const save = async () => {
        setBusy(true);
        setError("");
        const record = { ...row, slug: row.slug || slugify(row.title) };
        const { error } = isNew
            ? await sb.from("jobs").insert(record)
            : await sb.from("jobs").update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(false); return; }
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"?`)) return;
        const { error } = await sb.from("jobs").delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); return; }
        done();
    };

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">{isNew ? "New job" : "Edit job"}</h1>
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
                    Role title
                    <input value={row.title} onChange={(e) => set({ title: e.target.value, ...(isNew ? { slug: slugify(e.target.value) } : {}) })} />
                </label>
                <label>
                    Slug — the URL: /job/{row.slug || "…"}
                    <input value={row.slug} disabled={!isNew} onChange={(e) => set({ slug: slugify(e.target.value) })} />
                </label>
                <label>
                    Posted date
                    <input type="date" value={row.published_at.slice(0, 10)} onChange={(e) => set({ published_at: e.target.value })} />
                </label>
                <label className="check">
                    <input type="checkbox" checked={row.published} onChange={(e) => set({ published: e.target.checked })} />
                    Published (visible on the site)
                </label>
                <div className="wide">
                    <div className="admin-subhead">
                        <span>Description (HTML)</span>
                        <button onClick={() => setPreview(!preview)}>{preview ? "Edit HTML" : "Preview"}</button>
                    </div>
                    {preview
                        ? <div className="article-body admin-preview" dangerouslySetInnerHTML={{ __html: row.content_html }} />
                        : <textarea className="mono" rows={16} value={row.content_html} onChange={(e) => set({ content_html: e.target.value })} />}
                </div>
            </div>
        </section>
    );
}
