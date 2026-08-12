import Link from "next/link";
import type { Game } from "@/lib/cms";

export default function GameCard({ game }: { game: Game }) {
    return (
        <Link className="game-card" href={`/game/${game.slug}`}>
            <img className="art" src={game.image} alt={`${game.title} artwork`} loading="lazy" />
            <span className="gc-title">
                <span>{game.title}</span>
                <span className="yr">{game.year}</span>
            </span>
            <p className="gc-meta">{game.tags.join(" · ")}</p>
        </Link>
    );
}
