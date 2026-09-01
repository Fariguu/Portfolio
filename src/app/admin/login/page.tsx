"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Github, Lock, Mail, ArrowLeft, Loader2, KeyRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleGitHubLogin = async () => {
    try {
      setGithubLoading(true)
      setErrorMsg(null)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/admin/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      setErrorMsg(err.message || 'Errore durante l\'accesso con GitHub')
      setGithubLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMsg('Inserisci sia email che password')
      return
    }

    try {
      setLoading(true)
      setErrorMsg(null)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setErrorMsg(err.message || 'Credenziali non valide')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-25 dark:opacity-15 blur-3xl pointer-events-none">
        <div className="w-[500px] h-[500px] bg-primary rounded-full" />
      </div>

      <div className="w-full max-w-md space-y-8 bg-card p-8 border border-border/60 rounded-2xl shadow-lg relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-2">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Accedi per gestire competenze, percorso e progetti del portfolio
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
            {errorMsg}
          </div>
        )}

        {/* GitHub OAuth Button */}
        <div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 font-semibold flex items-center justify-center gap-2 border-border/80 hover:bg-secondary"
            onClick={handleGitHubLogin}
            disabled={githubLoading || loading}
          >
            {githubLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Github className="h-4 w-4" />
            )}
            Accedi con GitHub
          </Button>
        </div>

        <div className="relative flex items-center justify-center text-xs uppercase text-muted-foreground my-4">
          <div className="border-t border-border w-full" />
          <span className="bg-card px-3">oppure con credenziali</span>
          <div className="border-t border-border w-full" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email
            </label>
            <input
              type="email"
              placeholder="tua-email@esempio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground" /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-medium mt-2"
            disabled={loading || githubLoading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Accedi
          </Button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3 w-3 mr-1" /> Torna al sito principale
          </Link>
        </div>
      </div>
    </div>
  )
}
