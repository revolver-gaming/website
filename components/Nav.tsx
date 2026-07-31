import Link from "next/link";

export default function Nav() {
    return (
        <header className="nav">
            <div className="shell nav-inner">
                <Link href="/" className="nav-brand" aria-label="Revolver Gaming home">
                    <img src="/brand/revolver-icon.png" alt="" />
                    <span className="wordmark">
                        Revolver<span>&nbsp;Gaming</span>
                    </span>
                </Link>
                <ul className="nav-links">
                    <li className="nav-hide"><Link href="/games">Games</Link></li>
                    <li className="nav-hide"><Link href="/#platform">Platform</Link></li>
                    <li className="nav-hide"><Link href="/#partners">Partners</Link></li>
                    <li className="nav-hide"><Link href="/news">News</Link></li>
                    <li><Link href="/#contact" className="btn btn-fire">Partner with us</Link></li>
                </ul>
            </div>
        </header>
    );
}
