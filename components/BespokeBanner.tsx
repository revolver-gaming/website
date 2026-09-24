import Link from "next/link";
import { getExclusivesPage, type Game } from "@/lib/cms";
import { pillar } from "@/lib/pillars";

/* Picks a branded title as the backdrop so the "exclusives" promise has a
   real example behind it — unless an image is set in /admin/pages/exclusives. */
export const brandedGame = (games: Game[]) =>
    games.find((g) => g.tags.some((t) => /brand/i.test(t))) ?? games[0];

export default async function BespokeBanner({ games }: { games: Game[] }) {
    const p = pillar("exclusives");
    const page = await getExclusivesPage();
    const game = brandedGame(games);
    const image = page.banner_image || game?.image;
    const caption = page.banner_image ? page.banner_caption : game?.title;
    return (
        <Link className="bespoke" href={p.href} data-reveal>
            {image && <img src={image} alt="" loading="lazy" />}
            <p className="eyebrow">Your brief</p>
            <h2 className="display">Name the <em>game.</em></h2>
            <p>
                Bring a brand, a theme, or just a hunch about what your players want.
                We&apos;ll come back with a concept and a timeline.
            </p>
            <span className="btn btn-fire">{p.cta}</span>
            {caption && <span className="bespoke-cap">Pictured: {caption}</span>}
        </Link>
    );
}
