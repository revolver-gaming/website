"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

/* Temporary A/B switch: /?hero=2 or /?hero=3 previews alternative heroes. */
export default function HeroSwitch({ heroes }: { heroes: ReactNode[] }) {
    const v = Number(useSearchParams().get("hero"));
    return <>{heroes[v - 1] ?? heroes[0]}</>;
}
