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
};

export type GameDetail = Game & {
    description_html: string | null;
    features: string[];
    screenshots: string[];
    product_sheet: string | null;
    video_url: string | null;
};

const GAME_FIELDS = "slug, title, blurb, image:card_image, year, tags, featured, demo_url";

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
        .select(`${GAME_FIELDS}, description_html, features, screenshots, product_sheet, video_url`)
        .eq("slug", slug)
        .maybeSingle();
    if (error) throw error;
    return data as unknown as GameDetail | null;
}

export type ProviderGame = {
    id: string;
    provider: string;
    slug: string;
    title: string;
    image: string;
    demo_url: string | null;
    tags: string[];
};

export async function listProviderGames(): Promise<ProviderGame[]> {
    const { data, error } = await supabase
        .from("provider_games")
        .select("id, provider, slug, title, image:card_image, demo_url, tags")
        .order("sort_order");
    if (error) throw error;
    return data as unknown as ProviderGame[];
}

export type Contact = {
    email: string;
    phone: string;
    address: string[];
    license: string;
    license_url: string;
};

export type LinkItem = { label: string; url: string };

export type PartnerStudio = { name: string; knownFor: string; genre: string };

async function content<T>(key: string): Promise<T> {
    const { data, error } = await supabase.from("site_content").select("value").eq("key", key).single();
    if (error) throw error;
    return data.value as T;
}

export const getContact = () => content<Contact>("contact");
export const getSocials = () => content<LinkItem[]>("socials");
export const getFooterLinks = () => content<LinkItem[]>("footer_links");

export async function listPartnerStudios(): Promise<PartnerStudio[]> {
    const { data, error } = await supabase
        .from("partner_studios")
        .select("name, knownFor:known_for, genre")
        .order("sort_order");
    if (error) throw error;
    return data;
}

export async function listOperators(): Promise<string[]> {
    const { data, error } = await supabase.from("operators").select("name").order("sort_order");
    if (error) throw error;
    return data.map((o) => o.name);
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
