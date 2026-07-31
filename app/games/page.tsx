import type { Metadata } from "next";
import GamesExplorer from "./GamesExplorer";

export const metadata: Metadata = {
    title: "Games — Revolver Gaming",
    description: "Every Revolver Gaming original plus partner-studio titles distributed through GAP.",
};

export default function GamesPage() {
    return <GamesExplorer />;
}
