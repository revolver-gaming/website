"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sb, slugify, uploadMedia, errMsg } from "../../lib";
import { useUnsavedWarning } from "../../ui";

type Row = {
    id?: string;
    slug: string;
    title: string;
    blurb: string;
    card_image: string;
    year: number;
    tags: string[];
    featured: boolean;
    sort_order: number;
    description_html: string | null;
    features: string[];
    screenshots: string[];
    product_sheet: string | null;
    demo_url: string | null;
    video_url: string | null;
    published: boolean;
};

const blank = (): Row => ({
    slug: "", title: "", blurb: "", card_image: "", year: new Date().getFullYear(),
    tags: [], featured: false, sort_order: -1, description_html: "", features: [],
    screenshots: [], product_sheet: null, demo_url: null, video_url: null, published: true,
});

export default function EditGame() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const isNew = id === "new";
    const [row, setRow] = useState<Row | null>(isNew ? blank() : null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (isNew) return;
        sb.from("games").select("*").eq("id", id).single()
            .then(({ data, error }) => (error ? setLoadError(errMsg(error)) : setRow(data)));
    }, [id, isNew]);

    if (loadError) return <p className="admin-error">{loadError}</p>;
    if (!row) return <p className="admin-hint">Loading…</p>;
    return <Editor initial={row} done={() => router.push("/admin/games")} />;
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
            ? await sb.from("games").insert(record)
            : await sb.from("games").update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"? The URL /game/${row.slug} will stop working.`)) return;
        setBusy("delete");
        const { error } = await sb.from("games").delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    const upload = async (folder: string, file: File | undefined, apply: (url: string) => void) => {
        if (!file) return;
        setBusy("upload");
        setError("");
        try { apply(await uploadMedia(folder, file)); }
        catch (e) { setError(errMsg(e)); }
        setBusy("");
    };

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">{isNew ? "New game" : "Edit game"}</h1>
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
                    Slug — the URL: /game/{row.slug || "…"}
                    <input value={row.slug} disabled={!isNew} onChange={(e) => set({ slug: slugify(e.target.value) })} />
                    {!isNew && <small>Locked: this URL may be shared or indexed.</small>}
                </label>
                <label>
                    Year
                    <input type="number" value={row.year} onChange={(e) => set({ year: +e.target.value })} />
                </label>
                <label>
                    Position (lower = first)
                    <input type="number" value={row.sort_order} onChange={(e) => set({ sort_order: +e.target.value })} />
                </label>
                <label>
                    Tags — comma-separated, shown on the card
                    <input value={row.tags.join(", ")} onChange={(e) => set({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} />
                </label>
                <label className="check">
                    <input type="checkbox" checked={row.featured} onChange={(e) => set({ featured: e.target.checked })} />
                    Featured (homepage cylinder & hero)
                </label>
                <label className="check">
                    <input type="checkbox" checked={row.published} onChange={(e) => set({ published: e.target.checked })} />
                    Published (visible on the site)
                </label>
                <label className="wide">
                    Blurb — card & page intro text
                    <textarea rows={3} value={row.blurb} onChange={(e) => set({ blurb: e.target.value })} />
                </label>
                <label className="wide">
                    Card artwork
                    {row.card_image && <img className="admin-thumb" src={row.card_image} alt="" />}
                    <input type="file" accept="image/*" onChange={(e) => upload("cards", e.target.files?.[0], (url) => set({ card_image: url }))} />
                </label>
                <div className="wide">
                    <div className="admin-subhead">
                        <span>Description (HTML)</span>
                        <button onClick={() => setPreview(!preview)}>{preview ? "Edit HTML" : "Preview"}</button>
                    </div>
                    {preview
                        ? <div className="article-body admin-preview" dangerouslySetInnerHTML={{ __html: row.description_html ?? "" }} />
                        : <textarea className="mono" rows={12} value={row.description_html ?? ""} onChange={(e) => set({ description_html: e.target.value })} />}
                </div>
                <label className="wide">
                    Features &amp; USPs — one per line
                    <textarea className="mono" rows={8} value={row.features.join("\n")}
                        onChange={(e) => set({ features: e.target.value.split("\n").map((f) => f.trim()).filter(Boolean) })} />
                </label>
                <div className="wide">
                    <div className="admin-subhead">
                        <span>Screenshots</span>
                        <label className="admin-inline-upload">
                            Add screenshot
                            <input type="file" accept="image/*" multiple onChange={async (e) => {
                                for (const f of Array.from(e.target.files ?? [])) {
                                    await upload("games", f, (url) => setRow((r) => ({ ...r, screenshots: [...r.screenshots, url] })));
                                }
                            }} />
                        </label>
                    </div>
                    <div className="admin-shots">
                        {row.screenshots.map((s, i) => (
                            <figure key={s}>
                                <img src={s} alt="" />
                                <button className="danger" onClick={() => set({ screenshots: row.screenshots.filter((_, j) => j !== i) })}>Remove</button>
                            </figure>
                        ))}
                    </div>
                </div>
                <label>
                    Product sheet (PDF)
                    {row.product_sheet && <small><a href={row.product_sheet} target="_blank">Current PDF ↗</a></small>}
                    <input type="file" accept="application/pdf" onChange={(e) => upload("pdf", e.target.files?.[0], (url) => set({ product_sheet: url }))} />
                </label>
                <label>
                    Demo launch URL
                    <input value={row.demo_url ?? ""} onChange={(e) => set({ demo_url: e.target.value || null })} />
                </label>
                <label>
                    Video URL (YouTube)
                    <input value={row.video_url ?? ""} onChange={(e) => set({ video_url: e.target.value || null })} />
                </label>
                {busy === "upload" && <p className="admin-hint">Uploading…</p>}
            </div>
        </section>
    );
}
