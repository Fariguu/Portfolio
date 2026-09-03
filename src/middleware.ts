import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // =========================================================================
  // 1. Gestione Route Admin (Supabase Authentication)
  // =========================================================================
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage =
    pathname === "/admin/login" || pathname === "/admin/auth/callback";

  if (isAdminRoute) {
    let supabaseResponse = NextResponse.next({
      request,
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return supabaseResponse;
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Se l'utente prova ad accedere a una pagina protetta /admin/* senza essere autenticato
    if (isAdminRoute && !isLoginPage && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    // Se l'utente è già loggato e va su /admin/login, reindirizza alla dashboard
    if (isLoginPage && user && pathname === "/admin/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    // Controllo autorizzazione email se ADMIN_EMAIL è definita
    const adminEmail = process.env.ADMIN_EMAIL;
    if (isAdminRoute && !isLoginPage && user && adminEmail) {
      if (user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/unauthorized";
        return NextResponse.rewrite(url);
      }
    }

    return supabaseResponse;
  }

  // =========================================================================
  // 2. Routing Multilingua & Multilingual SEO
  // =========================================================================
  const requestHeaders = new Headers(request.headers);

  // A. Percorso in lingua inglese (/en o /en/...)
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    requestHeaders.set("x-locale", "en");
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // B. Redirect canonico 301 per eventuali chiamate a /it o /it/...
  if (pathname === "/it" || pathname.startsWith("/it/")) {
    const cleanPath = pathname.replace(/^\/it/, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = cleanPath;
    return NextResponse.redirect(url, { status: 301 });
  }

  // C. Verifica preferenza salvata nei cookie (solo su richieste GET)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (request.method === "GET" && cookieLocale === "en") {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      return NextResponse.redirect(url, { status: 307 });
    }
  }

  // D. Percorsi predefiniti in lingua italiana (/ o /privacy): rewrite interno su [locale=it]
  if (pathname === "/" || pathname === "/privacy") {
    requestHeaders.set("x-locale", "it");
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = `/it${pathname === "/" ? "" : pathname}`;

    return NextResponse.rewrite(targetUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Intercetta tutte le route tranne:
     * - _next/static, _next/image (risorse statiche Next.js)
     * - favicon.ico, immagini social, icone
     * - robots.txt, sitemap.xml, manifest.webmanifest
     */
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|twitter-image|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
