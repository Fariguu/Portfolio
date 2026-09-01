import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const pathname = request.nextUrl.pathname

  // Proteggi solo le route sotto /admin
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/auth/callback'

  // Non intervenire se non è una route admin
  if (!isAdminRoute) {
    return supabaseResponse
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Se le variabili non sono impostate, lascia passare o fai gestire alla pagina
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Se l''utente prova ad accedere a una pagina protetta /admin/* senza essere autenticato
  if (isAdminRoute && !isLoginPage && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Se l''utente è già loggato e va su /admin/login, reindirizza alla dashboard
  if (isLoginPage && user && pathname === '/admin/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  // Controllo autorizzazione email se ADMIN_EMAIL è definita
  const adminEmail = process.env.ADMIN_EMAIL
  if (isAdminRoute && !isLoginPage && user && adminEmail) {
    if (user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      // Utente loggato ma non è l''admin autorizzato
      const url = request.nextUrl.clone()
      url.pathname = '/admin/unauthorized'
      return NextResponse.rewrite(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
