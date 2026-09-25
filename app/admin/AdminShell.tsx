"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { sb, errMsg } from "./lib";

const sections = [
    ["/admin/hero", "Hero"],
    ["/admin/news", "News"],
    ["/admin/games", "Games"],
    ["/admin/tags", "Tags"],
    ["/admin/originals", "Originals"],
    ["/admin/jobs", "Jobs"],
    ["/admin/pages", "Pages"],
    ["/admin/partners", "Partners"],
    ["/admin/settings", "Settings"],
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [ready, setReady] = useState(false);
    // null: no reset in progress; "": the link already signed us in; otherwise a token_hash still to spend.
    const [recovery, setRecovery] = useState<string | null>(null);
    const [linkError, setLinkError] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        // Two kinds of reset link land here:
        // - /admin?token_hash=…&type=recovery (custom email template): the token is only spent when the
        //   form is submitted, so mail scanners that open the link can't burn it. Stripped from the URL now.
        // - /admin#access_token=…&type=recovery (default template): supabase-js signs in from the hash and
        //   clears it itself — leave it alone, or it's gone before the client reads it.
        const query = new URLSearchParams(location.search);
        const hash = new URLSearchParams(location.hash.slice(1));
        if (query.get("type") === "recovery" && query.get("token_hash")) setRecovery(query.get("token_hash")!);
        else if (hash.get("type") === "recovery" && hash.get("access_token")) setRecovery("");
        if (hash.get("error_description")) setLinkError(hash.get("error_description")!);
        if (location.search || hash.has("error_description")) history.replaceState(null, "", location.pathname);

        sb.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setReady(true);
        });
        const { data: sub } = sb.auth.onAuthStateChange((_event, s) => setSession(s));
        return () => sub.subscription.unsubscribe();
    }, []);

    if (!ready) return null;
    if (recovery !== null) return <ResetPassword tokenHash={recovery} email={session?.user.email} onDone={() => setRecovery(null)} />;
    if (!session) return <Login linkError={linkError} />;

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

const MIN_PASSWORD = 12;
const DEAD_LINK = "This reset link is invalid, expired or already used. Ask an admin to send a new one.";

// An empty tokenHash means the link already signed us in (default email template).
function ResetPassword({ tokenHash, email, onDone }: { tokenHash: string; email?: string; onDone: () => void }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [verified, setVerified] = useState(!tokenHash);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (password.length < MIN_PASSWORD) return setError(`Use at least ${MIN_PASSWORD} characters.`);
        if (password !== confirm) return setError("Passwords don't match.");
        setBusy(true);
        try {
            // Spend the one-time token only now; a retry after a rejected password reuses the session.
            if (!verified) {
                const { error } = await sb.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
                if (error) throw new Error(DEAD_LINK);
                setVerified(true);
            }
            const { error } = await sb.auth.updateUser({ password });
            if (error?.name === "AuthSessionMissingError") throw new Error(DEAD_LINK);
            if (error) throw error;
            // Kick out any other session on this account — whoever else might hold one.
            await sb.auth.signOut({ scope: "others" });
            onDone();
        } catch (e) {
            setError(errMsg(e));
        }
        setBusy(false);
    };

    return (
        <div className="admin-login">
            <form onSubmit={submit}>
                <h1 className="display">New password</h1>
                {!tokenHash && email && <p>for {email}</p>}
                <label>
                    New password
                    <input type="password" autoComplete="new-password" autoFocus minLength={MIN_PASSWORD} value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Confirm password
                    <input type="password" autoComplete="new-password" minLength={MIN_PASSWORD} value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                </label>
                {error && <p className="admin-error">{error}</p>}
                <button className="btn btn-fire" disabled={busy}>
                    {busy ? "Saving…" : "Set password"}
                </button>
            </form>
        </div>
    );
}

function Login({ linkError }: { linkError: string }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(linkError);
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
