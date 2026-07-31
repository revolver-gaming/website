// Static content not yet in the Supabase CMS (see lib/cms.ts for news + games).

// Third-party studios distributed through the Game Aggregation Platform.
export type PartnerStudio = {
    name: string;
    knownFor: string;
    genre: string;
};

export const partnerStudios: PartnerStudio[] = [
    { name: "Spribe", knownFor: "Aviator", genre: "Crash Games" },
    { name: "KA Gaming", knownFor: "600+ Titles", genre: "Video Slots" },
];

// Operator platforms and aggregators connected to GAP.
export const operators = [
    "BetConstruct", "EveryMatrix", "Pariplay", "Relax Gaming",
    "Groove", "Digitain", "Hollywoodbets", "Oryx",
    "Playtech", "Slotegrator", "GR8 Tech", "UPlatform",
    "Blaze Gaming", "iGP", "Reelsoft", "Tapking",
];

export const contact = {
    email: "hello@revolvergaming.com",
    phone: "+44 793 927 0154",
    address: ["3rd Floor, 207 Regent Street", "London, W1B 3HH", "United Kingdom"],
    license: "© 2010–2026 Lazinco Technologies Limited. Licensed and regulated by the UK Gambling Commission. Licence # 000-039989-R-320008-001",
};
