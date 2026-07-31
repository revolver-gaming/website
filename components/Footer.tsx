import Link from "next/link";
import { getContact, getFooterLinks } from "@/lib/cms";

export default async function Footer() {
    const [contact, links] = await Promise.all([getContact(), getFooterLinks()]);
    return (
        <footer className="footer">
            <div className="shell footer-inner">
                <p className="license">
                    {contact.license}{" "}
                    <a href={contact.license_url} target="_blank" rel="noopener">UKGC register</a>
                    <br />
                    We are committed to responsible gambling.
                </p>
                <ul className="footer-links">
                    <li><Link href="/games">Games</Link></li>
                    {links.map((l) => <li key={l.label}><a href={l.url}>{l.label}</a></li>)}
                </ul>
                <span className="age" aria-label="18 plus only">18+</span>
            </div>
        </footer>
    );
}
