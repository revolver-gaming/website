import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProviderGrid from "./ProviderGrid";
import { listProviderGames } from "@/lib/cms";
import { slugify } from "@/lib/slug";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

async function providerGames(slug: string) {
    const games = await listProviderGames();
    return games.filter((g) => slugify(g.provider) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const games = await providerGames((await params).slug);
    if (!games.length) return {};
    const name = games[0].provider;
    return {
        title: `${name} games — Revolver Gaming`,
        description: `Play ${games.map((g) => g.title).join(", ")} by ${name} — distributed through the Revolver Gaming aggregation platform.`,
    };
}

export default async function ProviderPage({ params }: Props) {
    const games = await providerGames((await params).slug);
    if (!games.length) notFound();
    const name = games[0].provider;
    return (
        <main>
            <div className="shell page-hero">
                <p className="eyebrow">Partner studio — via GAP</p>
                <h1 className="display">{name}</h1>
                <p className="count-line">
                    <b>{games.length}</b> {games.length === 1 ? "title" : "titles"} · demo-playable
                    {" · "}
                    <Link href="/games">All games →</Link>
                </p>
            </div>
            <section className="shell" style={{ paddingBottom: "clamp(72px, 10vw, 120px)" }}>
                <Suspense>
                    <ProviderGrid games={games} />
                </Suspense>
            </section>
        </main>
    );
}
