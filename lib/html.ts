import sanitizeHtml from "sanitize-html";

// CMS rich text is rendered raw, on the same origin as the admin's session. Strip anything
// executable (scripts, event handlers, javascript: links, iframes) so a hijacked admin
// account or a bad paste can't turn an article into an attack on visitors or other admins.
export const safeHtml = (html: string | null | undefined) =>
    sanitizeHtml(html ?? "", {
        allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
        allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt", "width", "height"] },
        allowedSchemes: ["https", "http", "mailto", "tel"],
        allowedSchemesByTag: { img: ["https"] },
        transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }) },
    });
