export default function OperatorBand({ items, label }: { items: string[]; label: string }) {
    return (
        <div className="band">
            <div className="shell lc">
                <p>{label}</p>
                <div className="band-list">
                    {items.map((o) => <span key={o}>{o}</span>)}
                </div>
            </div>
        </div>
    );
}
