import type { MetadataRoute } from "next";
import { listGames, listJobs, listNews, listOriginals, listPages } from "@/lib/cms";
import { PILLARS } from "@/lib/pillars";
import { absolute } from "@/lib/seo";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [games, originals, news, jobs, pages] = await Promise.all([
        listGames(), listOriginals(), listNews(), listJobs(), listPages(),
    ]);
    const entry = (path: string, lastModified?: string) => ({ url: absolute(path), lastModified });
    return [
        entry("/"),
        entry("/about"),
        ...PILLARS.map((p) => entry(p.href)),
        entry("/news"),
        entry("/fairness"),
        entry("/job"),
        ...games.map((g) => entry(`/game/${g.slug}`)),
        // coming-soon originals get a card but no page
        ...originals.filter((o) => !o.coming_soon).map((o) => entry(`/originals/${o.slug}`)),
        ...news.map((n) => entry(`/news/${n.slug}`, n.published_at)),
        ...jobs.map((j) => entry(`/job/${j.slug}`, j.published_at)),
        ...pages.map((p) => entry(`/${p.slug}`)),
    ];
}
