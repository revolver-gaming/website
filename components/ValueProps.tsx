import { VALUE_PROPS } from "@/lib/pillars";

export default function ValueProps() {
    return (
        <div className="vprops">
            {VALUE_PROPS.map((v, i) => (
                <div className="vprop" key={v.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                </div>
            ))}
        </div>
    );
}
