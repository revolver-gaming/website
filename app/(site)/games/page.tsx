import type { Metadata } from "next";
import GamesExplorer from "./GamesExplorer";
import BespokeBanner from "@/components/BespokeBanner";
import { listGameFilters, listGames } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Games — Revolver Gaming",
    description: "The full catalogue of Revolver Gaming original games, ready to license and brand as your own.",
};

export default async function GamesPage() {
    const [games, filters] = await Promise.all([listGames(), listGameFilters()]);
    return (
        <main>
            <GamesExplorer games={games} filters={filters} />
            <section data-chamber className="tight">
                <div className="shell">
                    <BespokeBanner games={games} />
                </div>
            </section>
        </main>
    );
}
