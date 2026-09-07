import Link from "next/link";
import LabelRow from "./LabelRow";

/* Section opener: label column, display title, optional lede / tags, and an
   optional ghost link sitting on the baseline to the right. */
export default function SectionHead({
    kicker, title, lede, tags, cta,
}: {
    kicker: string;
    title: React.ReactNode;
    lede?: React.ReactNode;
    tags?: string[];
    cta?: { label: string; href: string };
}) {
    return (
        <LabelRow label={kicker} head reveal>
            <div className="sec-head">
                <div className="sec-copy">
                    <h2 className="display">{title}</h2>
                    {lede && <p className="lede">{lede}</p>}
                    {tags && (
                        <div className="tag-bar">
                            {tags.map((t) => <span key={t}>{t}</span>)}
                        </div>
                    )}
                </div>
                {cta && <Link href={cta.href} className="btn btn-ghost">{cta.label} →</Link>}
            </div>
        </LabelRow>
    );
}
