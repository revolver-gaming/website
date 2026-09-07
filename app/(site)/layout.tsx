import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <a className="skip" href="#main">Skip to content</a>
            <Nav />
            {children}
            <Footer />
            <Reveal />
        </>
    );
}
