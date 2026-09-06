import { getContact } from "@/lib/cms";

const ENQUIRIES: [string, string][] = [
    ["I run a casino", "Operator enquiry"],
    ["I'm an aggregator", "Aggregator enquiry"],
    ["I build games", "Studio partnership"],
];

export default async function ContactPanel() {
    const contact = await getContact();
    return (
        <div className="contact-panel" data-reveal>
            <div className="contact-copy">
                <p className="eyebrow">Last chamber</p>
                <h2 className="display">Talk business<em>.</em></h2>
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
                {ENQUIRIES.map(([label, subject]) => (
                    <a
                        key={label}
                        className="contact-pill"
                        href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}`}
                    >
                        <span>{label}</span><span>→</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
