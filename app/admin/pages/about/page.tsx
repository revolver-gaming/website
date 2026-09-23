"use client";

import Link from "next/link";
import Accent from "@/components/Accent";
import type { AboutPage, Card } from "@/lib/cms";
import { PILLARS } from "@/lib/pillars";
import { ImageField, useContent } from "../../ui";

type Head = { eyebrow: string; title: string; lede: string };

// Eyebrow / title / lede trio shared by every section.
function HeadFields({ head, onChange }: { head: Head; onChange: (h: Head) => void }) {
    return (
        <>
            <label>Eyebrow<input value={head.eyebrow} onChange={(e) => onChange({ ...head, eyebrow: e.target.value })} /></label>
            <label>
                Title
                <input value={head.title} onChange={(e) => onChange({ ...head, title: e.target.value })} />
                <span className="display admin-title-preview"><Accent text={head.title} /></span>
            </label>
            <label className="wide">Intro<textarea rows={2} value={head.lede} onChange={(e) => onChange({ ...head, lede: e.target.value })} /></label>
        </>
    );
}

export default function AdminAbout() {
    const { value: page, set, save, dirty, status } = useContent<AboutPage>("about_page");
    if (!page) return <p className="admin-hint">{status || "Loading…"}</p>;

    const { offer, principles } = page;
    const setCard = (key: string, p: Partial<AboutPage["offer"]["cards"][string]>) =>
        set({ ...page, offer: { ...offer, cards: { ...offer.cards, [key]: { ...offer.cards[key], ...p } } } });
    const setItem = (i: number, p: Partial<Card>) =>
        set({ ...page, principles: { ...principles, items: principles.items.map((x, j) => (j === i ? { ...x, ...p } : x)) } });
    const clean = (): AboutPage => ({
        ...page,
        paragraphs: page.paragraphs.filter(Boolean),
        tags: page.tags.filter(Boolean),
        principles: { ...principles, items: principles.items.filter((x) => x.title && x.text) },
    });

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">About page</h1>
                <div className="admin-actions">
                    {status && <span className="admin-status">{status}</span>}
                    <a href="/about" target="_blank">View ↗</a>
                    <Link href="/admin/pages">Back</Link>
                    <button className="btn btn-fire" disabled={!dirty} onClick={() => save(clean())}>Save</button>
                </div>
            </div>
            <p className="admin-hint">Wrap the highlighted part of a title in *asterisks*: “What we *do.*”</p>

            <div className="admin-panel">
                <h2>Hero</h2>
                <div className="admin-form">
                    <ImageField label="Background image — blurred behind the hero, with a sharp copy at the edge" folder="pages"
                        value={page.hero_image} onChange={(hero_image) => set({ ...page, hero_image })} />
                    <label>Eyebrow<input value={page.eyebrow} onChange={(e) => set({ ...page, eyebrow: e.target.value })} /></label>
                    <label>
                        Title
                        <input value={page.title} onChange={(e) => set({ ...page, title: e.target.value })} />
                        <span className="display admin-title-preview"><Accent text={page.title} /></span>
                    </label>
                    <label className="wide">
                        Paragraphs — separate with a blank line
                        <textarea rows={10} value={page.paragraphs.join("\n\n")}
                            onChange={(e) => set({ ...page, paragraphs: e.target.value.split(/\n\s*\n/) })} />
                    </label>
                    <label className="wide">
                        Tags — one per line; {"{slots}"} becomes the live slot count
                        <textarea rows={4} value={page.tags.join("\n")}
                            onChange={(e) => set({ ...page, tags: e.target.value.split("\n") })} />
                    </label>
                </div>
            </div>

            <div className="admin-panel">
                <h2>What we do</h2>
                <div className="admin-form">
                    <HeadFields head={offer} onChange={(h) => set({ ...page, offer: { ...offer, ...h } })} />
                </div>
                {PILLARS.map((p) => {
                    const card = offer.cards[p.key] ?? { title: "", text: "", cta: "" };
                    return (
                        <div className="admin-chapter" key={p.key}>
                            <span className="admin-chapter-num">{p.label.toUpperCase()} → {p.href}</span>
                            <div className="admin-link-row">
                                <input placeholder="Card title" value={card.title} onChange={(e) => setCard(p.key, { title: e.target.value })} />
                                <input placeholder="Link label" value={card.cta} onChange={(e) => setCard(p.key, { cta: e.target.value })} />
                                <span />
                            </div>
                            <textarea rows={2} placeholder="Card text" value={card.text} onChange={(e) => setCard(p.key, { text: e.target.value })} />
                        </div>
                    );
                })}
            </div>

            <div className="admin-panel">
                <h2>How we work</h2>
                <div className="admin-form">
                    <HeadFields head={principles} onChange={(h) => set({ ...page, principles: { ...principles, ...h } })} />
                </div>
                {principles.items.map((item, i) => (
                    <div className="admin-link-row" key={i}>
                        <input placeholder="Title" value={item.title} onChange={(e) => setItem(i, { title: e.target.value })} />
                        <input placeholder="Text" value={item.text} onChange={(e) => setItem(i, { text: e.target.value })} />
                        <button className="danger" onClick={() => set({ ...page, principles: { ...principles, items: principles.items.filter((_, j) => j !== i) } })}>✕</button>
                    </div>
                ))}
                <button onClick={() => set({ ...page, principles: { ...principles, items: [...principles.items, { title: "", text: "" }] } })}>+ Add principle</button>
            </div>

            <div className="admin-panel">
                <h2>Closing call to action</h2>
                <div className="admin-form">
                    <HeadFields head={page.cta} onChange={(h) => set({ ...page, cta: { ...page.cta, ...h } })} />
                    <label>Button label<input value={page.cta.label} onChange={(e) => set({ ...page, cta: { ...page.cta, label: e.target.value } })} /></label>
                </div>
            </div>
        </section>
    );
}
