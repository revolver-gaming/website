import type { Game } from "@/lib/cms";
import { VALUE_PROPS } from "@/lib/pillars";

/* Ryan's four value props as big cards, each with a small visual that
   matches its claim: a gauge for speed, polished reels, config chips,
   and expanding rings for scale. */
const SETTINGS = ["Rules", "Markets", "Mechanics", "Currencies", "Limits", "Licences"];

const art = [
    () => (
        <svg className="gauge-art" viewBox="0 0 200 140" fill="none" aria-hidden>
            <path d="M20 110A80 80 0 0 1 180 110" stroke="rgba(255,167,85,.25)" strokeWidth="10" strokeLinecap="round" />
            <path d="M20 110A80 80 0 0 1 100 30" stroke="rgba(255,167,85,.6)" strokeWidth="10" strokeLinecap="round" strokeDasharray="4 8" />
            <g className="needle">
                <path d="M100 100 100 40" stroke="var(--brass)" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx="100" cy="100" r="9" fill="var(--brass)" />
            <text x="100" y="132" textAnchor="middle" fontFamily="var(--font-m)" fontSize="11" fill="var(--smoke)" letterSpacing="2">DAY 1</text>
        </svg>
    ),
    (games: Game[]) => (
        <div className="fan" aria-hidden>
            {games.slice(0, 3).map((g) => <img key={g.slug} src={g.image} alt="" loading="lazy" />)}
        </div>
    ),
    () => (
        <div className="chips-art" aria-hidden>
            {SETTINGS.map((s) => <span key={s}>{s}</span>)}
        </div>
    ),
    () => (
        <svg className="rings-art" viewBox="0 0 200 200" fill="none" aria-hidden>
            <circle cx="100" cy="100" r="92" stroke="rgba(255,167,85,.25)" />
            <circle cx="100" cy="100" r="70" stroke="rgba(255,167,85,.5)" strokeDasharray="4 10" className="spin" />
            <circle cx="100" cy="100" r="48" stroke="rgba(244,240,227,.25)" strokeDasharray="1 8" className="spin rev" />
            <circle cx="100" cy="100" r="22" fill="rgba(214,183,142,.12)" stroke="var(--brass)" />
            <path d="M100 86v28M86 100h28" stroke="var(--brass)" strokeWidth="2" />
        </svg>
    ),
];

export default function ValueProps({ games }: { games: Game[] }) {
    return (
        <div className="vprops">
            {VALUE_PROPS.map((v, i) => (
                <div className="vprop" key={v.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                    <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                    {art[i](games)}
                </div>
            ))}
        </div>
    );
}
