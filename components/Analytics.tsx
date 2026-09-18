"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COOKIE_KEY, onConsentChange, readChoice } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
    interface Window { dataLayer: unknown[] }
}

const gtag = (...args: unknown[]) => {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(args);
};

/* Google Analytics, loaded only once cookies are accepted — so declining means
   the script is never fetched, not merely told to behave. Set NEXT_PUBLIC_GA_ID
   to a GA4 measurement id (G-XXXXXXXXXX); without it this renders nothing. */
export default function Analytics() {
    const [granted, setGranted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const sync = () => setGranted(readChoice(COOKIE_KEY) === "granted");
        sync();
        return onConsentChange(sync);
    }, []);

    useEffect(() => {
        if (!GA_ID || !granted || document.getElementById("ga-script")) return;
        const script = document.createElement("script");
        script.id = "ga-script";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);
        gtag("js", new Date());
        gtag("config", GA_ID, { send_page_view: false });
    }, [granted]);

    // App Router navigations don't reload the page, so send the view ourselves.
    useEffect(() => {
        if (!GA_ID || !granted || !window.dataLayer) return;
        gtag("event", "page_view", { page_path: pathname + window.location.search });
    }, [granted, pathname]);

    return null;
}
