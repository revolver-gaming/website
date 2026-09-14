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
            <p className="eyebrow">Your brief</p>
            <h2 className="display">Name the <em>game.</em></h2>
            <p>
                Bring a brand, a theme, or just a hunch about what your players want.
                We&apos;ll come back with a concept and a timeline.
            </p>
            <span className="btn btn-fire">{p.cta}</span>
            {game && <span className="bespoke-cap">Pictured: {game.title}</span>}
        </Link>
    );
}
