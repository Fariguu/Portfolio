import { createClient } from '@/lib/supabase/server'

export interface AuthCheckResult {
  authorized: boolean
  error?: string
  userEmail?: string
}

/**
 * Verifica che la richiesta provenga da un utente autenticato
 * e autorizzato con l'email configurata in ADMIN_EMAIL.
 */
export async function verifyAdminSession(): Promise<AuthCheckResult> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        authorized: false,
        error: 'Non autorizzato: sessione non valida o utente non autenticato.',
      }
    }

    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail && user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      return {
        authorized: false,
        error: 'Accesso negato: account non autorizzato per operazioni amministrative.',
      }
    }

    return {
      authorized: true,
      userEmail: user.email,
    }
  } catch (err: any) {
    return {
      authorized: false,
      error: err.message || 'Errore durante la verifica della sessione amministrativa.',
    }
  }
}
