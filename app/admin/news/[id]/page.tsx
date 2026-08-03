"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sb, slugify, uploadMedia, errMsg } from "../../lib";
import { useUnsavedWarning } from "../../ui";

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

export default function EditNews() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const isNew = id === "new";
    const [row, setRow] = useState<Row | null>(isNew ? blank() : null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (isNew) return;
        sb.from("news").select("*").eq("id", id).single()
            .then(({ data, error }) => (error ? setLoadError(errMsg(error)) : setRow(data)));
    }, [id, isNew]);

    if (loadError) return <p className="admin-error">{loadError}</p>;
    if (!row) return <p className="admin-hint">Loading…</p>;
    return <Editor initial={row} done={() => router.push("/admin/news")} />;
}

function Editor({ initial, done }: { initial: Row; done: () => void }) {
    const [row, setRow] = useState(initial);
    const [dirty, setDirty] = useState(false);
    const [busy, setBusy] = useState("");
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
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
            ? await sb.from("news").insert(record)
            : await sb.from("news").update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"? The URL /news/${row.slug} will stop working.`)) return;
        setBusy("delete");
        const { error } = await sb.from("news").delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
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
