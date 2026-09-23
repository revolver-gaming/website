import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoLauncher from "@/components/DemoLauncher";
import { OriginalsGrid } from "@/components/Originals";
import { listOriginals, rtpRange } from "@/lib/cms";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

const findLive = async (slug: string) => {
    const all = await listOriginals();
    return { all, o: all.find((x) => x.slug === slug && !x.coming_soon) };
};

export async function generateStaticParams() {
    return (await listOriginals()).filter((o) => !o.coming_soon).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { o } = await findLive((await params).slug);
    if (!o) return {};
    return {
        title: `${o.title} — Originals — Revolver Gaming`,
        description: o.blurb,
        alternates: { canonical: `/originals/${o.slug}` },
        openGraph: { title: o.title, description: o.blurb, images: o.hero_image ?? o.card_image ?? undefined },
    };
}

export default async function OriginalPage({ params }: Props) {
    const { all, o } = await findLive((await params).slug);
    if (!o) notFound();
    const specs = [
        ["Max win", o.max_win], ["RTP", rtpRange(o.rtp)], ["Volatility", o.volatility],
        ["Category", o.category], ["Fairness", "Provably fair"], ["Brandable", "Yes"],
    ].filter(([, v]) => v);
    const more = all.filter((x) => x.slug !== o.slug && !x.coming_soon).slice(0, 4);
    return (
        <main>
            <div className="shell game-detail">
                <Link className="article-back" href="/originals">← Originals</Link>
                {o.hero_image && (
                    <div className="game-banner-wrap">
                        <img className="game-banner" src={o.hero_image} alt={`${o.title} banner`} />
                        {o.is_new && <span className="tag-badge">New</span>}
                    </div>
                )}
                <div className="game-body">
                    <header className="game-intro">
                        <p className="eyebrow">{o.category} · Provably fair · Brandable</p>
                        <h1 className="display">{o.title}</h1>
                        <p className="game-blurb">{o.blurb}</p>
                    </header>
                    <aside className="game-panel">
                        <h2>Features</h2>
                        <dl className="spec-table">
                            {specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                        </dl>
                        <div className="panel-ctas">
                            {o.demo_url
                                ? <DemoLauncher url={o.demo_url} title={o.title} />
                                : <span className="btn btn-ghost btn-inert">Demo soon</span>}
                            <Link className="btn btn-ghost" href="/originals#branding">Branding demo</Link>
                            <Link className="btn btn-ghost" href="/#contact">Add to your lobby</Link>
                        </div>
                    </aside>
                    {o.features.length > 0 && (
                        <ul className="game-copy o-points">
                            {o.features.map((f) => (
                                <li key={f.title}>
                                    <h3>{f.title}</h3>
                                    <p>{f.text}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {more.length > 0 && (
                    <section className="shot-section">
                        <h2 className="display">More originals</h2>
                        <OriginalsGrid items={more} />
                    </section>
                )}
            </div>
        </main>
    );
}
