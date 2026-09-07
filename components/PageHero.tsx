/* Subpage opener in the same label-column layout as the homepage sections. */
export default function PageHero({
    kicker, title, lede, children,
}: {
    kicker: string;
    title: React.ReactNode;
    lede?: React.ReactNode;
    children?: React.ReactNode;
}) {
    return (
        <section className="page-hero">
            <div className="shell lc">
                <p className="eyebrow">{kicker}</p>
                <div className="page-hero-copy">
                    <h1 className="display">{title}</h1>
                    {lede && <p className="lede">{lede}</p>}
                    {children}
                </div>
            </div>
        </section>
    );
}
