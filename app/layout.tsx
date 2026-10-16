import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import "./globals.css";

const display = Big_Shoulders({
    subsets: ["latin"],
    weight: ["500", "700", "800", "900"],
    variable: "--font-display",
});

const body = Instrument_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body",
});

const mono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "Revolver Gaming — One integration. 300+ games.",
    description: SITE_DESCRIPTION,
    icons: { icon: "/brand/favicon.png" },
};

export const viewport: Viewport = {
    themeColor: "#1f0e1f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
            <body>{children}</body>
        </html>
    );
}


