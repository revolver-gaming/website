// The site's product pillars — one entry drives the nav, the hero slides,
// and each pillar page's hero copy. Wording is Ryan's (wireframe v7).

export type Pillar = {
    key: string;
    href: string;
    label: string;
    kicker: string;
    title: [string, string]; // [plain, amber]
    lede: string;
    cta: string;
};

export const PILLARS: Pillar[] = [
    {
        key: "slots",
        href: "/games",
        label: "Slots",
        kicker: "Slots · our core",
        title: ["Our arsenal.", "Your lobby."],
        lede: "A proven, growing portfolio of original slots to license and options to brand as your own. This is where we started, and what still sets us apart.",
        cta: "See the slots",
    },
    {
        key: "originals",
        href: "/originals",
        label: "Originals",
        kicker: "Originals · expanding",
        title: ["A full lobby,", "fully branded."],
        lede: "A portfolio of fast, modern casual games. Every round provably fair and every one brandable to your casino. Stand up a complete originals lobby under your brand, with a new title landing every month.",
        cta: "See the originals",
    },
    {
        key: "rgs",
        href: "/rgs",
        label: "RGS",
        kicker: "RGS · licensing",
        title: ["Your games.", "Our engine."],
        lede: "License the Revolver RGS, independent, managed or hybrid, and plug straight into our distribution network. Games but no server? Sorted.",
        cta: "License the RGS",
    },
    {
        key: "gap",
        href: "/gap",
        label: "Platform",
        kicker: "Platform · aggregation",
        title: ["One integration.", "Whole network."],
        lede: "The Game Aggregation Platform connects studios to our operator network, whether you bring your own RGS or build on ours.",
        cta: "Join the platform",
    },
    {
        key: "exclusives",
        href: "/exclusives",
        label: "Exclusives",
        kicker: "Exclusives · bespoke",
        title: ["Built for you.", "Branded as you."],
        lede: "Custom-built, branded games powered by our tech and experience. Exclusive to your casino.",
        cta: "Commission a game",
    },
];

export const pillar = (key: string) => PILLARS.find((p) => p.key === key)!;

// Network-wide figures Ryan quotes (Sep 2026 review); the CMS only lists the logos we show.
export const OPERATOR_INTEGRATIONS = "60+";
export const THIRD_PARTY_GAMES = "300+";

export const RGS_OPTIONS = [
    {
        tag: "Independent",
        title: "Run it yourself",
        text: "License the RGS platform and operate it in-house. You keep control of hosting and configuration; we provide the engine and the route to the operator network.",
    },
    {
        tag: "Managed service",
        title: "Let us run it",
        text: "We host, manage and maintain the RGS for you as a fully managed service. You focus on the games, we handle the platform, the uptime and the distribution.",
    },
];

export const RGS_ENGINE = [
    { title: "Client Framework Kit", text: "A feature rich frontend framework allowing for rapid development of slots and other games." },
    { title: "Promo & jackpot tools", text: "End-to-end free spins and jackpots, served in your platform's own bonus dialect." },
    { title: "Built-in distribution", text: "Live integrations across leading operators and aggregators, ready the day you go live." },
    { title: "Infrastructure as code", text: "Spin up a new environment in half an hour. No manual builds, no drama." },
    { title: "A modern stack", text: "No legacy weight and no technical debt dragging the platform down." },
    { title: "Regulated and ready", text: "UK & MGA licenced and live across major regulated markets, with per-licence config profiles." },
];

export const GAP_ROUTES = [
    {
        tag: "RGS ↔ RGS",
        title: "You already have an RGS",
        text: "Integrate your existing RGS to the platform once, and we supply your games straight to our operator network. Keep your own server, gain our distribution.",
    },
    {
        tag: "Game → RGS",
        title: "You have games, no RGS",
        text: "Build your games on the Revolver RGS. We host them and distribute them to the operator network for you. One home for content, hosting and reach.",
    },
];

export const GAP_OPERATOR_POINTS = [
    "One integration, hundreds of games — Revolver slots and originals plus every partner studio.",
    "Our own proven slots portfolio included, not third-party content alone.",
    "One contract, one integration, one set of reporting across the lot.",
    "New studios and titles added continuously, with no extra integration your side.",
];

export const BESPOKE_STEPS = [
    { title: "Brief", text: "Your brand, your audience, your market. We agree the theme, the mechanic and the maths targets." },
    { title: "Design & maths", text: "Concept art, sound and a certified maths model built in-house." },
    { title: "Build & certify", text: "HTML5 build on the licensed RGS, tested and certified for your jurisdictions." },
    { title: "Live, exclusively", text: "Launched to your lobby through the platform — and to nobody else's unless you say so." },
];
