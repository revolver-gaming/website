"use client";

import Link from "next/link";
import type { ExclusivesPage } from "@/lib/cms";
import { ImageField, useContent } from "../../ui";

export default function AdminExclusives() {
    const { value: page, set, save, dirty, status } = useContent<ExclusivesPage>("exclusives_page");
    if (!page) return <p className="admin-hint">{status || "Loading…"}</p>;

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Exclusives page</h1>
                <div className="admin-actions">
                    {status && <span className="admin-status">{status}</span>}
                    <a href="/exclusives" target="_blank">View ↗</a>
                    <Link href="/admin/pages">Back</Link>
                    <button className="btn btn-fire" disabled={!dirty} onClick={() => save()}>Save</button>
                </div>
            </div>
            <p className="admin-hint">
                The hero intro and offer cards come from <Link href="/admin/settings">Settings → Made to order</Link>.
            </p>
            <div className="admin-panel">
                <h2>Hero</h2>
                <div className="admin-form">
                    <ImageField label="Background image — blurred behind the hero, with a sharp copy at the edge" folder="pages"
                        value={page.hero_image} onChange={(hero_image) => set({ ...page, hero_image })} />
                </div>
            </div>
            <div className="admin-panel">
                <h2>“Name the game” banner</h2>
                <p className="admin-hint">Shown on the homepage and the Games page. Leave empty to use the first branded game.</p>
                <div className="admin-form">
                    <ImageField label="Banner image" folder="pages"
                        value={page.banner_image ?? ""} onChange={(banner_image) => set({ ...page, banner_image })} />
                    <label>
                        Caption — “Pictured: …”, leave empty to hide
                        <input value={page.banner_caption ?? ""} onChange={(e) => set({ ...page, banner_caption: e.target.value })} />
                    </label>
                </div>
            </div>
        </section>
    );
}
