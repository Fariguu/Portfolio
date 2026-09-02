/**
 * Restituisce la base URL assoluta del sito, senza trailing slash.
 *
 * Ordine di priorità:
 *  1. NEXT_PUBLIC_SITE_URL (impostata manualmente per production/dominio definitivo)
 *  2. VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL (auto-iniettate da Vercel in preview/production)
 *  3. localhost:3000 (ambiente di sviluppo locale)
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    let url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    if (url && !url.includes('localhost')) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      return url.replace(/\/+$/, '');
    }
  }

  // Dominio ufficiale di produzione per sitemap, robots, metadata e OpenGraph
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return 'https://gabrielefarigu.com';
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const port = process.env.PORT ?? 3000;
  return `http://localhost:${port}`;
}

/**
 * Costruisce un URL assoluto e pulito a partire da un pathname relativo.
 * @example absoluteUrl('/progetti') => 'https://www.gabrielefarigu.it/progetti'
 */
export function absoluteUrl(path: string): string {
  const base = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
