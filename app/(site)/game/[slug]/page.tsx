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
    return (
        <main>
            <div className="shell game-detail">
                <Link className="article-back" href="/games">← All games</Link>
                <div className="game-hero">
                    <div>
                        <p className="eyebrow">{[game.year, ...game.tags].join(" · ")}</p>
                        <h1 className="display">{game.title}</h1>
                        <p className="game-blurb">{game.blurb}</p>
                        {(game.layout || game.volatility || game.rtp) && (
                            <dl className="game-specs">
                                {game.layout && <div><dt>Layout</dt><dd>{game.layout}</dd></div>}
                                {game.volatility && <div><dt>Volatility</dt><dd>{game.volatility}</dd></div>}
                                {game.rtp && <div><dt>RTP</dt><dd>{game.rtp}</dd></div>}
                            </dl>
                        )}
                        <div className="game-ctas">
                            {game.demo_url && <DemoLauncher url={game.demo_url} title={game.title} />}
                            {game.product_sheet && (
                                <a className="btn btn-ghost" href={game.product_sheet} target="_blank" rel="noopener">
                                    Product sheet
                                </a>
                            )}
                            {game.video_url && (
                                <a className="btn btn-ghost" href={game.video_url} target="_blank" rel="noopener">
                                    Watch video
                                </a>
                            )}
                        </div>
                    </div>
                    <img className="game-art" src={game.image} alt={`${game.title} artwork`} />
                </div>
                <div className="game-cols">
                    <div
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: game.description_html ?? "" }}
                    />
                    {game.features.length > 0 && (
                        <aside className="game-facts">
                            <h3>Features &amp; USPs</h3>
                            <ul>{game.features.map((f) => <li key={f}>{f}</li>)}</ul>
                        </aside>
                    )}
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
