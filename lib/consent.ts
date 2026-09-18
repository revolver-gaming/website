// First-visit choices (age check, cookies). Kept per browser in localStorage,
// which throws in private mode, so every access is guarded and a failed write
// just means we ask again next visit.

export const AGE_KEY = "rg-age-ok";
export const COOKIE_KEY = "rg-cookie-consent";
export const CONSENT_EVENT = "rg-consent-change";

export const readChoice = (key: string): string | null => {
    try { return localStorage.getItem(key); } catch { return null; }
};

export function saveChoice(key: string, value: string) {
    try { localStorage.setItem(key, value); } catch { /* private mode */ }
    window.dispatchEvent(new Event(CONSENT_EVENT));
}

// Both banners react to each other, so they subscribe to the same event.
export function onConsentChange(handler: () => void) {
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
}
