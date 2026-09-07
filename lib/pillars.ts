// The site's product pillars — one entry drives the nav, the hero slides,
// and each pillar page's hero copy. Wording is Ryan's (wireframe v7).

export type Pillar = {
    key: string;
    href: string;
    label: string;
    kicker: string;
    title: [string, string]; // [plain, accented]
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
        lede: "A proven, growing portfolio of original slots to license and brand as your own. This is where we started, and what still sets us apart.",
        cta: "See the slots",
    },
    {
        key: "originals",
        href: "/originals",
        label: "Originals",
        kicker: "Originals · expanding",
        title: ["A full lobby,", "fully branded."],
        lede: "Crash, dice, mines and more. Provably fair and RNG, every one brandable to your casino, with new titles landing every month.",
        cta: "See the originals",
    },
    {
        key: "rgs",
        href: "/rgs",
        label: "RGS",
        kicker: "RGS · licensing",
        title: ["Your games on", "our engine."],
        lede: "License the Revolver RGS, independent or fully managed, and plug straight into our distribution network. Games but no server? Sorted.",
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

export const VALUE_PROPS = [
    { title: "Speed to market", text: "We plug in and go live fast. Shorter launch cycles mean more days on the floor earning." },
    { title: "No misfires", text: "We sweat every reel. Polished, reliable and built to hold players, not just fill a lobby." },
    { title: "Modular by design", text: "Configure it your way. Rules, markets and mechanics arrive as settings, not rebuilds." },
    { title: "Scales clean", text: "Cloud-ready and built to take the traffic. New markets, more volume, no wobble." },
];

export const ORIGINALS = [
    { name: "Crash", type: "Multiplayer" },
    { name: "Dice", type: "Classic" },
    { name: "Mines", type: "Grid" },
    { name: "Plinko", type: "Drop" },
    { name: "Limbo", type: "Target" },
    { name: "Keno", type: "Numbers" },
    { name: "Wheel", type: "Spin" },
    { name: "Diamonds", type: "Match" },
    { name: "Dragon Tower", type: "Climb" },
    { name: "Punch", type: "Arcade" },
];

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
    { title: "Multiplayer-ready GDK", text: "A fully automated, cloud-based game development kit built for multiplayer from the ground up." },
    { title: "Promo & jackpot tools", text: "End-to-end free spins and jackpots, served in your platform's own bonus dialect." },
    { title: "Built-in distribution", text: "Live integrations across leading operators and aggregators, ready the day you go live." },
    { title: "Infrastructure as code", text: "Spin up a new environment in half an hour. No manual builds, no drama." },
    { title: "A modern stack", text: "No legacy weight and no technical debt dragging the platform down." },
    { title: "Regulated and ready", text: "UKGC licensed and live across major regulated markets, with per-licence config profiles." },
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
    { title: "Design & maths", text: "Concept art, sound and a certified maths model built in-house in London." },
    { title: "Build & certify", text: "HTML5 build on the licensed RGS, tested and certified for your jurisdictions." },
    { title: "Live, exclusively", text: "Launched to your lobby through the platform — and to nobody else's unless you say so." },
];
