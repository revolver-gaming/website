"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProviderGameCard from "@/components/ProviderGameCard";
import type { ProviderGame } from "@/lib/cms";

// Demo popups sync with ?play={game-slug} so every demo has a shareable URL.
export default function ProviderGrid({ games }: { games: ProviderGame[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const playing = useSearchParams().get("play");

    const setPlaying = (slug: string | null) =>
        router.replace(slug ? `${pathname}?play=${slug}` : pathname, { scroll: false });

    return (
        <div className="game-grid">
            {games.map((g) => (
                <ProviderGameCard
                    key={g.id}
                    game={g}
                    open={playing === g.slug}
                    onOpenChange={(open) => setPlaying(open ? g.slug : null)}
                />
            ))}
        </div>
    );
}
