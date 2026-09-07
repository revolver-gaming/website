import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import "./globals.css";

const display = Archivo({
    subsets: ["latin"],
    weight: ["600", "700"],
    style: ["normal", "italic"],
    variable: "--font-display",
});

const body = Figtree({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://revolvergaming.com"),
    title: "Revolver Gaming — The studio that became the platform",
    description:
        "London-based slot studio and game aggregation platform. Licensable original slots, brandable originals, a UKGC-licensed RGS and one integration to a whole operator network.",
    icons: { icon: "/brand/favicon.png" },
    openGraph: {
        siteName: "Revolver Gaming",
        type: "website",
        locale: "en_GB",
    },
};

export const viewport: Viewport = {
    themeColor: "#faf8f4",
    colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${display.variable} ${body.variable}`}>
            <body>{children}</body>
        </html>
    );
}
