import { createClient } from "@supabase/supabase-js";

// Browser client for the admin: keeps the login session, no fetch caching.
export const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
);

import { slugify } from "@/lib/slug";
export { slugify };

export async function uploadMedia(folder: string, file: File): Promise<string> {
    const ext = file.name.split(".").pop()!.toLowerCase();
    const path = `${folder}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;
    const { error } = await sb.storage.from("media").upload(path, file, { cacheControl: "31536000" });
    if (error) throw error;
    return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}

// Logos must have a transparent background (the site recolours them). SVGs pass through;
// PNG/WebP get their transparent padding trimmed so the scale slider sizes the mark itself.
export async function prepareLogo(file: File): Promise<{ file: File; warning: string }> {
    if (file.type === "image/svg+xml") return { file, warning: "" };
    if (!["image/png", "image/webp"].includes(file.type))
        throw new Error("Logos need a transparent background — upload an SVG or a transparent PNG/WebP, not JPG.");

    const img = await createImageBitmap(file);
    const canvas = Object.assign(document.createElement("canvas"), { width: img.width, height: img.height });
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, img.width, img.height);
    const alpha = (x: number, y: number) => data[(y * width + x) * 4 + 3];

    const opaqueCorners = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]]
        .every(([x, y]) => alpha(x, y) > 200);
    const warning = opaqueCorners
        ? "This image has a solid background — it will show as a block. Remove the background first."
        : "";

    let [left, top, right, bottom] = [width, height, -1, -1];
    for (let y = 0; y < height; y++)
        for (let x = 0; x < width; x++)
            if (alpha(x, y) > 8) {
                left = Math.min(left, x); right = Math.max(right, x);
                top = Math.min(top, y); bottom = Math.max(bottom, y);
            }
    if (right < 0 || opaqueCorners) return { file, warning };

    const trimmed = Object.assign(document.createElement("canvas"), { width: right - left + 1, height: bottom - top + 1 });
    trimmed.getContext("2d")!.drawImage(canvas, -left, -top);
    const blob = await new Promise<Blob>((resolve) => trimmed.toBlob((b) => resolve(b!), "image/png"));
    return { file: new File([blob], file.name.replace(/\.[^.]+$/, ".png"), { type: "image/png" }), warning };
}

export const errMsg =(e: unknown) => (e instanceof Error ? e.message : String(e));
