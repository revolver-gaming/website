"use client";

import { useEffect, useState } from "react";

const NODES = ["Player", "RGS", "GAP", "Operator wallet"];

// node index the pulse sits at + what is happening there
type Stage = { at: number; label: string; tone?: "win" | "fail" };

const SPIN: Stage[] = [
    { at: 0, label: "Player spins" },
    { at: 1, label: "RGS opens the round" },
    { at: 2, label: "GAP routes the debit" },
    { at: 3, label: "Operator wallet approves −1.00" },
    { at: 2, label: "Win routed back" },
    { at: 1, label: "Round settles +5.00", tone: "win" },
    { at: 0, label: "Balance updates — one round trip", tone: "win" },
];

const RECOVERY: Stage[] = [
    { at: 0, label: "Player spins" },
    { at: 1, label: "RGS opens the round" },
    { at: 2, label: "GAP routes the debit" },
    { at: 3, label: "Wallet times out — no response", tone: "fail" },
    { at: 2, label: "GAP rolls the bet back automatically" },
    { at: 1, label: "Round voided, nothing hangs" },
    { at: 0, label: "Player refunded — no engineer paged", tone: "win" },
];

export default function WalletFlow() {
    const [cycle, setCycle] = useState(0);
    const [step, setStep] = useState(0);
    const script = cycle % 3 === 2 ? RECOVERY : SPIN;
    const stage = script[step];

    useEffect(() => {
        const t = setTimeout(() => {
            if (step + 1 < script.length) setStep(step + 1);
            else { setStep(0); setCycle((c) => c + 1); }
        }, step === script.length - 1 ? 2200 : 1300);
        return () => clearTimeout(t);
    }, [step, script.length]);

    return (
        <div className="wf" aria-label="Animated diagram of a bet travelling through the platform">
            <div className="wf-track">
                <div className="wf-line" aria-hidden />
                <div
                    className={`wf-dot${stage.tone ? ` ${stage.tone}` : ""}`}
                    style={{ left: `${(stage.at / (NODES.length - 1)) * 100}%` }}
                    aria-hidden
                />
                {NODES.map((n, i) => (
                    <div className={`wf-node${stage.at === i ? " on" : ""}`} key={n}
                        style={{ left: `${(i / (NODES.length - 1)) * 100}%` }}>
                        <span className="wf-pin" aria-hidden />
                        <span className="wf-name">{n}</span>
                    </div>
                ))}
            </div>
            <p className={`wf-label${stage.tone ? ` ${stage.tone}` : ""}`} aria-live="polite">
                {script === RECOVERY && <span className="wf-mode">recovery drill — </span>}
                {stage.label}
            </p>
        </div>
    );
}
