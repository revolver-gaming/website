import Link from "next/link";
import { contact } from "@/lib/data";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="shell footer-inner">
                <p className="license">
                    {contact.license}
                    <br />
                    We are committed to responsible gambling.
                </p>
                <ul className="footer-links">
                    <li><Link href="/games">Games</Link></li>
                    <li><a href="https://revolvergaming.com/terms-conditions/">Terms</a></li>
                    <li><a href="https://revolvergaming.com/privacy-policy/">Privacy</a></li>
                    <li><a href="https://revolvergaming.com/job/">Careers</a></li>
                </ul>
                <span className="age" aria-label="18 plus only">18+</span>
            </div>
        </footer>
    );
}
