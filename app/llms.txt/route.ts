// llms.txt (https://llmstxt.org): a plain-Markdown map of the site for AI assistants,
// built from the same CMS data and pillar copy as the pages themselves.

import { getContact, listGames, listInsights, listOriginals } from "@/lib/cms";
import { OPERATOR_INTEGRATIONS, PILLARS, THIRD_PARTY_GAMES } from "@/lib/pillars";
import { SITE_DESCRIPTION, SITE_NAME, absolute } from "@/lib/seo";

export const revalidate = 300;

export async function GET() {
    const [games, originals, insights, contact] = await Promise.all([
        listGames(), listOriginals(), listInsights(), getContact(),
    ]);
    const link = (title: string, path: string, note?: string) =>
        `- [${title}](${absolute(path)})${note ? `: ${note}` : ""}`;
    // Sections are separated by a blank line, list items within one by a single newline.
    const body = [
        [`# ${SITE_NAME}`],
        [`> ${SITE_DESCRIPTION}`],
        [`${SITE_NAME} (Lazinco Technologies Limited, London, since 2010; CEO Ryan Lazarus) is both a game studio and a B2B game aggregation platform for casino operators: ${games.length} original games, ${THIRD_PARTY_GAMES} partner-studio games and ${OPERATOR_INTEGRATIONS} operator integrations. Contact: ${contact.email}.`],
        ["## Products", link("About", "/about", "company overview"), ...PILLARS.map((p) => link(p.label, p.href, p.lede))],
        ...(insights.length ? [["## Insights (white papers)", ...insights.map((i) => link(i.title, `/insights/${i.slug}`, i.excerpt ?? undefined))]] : []),
        ["## Games", ...games.map((g) => link(g.title, `/game/${g.slug}`, g.blurb))],
        ["## Originals (provably fair)", ...originals.filter((o) => !o.coming_soon).map((o) => link(o.title, `/originals/${o.slug}`, o.blurb))],
        [
            "## Optional",
            link("News", "/news", "launches, partnerships and announcements"),
            link("Provably fair", "/fairness", "how originals rounds can be verified"),
            link("Careers", "/job"),
        ],
    ].map((section) => section.join("\n")).join("\n\n");
    return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
