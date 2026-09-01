import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 border border-border/60 rounded-2xl bg-card shadow-sm">
        <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Accesso Negato</h1>
          <p className="text-sm text-muted-foreground">
            L&apos;account con cui hai effettuato l&apos;accesso non dispone dei permessi di amministratore per questa dashboard.
          </p>
        </div>
        <div className="pt-4 flex flex-col gap-3">
          <Button asChild variant="default">
            <Link href="/">Torna al Portfolio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/login">Accedi con un altro account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
