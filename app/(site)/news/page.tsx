import type { Metadata } from "next";
import NewsIndex from "./NewsIndex";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "News — Revolver Gaming",
    description: "Game launches, partnerships and announcements from Revolver Gaming.",
};

export default function NewsPage() {
    return <NewsIndex page={1} />;
}
