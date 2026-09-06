import { getContact } from "@/lib/cms";

const ENQUIRIES: [string, string, boolean][] = [
    ["I run a casino", "Operator enquiry", true],
    ["I'm an aggregator", "Aggregator enquiry", false],
    ["I build games", "Studio partnership", false],
];

export default async function ContactPanel({ heading = true }: { heading?: boolean }) {
    const contact = await getContact();
    return (
        <div className="contact-panel" data-reveal>
            <div className="contact-copy">
                {heading && (
                    <>
                        <p className="eyebrow">Last chamber</p>
                        <h2 className="display">Talk business<em>.</em></h2>
                    </>
                )}
                <p>
                    Tell us what you&apos;re loading up, and a member of the team
                    gets back to you fast.
                </p>
                <div className="contact-line">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    <br />
                    {contact.address.join(", ")}
                </div>
            </div>
            <div className="contact-pills">
                {ENQUIRIES.map(([label, subject, fire]) => (
                    <a
                        key={label}
                        className={`contact-pill${fire ? " fire" : ""}`}
                        href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}`}
                    >
                        <span>{label}</span><span>→</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
