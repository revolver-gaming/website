import Link from "next/link";
import { getContact, getFooterLinks, getSocials } from "@/lib/cms";

export default async function Footer() {
    const [contact, links, socials] = await Promise.all([
        getContact(), getFooterLinks(), getSocials(),
    ]);
    return (
        <footer className="footer">
            <div className="shell footer-inner">
                <Link href="/" aria-label="Revolver Gaming home">
                    <img src="/brand/logo-horizontal-white.svg" alt="Revolver Gaming" />
                </Link>
                <nav className="footer-links" aria-label="Footer">
                    {links.map((l) => <a key={l.label} href={l.url}>{l.label}</a>)}
                    <Link href="/fairness">Fairness</Link>
                    {socials.map((s) => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener">{s.label}</a>
                    ))}
                </nav>
                <p className="footer-legal">
                    {contact.license}{" "}
                    <a href={contact.license_url} target="_blank" rel="noopener">UKGC register</a>.
                    We are committed to responsible gambling. 18+
                </p>
            </div>
        </footer>
    );
}
