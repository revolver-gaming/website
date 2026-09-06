export default function Ticker({ items, label }: { items: string[]; label?: string }) {
    return (
        <div className="ticker" aria-hidden>
            {label && <p className="ticker-label">{label}</p>}
            <div className="ticker-track">
                {[0, 1].map((n) => (
                    <span key={n}>
                        {items.map((o) => <span key={o}>{o}</span>)}
                    </span>
                ))}
            </div>
        </div>
    );
}
