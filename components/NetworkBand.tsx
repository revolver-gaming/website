/* The operator/aggregator roster as a quiet, centred band — the same names
   the RGS section lays out as a grid, here as a single line of type. */
export default function NetworkBand({ items, label }: { items: string[]; label: string }) {
    return (
        <div className="band">
            <div className="shell">
                <p className="band-label">{label}</p>
                <ul className="band-list">
                    {items.map((o) => <li key={o}>{o}</li>)}
                </ul>
            </div>
        </div>
    );
}
