// Machine-readable identity of the site: one canonical name, description and
// set of profiles, reused by the metadata, the Schema.org graph and llms.txt so
// search engines and AI assistants see Revolver as a single entity.

import type { Contact, LinkItem } from "@/lib/cms";

export const SITE_URL = "https://revolvergaming.com";

export const SITE_NAME = "Revolver Gaming";

export const SITE_DESCRIPTION =
    "London-based games studio and game aggregation platform. Original HTML5 games, partner studios and a UK & MGA licensed engine — live in your lobby the same day.";

const ORG_ID = `${SITE_URL}/#organization`;
const CEO_ID = `${SITE_URL}/#ryan-lazarus`;

export const publisher = { "@id": ORG_ID };

export const absolute = (path: string) => new URL(path, SITE_URL).toString();

export function organizationGraph(contact: Contact, socials: LinkItem[]) {
    // The CMS address reads ["3rd Floor, 207 Regent Street", "London, W1B 3HH", "United Kingdom"].
    const [street, cityLine = ""] = contact.address;
    const [locality, postalCode] = cityLine.split(", ");
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": ORG_ID,
                name: SITE_NAME,
                legalName: "Lazinco Technologies Limited",
                url: SITE_URL,
                logo: absolute("/brand/logo-vertical-purple.svg"),
                description: SITE_DESCRIPTION,
                foundingDate: "2010",
                email: contact.email,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: street,
                    addressLocality: locality,
                    postalCode,
                    addressCountry: "GB",
                },
                employee: { "@id": CEO_ID },
                knowsAbout: [
                    "Online slot games", "Remote Gaming Server (RGS)", "Casino game aggregation",
                    "Provably fair casual games", "Branded and exclusive casino games",
                ],
                sameAs: socials.map((s) => s.url),
            },
            {
                "@type": "Person",
                "@id": CEO_ID,
                name: "Ryan Lazarus",
                jobTitle: "CEO",
                worksFor: publisher,
                sameAs: ["https://www.linkedin.com/in/ryanlazarus/"],
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                publisher,
            },
        ],
    };
}
