import { VALUE_PROPS } from "@/lib/pillars";

/* Ryan's four value props as numbered cards; the title sits low so the
   number and the claim bracket the card. */
export default function ValueProps() {
    return (
        <div className="vprops">
            {VALUE_PROPS.map((v, i) => (
                <div className="vprop" key={v.title} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                </div>
            ))}
        </div>
    );
}
