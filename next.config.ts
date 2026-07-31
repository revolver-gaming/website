import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                // product-sheet PDFs shared from the old site
                source: "/media/pdf/:file",
                destination:
                    "https://jqsgkwtgtdtssuudtwqe.supabase.co/storage/v1/object/public/media/pdf/:file",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
