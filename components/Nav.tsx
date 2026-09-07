"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PILLARS } from "@/lib/pillars";

export default function Nav() {
    const [open, setOpen] = useState(false);
    const path = usePathname();
    const links = [...PILLARS.map((p) => [p.label, p.href]), ["News", "/news"]];

    // Close the mobile menu on navigation and on Escape.
    useEffect(() => setOpen(false), [path]);
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <header className={`nav${open ? " nav-open" : ""}`}>
            <div className="shell nav-inner">
                <Link href="/" className="nav-brand" aria-label="Revolver Gaming home">
                    <img src="/brand/logo-horizontal-purple.svg" alt="Revolver Gaming" width={508} height={147} />
                </Link>
                <nav aria-label="Primary">
                    <ul id="nav-menu" className="nav-links">
                        {links.map(([label, href]) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    aria-current={path === href || path.startsWith(`${href}/`) ? "page" : undefined}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="nav-right">
                    <Link href="/#contact" className="btn btn-fire btn-sm">Contact</Link>
                    <button
                        className="nav-burger"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="nav-menu"
                        onClick={() => setOpen(!open)}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>
        </header>
    );
}
