import type { CSSProperties } from "react";
import { media } from "@/lib/media";

/* One piece of key art per hero slide, bled off the right edge on a blurred wash of itself
   (--art feeds the wash). Deliberately static: the slide copy carries the CTA. */
export default function HeroArt({ src, alt }: { src?: string | null; alt?: string }) {
    if (!src) return null;
    return (
        <figure className="hero-art" style={{ "--art": `url(${media(src, 384)})` } as CSSProperties}>
            <img src={media(src, 1200)} alt={alt ?? ""} />
        </figure>
    );
}
