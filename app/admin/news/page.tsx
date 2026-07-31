"use client";

import { useEffect, useState } from "react";
import { sb, slugify, uploadMedia, errMsg } from "../lib";

type Row = {
    id?: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content_html: string;
    cover_image: string | null;
    published_at: string;
    published: boolean;
};

const blank = (): Row => ({
    slug: "", title: "", excerpt: "", content_html: "",
    cover_image: null, published_at: new Date().toISOString(), published: true,
});

export default function AdminNews() {
    const [rows, setRows] = useState<Row[] | null>(null);
    const [edit, setEdit] = useState<Row | null>(null);
    const [error, setError] = useState("");

    const load = async () => {
        const { data, error } = await sb.from("news").select("*").order("published_at", { ascending: false });
        if (error) setError(errMsg(error));
        else setRows(data);
    };
    useEffect(() => { load(); }, []);

    if (edit) return <Editor initial={edit} done={() => { setEdit(null); load(); }} />;
    return (
        <section>
            <div className="admin-head">
                <h1 className="display">News</h1>
                <button className="btn btn-fire" onClick={() => setEdit(blank())}>+ New article</button>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <table className="admin-table">
                <thead><tr><th>Date</th><th>Title</th><th>Status</th><th /></tr></thead>
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
    const [busy, setBusy] = useState("");
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
    const isNew = !initial.id;
    const set = (patch: Partial<Row>) => setRow((r) => ({ ...r, ...patch }));

    const save = async () => {
        setBusy("save");
        setError("");
        const record = { ...row, slug: row.slug || slugify(row.title), updated_at: new Date().toISOString() };
        const { error } = isNew
            ? await sb.from("news").insert(record)
            : await sb.from("news").update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"? The URL /news/${row.slug} will stop working.`)) return;
        setBusy("delete");
        const { error } = await sb.from("news").delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        done();
    };

    const upload = async (file: File | undefined, apply: (url: string) => void) => {
        if (!file) return;
        setBusy("upload");
        setError("");
        try { apply(await uploadMedia("news", file)); }
        catch (e) { setError(errMsg(e)); }
        setBusy("");
    };

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">{isNew ? "New article" : "Edit article"}</h1>
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
                    Slug — the URL: /news/{row.slug || "…"}
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
                <div className="wide">
                    <div className="admin-subhead">
                        <span>Body (HTML — wrap paragraphs in &lt;p&gt;…&lt;/p&gt;)</span>
                        <span>
                            <label className="admin-inline-upload">
                                Insert image
                                <input type="file" accept="image/*" onChange={(e) =>
                                    upload(e.target.files?.[0], (url) =>
                                        set({ content_html: `${row.content_html}\n<p><img src="${url}" alt=""></p>` }))} />
                            </label>
                            <button onClick={() => setPreview(!preview)}>{preview ? "Edit HTML" : "Preview"}</button>
                        </span>
                    </div>
                    {preview
                        ? <div className="article-body admin-preview" dangerouslySetInnerHTML={{ __html: row.content_html }} />
                        : <textarea className="mono" rows={18} value={row.content_html} onChange={(e) => set({ content_html: e.target.value })} />}
                </div>
            </div>
        </section>
    );
}
