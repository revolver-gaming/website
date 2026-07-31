import type { Metadata } from "next";
import GamesExplorer from "./GamesExplorer";
import { listGames } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Games — Revolver Gaming",
    description: "Every Revolver Gaming original plus partner-studio titles distributed through GAP.",
};

export default async function GamesPage() {
    return <GamesExplorer games={await listGames()} />;
}
