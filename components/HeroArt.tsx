import type { CSSProperties } from "react";

/* One piece of key art per hero slide, bled off the right edge on a blurred wash of itself
   (--art feeds the wash). Deliberately static: the slide copy carries the CTA. */
export default function HeroArt({ src, alt }: { src?: string | null; alt?: string }) {
    if (!src) return null;
    return (
        <figure className="hero-art" style={{ "--art": `url(${src})` } as CSSProperties}>
            <img src={src} alt={alt ?? ""} />
        </figure>
    );
}
