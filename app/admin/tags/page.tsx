"use client";

import { Fragment, useEffect, useState } from "react";
import { sb, errMsg } from "../lib";

type Tag = { id: string; name: string; is_filter: boolean; sort_order: number };
type GameRef = { id: string; title: string; published: boolean };
type Link = { game_id: string; tag_id: string; position: number };

// Every change here writes straight to the database — there is no Save button.
export default function AdminTags() {
    const [tags, setTags] = useState<Tag[] | null>(null);
    const [games, setGames] = useState<GameRef[]>([]);
    const [links, setLinks] = useState<Link[]>([]);
    const [open, setOpen] = useState<string | null>(null);
    const [q, setQ] = useState("");
    const [newName, setNewName] = useState("");
    const [status, setStatus] = useState("");

    const load = async () => {
        const [t, g, l] = await Promise.all([
            sb.from("tags").select("id, name, is_filter, sort_order").order("name"),
            sb.from("games").select("id, title, published").order("sort_order"),
            sb.from("game_tags").select("game_id, tag_id, position"),
        ]);
        const error = t.error ?? g.error ?? l.error;
        if (error) return setStatus(errMsg(error));
        setTags(t.data ?? []);
        setGames(g.data ?? []);
        setLinks(l.data ?? []);
    };
    useEffect(() => { load(); }, []);

    // Run a write, report the outcome, then reload so the page mirrors the database.
    const run = async (write: PromiseLike<{ error: unknown }>) => {
        const { error } = await write;
        setStatus(error ? errMsg(error) : "Saved ✓");
        setTimeout(() => setStatus(""), 3000);
        await load();
    };

    if (!tags) return <p className="admin-hint">{status || "Loading…"}</p>;

    const filters = tags.filter((t) => t.is_filter).sort((a, b) => a.sort_order - b.sort_order);
    const gamesOf = (tagId: string) => links.filter((l) => l.tag_id === tagId);
    const nameTaken = (name: string, id?: string) =>
        tags.some((t) => t.id !== id && t.name.toLowerCase() === name.toLowerCase());
    const shown = tags.filter((t) => t.name.toLowerCase().includes(q.trim().toLowerCase()));

    const create = () => {
        const name = newName.trim();
        if (!name) return;
        if (nameTaken(name)) return setStatus(`“${name}” already exists.`);
        setNewName("");
        run(sb.from("tags").insert({ name }));
    };

    const rename = (tag: Tag, value: string) => {
        const name = value.trim();
        if (!name || name === tag.name) return;
        if (nameTaken(name, tag.id)) return setStatus(`“${name}” already exists — delete one of them instead.`);
        run(sb.from("tags").update({ name }).eq("id", tag.id));
    };

    const setFilter = (tag: Tag, on: boolean) =>
        run(sb.from("tags").update({
            is_filter: on,
            sort_order: on ? Math.max(0, ...filters.map((f) => f.sort_order)) + 1 : 0,
        }).eq("id", tag.id));

    // Swap positions with the neighbour; renumber so gaps and ties never matter.
    const move = (i: number, by: -1 | 1) => {
        const order = filters.map((f) => f.id);
        [order[i], order[i + by]] = [order[i + by], order[i]];
        run(sb.from("tags").upsert(order.map((id, n) => ({ ...filters.find((f) => f.id === id)!, sort_order: n + 1 }))));
    };

    const remove = (tag: Tag) => {
        const n = gamesOf(tag.id).length;
        if (!confirm(`Delete “${tag.name}”?${n ? ` It will be removed from ${n} game${n === 1 ? "" : "s"}.` : ""}`)) return;
        run(sb.from("tags").delete().eq("id", tag.id));
    };

    const toggleGame = (tag: Tag, game: GameRef) =>
        run(links.some((l) => l.tag_id === tag.id && l.game_id === game.id)
            ? sb.from("game_tags").delete().eq("tag_id", tag.id).eq("game_id", game.id)
            : sb.from("game_tags").insert({
                tag_id: tag.id, game_id: game.id,
                position: Math.max(-1, ...links.filter((l) => l.game_id === game.id).map((l) => l.position)) + 1,
            }));

    return (
        <section>
            <div className="admin-head">
                <h1 className="display">Tags</h1>
                {status && <span className="admin-status">{status}</span>}
            </div>
            <p className="admin-hint">
                Tags show on game cards and game pages. Tick “Filter” to turn a tag into a filter button
                on /games. Changes save instantly and go live within 5 minutes.
            </p>

            <div className="admin-panel">
                <h2>Filters on /games</h2>
                <p className="admin-hint">In this order, after “All”. A filter no live game carries stays hidden.</p>
                {filters.length === 0 && <p className="admin-hint">No filters yet — tick “Filter” on a tag below.</p>}
                {filters.map((f, i) => (
                    <div className="admin-filter-row" key={f.id}>
                        <span className="mono">{i + 1}</span>
                        <b>{f.name}</b>
                        <span className="mono">{gamesOf(f.id).length} games</span>
                        <button disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
                        <button disabled={i === filters.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
                        <button className="danger" onClick={() => setFilter(f, false)}>Remove filter</button>
                    </div>
                ))}
            </div>

            <div className="admin-toolbar">
                <input className="admin-search" placeholder="Search tags…" value={q} onChange={(e) => setQ(e.target.value)} />
                <form className="admin-new-tag" onSubmit={(e) => { e.preventDefault(); create(); }}>
                    <input className="admin-search" placeholder="New tag, e.g. 1,000x Max Win" value={newName}
                        onChange={(e) => setNewName(e.target.value)} />
                    <button className="btn btn-fire" disabled={!newName.trim()}>+ Add tag</button>
                </form>
            </div>

            <table className="admin-table">
                <thead><tr><th>Name</th><th>Games</th><th>Filter</th><th /></tr></thead>
                <tbody>
                    {shown.map((t) => (
                        <Fragment key={t.id}>
                            <tr>
                                <td>
                                    {/* key on the name so a failed or external rename resets the field */}
                                    <input key={t.name} className="admin-tag-name" defaultValue={t.name}
                                        onBlur={(e) => rename(t, e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()} />
                                </td>
                                <td className="mono">{gamesOf(t.id).length}</td>
                                <td><input type="checkbox" checked={t.is_filter} onChange={(e) => setFilter(t, e.target.checked)} /></td>
                                <td className="admin-row-actions">
                                    <button onClick={() => setOpen(open === t.id ? null : t.id)}>
                                        {open === t.id ? "Done" : "Games…"}
                                    </button>
                                    <button className="danger" onClick={() => remove(t)}>Delete</button>
                                </td>
                            </tr>
                            {open === t.id && (
                                <tr>
                                    <td colSpan={4}>
                                        <p className="admin-hint">Click a game to add or remove “{t.name}”.</p>
                                        <div className="admin-chips">
                                            {games.map((g) => (
                                                <button key={g.id} onClick={() => toggleGame(t, g)}
                                                    className={`chip${links.some((l) => l.tag_id === t.id && l.game_id === g.id) ? " on" : ""}`}>
                                                    {g.title}{!g.published && " (draft)"}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                    {shown.length === 0 && (
                        <tr><td colSpan={4} className="admin-empty">{q ? "No matches." : "No tags yet."}</td></tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}
