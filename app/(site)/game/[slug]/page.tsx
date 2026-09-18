import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoLauncher from "@/components/DemoLauncher";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { getGame, listGames, rtpRange } from "@/lib/cms";

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
    // Spec order is Ryan's: release date, RTP, volatility, max multiplier, paylines, bonus buy.
    const specs = [
        ["Release date", String(game.year)], ["RTP", rtpRange(game.rtp)],
        ["Volatility", game.volatility], ["Max multiplier", game.max_win],
        ["Paylines", game.paylines],
        ["Bonus buy", game.bonus_buy === null ? null : game.bonus_buy ? "Yes" : "No"],
    ].filter(([, v]) => v);
    // Play demo is the panel's one button; the rest ride under it as quiet links.
    const downloads = ([
        ["Asset pack", game.asset_pack], ["Product sheet", game.product_sheet], ["Watch video", game.video_url],
    ] as const).filter(([, href]) => href);
    return (
        <main>
            <div className="shell game-detail">
                <Link className="article-back" href="/games">← All games</Link>
                <div className="game-banner-wrap">
                    <img className="game-banner" src={game.banner_image ?? game.image} alt={`${game.title} banner`} />
                    {(game.coming_soon || game.is_new) && (
                        <span className="tag-badge">{game.coming_soon ? "Coming soon" : "New"}</span>
                    )}
                </div>
                <div className="game-body">
                    <header className="game-intro">
                        <p className="eyebrow">{[game.year, ...game.tags].join(" · ")}</p>
                        <h1 className="display">{game.title}</h1>
                        <p className="game-blurb">{game.blurb}</p>
                    </header>
                    <aside className="game-panel">
                        <h2>Features</h2>
                        <dl className="spec-table">
                            {specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                        </dl>
                        {game.demo_url && (
                            <div className="panel-ctas">
                                <DemoLauncher url={game.demo_url} title={game.title} />
                            </div>
                        )}
                        {downloads.length > 0 && (
                            <p className="panel-links">
                                {downloads.map(([label, href]) => (
                                    <a key={label} href={href!} target="_blank" rel="noopener">{label}</a>
                                ))}
                            </p>
                        )}
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
                    <div className="game-copy article-body" dangerouslySetInnerHTML={{ __html: game.description_html ?? "" }} />
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
