import type { Metadata } from "next";
import Link from "next/link";
import CtaBlock from "@/components/CtaBlock";
import LabelRow from "@/components/LabelRow";
import OriginalsTiles from "@/components/OriginalsTiles";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
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
    { title: "Plug in once", text: "Delivered through the same platform integration as our slots. Already integrated? Nothing new to build." },
    { title: "Keep it fresh", text: "New originals are added to your lobby as they ship, at no extra integration cost." },
];

export default function Originals() {
    const p = pillar("originals");
    return (
        <main id="main">
            <PageHero
                kicker={p.kicker}
                title={<>{p.title[0]} <em>{p.title[1]}</em></>}
                lede="Fast, modern casual games in provably fair and RNG formats, every one brandable to your casino. Multiplayer crash, instant-win grids and classic table mechanics, all on the licensed Revolver RGS."
            >
                <div className="hero-ctas">
                    <Link href="/#contact" className="btn btn-fire">Brand your lobby</Link>
                    <Link href="/fairness" className="btn btn-ghost">How provably fair works</Link>
                </div>
                <div className="tag-bar">
                    {["Provably fair + RNG", "Fully brandable", "Full lobby", "New titles monthly"].map((t) => <span key={t}>{t}</span>)}
                </div>
            </PageHero>

            <section data-chamber>
                <div className="shell">
                    <SectionHead kicker="The lobby" title={<>Every table, <em>every taste.</em></>} />
                    <div className="indent">
                        <OriginalsTiles />
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <SectionHead kicker="Why originals" title={<>Simple games, <em>serious retention.</em></>} />
                    <div className="indent feat-grid" data-reveal>
                        {PROMISES.map((f) => (
                            <div className="feat" key={f.title}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                                {f.href && <Link className="feat-more" href={f.href}>Learn more →</Link>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <LabelRow label="How it ships" reveal>
                        <h2 className="display sub-h2">Your brand, live in <em>four steps.</em></h2>
                        <div className="feat-grid feat-grid-4">
                            {STEPS.map((s) => (
                                <div className="feat" key={s.title}>
                                    <h3>{s.title}</h3>
                                    <p>{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </LabelRow>
                </div>
            </section>

            <CtaBlock
                title={<>Load the <em>lobby.</em></>}
                lede="Send us your brand assets and we'll show you the originals lobby running in your colours."
            >
                <Link href="/#contact" className="btn btn-fire">Talk to the team</Link>
                <Link href="/games" className="btn btn-ghost">See the slots too</Link>
            </CtaBlock>
        </main>
    );
}
