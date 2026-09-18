import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AgeGate from "@/components/AgeGate";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav />
            {children}
            <Footer />
            <Reveal />
            <AgeGate />
            <CookieConsent />
            <Analytics />
        </>
    );
}
