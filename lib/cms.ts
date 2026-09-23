// Supabase CMS layer. News lives in the `news` table; slugs match the old
// WordPress URLs (/news/{slug}) so previously shared links keep resolving.

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    // Cap Next's data cache at 5 minutes so ISR pages pick up CMS edits.
    { global: { fetch: (url, options) => fetch(url, { ...options, next: { revalidate: 300 } }) } },
);

export type NewsArticle = {
    slug: string;
    title: string;
    excerpt: string | null;
    content_html: string;
    cover_image: string | null;
    published_at: string;
};

export type NewsListItem = Omit<NewsArticle, "content_html">;

export const NEWS_PER_PAGE = 12;

export async function listNewsPage(page: number): Promise<{ items: NewsListItem[]; pages: number }> {
    const from = (page - 1) * NEWS_PER_PAGE;
    const { data, count, error } = await supabase
        .from("news")
        .select("slug, title, excerpt, cover_image, published_at", { count: "exact" })
        .order("published_at", { ascending: false })
        .range(from, from + NEWS_PER_PAGE - 1);
    if (error) throw error;
    return { items: data, pages: Math.max(1, Math.ceil((count ?? 0) / NEWS_PER_PAGE)) };
}

export async function listNews(limit?: number): Promise<NewsListItem[]> {
    let query = supabase
        .from("news")
        .select("slug, title, excerpt, cover_image, published_at")
        .order("published_at", { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function getNews(slug: string): Promise<NewsArticle | null> {
    const { data, error } = await supabase
        .from("news")
        .select("slug, title, excerpt, content_html, cover_image, published_at")
        .eq("slug", slug)
        .maybeSingle();
    if (error) throw error;
    return data;
}

export type Game = {
    slug: string;
    title: string;
    blurb: string;
    image: string;
    year: number;
    tags: string[];
    featured: boolean;
    demo_url: string | null;
    is_new: boolean;
    coming_soon: boolean;
};

export type GameDetail = Game & {
    description_html: string | null;
    features: string[];
    screenshots: string[];
    product_sheet: string | null;
    video_url: string | null;
    rtp: string | null;
    volatility: string | null;
    banner_image: string | null;
    max_win: string | null;
    paylines: string | null;
    bonus_buy: boolean | null;
    languages: string[];
    asset_pack: string | null;
};

const GAME_FIELDS = "slug, title, blurb, image:card_image, year, tags, featured, demo_url, is_new, coming_soon";

export async function listGames(): Promise<Game[]> {
    const { data, error } = await supabase
        .from("games")
        .select(GAME_FIELDS)
        .order("sort_order");
    if (error) throw error;
    return data as unknown as Game[];
}

export async function getGame(slug: string): Promise<GameDetail | null> {
    const { data, error } = await supabase
        .from("games")
        .select(`${GAME_FIELDS}, description_html, features, screenshots, product_sheet, video_url, rtp, volatility, banner_image, max_win, paylines, bonus_buy, languages, asset_pack`)
        .eq("slug", slug)
        .maybeSingle();
    if (error) throw error;
    return data as unknown as GameDetail | null;
}

// Studios quote RTP as a list of certified bands ("90% / 92% / 94% / 96%").
// Operators only care about the span, so collapse it to "90–96%".
export function rtpRange(rtp: string | null): string | null {
    if (!rtp?.includes("%")) return rtp;
    const values = (rtp.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
    if (values.length === 0) return rtp;
    const [low, high] = [Math.min(...values), Math.max(...values)];
    // A single certified figure is quoted as written — "96.10%", not "96.1%".
    return low === high ? rtp : `${low}–${high}%`;
}

export type Original = {
    slug: string;
    title: string;
    category: string;
    blurb: string;
    max_win: string | null;
    rtp: string | null;
    volatility: string | null;
    features: { title: string; text: string }[];
    card_image: string | null;
    hero_image: string | null;
    demo_url: string | null;
    is_new: boolean;
    featured: boolean;
    coming_soon: boolean;
};

export async function listOriginals(): Promise<Original[]> {
    const { data, error } = await supabase
        .from("originals")
        .select("slug, title, category, blurb, max_win, rtp, volatility, features, card_image, hero_image, demo_url, is_new, featured, coming_soon")
        .order("sort_order");
    if (error) throw error;
    return data;
}

export type Contact = {
    email: string;
    address: string[];
    license: string;
    license_url: string;
};

export type LinkItem = { label: string; url: string };

// Logos are transparent SVG/PNG, rendered monochrome by the UI; scale evens out visual weight.
export type Partner = { name: string; logo: string | null; logoScale: number };

export type PartnerStudio = Partner & { knownFor: string; genre: string };

async function content<T>(key: string): Promise<T> {
    const { data, error } = await supabase.from("site_content").select("value").eq("key", key).single();
    if (error) throw error;
    return data.value as T;
}

export type PlatformStat = { value: string; suffix: string; label: string };

export type PlatformFeature = { title: string; text: string; roadmap?: boolean; href?: string };

export type PlatformChapter = {
    kicker: string;
    title: string;
    intro: string;
    features: PlatformFeature[];
};

export const getContact = () => content<Contact>("contact");
export const getSocials = () => content<LinkItem[]>("socials");
export const getFooterLinks = () => content<LinkItem[]>("footer_links");
export const getPlatformStats = () => content<PlatformStat[]>("platform_stats");
export const getPlatformPage = () => content<PlatformChapter[]>("platform_page");
export const getRgsStats = () => content<PlatformStat[]>("rgs_stats");
export const getRgsPage = () => content<PlatformChapter[]>("rgs_page");

export type StudioOffer = {
    kicker: string;
    title: string;
    intro: string;
    cards: { title: string; text: string }[];
    studio_note: { title: string; text: string };
};

export const getStudioOffer = () => content<StudioOffer>("studio_offer");

// Titles mark their amber (<em>) part with *asterisks* — see components/Accent.tsx.
export type HeroSlide = {
    kicker: string;
    title: string;
    lede: string;
    image: string;
    image_alt: string;
    ctas: { label: string; href: string; fire: boolean }[];
};

export type Card = { title: string; text: string };

export type AboutPage = {
    hero_image: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    tags: string[]; // "{games}" becomes the live game count
    offer: { eyebrow: string; title: string; lede: string; cards: Record<string, Card & { cta: string }> };
    principles: { eyebrow: string; title: string; lede: string; items: Card[] };
    cta: { eyebrow: string; title: string; lede: string; label: string };
};

export type ExclusivesPage = { hero_image: string };

export const getHeroSlides = () => content<HeroSlide[]>("hero_slides");
export const getAboutPage = () => content<AboutPage>("about_page");
export const getExclusivesPage = () => content<ExclusivesPage>("exclusives_page");

export async function listPartnerStudios(): Promise<PartnerStudio[]> {
    const { data, error } = await supabase
        .from("partner_studios")
        .select("name, knownFor:known_for, genre, logo, logoScale:logo_scale")
        .order("sort_order");
    if (error) throw error;
    return data;
}

export async function listOperators(): Promise<Partner[]> {
    const { data, error } = await supabase
        .from("operators")
        .select("name, logo, logoScale:logo_scale")
        .order("sort_order");
    if (error) throw error;
    return data;
}

export type Page = { slug: string; title: string; content_html: string };

export type Job = {
    slug: string;
    title: string;
    content_html: string;
    published_at: string;
};

export async function getPage(slug: string): Promise<Page | null> {
    const { data, error } = await supabase
        .from("pages")
        .select("slug, title, content_html")
        .eq("slug", slug)
        .maybeSingle();
    if (error) throw error;
    return data;
}

export async function listPages(): Promise<Pick<Page, "slug">[]> {
    const { data, error } = await supabase.from("pages").select("slug");
    if (error) throw error;
    return data;
}

export async function listJobs(): Promise<Job[]> {
    const { data, error } = await supabase
        .from("jobs")
        .select("slug, title, content_html, published_at")
        .order("published_at", { ascending: false });
    if (error) throw error;
    return data;
}

export async function getJob(slug: string): Promise<Job | null> {
    const { data, error } = await supabase
        .from("jobs")
        .select("slug, title, content_html, published_at")
        .eq("slug", slug)
        .maybeSingle();
    if (error) throw error;
    return data;
}

export const newsDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const newsDateShort = (iso: string) =>
    new Date(iso)
        .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
        .toUpperCase();
