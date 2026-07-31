import Link from "next/link";
import type { Game } from "@/lib/cms";

export default function GameCard({ game, showBlurb }: { game: Game; showBlurb?: boolean }) {
    return (
        <Link className="game-card" href={`/game/${game.slug}`}>
            {game.year >= 2026 && <span className="new-flag">New</span>}
            <div className="art">
                <img src={game.image} alt={`${game.title} artwork`} loading="lazy" />
            </div>
            <div className="meta">
                <h3>{game.title}</h3>
                <p className="info">
                    <span className="yr">{game.year}</span>
                    {game.tags.map((t) => <span key={t}>{t}</span>)}
                </p>
                {showBlurb && <p className="blurb">{game.blurb}</p>}
            </div>
        </Link>
    );
}
