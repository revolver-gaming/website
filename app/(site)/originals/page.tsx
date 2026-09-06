import type { Metadata } from "next";
import Link from "next/link";
import OriginalsTiles from "@/components/OriginalsTiles";
import { pillar } from "@/lib/pillars";

export const metadata: Metadata = {
    title: "Originals — Revolver Gaming",
    description:
        "Brandable casual originals — crash, dice, mines, plinko and more — in provably fair and RNG formats. A complete originals lobby under your brand, with new titles monthly.",
};

const PROMISES = [
    { title: "Provably fair + RNG", text: "Every title runs on the licensed RGS. Players can verify any round after the fact, and the RNG is tested around the clock.", href: "/fairness" },
    { title: "Fully brandable", text: "Your logo, your colours, your lobby. Each original ships as a branded edition for your casino, not a generic skin." },
    { title: "A full lobby, fast", text: "We stand up the whole originals lobby under your brand and keep it growing, with new titles landing every month." },
];

const STEPS = [
    { title: "Pick the lobby", text: "Choose the titles you want live on day one. Crash, dice, mines, plinko — the whole set or a curated few." },
    { title: "We brand it", text: "Assets, palette and naming applied across every game, so the lobby reads as yours." },
    { title: "Plug in once", text: "Delivered through the same GAP integration as our slots. Already integrated? Nothing new to build." },
    { title: "Keep it fresh", text: "New originals are added to your lobby as they ship, at no extra integration cost." },
];

export default function Originals() {
    const p = pillar("originals");
    return (
        <main>
            <section className="plat-hero dots-bg" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">{p.kicker}</p>
                        <h1 className="display">{p.title[0]}<br /><em>{p.title[1]}</em></h1>
                        <p className="lede">
                            Fast, modern casual games in provably fair and RNG formats, every
                            one brandable to your casino. Multiplayer crash, instant-win grids
                            and classic table mechanics, all on the licensed Revolver RGS.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/contact" className="btn btn-fire">Brand your lobby</Link>
                            <Link href="/fairness" className="btn btn-ghost">How provably fair works</Link>
                        </div>
                    </div>
                    <div className="tag-bar">
                        {["Provably fair + RNG", "Fully brandable", "Full lobby", "New titles monthly"].map((t) => <span key={t}>{t}</span>)}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">The lobby</p>
                        <h2 className="display">Every table, <em>every taste</em></h2>
                    </div>
                    <OriginalsTiles />
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">Why originals</p>
                        <h2 className="display">Simple games, <em>serious retention</em></h2>
                    </div>
                    <div className="feat-grid">
                        {PROMISES.map((f, i) => (
                            <div className="feat-card" key={f.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                                {f.href && <Link className="feat-more" href={f.href}>Learn more →</Link>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber className="rings-bg">
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">How it ships</p>
                        <h2 className="display">Your brand, live in <em>four steps</em></h2>
                    </div>
                    <div className="steps">
                        {STEPS.map((s, i) => (
                            <div className="step" key={s.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="cta-card" data-reveal>
                        <p className="eyebrow">Last chamber</p>
                        <h2 className="display">Load the <em>lobby.</em></h2>
                        <p className="lede">
                            Send us your brand assets and we&apos;ll show you the originals
                            lobby running in your colours.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/contact" className="btn btn-fire">Talk to the team</Link>
                            <Link href="/games" className="btn btn-ghost">See the slots too</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
