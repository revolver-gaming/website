import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AgeGate from "@/components/AgeGate";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { getContact, getSocials } from "@/lib/cms";
import { organizationGraph } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
    const [contact, socials] = await Promise.all([getContact(), getSocials()]);
    return (
        <>
            <JsonLd data={organizationGraph(contact, socials)} />
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
