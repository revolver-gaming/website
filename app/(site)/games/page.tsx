import type { Metadata } from "next";
import GamesExplorer from "./GamesExplorer";
import BespokeBanner from "@/components/BespokeBanner";
import { listGames } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Slots — Revolver Gaming",
    description: "The full catalogue of Revolver Gaming original slots, ready to license and brand as your own.",
};

export default async function GamesPage() {
    const games = await listGames();
    return (
        <main>
            <GamesExplorer games={games} />
            <section data-chamber className="tight">
                <div className="shell">
                    <BespokeBanner games={games} />
                </div>
            </section>
        </main>
    );
}
