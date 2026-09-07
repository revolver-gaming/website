/* The layout signature: a mono label in a 260px column, content beside it.
   `sub` adds the spacing used between blocks inside one section. */
export default function LabelRow({
    label, sub, head, reveal, children,
}: {
    label: string;
    sub?: boolean;
    head?: boolean;
    reveal?: boolean;
    children: React.ReactNode;
}) {
    const cls = ["lc", sub && "sub", head && "head"].filter(Boolean).join(" ");
    return (
        <div className={cls} data-reveal={reveal ? "" : undefined}>
            <p className="eyebrow">{label}</p>
            <div>{children}</div>
        </div>
    );
}
