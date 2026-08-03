"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sb, slugify, errMsg } from "../../lib";
import { useUnsavedWarning } from "../../ui";

type Row = {
    slug: string;
    title: string;
    content_html: string;
    published: boolean;
};

export default function EditPage() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();
    const isNew = slug === "new";
    const [row, setRow] = useState<Row | null>(
        isNew ? { slug: "", title: "", content_html: "", published: true } : null,
    );
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (isNew) return;
        sb.from("pages").select("*").eq("slug", slug).single()
            .then(({ data, error }) => (error ? setLoadError(errMsg(error)) : setRow(data)));
    }, [slug, isNew]);

    if (loadError) return <p className="admin-error">{loadError}</p>;
    if (!row) return <p className="admin-hint">Loading…</p>;
    return <Editor row={row} isNew={isNew} done={() => router.push("/admin/pages")} />;
}

function Editor({ row: initial, isNew, done }: { row: Row; isNew: boolean; done: () => void }) {
    const [row, setRow] = useState(initial);
    const [dirty, setDirty] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
    const set = (patch: Partial<Row>) => {
        setDirty(true);
        setRow((r) => ({ ...r, ...patch }));
    };
    useUnsavedWarning(dirty);

    const save = async () => {
        setBusy(true);
        setError("");
        const record = { ...row, slug: row.slug || slugify(row.title), updated_at: new Date().toISOString() };
        const { error } = isNew
            ? await sb.from("pages").insert(record)
            : await sb.from("pages").update(record).eq("slug", initial.slug);
        if (error) { setError(errMsg(error)); setBusy(false); return; }
        setDirty(false);
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"? The URL /${row.slug} will stop working.`)) return;
        const { error } = await sb.from("pages").delete().eq("slug", initial.slug);
        if (error) { setError(errMsg(error)); return; }
        setDirty(false);
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
