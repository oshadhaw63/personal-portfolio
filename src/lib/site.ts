const FALLBACK_SITE_URL = "https://oshadha-wijayarathne.vercel.app";

/**
 * Canonical site origin.
 *
 * Deployment platforms happily hand you an env var that is defined but empty
 * (an env key added with a blank value), and `??` does not catch that — the
 * empty string reaches `new URL("")` and fails the build. Trim, validate, and
 * fall back on anything that is not a usable absolute URL.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configured) return FALLBACK_SITE_URL;

  try {
    return new URL(configured).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteUrl = getSiteUrl();
