"use client";

import { useEffect, useState } from "react";
import { sb, errMsg } from "./lib";

export const PAGE_SIZE = 15;

// Paged + title-searchable list of rows for the CRUD tables.
export function usePaged<T>(table: string, cols: string, orderCol: string, ascending: boolean, q: string) {
    const [rows, setRows] = useState<T[] | null>(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => { setPage(0); }, [q]);

    useEffect(() => {
        const run = () => {
            let query = sb.from(table).select(cols, { count: "exact" })
                .order(orderCol, { ascending })
                .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
            if (q.trim()) query = query.ilike("title", `%${q.trim()}%`);
            query.then(({ data, count, error }) => {
                if (error) setError(errMsg(error));
                else {
                    setRows(data as T[]);
                    setCount(count ?? 0);
                    setError("");
                }
            });
        };
        const t = setTimeout(run, q ? 250 : 0);
        return () => clearTimeout(t);
    }, [table, cols, orderCol, ascending, page, q]);

    return { rows, count, page, setPage, error };
}

export function Pager({ page, count, onPage }: { page: number; count: number; onPage: (p: number) => void }) {
    const pages = Math.ceil(count / PAGE_SIZE);
    if (pages <= 1) return null;
    return (
        <div className="admin-pager">
            <button disabled={page === 0} onClick={() => onPage(page - 1)}>← Prev</button>
            <span className="mono">
                {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, count)} of {count}
            </span>
            <button disabled={page >= pages - 1} onClick={() => onPage(page + 1)}>Next →</button>
        </div>
    );
}

// Browser "leave site?" prompt while an editor has unsaved changes.
export function useUnsavedWarning(dirty: boolean) {
    useEffect(() => {
        if (!dirty) return;
        const warn = (e: BeforeUnloadEvent) => e.preventDefault();
        window.addEventListener("beforeunload", warn);
        return () => window.removeEventListener("beforeunload", warn);
    }, [dirty]);
}
