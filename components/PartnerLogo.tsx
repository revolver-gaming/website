import type { Partner } from "@/lib/cms";

// Monochrome logo when one is uploaded, the name as a wordmark otherwise.
export default function PartnerLogo({ name, logo, logoScale }: Partner) {
    return logo
        ? <img className="partner-logo" src={logo} alt={name} loading="lazy" style={{ "--s": logoScale } as React.CSSProperties} />
        : <b>{name}</b>;
}
