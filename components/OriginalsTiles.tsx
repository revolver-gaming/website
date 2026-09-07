import { ORIGINALS } from "@/lib/pillars";

export default function OriginalsTiles() {
    return (
        <div className="otiles" data-reveal>
            {ORIGINALS.map((o) => (
                <div className="otile" key={o.name}>
                    <b>{o.name}</b>
                    <span>{o.type}</span>
                </div>
            ))}
            <div className="otile more">
                <b>+ More</b>
                <span>New titles monthly</span>
            </div>
        </div>
    );
}
