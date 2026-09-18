"use client";

import { useEffect, useState } from "react";

const KEY = "rg-age-ok";

/* Age check on entry. The answer is kept per browser, so it asks once.
   Rendering is deferred until the stored answer is read, otherwise every
   returning visitor gets a flash of the gate before it disappears. */
export default function AgeGate() {
    const [ask, setAsk] = useState<boolean | null>(null);
    const [blocked, setBlocked] = useState(false);

    useEffect(() => {
        let confirmed = false;
        try { confirmed = localStorage.getItem(KEY) === "1"; } catch { /* private mode */ }
        setAsk(!confirmed);
    }, []);

    useEffect(() => {
        if (!ask) return;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [ask]);

    if (!ask) return null;

    const confirm = () => {
        try { localStorage.setItem(KEY, "1"); } catch { /* private mode: ask again next visit */ }
        setAsk(false);
    };

    return (
        <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
            <div className="age-card">
                <img src="/brand/emblem-white.svg" alt="" width={72} height={72} />
                {blocked ? (
                    <>
                        <h2 id="age-gate-title">Come back when you&apos;re 18</h2>
                        <p>
                            Our games are for over-18s only. If you need support with gambling,
                            <a href="https://www.begambleaware.org" target="_blank" rel="noopener"> BeGambleAware</a> can help.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 id="age-gate-title">We are committed to responsible gambling</h2>
                        <p>
                            To check out our games and experience the latest in iGaming, please
                            confirm you meet the legal age required to continue.
                        </p>
                        <div className="age-actions">
                            <button className="btn btn-fire" onClick={confirm}>I am 18 years or older</button>
                            <button className="age-deny" onClick={() => setBlocked(true)}>I am under 18 years</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
