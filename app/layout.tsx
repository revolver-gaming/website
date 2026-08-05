import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
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
    metadataBase: new URL("https://revolvergaming.com"),
    title: "Revolver Gaming — One integration. 300+ games.",
    description:
        "London-based slot studio and game aggregation platform. Original HTML5 slots, partner studios and a UKGC-licensed engine — live in your lobby the same day.",
    icons: { icon: "/brand/favicon.png" },
};

export const viewport: Viewport = {
    themeColor: "#190c1b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
            <body>{children}</body>
        </html>
    );
}
