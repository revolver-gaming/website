"use client";

import { useEffect, useState } from "react";
import { sb, errMsg, prepareLogo, uploadMedia } from "../lib";
import PartnerLogo from "@/components/PartnerLogo";

type Row = {
    id?: string;
    name: string;
    logo: string | null;
    logo_scale: number;
    published: boolean;
    known_for?: string;
    genre?: string;
};

type Table = "operators" | "partner_studios";

export default function AdminPartners() {
    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Partners</h1>
            </div>
            <p className="admin-hint">
                Logos must be <b>SVG</b> or <b>PNG/WebP with a transparent background</b> — horizontal wordmark, no box
                behind it. The site shows every logo in one colour (cream on dark, plum on light) so mismatched brand
                colours read as one set; any colour is fine in the file. Use <b>Size</b> to even out visual weight
                against the preview strip. Rows without a logo show the name as text.
            </p>
            <PartnerList table="operators" title="Operators" hint="Homepage & /gap ticker, RGS operator roster." />
            <PartnerList table="partner_studios" title="Partner studios" hint="Studio roster on the homepage and /gap." />
        </section>
    );
}

function PartnerList({ table, title, hint }: { table: Table; title: string; hint: string }) {
    const isStudio = table === "partner_studios";
    const [rows, setRows] = useState<Row[] | null>(null);
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [status, setStatus] = useState("");
    const [busy, setBusy] = useState(false);

    const load = () =>
        sb.from(table).select("*").order("sort_order").then(({ data, error }) => {
            if (error) return setStatus(errMsg(error));
            setRows(data);
            setSavedIds(data.map((r) => r.id));
        });
    useEffect(() => { load(); }, [table]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!rows) return <div className="admin-panel"><h2>{title}</h2><p className="admin-hint">{status || "Loading…"}</p></div>;

    const patch = (i: number, p: Partial<Row>) => setRows(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
    const move = (i: number, d: number) => {
        const next = [...rows];
        [next[i], next[i + d]] = [next[i + d], next[i]];
        setRows(next);
    };

    const upload = async (i: number, picked: File | undefined) => {
        if (!picked) return;
        setBusy(true);
        try {
            const { file, warning } = await prepareLogo(picked);
            patch(i, { logo: await uploadMedia("partners", file) });
            setStatus(warning);
        } catch (e) { setStatus(errMsg(e)); }
        setBusy(false);
    };

    const save = async () => {
        setBusy(true);
        const records = rows.filter((r) => r.name.trim()).map((r, i) => ({ ...r, name: r.name.trim(), sort_order: i }));
        const removed = savedIds.filter((id) => !records.some((r) => r.id === id));
        const [existing, added] = [records.filter((r) => r.id), records.filter((r) => !r.id)];
        const results = await Promise.all([
            removed.length ? sb.from(table).delete().in("id", removed) : null,
            existing.length ? sb.from(table).upsert(existing) : null,
            added.length ? sb.from(table).insert(added) : null,
        ]);
        const error = results.find((r) => r?.error)?.error;
        setStatus(error ? errMsg(error) : "Saved ✓");
        setBusy(false);
        if (!error) load();
    };

    const preview = rows.filter((r) => r.published && r.name).map((r) => ({ name: r.name, logo: r.logo, logoScale: r.logo_scale }));

    return (
        <div className="admin-panel">
            <h2>{title}</h2>
            <p className="admin-hint">{hint}</p>

            {["dark", "light"].map((tone) => (
                <div key={tone} className={`admin-logo-strip ${tone === "light" ? "on-bone" : ""}`}>
                    {preview.map((p) => <span key={p.name}><PartnerLogo {...p} /></span>)}
                </div>
            ))}

            {rows.map((r, i) => (
                <div className={`admin-partner-row ${isStudio ? "studio" : ""}`} key={r.id ?? `new-${i}`}>
                    <label className="admin-logo-drop" title="Upload SVG or transparent PNG">
                        {r.logo ? <img src={r.logo} alt="" /> : <span>+ Logo</span>}
                        <input type="file" accept="image/svg+xml,image/png,image/webp" disabled={busy}
                            onChange={(e) => upload(i, e.target.files?.[0])} />
                    </label>
                    <input placeholder="Name" value={r.name} onChange={(e) => patch(i, { name: e.target.value })} />
                    {isStudio && <>
                        <input placeholder="Known for" value={r.known_for ?? ""} onChange={(e) => patch(i, { known_for: e.target.value })} />
                        <input placeholder="Genre" value={r.genre ?? ""} onChange={(e) => patch(i, { genre: e.target.value })} />
                    </>}
                    <label className="admin-scale">
                        Size {Math.round(r.logo_scale * 100)}%
                        <input type="range" min={0.5} max={2} step={0.05} value={r.logo_scale}
                            onChange={(e) => patch(i, { logo_scale: Number(e.target.value) })} />
                    </label>
                    <label className="admin-check">
                        <input type="checkbox" checked={r.published} onChange={(e) => patch(i, { published: e.target.checked })} />
                        live
                    </label>
                    <span className="admin-row-tools">
                        {r.logo && <button onClick={() => patch(i, { logo: null })} title="Remove logo">⌫</button>}
                        <button disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                        <button disabled={i === rows.length - 1} onClick={() => move(i, 1)}>↓</button>
                        <button className="danger" onClick={() => setRows(rows.filter((_, j) => j !== i))}>✕</button>
                    </span>
                </div>
            ))}

            <button onClick={() => setRows([...rows, {
                name: "", logo: null, logo_scale: 1, published: true, ...(isStudio && { known_for: "", genre: "" }),
            }])}>+ Add {isStudio ? "studio" : "operator"}</button>
            <div className="admin-actions">
                <button className="btn btn-fire" disabled={busy} onClick={save}>Save {title.toLowerCase()}</button>
                {status && <span className="admin-status">{status}</span>}
            </div>
        </div>
    );
}
