"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sb, slugify, errMsg } from "../../lib";
import { useUnsavedWarning } from "../../ui";

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

export default function EditJob() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const isNew = id === "new";
    const [row, setRow] = useState<Row | null>(isNew ? blank() : null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (isNew) return;
        sb.from("jobs").select("*").eq("id", id).single()
            .then(({ data, error }) => (error ? setLoadError(errMsg(error)) : setRow(data)));
    }, [id, isNew]);

    if (loadError) return <p className="admin-error">{loadError}</p>;
    if (!row) return <p className="admin-hint">Loading…</p>;
    return <Editor initial={row} done={() => router.push("/admin/jobs")} />;
}

function Editor({ initial, done }: { initial: Row; done: () => void }) {
    const [row, setRow] = useState(initial);
    const [dirty, setDirty] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
    const isNew = !initial.id;
    const set = (patch: Partial<Row>) => {
        setDirty(true);
        setRow((r) => ({ ...r, ...patch }));
    };
    useUnsavedWarning(dirty);

    const save = async () => {
        setBusy(true);
        setError("");
        const record = { ...row, slug: row.slug || slugify(row.title) };
        const { error } = isNew
            ? await sb.from("jobs").insert(record)
            : await sb.from("jobs").update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(false); return; }
        setDirty(false);
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"?`)) return;
        const { error } = await sb.from("jobs").delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); return; }
        setDirty(false);
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
