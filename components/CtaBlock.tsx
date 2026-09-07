/* "Last chamber" closer used at the foot of every pillar page. */
export default function CtaBlock({
    title, lede, children,
}: {
    title: React.ReactNode;
    lede: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section data-chamber>
            <div className="shell">
                <div className="cta" data-reveal>
                    <div className="cta-copy">
                        <p className="eyebrow">Last chamber</p>
                        <h2 className="display">{title}</h2>
                        <p className="lede">{lede}</p>
                    </div>
                    <div className="hero-ctas">{children}</div>
                </div>
            </div>
        </section>
    );
}
