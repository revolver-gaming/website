// Supabase media goes out through Vercel's image optimizer: resized, re-encoded to WebP and cached
// on Vercel's CDN, so the bucket serves each file once instead of once per visitor (its egress is
// capped). SVGs stay direct, keeping the optimizer to raster images only (they're small and need no
// resizing anyway); local /public paths pass through untouched. `width` must be one of Next's image sizes.
export const media = (src: string | null | undefined, width: number) =>
    !src ? undefined
    : src.startsWith("http") && !src.endsWith(".svg") ? `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`
    : src;
