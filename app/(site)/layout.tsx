import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AgeGate from "@/components/AgeGate";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav />
            {children}
            <Footer />
            <Reveal />
            <AgeGate />
        </>
    );
}
