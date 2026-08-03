"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sb, slugify, uploadMedia, errMsg } from "../../lib";
import { useUnsavedWarning } from "../../ui";

type Row = {
    id?: string;
    provider: string;
    slug: string;
    title: string;
    card_image: string;
    demo_url: string | null;
    tags: string[];
    sort_order: number;
    published: boolean;
};

const blank = (): Row => ({
    provider: "", slug: "", title: "", card_image: "", demo_url: null,
    tags: [], sort_order: 0, published: true,
});

export default function EditProviderGame() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const isNew = id === "new";
    const [row, setRow] = useState<Row | null>(isNew ? blank() : null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (isNew) return;
        sb.from("provider_games").select("*").eq("id", id).single()
            .then(({ data, error }) => (error ? setLoadError(errMsg(error)) : setRow(data)));
    }, [id, isNew]);

    if (loadError) return <p className="admin-error">{loadError}</p>;
    if (!row) return <p className="admin-hint">Loading…</p>;
    return <Editor initial={row} done={() => router.push("/admin/provider-games")} />;
}

function Editor({ initial, done }: { initial: Row; done: () => void }) {
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
            ? await sb.from("provider_games").insert(record)
            : await sb.from("provider_games").update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}" (${row.provider})?`)) return;
        setBusy("delete");
        const { error } = await sb.from("provider_games").delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        setDirty(false);
        done();
    };

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">{isNew ? "New provider game" : "Edit provider game"}</h1>
                <div className="admin-actions">
                    {!isNew && <button className="danger" disabled={!!busy} onClick={remove}>Delete</button>}
                    <button onClick={done}>Cancel</button>
                    <button className="btn btn-fire" disabled={!!busy || !row.title || !row.provider} onClick={save}>
                        {busy === "save" ? "Saving…" : "Save"}
                    </button>
                </div>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <div className="admin-form">
                <label>
                    Provider — studio name shown on the card
                    <input value={row.provider} onChange={(e) => set({ provider: e.target.value })} />
                </label>
                <label>
                    Title
                    <input value={row.title} onChange={(e) => set({ title: e.target.value, ...(isNew ? { slug: slugify(e.target.value) } : {}) })} />
                </label>
                <label>
                    Slug — share links: /provider/{slugify(row.provider) || "…"}?play={row.slug || "…"}
                    <input value={row.slug} disabled={!isNew} onChange={(e) => set({ slug: slugify(e.target.value) })} />
                    {!isNew && <small>Locked: this URL may be shared.</small>}
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
                    <input type="checkbox" checked={row.published} onChange={(e) => set({ published: e.target.checked })} />
                    Published (visible on the site)
                </label>
                <label className="wide">
                    Demo launch URL — opened in the on-site popup
                    <input value={row.demo_url ?? ""} onChange={(e) => set({ demo_url: e.target.value || null })} />
                </label>
                <label className="wide">
                    Card artwork
                    {row.card_image && <img className="admin-thumb" src={row.card_image} alt="" />}
                    <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setBusy("upload");
                        setError("");
                        try { set({ card_image: await uploadMedia("providers", file) }); }
                        catch (err) { setError(errMsg(err)); }
                        setBusy("");
                    }} />
                </label>
                {busy === "upload" && <p className="admin-hint">Uploading…</p>}
            </div>
        </section>
    );
}
