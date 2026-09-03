import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  Sparkles,
  Layers,
  GraduationCap,
  FolderGit2,
  ExternalLink,
  LogOut,
  LayoutDashboard,
} from 'lucide-react'
import { signOutAction } from '@/app/admin/actions/auth'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Gabriele Farigu',
  robots: {
    index: false,
    follow: false,
  },
}


interface AdminLayoutProps {
  readonly children: React.ReactNode
}

export default async function AdminLayout({
  children,
}: Readonly<AdminLayoutProps>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col font-sans">
      {user && (
        <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
            {/* Logo / Title */}
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="flex items-center gap-2 font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span>Portfolio Admin</span>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" /> Overview
                </Link>
                <Link
                  href="/admin/skills"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Layers className="h-4 w-4" /> Competenze
                </Link>
                <Link
                  href="/admin/journey"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <GraduationCap className="h-4 w-4" /> Percorso
                </Link>
                <Link
                  href="/admin/projects"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <FolderGit2 className="h-4 w-4" /> Progetti
                </Link>
              </nav>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5" asChild>
                <Link href="/" target="_blank">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Vedi Sito</span>
                </Link>
              </Button>

              <div className="hidden lg:block text-xs text-muted-foreground border-l border-border pl-3">
                {user.email}
              </div>

              <form action={signOutAction}>
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center gap-1.5">
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Esci</span>
                </Button>
              </form>
            </div>
          </div>

          {/* Mobile sub-navigation bar */}
          <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-border/40 gap-2 text-xs font-medium scrollbar-none">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-md bg-secondary/60 text-foreground whitespace-nowrap"
            >
              Overview
            </Link>
            <Link
              href="/admin/skills"
              className="px-3 py-1.5 rounded-md bg-secondary/60 text-foreground whitespace-nowrap"
            >
              Competenze
            </Link>
            <Link
              href="/admin/journey"
              className="px-3 py-1.5 rounded-md bg-secondary/60 text-foreground whitespace-nowrap"
            >
              Percorso
            </Link>
            <Link
              href="/admin/projects"
              className="px-3 py-1.5 rounded-md bg-secondary/60 text-foreground whitespace-nowrap"
            >
              Progetti
            </Link>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-md bg-secondary/60 text-foreground whitespace-nowrap flex items-center gap-1"
            >
              Sito <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </header>
      )}

      <main className="flex-1">{children}</main>
    </div>
  )
}
