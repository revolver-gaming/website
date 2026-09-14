"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sb, slugify, uploadMedia, errMsg } from "../../lib";
import { useUnsavedWarning } from "../../ui";

type Feature = { title: string; text: string };

type Row = {
    id?: string;
    slug: string;
    title: string;
    category: string;
    blurb: string;
    max_win: string | null;
    rtp: string | null;
    volatility: string | null;
    features: Feature[];
    card_image: string | null;
    demo_url: string | null;
    is_new: boolean;
    featured: boolean;
    coming_soon: boolean;
    sort_order: number;
    published: boolean;
};

const blank = (): Row => ({
    slug: "", title: "", category: "", blurb: "", max_win: null, rtp: null, volatility: null,
    features: [], card_image: null, demo_url: null, is_new: true, featured: false,
    coming_soon: false, sort_order: 0, published: true,
});

const featuresToText = (features: Feature[]) => features.map((f) => `${f.title} | ${f.text}`).join("\n");

const textToFeatures = (text: string): Feature[] =>
    text.split("\n").map((line) => {
        const [title, ...rest] = line.split("|");
        return { title: title.trim(), text: rest.join("|").trim() };
    }).filter((f) => f.title);

export default function EditOriginal() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const isNew = id === "new";
    const [row, setRow] = useState<Row | null>(isNew ? blank() : null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (isNew) return;
        sb.from("originals").select("*").eq("id", id).single()
            .then(({ data, error }) => (error ? setLoadError(errMsg(error)) : setRow(data)));
    }, [id, isNew]);

    if (loadError) return <p className="admin-error">{loadError}</p>;
    if (!row) return <p className="admin-hint">Loading…</p>;
    return <Editor initial={row} done={() => router.push("/admin/originals")} />;
}

function Editor({ initial, done }: { initial: Row; done: () => void }) {
    const [row, setRow] = useState(initial);
    const [featureText, setFeatureText] = useState(featuresToText(initial.features));
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
        const record = {
            ...row,
            slug: row.slug || slugify(row.title),
            features: textToFeatures(featureText),
            updated_at: new Date().toISOString(),
        };
        const { error } = isNew
            ? await sb.from("originals").insert(record)
            : await sb.from("originals").update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}"? The URL /originals/${row.slug} will stop working.`)) return;
        setBusy("delete");
        const { error } = await sb.from("originals").delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    const upload = async (file: File | undefined) => {
        if (!file) return;
        setBusy("upload");
        setError("");
        try { set({ card_image: await uploadMedia("originals", file) }); }
        catch (e) { setError(errMsg(e)); }
        setBusy("");
    };

    const text = (key: "max_win" | "rtp" | "volatility" | "demo_url") => ({
        value: row[key] ?? "",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => set({ [key]: e.target.value || null }),
    });

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">{isNew ? "New original" : "Edit original"}</h1>
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
                    Slug — the URL: /originals/{row.slug || "…"}
                    <input value={row.slug} disabled={!isNew} onChange={(e) => set({ slug: slugify(e.target.value) })} />
                    {!isNew && <small>Locked: this URL may be shared or indexed.</small>}
                </label>
                <label>
                    Position (lower = first)
                    <input type="number" value={row.sort_order} onChange={(e) => set({ sort_order: +e.target.value })} />
                </label>
                <label>
                    Category — e.g. Multiplier, Table, Cards
                    <input value={row.category} onChange={(e) => set({ category: e.target.value })} />
                </label>
                <label>
                    Max win — e.g. 1,000,000×
                    <input {...text("max_win")} />
                </label>
                <label>
                    RTP — e.g. 94–99%
                    <input {...text("rtp")} />
                </label>
                <label>
                    Volatility — e.g. High
                    <input {...text("volatility")} />
                </label>
                <label className="check">
                    <input type="checkbox" checked={row.is_new} onChange={(e) => set({ is_new: e.target.checked })} />
                    “New” tag on the card
                </label>
                <label className="check">
                    <input type="checkbox" checked={row.featured} onChange={(e) => set({ featured: e.target.checked })} />
                    Featured (leads the Originals section)
                </label>
                <label className="check">
                    <input type="checkbox" checked={row.coming_soon} onChange={(e) => set({ coming_soon: e.target.checked })} />
                    Coming soon (card only, no game page)
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
                    Features — one per line, “Title | description”
                    <textarea className="mono" rows={6} value={featureText}
                        onChange={(e) => { setDirty(true); setFeatureText(e.target.value); }} />
                </label>
                <label className="wide">
                    Card artwork (optional — an icon placeholder is shown without it)
                    {row.card_image && <img className="admin-thumb" src={row.card_image} alt="" />}
                    <input type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0])} />
                    {row.card_image && <button className="danger" onClick={() => set({ card_image: null })}>Remove artwork</button>}
                </label>
                <label className="wide">
                    Demo launch URL
                    <input {...text("demo_url")} />
                </label>
                {busy === "upload" && <p className="admin-hint">Uploading…</p>}
            </div>
        </section>
    );
}
