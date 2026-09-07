import type { PartnerStudio } from "@/lib/cms";

/* Studios → Revolver Platform → Operators, the one-integration diagram. */
export function Flow() {
    return (
        <div className="flow" data-reveal>
            <div className="flow-col">
                <span className="role">Games in</span>
                <h3>Studios</h3>
            </div>
            <div className="flow-line" aria-hidden><span /></div>
            <div className="flow-col flow-hub">
                <h3>Revolver Platform</h3>
                <span className="role">One integration</span>
            </div>
            <div className="flow-line" aria-hidden><span /></div>
            <div className="flow-col">
                <span className="role">Games out</span>
                <h3>Operators</h3>
            </div>
        </div>
    );
}

export function StudioRoster({ studios }: { studios: PartnerStudio[] }) {
    return (
        <div className="tgrid roster roster-studios">
            <div><b>Revolver</b><span>Slots &amp; originals</span></div>
            {studios.map((s) => <div key={s.name}><b>{s.name}</b><span>{s.knownFor} · {s.genre}</span></div>)}
            <div className="more"><b>+ More</b><span>Added continuously</span></div>
        </div>
    );
}
