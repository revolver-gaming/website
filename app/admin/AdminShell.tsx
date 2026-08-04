"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { sb, errMsg } from "./lib";

const sections = [
    ["/admin/news", "News"],
    ["/admin/games", "Games"],
    ["/admin/jobs", "Jobs"],
    ["/admin/pages", "Pages"],
    ["/admin/settings", "Settings"],
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [ready, setReady] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        sb.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setReady(true);
        });
        const { data: sub } = sb.auth.onAuthStateChange((_event, s) => setSession(s));
        return () => sub.subscription.unsubscribe();
    }, []);

    if (!ready) return null;
    if (!session) return <Login />;

    return (
        <div className="admin">
            <header className="admin-bar">
                <Link href="/admin" className="wordmark">RG <span>Admin</span></Link>
                <nav>
                    {sections.map(([href, label]) => (
                        <Link key={href} href={href} className={pathname.startsWith(href) ? "on" : ""}>
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="admin-bar-right">
                    <a href="/" target="_blank">View site ↗</a>
                    <button onClick={() => sb.auth.signOut()}>Sign out</button>
                </div>
            </header>
            <div className="admin-body">{children}</div>
        </div>
    );
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) setError(errMsg(error));
        setBusy(false);
    };

    return (
        <div className="admin-login">
            <form onSubmit={submit}>
                <h1 className="display">Admin</h1>
                <label>
                    Email
                    <input type="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                {error && <p className="admin-error">{error}</p>}
                <button className="btn btn-fire" disabled={busy}>
                    {busy ? "Signing in…" : "Sign in"}
                </button>
            </form>
        </div>
    );
}
