// Content layer. Shapes mirror the future Supabase tables (games, providers,
// operators, news) so swapping this file for CMS queries is a drop-in change.

export type Game = {
    slug: string;
    title: string;
    blurb: string;
    image: string;
    year: number;
    tags: string[];
    featured?: boolean;
};

export const games: Game[] = [
    {
        slug: "draculatte-7s",
        title: "Draculatte 7s",
        blurb: "Enter Dracula's enchanted midnight café — a deliciously dark slot packed with gothic charm. Trigger Barista Features, uncover the Blood Latte bonus, unlock Midnight Brew free games and land Dracula himself for a top prize worth up to 2,000x.",
        image: "/games/draculatte-7s.webp",
        year: 2026,
        tags: ["Free Games", "2,000x Top Win"],
        featured: true,
    },
    {
        slug: "harley-surprize",
        title: "Harley SurPrize",
        blurb: "Harley's trading the nightclub for the funfair — and she's brought the big prizes along. A 3×3 slot where stacked symbols trigger respins and every diamond lands a Bonus Wheel spin worth up to 1,000x your bet.",
        image: "/games/harley-surprize.webp",
        year: 2026,
        tags: ["Bonus Wheel", "1,000x"],
        featured: true,
    },
    {
        slug: "trophy-spins-world-cup-26",
        title: "Trophy Spins — World Cup 26",
        blurb: "A football-fuelled 3×3 slot where every spin could be a winner. Lock in Lucky symbols for re-spins and double pays, then hit the Baller Bonus pick-and-win for tournament-sized rewards.",
        image: "/games/trophy-spins-world-cup-26.webp",
        year: 2026,
        tags: ["Re-Spins", "Picker Bonus"],
        featured: true,
    },
    {
        slug: "harley-quickwin",
        title: "Harley QuickWin",
        blurb: "An electrifying 3×5 slot of neon lights and carnival thrills. Collect Harley symbols for QuickWin prizes up to 750x, spin the Bonus Wheel for 1,500x chances, and boost Free Spins with QuickWin Boosters.",
        image: "/games/harley-quickwin.webp",
        year: 2026,
        tags: ["QuickWin Boosters", "1,500x"],
        featured: true,
    },
    {
        slug: "cleos-coins-fashion-tv",
        title: "Cleo's Coins — FashionTV",
        blurb: "A Revolver Gaming × FashionTV collaboration. A high-volatility, 5-reel, 20-line Egyptian luxury slot with Random Stacks on every spin, Random Multipliers, re-triggering Free Spins and a colossal Progressive Jackpot.",
        image: "/games/cleos-coins-fashion-tv.webp",
        year: 2025,
        tags: ["Brand Collab", "Progressive Jackpot"],
        featured: true,
    },
    {
        slug: "irish-coins-hold-win",
        title: "Irish Coins Hold & Win",
        blurb: "Follow the rainbow to five pots brimming with fortune. The explosive Hold & Win bonus brings multipliers up to 500x — fill all 15 positions to claim the 2,000x Jackpot prize.",
        image: "/games/irish-coins-hold-win.webp",
        year: 2025,
        tags: ["Hold & Win", "2,000x Jackpot"],
        featured: true,
    },
    {
        slug: "irish-coins-hold-win-christmas",
        title: "Irish Coins Hold & Win — Christmas",
        blurb: "A snowy Irish village, five festive pots and the game-changing Hold & Win bonus with multipliers up to 500x. Fill all 15 positions for the 2,000x Jackpot.",
        image: "/games/irish-coins-hold-win-christmas.webp",
        year: 2025,
        tags: ["Hold & Win", "Seasonal"],
    },
    {
        slug: "pyramid-of-ra",
        title: "Pyramid of Ra",
        blurb: "The industry's first triangular reels: a 16–64 expanding pyramid grid where symbols flip into cluster wins. Chain re-flips, unlock Random and Bursting Wilds, and score multipliers up to 5,000x.",
        image: "/games/pyramid-of-ra.webp",
        year: 2025,
        tags: ["Cluster Wins", "5,000x"],
    },
    {
        slug: "lotto-lucky-easter",
        title: "Lotto Lucky Easter",
        blurb: "An egg-ceptional springtime spin on Lotto Lucky — unique 9-spot reels with a lock-and-respin feature and a Lotto Bonus awarding big wins.",
        image: "/games/lotto-lucky-easter.webp",
        year: 2024,
        tags: ["Lock & Respin", "Seasonal"],
    },
    {
        slug: "robin-hood-valentine",
        title: "Robin Hood Valentine",
        blurb: "A romantic twist on 'Robin Hood and his Merry Wins' — Expanding Wilds, Stacked Wilds, Free Spins and a multi-levelled Picker Bonus on a heart-warming quest for Maid Marian.",
        image: "/games/robin-hood-valentine.webp",
        year: 2024,
        tags: ["Expanding Wilds", "Seasonal"],
    },
    {
        slug: "irish-coins-christmas",
        title: "Irish Coins Christmas",
        blurb: "High-volatility, 5-reel, 20-line Luck of the Irish with a Christmas infusion — Random Stacks every spin, Random Multipliers, re-triggering Free Spins and a massive Progressive Jackpot.",
        image: "/games/irish-coins-christmas.webp",
        year: 2024,
        tags: ["Progressive Jackpot", "Seasonal"],
    },
    {
        slug: "badlands",
        title: "Badlands",
        blurb: "A medium-volatility 4×6, 40-line bison-themed slot featuring the unique Wild Side expanding wild, a multi-level bonus accumulation meter and Free Spins with a Sticky Wild Reel.",
        image: "/games/badlands.webp",
        year: 2023,
        tags: ["Wild Side", "Free Spins"],
    },
    {
        slug: "rainbow-stacks",
        title: "Rainbow Stacks",
        blurb: "A medium-volatility 3×5, 25-line Luck of the Irish slot with a Re-Spin bonus, Multipliers, four massive Jackpot prizes and a re-triggering Free Spins bonus.",
        image: "/games/rainbow-stacks.webp",
        year: 2022,
        tags: ["4 Jackpots", "Re-Spins"],
    },
    {
        slug: "deadly-outlaw",
        title: "Deadly Outlaw",
        blurb: "A high-volatility 3×5, 30-line Wild Western slot with Sticky Wilds, re-triggering Free Spins and a Match-3 Picker Bonus — or buy your way straight into any bonus.",
        image: "/games/deadly-outlaw.jpg",
        year: 2022,
        tags: ["Bonus Buy", "Sticky Wilds"],
    },
    {
        slug: "288",
        title: "288",
        blurb: "Our high-volatility Chinese Lucky 8 slot with 288 Ways to Win — a Free Spins bonus with high-symbol-only pays that compliments the core Stack Add feature.",
        image: "/games/288.jpg",
        year: 2022,
        tags: ["288 Ways", "Stack Add"],
    },
    {
        slug: "gumball-7s",
        title: "Gumball 7's",
        blurb: "A medium-volatility 50s American Diner slot with Random Stacks, Expanding Wilds, Expanding Reels, Random Multipliers up to 77x, feature-loaded Free Games and a Bonus Buy.",
        image: "/games/gumball-7s.jpg",
        year: 2021,
        tags: ["Bonus Buy", "77x Multipliers"],
    },
    {
        slug: "thor-of-asgard",
        title: "Thor of Asgard",
        blurb: "Join the God of Thunder in a highly volatile 1024-ways game — 5×4 cascading symbols with increasing multipliers, three Asgard-shattering Powers and three progressive jackpots.",
        image: "/games/thor-of-asgard.jpg",
        year: 2021,
        tags: ["Cascades", "3 Jackpots"],
    },
    {
        slug: "neon-blaze",
        title: "Neon Blaze",
        blurb: "80s neon nostalgia with a modern audio-visual edge. Highly volatile, 5-reel, 30-line action with Random Spreading Wilds, Free Spins with Multipliers and a 5-tier Progressive Jackpot.",
        image: "/games/neon-blaze.jpg",
        year: 2020,
        tags: ["5-Tier Jackpot", "Spreading Wilds"],
    },
    {
        slug: "irish-coins",
        title: "Irish Coins",
        blurb: "The high-volatility original: 5 reels, 20 lines of Luck of the Irish with Random Stacks every spin, Random Multipliers, re-triggering Free Spins and a massive Progressive Jackpot.",
        image: "/games/irish-coins.jpg",
        year: 2020,
        tags: ["Progressive Jackpot"],
    },
    {
        slug: "dragon-coins",
        title: "Dragon Coins",
        blurb: "Ancient far-eastern festivities and the legendary luck of the dragon — high volatility with increased multipliers on every Free Spin and multiple re-triggers for exponential wins.",
        image: "/games/dragon-coins.jpg",
        year: 2019,
        tags: ["Multiplying Free Spins"],
    },
    {
        slug: "squish",
        title: "Squish",
        blurb: "Our juicy cascading slot blending vivid visuals with the vibrant sounds of the Caribbean. Match 4 for more turns, 5 for a super fruit blend bonanza, 6 for a bunch of free cascades.",
        image: "/games/squish.jpg",
        year: 2019,
        tags: ["Cascades"],
    },
    {
        slug: "reign-of-gnomes",
        title: "Reign of Gnomes",
        blurb: "An epic medieval fantasy slot centred on a magical kingdom of gnomes — a multi-featured bonus wheel triggers on every spin during Free Spins for massive riches.",
        image: "/games/reign-of-gnomes.jpg",
        year: 2018,
        tags: ["Bonus Wheel"],
    },
    {
        slug: "parrots-of-the-caribbean",
        title: "Parrots of the Caribbean",
        blurb: "A colourful, quirky pirate slot inspired by 3D animated films — a thrilling Free Spins bonus with Sticky Wilds and a highly entertaining treasure hunt.",
        image: "/games/parrots-of-the-caribbean.jpg",
        year: 2018,
        tags: ["Sticky Wilds"],
    },
    {
        slug: "wishes",
        title: "Wishes",
        blurb: "A classic Arabian-themed slot through the sands of time — unlock the Genie's bonus reel and play six big bonus features.",
        image: "/games/wishes.jpg",
        year: 2017,
        tags: ["6 Bonus Features"],
    },
    {
        slug: "goodfishes",
        title: "GoodFishes",
        blurb: "A video-slot parody of the most famous gangster film of the 90s — Clumping Wilds and a bonus event awarding one of six different Free Spins games.",
        image: "/games/goodfishes.jpg",
        year: 2015,
        tags: ["Clumping Wilds"],
    },
    {
        slug: "lotto-lucky",
        title: "Lotto Lucky",
        blurb: "A charm-packed 3×3 slot where each spin reveals a Lucky symbol — land 3+ to lock re-spins and double pays, and pick from a drum of lottery balls in the 2nd-screen bonus.",
        image: "/games/lotto-lucky.jpg",
        year: 2014,
        tags: ["Lock & Respin"],
    },
    {
        slug: "robin-hood-and-his-merry-wins",
        title: "Robin Hood and his Merry Wins",
        blurb: "A charming, stylish 3D slot full of humour and adventure — Expanding Wilds, Stacked Wilds, Free Spins and a 2nd-screen Bonus Game.",
        image: "/games/robin-hood-and-his-merry-wins.jpg",
        year: 2014,
        tags: ["3D Slot"],
    },
    {
        slug: "the-big-deal",
        title: "The Big Deal",
        blurb: "A 3D slot with a thrilling game-show theme — Clumping Wilds, Free Spins and three different 2nd-screen bonus games.",
        image: "/games/the-big-deal.jpg",
        year: 2014,
        tags: ["3 Bonus Games"],
    },
    {
        slug: "space-traders",
        title: "Space Traders",
        blurb: "A highly entertaining 3D slot with a quirky cosmic theme — a unique 9-spot reel format with a lucky lock-and-respin feature and a cool 2nd-screen bonus event.",
        image: "/games/space-traders.jpg",
        year: 2014,
        tags: ["9-Spot Reels"],
    },
    {
        slug: "multiplier-man",
        title: "Multiplier Man",
        blurb: "A superhero slot in the tradition of the great 1940s comic heroes — X-ray vision bonus event, a fantastic Free Spins round and a big-win hi-lo bonus game.",
        image: "/games/multiplier-man.jpg",
        year: 2014,
        tags: ["Hi-Lo Bonus"],
    },
    {
        slug: "pets-pay-day",
        title: "Pets Payday",
        blurb: "A cute, fun and charming slot inspired by the animals we love — entertaining bonus games with instant cash prizes and Free Spins with Stacked Wilds and Random Multipliers.",
        image: "/games/pets-pay-day.jpg",
        year: 2014,
        tags: ["Stacked Wilds"],
    },
];

