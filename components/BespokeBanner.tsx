import Link from "next/link";
import type { Game } from "@/lib/cms";
import { pillar } from "@/lib/pillars";

/* Picks a branded title as the backdrop so the "exclusives" promise has a
   real example behind it. */
export const brandedGame = (games: Game[]) =>
    games.find((g) => g.tags.some((t) => /brand/i.test(t))) ?? games[0];

export default function BespokeBanner({ games }: { games: Game[] }) {
    const p = pillar("exclusives");
    const game = brandedGame(games);
    return (
        <Link className="bespoke" href={p.href} data-reveal>
            {game && <img src={game.image} alt="" loading="lazy" />}
            <p className="eyebrow">{p.kicker}</p>
            <h2 className="display">{p.title[0]} <em>{p.title[1]}</em></h2>
            <p>{p.lede}</p>
            <span className="btn btn-fire">{p.cta}</span>
            {game && <span className="bespoke-cap">Pictured: {game.title}</span>}
        </Link>
    );
}
