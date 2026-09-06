import Link from "next/link";
import { getContact, getFooterLinks, getSocials } from "@/lib/cms";
import { PILLARS } from "@/lib/pillars";

export default async function Footer() {
    const [contact, links, socials] = await Promise.all([
        getContact(), getFooterLinks(), getSocials(),
    ]);
    return (
        <footer className="footer">
            <div className="shell">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link href="/" aria-label="Revolver Gaming home">
                            <img src="/brand/logo-horizontal-white.svg" alt="Revolver Gaming" />
                        </Link>
                        <p>
                            The studio that became the platform. Licensable slots, brandable
                            originals, RGS licensing and the GAP aggregation network. London,
                            since 2010.
                        </p>
                        <span className="rg-badge">18+ · Responsible gambling</span>
                    </div>
                    <nav className="footer-col" aria-label="Products">
                        <h4>Products</h4>
                        {PILLARS.map((p) => <Link key={p.key} href={p.href}>{p.label}</Link>)}
                    </nav>
                    <nav className="footer-col" aria-label="Company">
                        <h4>Company</h4>
                        <Link href="/news">News</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/fairness">Fairness</Link>
                        {links.filter((l) => l.label === "Careers").map((l) => (
                            <a key={l.label} href={l.url}>{l.label}</a>
                        ))}
                    </nav>
                    <nav className="footer-col" aria-label="Legal and social">
                        <h4>Legal</h4>
                        {links.filter((l) => l.label !== "Careers").map((l) => (
                            <a key={l.label} href={l.url}>{l.label}</a>
                        ))}
                        <h4 className="footer-sub">Follow</h4>
                        {socials.map((s) => (
                            <a key={s.label} href={s.url} target="_blank" rel="noopener">{s.label}</a>
                        ))}
                    </nav>
                </div>
                <div className="footer-bar">
                    <p className="footer-legal">
                        {contact.license}{" "}
                        <a href={contact.license_url} target="_blank" rel="noopener">UKGC register</a>.
                        We are committed to responsible gambling. 18+
                    </p>
                    <p>{contact.address.join(", ")}</p>
                </div>
            </div>
        </footer>
    );
}
