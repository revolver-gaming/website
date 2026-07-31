// Supabase CMS layer. News lives in the `news` table; slugs match the old
// WordPress URLs (/news/{slug}) so previously shared links keep resolving.

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
};

export type GameDetail = Game & {
    description_html: string | null;
    features: string[];
    screenshots: string[];
    product_sheet: string | null;
    demo_url: string | null;
    video_url: string | null;
};

const GAME_FIELDS = "slug, title, blurb, image:card_image, year, tags, featured";

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
        .select(`${GAME_FIELDS}, description_html, features, screenshots, product_sheet, demo_url, video_url`)
        .eq("slug", slug)
        .maybeSingle();
    if (error) throw error;
    return data as unknown as GameDetail | null;
}

export const newsDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
