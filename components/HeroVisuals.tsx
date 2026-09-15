import PartnerLogo from "./PartnerLogo";
import type { Partner, PartnerStudio } from "@/lib/cms";
import { OPERATOR_INTEGRATIONS, THIRD_PARTY_GAMES } from "@/lib/pillars";

/* Right-hand hero visuals for the pillars that have no game art of their own. */

const MODULES = ["Launch", "Wallet", "Game engines", "Promotions", "Jackpots", "Reporting"];

export function RgsVisual() {
    return (
        <div className="hv-card hv-engine">
            <div className="hv-head"><span className="hv-pulse" aria-hidden />Revolver RGS</div>
            <dl>
                <div><dt>Operator integrations</dt><dd>{OPERATOR_INTEGRATIONS}</dd></div>
                <div><dt>Currencies</dt><dd>185+</dd></div>
                <div className="wide"><dt>Run it</dt><dd>Independent · Managed · Hybrid</dd></div>
            </dl>
            <ul className="hv-modules" aria-label="Platform modules">
                {MODULES.map((m, i) => <li key={m} style={{ animationDelay: `${i * 0.7}s` }}>{m}</li>)}
            </ul>
        </div>
    );
}

export function NetworkVisual({ studios, operators }: { studios: PartnerStudio[]; operators: Partner[] }) {
    return (
        <div className="hv-card hv-network">
            <div className="hv-col">
                <span className="role">Studios in</span>
                <div className="hv-logo"><PartnerLogo name="Revolver Gaming" logo="/brand/logo-horizontal-white.svg" logoScale={1.2} /></div>
                {studios.slice(0, 3).map((s) => <div className="hv-logo" key={s.name}><PartnerLogo {...s} /></div>)}
            </div>
            <div className="hv-hub">
                <b>Revolver Platform</b>
                <span>One integration</span>
            </div>
            <div className="hv-col">
                <span className="role">Operators out</span>
                {operators.slice(0, 4).map((o) => <div className="hv-logo" key={o.name}><PartnerLogo {...o} /></div>)}
            </div>
            <p className="hv-foot">{OPERATOR_INTEGRATIONS} operator integrations · {THIRD_PARTY_GAMES} third-party games</p>
        </div>
    );
}
