import type { MetadataRoute } from "next";
import { absolute } from "@/lib/seo";

// Every crawler is welcome, AI ones included (GPTBot, ClaudeBot, PerplexityBot…), except in the CMS admin.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: "*", allow: "/", disallow: "/admin" },
        sitemap: absolute("/sitemap.xml"),
    };
}
