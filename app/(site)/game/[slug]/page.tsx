import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoLauncher from "@/components/DemoLauncher";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { getGame, listGames } from "@/lib/cms";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return (await listGames()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const game = await getGame((await params).slug);
    if (!game) return {};
    return {
        title: `${game.title} — Revolver Gaming`,
        description: game.blurb,
        alternates: { canonical: `/game/${game.slug}` },
        openGraph: {
            title: game.title,
            description: game.blurb,
            images: [game.image],
        },
    };
}

export default async function GamePage({ params }: Props) {
    const game = await getGame((await params).slug);
    if (!game) notFound();
    const specs = [
        ["Max win", game.max_win], ["RTP", game.rtp], ["Volatility", game.volatility],
        ["Layout", game.layout], ["Released", String(game.year)], ["Format", "HTML5"],
    ].filter(([, v]) => v);
    return (
        <main>
            <div className="shell game-detail">
                <Link className="article-back" href="/games">← All games</Link>
                <img className="game-banner" src={game.banner_image ?? game.image} alt={`${game.title} banner`} />
                <div className="game-body">
                    <div>
                        <p className="eyebrow">{[game.year, ...game.tags].join(" · ")}</p>
                        <h1 className="display">{game.title}</h1>
                        <p className="game-blurb">{game.blurb}</p>
                        <div className="game-ctas">
                            {game.demo_url && <DemoLauncher url={game.demo_url} title={game.title} />}
                            {game.asset_pack && (
                                <a className="btn btn-ghost" href={game.asset_pack} target="_blank" rel="noopener">Asset pack</a>
                            )}
                            {game.product_sheet && (
                                <a className="btn btn-ghost" href={game.product_sheet} target="_blank" rel="noopener">Product sheet</a>
                            )}
                            {game.video_url && (
                                <a className="btn btn-ghost" href={game.video_url} target="_blank" rel="noopener">Watch video</a>
                            )}
                        </div>
                        <div className="article-body" dangerouslySetInnerHTML={{ __html: game.description_html ?? "" }} />
                    </div>
                    <aside className="game-panel">
                        <h2>Features</h2>
                        <dl className="spec-table">
                            {specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                        </dl>
                        {game.features.length > 0 && (
                            <>
                                <h3>Features &amp; USPs</h3>
                                <ul>{game.features.map((f) => <li key={f}>{f}</li>)}</ul>
                            </>
                        )}
                        {game.languages.length > 0 && (
                            <>
                                <h3>Languages</h3>
                                <p className="game-langs">{game.languages.join(", ")}</p>
                            </>
                        )}
                    </aside>
                </div>
                {game.screenshots.length > 0 && (
                    <section className="shot-section">
                        <h2 className="display">Screenshots</h2>
                        <ScreenshotGallery shots={game.screenshots} title={game.title} />
                    </section>
                )}
            </div>
        </main>
    );
}
