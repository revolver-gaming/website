import type { Metadata } from "next";
import Link from "next/link";
import CtaBlock from "@/components/CtaBlock";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";

export const metadata: Metadata = {
    title: "Provably Fair — Revolver Gaming",
    description:
        "How Revolver games prove their fairness: committed server seeds, player-chosen client seeds, and cryptographic verification of any past round.",
};

const steps = [
    {
        title: "We commit first",
        text: "Before any spin, the engine generates a server seed and publishes its hash. The outcome is locked in before a bet is placed — we cannot change it afterwards, and the hash proves it.",
    },
    {
        title: "You bring the randomness",
        text: "Every player can set their own client seed at any moment. Outcomes are derived from both seeds together, so no single party — not even us — controls the result.",
    },
    {
        title: "Every round is recorded",
        text: "The full RNG state of each round is stored with the round itself: seeds, nonce and outcome, kept as a permanent audit trail.",
    },
    {
        title: "Verify after the fact",
        text: "Once a seed pair is retired, the server seed is revealed. Anyone can recompute any past round and check it against the published hash — byte for byte.",
    },
];

const checks = [
    { value: "3 min", label: "Chi-square distribution checks on live RNG output" },
    { value: "12 h", label: "Full NIST statistical test suite, one million bits per game" },
    { value: "0", label: "Human steps — a game that fails testing takes itself offline" },
];

export default function Fairness() {
    return (
        <main id="main">
            <PageHero
                kicker="Fair by design"
                title={<>Provably <em>fair.</em></>}
                lede="Most casinos ask players to trust the math. Our engine lets anyone check it — every round, after the fact, cryptographically."
            />

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <SectionHead kicker="How it works" title={<>Four steps, <em>no trust required.</em></>} />
                    <div className="indent feat-grid feat-grid-4" data-reveal>
                        {steps.map((s) => (
                            <div className="feat" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <SectionHead
                        kicker="And we check ourselves"
                        title={<>Randomness, audited <em>around the clock.</em></>}
                        lede="Player verification is the last line, not the only one. The RNG behind every game is continuously tested in production — not once per audit cycle."
                    />
                    <div className="indent">
                        <div className="stats row" data-reveal>
                            {checks.map((c) => (
                                <div key={c.label}>
                                    <b>{c.value}</b>
                                    <span>{c.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <CtaBlock
                title={<>Proof, <em>live.</em></>}
                lede="Ask for a demo and verify a round yourself — seeds, hash and all."
            >
                <Link href="/#contact" className="btn btn-fire">Book a demo</Link>
                <Link href="/rgs" className="btn btn-ghost">Back to the RGS</Link>
            </CtaBlock>
        </main>
    );
}
