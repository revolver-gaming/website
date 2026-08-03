"use client";

import { useEffect, useState } from "react";
import { sb, slugify, uploadMedia, errMsg } from "../lib";

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

export default function AdminProviderGames() {
    const [rows, setRows] = useState<Row[] | null>(null);
    const [edit, setEdit] = useState<Row | null>(null);
    const [error, setError] = useState("");

    const load = async () => {
        const { data, error } = await sb.from("provider_games").select("*").order("sort_order");
        if (error) setError(errMsg(error));
        else setRows(data);
    };
    useEffect(() => { load(); }, []);

    if (edit) return <Editor initial={edit} done={() => { setEdit(null); load(); }} />;
    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Provider games</h1>
                <button className="btn btn-fire" onClick={() => setEdit(blank())}>+ New game</button>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <p className="admin-hint">
                Third-party games shown on /games under “Partner studios”. Order here = order on the site.
            </p>
            <table className="admin-table">
                <thead><tr><th>#</th><th>Provider</th><th>Title</th><th>Status</th><th /></tr></thead>
                <tbody>
                    {rows?.map((r) => (
                        <tr key={r.id}>
                            <td className="mono">{r.sort_order}</td>
                            <td>{r.provider}</td>
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
    const isNew = !initial.id;
    const set = (patch: Partial<Row>) => setRow((r) => ({ ...r, ...patch }));

    const save = async () => {
        setBusy("save");
        setError("");
        const record = { ...row, slug: row.slug || slugify(row.title), updated_at: new Date().toISOString() };
        const { error } = isNew
            ? await sb.from("provider_games").insert(record)
            : await sb.from("provider_games").update(record).eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
        done();
    };

    const remove = async () => {
        if (!confirm(`Delete "${row.title}" (${row.provider})?`)) return;
        setBusy("delete");
        const { error } = await sb.from("provider_games").delete().eq("id", row.id!);
        if (error) { setError(errMsg(error)); setBusy(""); return; }
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
