"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PILLARS } from "@/lib/pillars";

export default function Nav() {
    const [open, setOpen] = useState(false);
    const path = usePathname();
    const links = [...PILLARS.map((p) => [p.label, p.href]), ["News", "/news"]];
    return (
        <header className="nav">
            <div className="shell nav-inner">
                <Link href="/" className="nav-brand" aria-label="Revolver Gaming home">
                    <img src="/brand/logo-horizontal-white.svg" alt="Revolver Gaming" />
                </Link>
                <ul className={`nav-links${open ? " open" : ""}`}>
                    {links.map(([label, href]) => (
                        <li key={href}>
                            <Link
                                href={href}
                                aria-current={path === href || path.startsWith(`${href}/`) ? "page" : undefined}
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="nav-right">
                    <Link href="/#contact" className="btn btn-fire" onClick={() => setOpen(false)}>Contact</Link>
                    <button
                        className="nav-burger"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>
        </header>
    );
}
