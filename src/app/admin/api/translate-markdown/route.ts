import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth-guard'
import { translateMarkdownCaseStudy } from '@/lib/translate'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const authCheck = await verifyAdminSession()
    if (!authCheck.authorized) {
      return NextResponse.json(
        { error: authCheck.error || 'Non autorizzato: sessione admin non valida.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { markdown } = body
    if (!markdown || typeof markdown !== 'string' || !markdown.trim()) {
      return NextResponse.json(
        { error: 'Scrivi prima il contenuto in italiano per poterlo tradurre con AI.' },
        { status: 400 }
      )
    }

    const translated = await translateMarkdownCaseStudy(markdown)
    return NextResponse.json({ success: true, translated })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Errore durante la traduzione del Markdown'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
