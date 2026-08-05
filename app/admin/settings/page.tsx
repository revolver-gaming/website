"use client";

import { useEffect, useState } from "react";
import { sb, errMsg } from "../lib";
import type { Contact, LinkItem, PlatformChapter, PlatformStat, StudioOffer } from "@/lib/cms";

type Studio = { id?: string; name: string; known_for: string; genre: string; sort_order: number };

export default function AdminSettings() {
    const [contact, setContact] = useState<Contact | null>(null);
    const [socials, setSocials] = useState<LinkItem[] | null>(null);
    const [footerLinks, setFooterLinks] = useState<LinkItem[] | null>(null);
    const [platformStats, setPlatformStats] = useState<PlatformStat[] | null>(null);
    const [platformPage, setPlatformPage] = useState<PlatformChapter[] | null>(null);
    const [rgsStats, setRgsStats] = useState<PlatformStat[] | null>(null);
    const [rgsPage, setRgsPage] = useState<PlatformChapter[] | null>(null);
    const [studioOffer, setStudioOffer] = useState<StudioOffer | null>(null);
    const [studios, setStudios] = useState<Studio[] | null>(null);
    const [operators, setOperators] = useState<string>("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        sb.from("site_content").select("key, value").then(({ data }) => {
            for (const row of data ?? []) {
                if (row.key === "contact") setContact(row.value);
                if (row.key === "socials") setSocials(row.value);
                if (row.key === "footer_links") setFooterLinks(row.value);
                if (row.key === "platform_stats") setPlatformStats(row.value);
                if (row.key === "platform_page") setPlatformPage(row.value);
                if (row.key === "rgs_stats") setRgsStats(row.value);
                if (row.key === "rgs_page") setRgsPage(row.value);
                if (row.key === "studio_offer") setStudioOffer(row.value);
            }
        });
        sb.from("partner_studios").select("*").order("sort_order").then(({ data }) => setStudios(data ?? []));
        sb.from("operators").select("name").order("sort_order")
            .then(({ data }) => setOperators((data ?? []).map((o) => o.name).join("\n")));
    }, []);

    const flash = (msg: string) => {
        setStatus(msg);
        setTimeout(() => setStatus(""), 3000);
    };

    const saveContent = async (key: string, value: unknown) => {
        const { error } = await sb.from("site_content")
            .update({ value, updated_at: new Date().toISOString() }).eq("key", key);
        flash(error ? errMsg(error) : "Saved ✓");
    };

    const saveStudios = async () => {
        if (!studios) return;
        const { error: delErr } = await sb.from("partner_studios").delete().not("id", "is", null);
        const { error: insErr } = await sb.from("partner_studios")
            .insert(studios.map((s, i) => ({ name: s.name, known_for: s.known_for, genre: s.genre, sort_order: i })));
        flash(delErr || insErr ? errMsg(delErr || insErr) : "Saved ✓");
    };

    const saveOperators = async () => {
        const names = operators.split("\n").map((n) => n.trim()).filter(Boolean);
        const { error: delErr } = await sb.from("operators").delete().not("id", "is", null);
        const { error: insErr } = await sb.from("operators")
            .insert(names.map((name, i) => ({ name, sort_order: i })));
        flash(delErr || insErr ? errMsg(delErr || insErr) : "Saved ✓");
    };

    const linkList = (items: LinkItem[], set: (v: LinkItem[]) => void) => (
        <>
            {items.map((item, i) => (
                <div className="admin-link-row" key={i}>
                    <input placeholder="Label" value={item.label}
                        onChange={(e) => set(items.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                    <input placeholder="URL" value={item.url}
                        onChange={(e) => set(items.map((x, j) => j === i ? { ...x, url: e.target.value } : x))} />
                    <button className="danger" onClick={() => set(items.filter((_, j) => j !== i))}>✕</button>
                </div>
            ))}
            <button onClick={() => set([...items, { label: "", url: "" }])}>+ Add link</button>
        </>
    );

    const statsPanel = (
        title: string, hint: string, key: string,
        stats: PlatformStat[] | null, set: (v: PlatformStat[]) => void,
    ) => stats && (
        <div className="admin-panel">
            <h2>{title}</h2>
            <p className="admin-hint">{hint}</p>
            {stats.map((s, i) => (
                <div className="admin-link-row three" key={i}>
                    <input placeholder="Value" value={s.value}
                        onChange={(e) => set(stats.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} />
                    <input placeholder="Suffix" value={s.suffix}
                        onChange={(e) => set(stats.map((x, j) => j === i ? { ...x, suffix: e.target.value } : x))} />
                    <input placeholder="Label" value={s.label}
                        onChange={(e) => set(stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                    <button className="danger" onClick={() => set(stats.filter((_, j) => j !== i))}>✕</button>
                </div>
            ))}
            <button onClick={() => set([...stats, { value: "", suffix: "", label: "" }])}>+ Add stat</button>
            <button className="btn btn-fire" onClick={() => saveContent(key, stats.filter((s) => s.value && s.label))}>Save stats</button>
        </div>
    );

    const chaptersPanel = (
        title: string, hint: string, key: string,
        chapters: PlatformChapter[] | null, set: (v: PlatformChapter[]) => void,
    ) => chapters && (
        <div className="admin-panel">
            <h2>{title}</h2>
            <p className="admin-hint">{hint}</p>
            {chapters.map((ch, ci) => {
                const setChapter = (patch: Partial<PlatformChapter>) =>
                    set(chapters.map((x, j) => j === ci ? { ...x, ...patch } : x));
                return (
                    <div className="admin-chapter" key={ci}>
                        <div className="admin-link-row">
                            <input placeholder="Kicker" value={ch.kicker}
                                onChange={(e) => setChapter({ kicker: e.target.value })} />
                            <input placeholder="Title" value={ch.title}
                                onChange={(e) => setChapter({ title: e.target.value })} />
                            <span className="admin-chapter-num">CH.{String(ci + 1).padStart(2, "0")}</span>
                        </div>
                        <textarea rows={2} placeholder="Intro" value={ch.intro}
                            onChange={(e) => setChapter({ intro: e.target.value })} />
                        {ch.features.map((f, fi) => {
                            const setFeature = (patch: Partial<PlatformChapter["features"][number]>) =>
                                setChapter({ features: ch.features.map((x, j) => j === fi ? { ...x, ...patch } : x) });
                            return (
                                <div className="admin-link-row plat" key={fi}>
                                    <input placeholder="Feature title" value={f.title}
                                        onChange={(e) => setFeature({ title: e.target.value })} />
                                    <input placeholder="Feature text" value={f.text}
                                        onChange={(e) => setFeature({ text: e.target.value })} />
                                    <input placeholder="Link (optional)" value={f.href ?? ""}
                                        onChange={(e) => setFeature({ href: e.target.value || undefined })} />
                                    <label className="admin-check">
                                        <input type="checkbox" checked={!!f.roadmap}
                                            onChange={(e) => setFeature({ roadmap: e.target.checked || undefined })} />
                                        roadmap
                                    </label>
                                    <button className="danger"
                                        onClick={() => setChapter({ features: ch.features.filter((_, j) => j !== fi) })}>✕</button>
                                </div>
                            );
                        })}
                        <button onClick={() => setChapter({ features: [...ch.features, { title: "", text: "" }] })}>
                            + Add feature
                        </button>
                    </div>
                );
            })}
            <button className="btn btn-fire"
                onClick={() => saveContent(key, chapters.map((ch) => ({
                    ...ch, features: ch.features.filter((f) => f.title && f.text),
                })))}>
                Save {title.toLowerCase()}
            </button>
        </div>
    );

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Settings</h1>
                {status && <span className="admin-status">{status}</span>}
            </div>

            {contact && (
                <div className="admin-panel">
                    <h2>Contact details</h2>
                    <div className="admin-form">
                        <label>Email<input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></label>
                        <label>Phone<input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></label>
                        <label className="wide">Address — one line per row
                            <textarea rows={3} value={contact.address.join("\n")}
                                onChange={(e) => setContact({ ...contact, address: e.target.value.split("\n") })} />
                        </label>
                        <label className="wide">License text
                            <textarea rows={2} value={contact.license} onChange={(e) => setContact({ ...contact, license: e.target.value })} />
                        </label>
                        <label className="wide">License register URL
                            <input value={contact.license_url} onChange={(e) => setContact({ ...contact, license_url: e.target.value })} />
                        </label>
                    </div>
                    <button className="btn btn-fire" onClick={() => saveContent("contact", contact)}>Save contact</button>
                </div>
            )}

            {socials && (
                <div className="admin-panel">
                    <h2>Social media</h2>
                    {linkList(socials, setSocials)}
                    <button className="btn btn-fire" onClick={() => saveContent("socials", socials.filter((s) => s.label && s.url))}>Save socials</button>
                </div>
            )}

            {footerLinks && (
                <div className="admin-panel">
                    <h2>Footer links</h2>
                    {linkList(footerLinks, setFooterLinks)}
                    <button className="btn btn-fire" onClick={() => saveContent("footer_links", footerLinks.filter((l) => l.label && l.url))}>Save footer links</button>
                </div>
            )}

            {statsPanel("GAP stats", "Stat strips on the homepage (CH.02) and /gap hero. Suffix renders highlighted, e.g. “16” + “+”.", "platform_stats", platformStats, setPlatformStats)}
            {statsPanel("RGS stats", "Stat strip on the /rgs hero.", "rgs_stats", rgsStats, setRgsStats)}
            {chaptersPanel("GAP page", "Chapters on /gap. “In the chamber” marks a feature as roadmap (coming soon).", "platform_page", platformPage, setPlatformPage)}
            {chaptersPanel("RGS page", "Chapters on /rgs. “In the chamber” marks a feature as roadmap (coming soon).", "rgs_page", rgsPage, setRgsPage)}

            {studioOffer && (
                <div className="admin-panel">
                    <h2>Made to order (games page)</h2>
                    <div className="admin-link-row">
                        <input placeholder="Kicker" value={studioOffer.kicker}
                            onChange={(e) => setStudioOffer({ ...studioOffer, kicker: e.target.value })} />
                        <input placeholder="Title" value={studioOffer.title}
                            onChange={(e) => setStudioOffer({ ...studioOffer, title: e.target.value })} />
                        <span />
                    </div>
                    <textarea rows={2} placeholder="Intro" value={studioOffer.intro}
                        onChange={(e) => setStudioOffer({ ...studioOffer, intro: e.target.value })} />
                    {studioOffer.cards.map((c, i) => (
                        <div className="admin-link-row" key={i}>
                            <input placeholder="Card title" value={c.title}
                                onChange={(e) => setStudioOffer({ ...studioOffer, cards: studioOffer.cards.map((x, j) => j === i ? { ...x, title: e.target.value } : x) })} />
                            <input placeholder="Card text" value={c.text}
                                onChange={(e) => setStudioOffer({ ...studioOffer, cards: studioOffer.cards.map((x, j) => j === i ? { ...x, text: e.target.value } : x) })} />
                            <button className="danger" onClick={() => setStudioOffer({ ...studioOffer, cards: studioOffer.cards.filter((_, j) => j !== i) })}>✕</button>
                        </div>
                    ))}
                    <button onClick={() => setStudioOffer({ ...studioOffer, cards: [...studioOffer.cards, { title: "", text: "" }] })}>+ Add card</button>
                    <div className="admin-link-row">
                        <input placeholder="Studio banner title" value={studioOffer.studio_note.title}
                            onChange={(e) => setStudioOffer({ ...studioOffer, studio_note: { ...studioOffer.studio_note, title: e.target.value } })} />
                        <input placeholder="Studio banner text" value={studioOffer.studio_note.text}
                            onChange={(e) => setStudioOffer({ ...studioOffer, studio_note: { ...studioOffer.studio_note, text: e.target.value } })} />
                        <span />
                    </div>
                    <button className="btn btn-fire"
                        onClick={() => saveContent("studio_offer", { ...studioOffer, cards: studioOffer.cards.filter((c) => c.title && c.text) })}>
                        Save made to order
                    </button>
                </div>
            )}

            {studios && (
                <div className="admin-panel">
                    <h2>Partner studios</h2>
                    {studios.map((s, i) => (
                        <div className="admin-link-row three" key={i}>
                            <input placeholder="Name" value={s.name}
                                onChange={(e) => setStudios(studios.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
                            <input placeholder="Known for" value={s.known_for}
                                onChange={(e) => setStudios(studios.map((x, j) => j === i ? { ...x, known_for: e.target.value } : x))} />
                            <input placeholder="Genre" value={s.genre}
                                onChange={(e) => setStudios(studios.map((x, j) => j === i ? { ...x, genre: e.target.value } : x))} />
                            <button className="danger" onClick={() => setStudios(studios.filter((_, j) => j !== i))}>✕</button>
                        </div>
                    ))}
                    <button onClick={() => setStudios([...studios, { name: "", known_for: "", genre: "", sort_order: studios.length }])}>+ Add studio</button>
                    <button className="btn btn-fire" onClick={saveStudios}>Save studios</button>
                </div>
            )}

            <div className="admin-panel">
                <h2>Operators</h2>
                <p className="admin-hint">One operator name per line, in display order.</p>
                <textarea className="mono" rows={10} value={operators} onChange={(e) => setOperators(e.target.value)} />
                <button className="btn btn-fire" onClick={saveOperators}>Save operators</button>
            </div>
        </section>
    );
}
