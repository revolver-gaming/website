import type { Metadata } from "next";
import ContactPanel from "@/components/ContactPanel";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Contact — Revolver Gaming",
    description: "Talk to Revolver Gaming about slots, originals, RGS licensing, GAP integration or a bespoke game.",
};

const NEXT = [
    { title: "We reply fast", text: "A member of the commercial team comes back to you, usually the same working day." },
    { title: "A live demo", text: "Games, back office and reporting running with your currencies, set up in minutes." },
    { title: "Live the same day", text: "Once we're agreed, integration is measured in hours. Your lobby is loaded the day we start." },
];

export default function Contact() {
    return (
        <main>
            <section className="plat-hero" data-chamber>
                <div className="shell">
                    <div className="section-head">
                        <p className="eyebrow">Last chamber</p>
                        <h1 className="display">Talk<br /><em>business.</em></h1>
                    </div>
                </div>
            </section>
            <section data-chamber className="tight">
                <div className="shell">
                    <ContactPanel heading={false} />
                </div>
            </section>
            <section className="on-bone" data-chamber>
                <div className="shell">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">What happens next</p>
                        <h2 className="display">Loaded in <em>three moves</em></h2>
                    </div>
                    <div className="steps steps-3">
                        {NEXT.map((s, i) => (
                            <div className="step" key={s.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
