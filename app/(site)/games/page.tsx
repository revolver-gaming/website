import type { Metadata } from "next";
import { Suspense } from "react";
import GamesExplorer from "./GamesExplorer";
import { listGames, listPartnerStudios, listProviderGames } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Games — Revolver Gaming",
    description: "Every Revolver Gaming original plus partner-studio titles distributed through GAP.",
};

export default async function GamesPage() {
    const [games, partnerStudios, providerGames] = await Promise.all([
        listGames(), listPartnerStudios(), listProviderGames(),
    ]);
    return (
        <Suspense>
            <GamesExplorer games={games} partnerStudios={partnerStudios} providerGames={providerGames} />
        </Suspense>
    );
}
