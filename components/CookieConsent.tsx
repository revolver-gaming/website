"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AGE_KEY, COOKIE_KEY, onConsentChange, readChoice, saveChoice } from "@/lib/consent";

/* A small card in the corner rather than a page-blocking wall: it waits for the
   age check to clear, never covers the content, and takes one click either way.
   Accept and Decline carry equal weight, which UK/EU consent rules require. */
export default function CookieConsent() {
    const [show, setShow] = useState(false);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const sync = () => {
            const due = readChoice(AGE_KEY) === "1" && readChoice(COOKIE_KEY) === null;
            setShow(due);
            if (due) setLeaving(false); // don't re-enter mid exit-animation
        };
        sync();
        return onConsentChange(sync);
    }, []);

    if (!show) return null;

    const answer = (value: "granted" | "denied") => {
        setLeaving(true);
        // Let the card animate out before the choice re-renders it away.
        window.setTimeout(() => saveChoice(COOKIE_KEY, value), 220);
    };

    return (
        <div className={`cookie-bar${leaving ? " is-leaving" : ""}`} role="region" aria-label="Cookies">
            <p>
                We use analytics cookies to see which games and pages get attention.
                Nothing that identifies you, and nothing sold on.{" "}
                <Link href="/privacy-policy">Privacy policy</Link>
            </p>
            <div className="cookie-actions">
                <button className="btn btn-fire" onClick={() => answer("granted")}>Accept</button>
                <button className="btn btn-ghost" onClick={() => answer("denied")}>Decline</button>
            </div>
        </div>
    );
}
