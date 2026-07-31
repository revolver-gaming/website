import { createClient } from "@supabase/supabase-js";

// Browser client for the admin: keeps the login session, no fetch caching.
export const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const slugify = (s: string) =>
    s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export async function uploadMedia(folder: string, file: File): Promise<string> {
    const ext = file.name.split(".").pop()!.toLowerCase();
    const path = `${folder}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;
    const { error } = await sb.storage.from("media").upload(path, file, { cacheControl: "31536000" });
    if (error) throw error;
    return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}

export const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));
