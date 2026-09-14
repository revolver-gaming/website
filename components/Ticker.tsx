import type { Partner } from "@/lib/cms";
import PartnerLogo from "./PartnerLogo";

export default function Ticker({ items, label }: { items: Partner[]; label?: string }) {
    return (
        <div className="ticker" aria-hidden>
            {label && <p className="ticker-label">{label}</p>}
            <div className="ticker-track">
                {[0, 1].map((n) => (
                    <span key={n}>
                        {items.map((p) => <span key={p.name}><PartnerLogo {...p} /></span>)}
                    </span>
                ))}
            </div>
        </div>
    );
}
