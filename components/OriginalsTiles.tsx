import { ORIGINALS } from "@/lib/pillars";

const ICONS: Record<string, React.ReactNode> = {
    Crash: <path d="M4 18 10 11l4 3 6-9M16 5h4v4" />,
    Dice: <><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="9" cy="9" r="1.2" fill="currentColor" /><circle cx="15" cy="15" r="1.2" fill="currentColor" /><circle cx="15" cy="9" r="1.2" fill="currentColor" /><circle cx="9" cy="15" r="1.2" fill="currentColor" /></>,
    Mines: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M4 15h16M10 4v16M15 4v16" /></>,
    Plinko: <><circle cx="12" cy="5" r="1" /><circle cx="8" cy="11" r="1" /><circle cx="16" cy="11" r="1" /><circle cx="5" cy="17" r="1" /><circle cx="12" cy="17" r="1" /><circle cx="19" cy="17" r="1" /></>,
    Limbo: <path d="M4 14h16M9 9l3 4 3-4M12 3v10" />,
    Keno: <><circle cx="12" cy="12" r="8" /><path d="M9 12h6M12 9v6" /></>,
    Wheel: <><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16M6 6l12 12M18 6 6 18" /></>,
    Diamonds: <path d="M6 3h12l4 6-10 12L2 9zM2 9h20M9 3l3 6 3-6M8 9l4 12 4-12" />,
    "Dragon Tower": <path d="M6 20h12M8 16h8M10 12h4M11 8h2M12 4v4" />,
    Punch: <path d="M4 12h6l2-3 2 6 2-3h4M12 3l2 3M12 21l2-3" />,
};

export default function OriginalsTiles() {
    return (
        <div className="tgrid otiles" data-reveal>
            {ORIGINALS.map((o) => (
                <div className="otile" key={o.name}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {ICONS[o.name]}
                    </svg>
                    <div>
                        <b>{o.name}</b>
                        <span>{o.type}</span>
                    </div>
                </div>
            ))}
            <div className="otile more">
                <div>
                    <b>+ More</b>
                    <span>New titles monthly</span>
                </div>
            </div>
        </div>
    );
}
