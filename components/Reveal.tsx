"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Marks every [data-reveal] element with .in as it scrolls into view. */
export default function Reveal() {
    const path = usePathname();
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)");
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            els.forEach((el) => el.classList.add("in"));
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue;
                    e.target.classList.add("in");
                    io.unobserve(e.target);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [path]);
    return null;
}
