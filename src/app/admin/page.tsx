import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import {
  Layers,
  GraduationCap,
  FolderGit2,
  Plus,
  ArrowUpRight,
  Eye,
  Star,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = createAdminClient()

  const [
    { data: skills, count: skillsCount },
    { data: journey, count: journeyCount },
    { data: projects, count: projectsCount },
  ] = await Promise.all([
    supabase.from('skills').select('*', { count: 'exact' }),
    supabase.from('journey_items').select('*', { count: 'exact' }),
    supabase.from('projects').select('*', { count: 'exact' }),
  ])

  const totalSkills = skillsCount || skills?.length || 0
  const totalJourney = journeyCount || journey?.length || 0
  const totalProjects = projectsCount || projects?.length || 0

  const visibleProjects = projects?.filter((p) => p.visible).length || 0
  const featuredProjects = projects?.filter((p) => p.featured).length || 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestisci in tempo reale tutti i contenuti e le sezioni del tuo portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/" target="_blank" className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" /> Anteprima Sito
            </Link>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Competenze Card */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Competenze
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Layers className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalSkills}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Tecnologie e metodologie attive
            </p>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <Button size="sm" variant="ghost" className="text-xs h-8 px-2" asChild>
                <Link href="/admin/skills">Gestisci Competenze →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Percorso Formativo Card */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Percorso Formativo
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <GraduationCap className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalJourney}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Tappe, diplomi e traguardi
            </p>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <Button size="sm" variant="ghost" className="text-xs h-8 px-2" asChild>
                <Link href="/admin/journey">Gestisci Percorso →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progetti Card */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Progetti
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FolderGit2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
              <span>{visibleProjects} visibili</span> •{' '}
              <span className="flex items-center text-amber-500 gap-0.5">
                <Star className="h-3 w-3 fill-amber-500" /> {featuredProjects} in evidenza
              </span>
            </p>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <Button size="sm" variant="ghost" className="text-xs h-8 px-2" asChild>
                <Link href="/admin/projects">Gestisci Progetti →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl border border-border/60 bg-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" /> Nuova Competenza
            </h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Aggiungi nuove competenze tecniche o metodologie con l&apos;icona dedicata.
          </p>
          <Button asChild size="sm" className="w-full mt-2">
            <Link href="/admin/skills">
              <Plus className="h-3.5 w-3.5 mr-1" /> Aggiungi Competenza
            </Link>
          </Button>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" /> Nuova Tappa Percorso
            </h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Inserisci studi universitari, certificazioni o esperienze formative.
          </p>
          <Button asChild size="sm" className="w-full mt-2">
            <Link href="/admin/journey">
              <Plus className="h-3.5 w-3.5 mr-1" /> Aggiungi Tappa
            </Link>
          </Button>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-primary" /> Nuovo Progetto
            </h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Carica un nuovo progetto con screenshot, tag tecnologici, link GitHub e demo.
          </p>
          <Button asChild size="sm" className="w-full mt-2">
            <Link href="/admin/projects">
              <Plus className="h-3.5 w-3.5 mr-1" /> Aggiungi Progetto
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
