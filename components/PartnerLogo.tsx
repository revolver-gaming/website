import type { Partner } from "@/lib/cms";
import { media } from "@/lib/media";

// Monochrome logo when one is uploaded, the name as a wordmark otherwise.
export default function PartnerLogo({ name, logo, logoScale }: Partner) {
    return logo
        ? <img className="partner-logo" src={media(logo, 384)} alt={name} loading="lazy" style={{ "--s": logoScale } as React.CSSProperties} />
        : <b>{name}</b>;
}
