import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import AdminShell from "./AdminShell";
import "./admin.css";

const mono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Admin — Revolver Gaming",
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`admin-root ${mono.variable}`}>
            <AdminShell>{children}</AdminShell>
        </div>
    );
}
