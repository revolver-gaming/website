import Link from "next/link";
import { getContact, getFooterLinks, getSocials } from "@/lib/cms";

export default async function Footer() {
    const [contact, links, socials] = await Promise.all([
        getContact(), getFooterLinks(), getSocials(),
    ]);
    return (
        <footer className="footer">
            <div className="shell">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link href="/" aria-label="Revolver Gaming home">
                            <img src="/brand/logo-horizontal-white.svg" alt="Revolver Gaming" />
                        </Link>
                        <p>
                            Slots people remember — and the platform that puts them
                            in front of operators worldwide.
                        </p>
                    </div>
                    <nav className="footer-cols" aria-label="Footer">
                        <div>
                            <h3>Explore</h3>
                            <ul>
                                <li><Link href="/games">Games</Link></li>
                                <li><Link href="/platform">Platform</Link></li>
                                <li><Link href="/#partners">Partners</Link></li>
                                <li><Link href="/news">News</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>Company</h3>
                            <ul>
                                {links.map((l) => <li key={l.label}><a href={l.url}>{l.label}</a></li>)}
                            </ul>
                        </div>
                        <div>
                            <h3>Contact</h3>
                            <ul>
                                <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                                <li><a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></li>
                                <li className="footer-address">
                                    {contact.address.map((line) => <span key={line}>{line}</span>)}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>Follow</h3>
                            <ul>
                                {socials.map((s) => (
                                    <li key={s.label}>
                                        <a href={s.url} target="_blank" rel="noopener">{s.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="footer-legal">
                    <p className="license">
                        {contact.license}{" "}
                        <a href={contact.license_url} target="_blank" rel="noopener">UKGC register</a>
                        <br />
                        We are committed to responsible gambling.
                    </p>
                    <span className="age" aria-label="18 plus only">18+</span>
                </div>
            </div>
        </footer>
    );
}
