import type { Metadata, Viewport } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const body = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-body",
    display: "swap",
});

const mono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://revolvergaming.com"),
    title: "Revolver Gaming — The studio that became the platform",
    description:
        "London-based games software provider since 2010. Licensable original slots, brandable originals, RGS licensing and a game aggregation platform — UKGC licensed.",
    icons: { icon: "/brand/favicon.png" },
    openGraph: { siteName: "Revolver Gaming", type: "website" },
};

export const viewport: Viewport = {
    themeColor: "#24102b",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${body.variable} ${mono.variable}`}>
            <body>{children}</body>
        </html>
    );
}
