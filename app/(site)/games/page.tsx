import type { Metadata } from "next";
import GamesExplorer from "./GamesExplorer";
import { listGames } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Games — Revolver Gaming",
    description: "The full catalogue of Revolver Gaming original slots.",
};

export default async function GamesPage() {
    const games = await listGames();
    return <GamesExplorer games={games} />;
}
