import type { Metadata } from "next";
import Link from "next/link";

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
        <main>
            <section className="plat-hero" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">Fair by design</p>
                        <h1 className="display">Provably<br /><em>fair.</em></h1>
                        <p className="lede">
                            Most casinos ask players to trust the math. Our engine lets anyone
                            check it — every round, after the fact, cryptographically.
                        </p>
                    </div>
                </div>
            </section>

            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">How it works</p>
                        <h2 className="display">Four steps, no trust required</h2>
                    </div>
                    <div className="fair-steps">
                        {steps.map((s, i) => (
                            <div className="feat-card fair-step" key={s.title}>
                                <b>{String(i + 1).padStart(2, "0")}</b>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">And we check ourselves</p>
                        <h2 className="display">Randomness, audited around the clock</h2>
                        <p className="lede">
                            Player verification is the last line, not the only one. The RNG behind
                            every game is continuously tested in production — not once per audit cycle.
                        </p>
                    </div>
                    <div className="stat-row fair-checks">
                        {checks.map((c) => (
                            <div className="stat" key={c.label}>
                                <b>{c.value}</b>
                                <span>{c.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-chamber>
                <div className="shell">
                    <div className="cta-card">
                        <p className="eyebrow">Last chamber</p>
                        <h2 className="display">Proof, <em>live.</em></h2>
                        <p className="lede">
                            Ask for a demo and verify a round yourself — seeds, hash and all.
                        </p>
                        <div className="hero-ctas">
                            <Link href="/#contact" className="btn btn-fire">Book a demo</Link>
                            <Link href="/rgs" className="btn btn-ghost">Back to the RGS</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
