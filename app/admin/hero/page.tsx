"use client";

import Accent from "@/components/Accent";
import type { HeroSlide } from "@/lib/cms";
import { ImageField, useContent } from "../ui";

const blank: HeroSlide = { kicker: "", title: "", lede: "", image: "", image_alt: "", ctas: [{ label: "", href: "", fire: true }] };

export default function AdminHero() {
    const { value: slides, set, save, dirty, status } = useContent<HeroSlide[]>("hero_slides");
    if (!slides) return <p className="admin-hint">{status || "Loading…"}</p>;

    const patch = (i: number, p: Partial<HeroSlide>) => set(slides.map((s, j) => (j === i ? { ...s, ...p } : s)));
    const move = (i: number, by: number) => {
        const next = [...slides];
        [next[i], next[i + by]] = [next[i + by], next[i]];
        set(next);
    };
    const clean = () => slides
        .filter((s) => s.title)
        .map((s) => ({ ...s, ctas: s.ctas.filter((c) => c.label && c.href) }));

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Hero slides</h1>
                <div className="admin-actions">
                    {status && <span className="admin-status">{status}</span>}
                    <button className="btn btn-fire" disabled={!dirty} onClick={() => save(clean())}>Save slides</button>
                </div>
            </div>
            <p className="admin-hint">
                The rotating slides at the top of the homepage, in order. Wrap the highlighted part of a
                title in *asterisks*: “Our arsenal. *Your lobby.*”
            </p>

            {slides.map((s, i) => (
                <div className="admin-panel" key={i}>
                    <div className="admin-subhead">
                        <h2>Slide {i + 1}</h2>
                        <div className="admin-actions">
                            <button disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                            <button disabled={i === slides.length - 1} onClick={() => move(i, 1)}>↓</button>
                            <button className="danger" onClick={() => set(slides.filter((_, j) => j !== i))}>Remove</button>
                        </div>
                    </div>
                    <div className="admin-form">
                        <label className="wide">
                            Kicker — small label above the title
                            <input value={s.kicker} onChange={(e) => patch(i, { kicker: e.target.value })} />
                        </label>
                        <label className="wide">
                            Title
                            <input value={s.title} onChange={(e) => patch(i, { title: e.target.value })} />
                            <span className="display admin-title-preview"><Accent text={s.title} /></span>
                        </label>
                        <label className="wide">
                            Text
                            <textarea rows={3} value={s.lede} onChange={(e) => patch(i, { lede: e.target.value })} />
                        </label>
                        <ImageField label="Image — shown on the right of the slide" folder="hero"
                            value={s.image} onChange={(image) => patch(i, { image })} />
                        <label className="wide">
                            Image description (for screen readers)
                            <input value={s.image_alt} onChange={(e) => patch(i, { image_alt: e.target.value })} />
                        </label>
                        <div className="wide">
                            <p className="admin-hint">Buttons — the “primary” one is amber, the rest are outlined</p>
                            {s.ctas.map((c, ci) => {
                                const setCta = (p: Partial<HeroSlide["ctas"][number]>) =>
                                    patch(i, { ctas: s.ctas.map((x, j) => (j === ci ? { ...x, ...p } : x)) });
                                return (
                                    <div className="admin-link-row cta" key={ci}>
                                        <input placeholder="Label" value={c.label} onChange={(e) => setCta({ label: e.target.value })} />
                                        <input placeholder="Link, e.g. /games" value={c.href} onChange={(e) => setCta({ href: e.target.value })} />
                                        <label className="admin-check">
                                            <input type="checkbox" checked={c.fire} onChange={(e) => setCta({ fire: e.target.checked })} />
                                            primary
                                        </label>
                                        <button className="danger" onClick={() => patch(i, { ctas: s.ctas.filter((_, j) => j !== ci) })}>✕</button>
                                    </div>
                                );
                            })}
                            <button onClick={() => patch(i, { ctas: [...s.ctas, { label: "", href: "", fire: false }] })}>+ Add button</button>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={() => set([...slides, blank])}>+ Add slide</button>
        </section>
    );
}