export const featuredGames = games.filter((g) => g.featured);

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

export type NewsItem = {
    slug: string;
    date: string;
    title: string;
};

export const news: NewsItem[] = [
    {
        slug: "revolver-gaming-launches-harley-surprize",
        date: "30 June 2026",
        title: "Revolver Gaming launches Harley SurPrize featuring a Bonus Wheel with multipliers up to 1,000x",
    },
    {
        slug: "revolver-gaming-kicks-off-the-football-fever-with-trophy-spins",
        date: "8 June 2026",
        title: "Revolver Gaming kicks off the football fever with Trophy Spins",
    },
    {
        slug: "revolver-gaming-launches-harley-quickwin",
        date: "24 March 2026",
        title: "Revolver Gaming launches Harley QuickWin featuring QuickWin Boosters for enhanced free spins performance",
    },
    {
        slug: "revolver-gaming-unveils-cleos-coins-fashiontv",
        date: "17 February 2026",
        title: "Revolver Gaming unveils Cleo's Coins FashionTV in luxury brand partnership",
    },
    {
        slug: "revolver-gaming-launches-irish-coins-hold-win-christmas",
        date: "17 December 2025",
        title: "Revolver Gaming launches Irish Coins Hold & Win Christmas",
    },
    {
        slug: "revolver-gaming-unveils-pyramid-of-ra",
        date: "3 September 2025",
        title: "Revolver Gaming unveils Pyramid of Ra — a groundbreaking slot with the industry's first triangular reels",
    },
];

export const contact = {
    email: "hello@revolvergaming.com",
    phone: "+44 793 927 0154",
    address: ["3rd Floor, 207 Regent Street", "London, W1B 3HH", "United Kingdom"],
    license: "© 2010–2026 Lazinco Technologies Limited. Licensed and regulated by the UK Gambling Commission. Licence # 000-039989-R-320008-001",
};
