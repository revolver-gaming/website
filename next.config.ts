import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // The admin handles logins and password resets: never frameable, never leaks its URL as a referrer.
    async headers() {
        return [
            {
                source: "/admin/:path*",
                headers: [
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
                    { key: "Referrer-Policy", value: "no-referrer" },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                // product-sheet PDFs shared from the old site
                source: "/media/pdf/:file",
                destination:
                    "https://jqsgkwtgtdtssuudtwqe.supabase.co/storage/v1/object/public/media/pdf/:file",
                permanent: true,
            },
            // old-site pages whose content now lives elsewhere
            { source: "/about-us", destination: "/about", permanent: true },
            { source: "/news-archived", destination: "/news", permanent: true },
            // the platform page was renamed when it split into /gap and /rgs
            { source: "/platform", destination: "/gap", permanent: true },
            // the Games pillar lives at /games (its route since the redesign)
            { source: "/slots", destination: "/games", permanent: true },
        ];
    },
};

export default nextConfig;
