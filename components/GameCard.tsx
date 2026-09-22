import Link from "next/link";
import TagBadge from "@/components/TagBadge";
import type { Game } from "@/lib/cms";

export default function GameCard({ game }: { game: Game }) {
    return (
        <Link className="game-card" href={`/game/${game.slug}`}>
            {(game.coming_soon || game.is_new) && <TagBadge soon={game.coming_soon} />}
            <img className="art" src={game.image} alt={`${game.title} artwork`} loading="lazy" />
            <span className="gc-title">
                <span>{game.title}</span>
                <span className="yr">{game.year}</span>
            </span>
            <p className="gc-meta">{game.tags.join(" · ")}</p>
        </Link>
    );
}
