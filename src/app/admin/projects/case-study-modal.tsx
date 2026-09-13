"use client"

import { useState } from 'react'
import type { Project } from '@/lib/database.types'
import {
  saveProjectCaseStudy,
  deleteProjectCaseStudy,
  translateCaseStudyMarkdownAction,
} from '@/app/admin/actions/projects'
import { Button } from '@/components/ui/button'
import { MarkdownContent } from '@/components/ui/markdown-content'
import {
  X,
  Loader2,
  Sparkles,
  Eye,
  Edit3,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Quote,
  Minus,
  Trash2,
  Save,
  FileText,
  Globe,
} from 'lucide-react'

interface CaseStudyModalProps {
  readonly project: Project
  readonly onClose: () => void
  readonly onSaved: (updatedProject: Project) => void
  readonly onDeleted: (projectId: string) => void
}

export function CaseStudyModal({
  project,
  onClose,
  onSaved,
  onDeleted,
}: Readonly<CaseStudyModalProps>) {
  const [activeLang, setActiveLang] = useState<'it' | 'en'>('it')
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor')

  // Slug
  const initialSlug =
    project.slug ||
    project.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  const [slug, setSlug] = useState(initialSlug)

  // Markdown content
  const [markdownIt, setMarkdownIt] = useState(project.case_study_md || '')
  const [markdownEn, setMarkdownEn] = useState(project.case_study_md_en || '')

  const [saving, setSaving] = useState(false)
  const [translating, setTranslating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const activeMarkdown = activeLang === 'it' ? markdownIt : markdownEn
  const setActiveMarkdown = (val: string) => {
    if (activeLang === 'it') {
      setMarkdownIt(val)
    } else {
      setMarkdownEn(val)
    }
  }

  // Toolbar action helpers
  const insertFormatting = (prefix: string, suffix = '') => {
    const textarea = document.getElementById('case-study-textarea') as HTMLTextAreaElement | null
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selected = text.substring(start, end)
    const replacement = `${prefix}${selected || 'testo'}${suffix}`

    const newText = text.substring(0, start) + replacement + text.substring(end)
    setActiveMarkdown(newText)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 5))
    }, 10)
  }

  const handleTranslateWithAi = async () => {
    if (!markdownIt.trim()) {
      setErrorMsg('Scrivi prima il contenuto in italiano per poterlo tradurre con AI.')
      return
    }

    setTranslating(true)
    setErrorMsg(null)

    try {
      const response = await fetch('/admin/api/translate-markdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: markdownIt }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        setErrorMsg(
          data?.error || `Errore del server (${response.status}). Riprova o ricarica la pagina.`
        )
        return
      }

      if (data?.translated) {
        setMarkdownEn(data.translated)
        setActiveLang('en')
      } else {
        setErrorMsg('Nessun testo tradotto restituito dal server.')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setErrorMsg(`Errore di connessione: ${msg}. Se hai la schermata aperta da prima del deploy, prova a ricaricare la pagina (F5).`)
    } finally {
      setTranslating(false)
    }
  }

  const handleSave = async () => {
    if (!slug.trim()) {
      setErrorMsg('Lo slug del progetto è obbligatorio per creare il caso di studio.')
      return
    }

    if (!markdownIt.trim()) {
      setErrorMsg('Inserisci almeno la descrizione del caso di studio in italiano.')
      return
    }

    setSaving(true)
    setErrorMsg(null)

    try {
      const res = await saveProjectCaseStudy({
        projectId: project.id,
        slug: slug.trim(),
        caseStudyMd: markdownIt.trim(),
        caseStudyMdEn: markdownEn.trim() || undefined,
      })

      if (res.error) {
        setErrorMsg(res.error)
      } else {
        onSaved({
          ...project,
          slug: res.slug || slug.trim(),
          case_study_md: markdownIt.trim(),
          case_study_md_en: res.caseStudyMdEn || markdownEn.trim() || null,
        })
      }
    } catch {
      setErrorMsg('Errore imprevisto durante il salvataggio')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Sei sicuro di voler eliminare la descrizione del caso di studio? Il pulsante sul sito scomparirà immediatamente.')) {
      return
    }

    setDeleting(true)
    setErrorMsg(null)

    try {
      const res = await deleteProjectCaseStudy(project.id)
      if (res.error) {
        setErrorMsg(res.error)
      } else {
        onDeleted(project.id)
      }
    } catch {
      setErrorMsg('Errore durante l\'eliminazione del caso di studio')
    } finally {
      setDeleting(false)
    }
  }

  const hasExistingCaseStudy = Boolean(project.case_study_md && project.case_study_md.trim().length > 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Caso di Studio Markdown</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                  {project.title}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                La descrizione comparirà su <code className="text-primary font-mono">/progetti/{slug || '[slug]'}</code>. Se presente, la card in homepage mostrerà il pulsante in automatico.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-xl flex items-center justify-between">
              <span>{errorMsg}</span>
              <button
                type="button"
                onClick={() => setErrorMsg(null)}
                className="text-destructive font-bold text-sm ml-2"
              >
                ×
              </button>
            </div>
          )}

          {/* Slug URL configuration */}
          <div className="space-y-1.5 p-3.5 rounded-xl border border-border/80 bg-background/50">
            <div className="flex items-center justify-between">
              <label htmlFor="case_study_slug" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-primary" />
                URL Slug del Progetto
              </label>
              {slug && (
                <span className="text-[11px] text-muted-foreground font-mono">
                  /progetti/{slug}
                </span>
              )}
            </div>
            <input
              id="case_study_slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="es. impresa-edile"
              className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Language Tabs & AI Translation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            {/* Lang Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border/60">
              <button
                type="button"
                onClick={() => setActiveLang('it')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeLang === 'it'
                    ? 'bg-background text-foreground shadow-xs border border-border/60'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Italiano (IT)
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeLang === 'en'
                    ? 'bg-background text-foreground shadow-xs border border-border/60'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                English (EN)
                {markdownEn.trim().length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>
            </div>

            {/* AI Translate & Preview toggle */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleTranslateWithAi}
                disabled={translating || !markdownIt.trim()}
                className="text-xs h-8 text-primary border-primary/30 hover:bg-primary/10 gap-1.5"
              >
                {translating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                )}
                {translating ? 'Traduzione in corso...' : '✨ Traduci Markdown con AI'}
              </Button>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border/60">
                <button
                  type="button"
                  onClick={() => setViewMode('editor')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    viewMode === 'editor'
                      ? 'bg-background text-foreground shadow-xs border border-border/60'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Editor Markdown"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    viewMode === 'preview'
                      ? 'bg-background text-foreground shadow-xs border border-border/60'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Anteprima Live Formattata"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Anteprima</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Markdown Toolbar (visible in editor mode) */}
          {viewMode === 'editor' && (
            <div className="flex flex-wrap items-center gap-1 p-1.5 rounded-lg bg-muted/40 border border-border/60 text-xs">
              <button
                type="button"
                onClick={() => insertFormatting('## ')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Titolo H2 (##)"
              >
                <Heading2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('### ')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Sottotitolo H3 (###)"
              >
                <Heading3 className="h-3.5 w-3.5" />
              </button>
              <span className="w-px h-4 bg-border/60 mx-0.5" />
              <button
                type="button"
                onClick={() => insertFormatting('**', '**')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Grassetto (**)"
              >
                <Bold className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('*', '*')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Corsivo (*)"
              >
                <Italic className="h-3.5 w-3.5" />
              </button>
              <span className="w-px h-4 bg-border/60 mx-0.5" />
              <button
                type="button"
                onClick={() => insertFormatting('- ')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Elenco puntato (-)"
              >
                <List className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('1. ')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Elenco numerato (1.)"
              >
                <ListOrdered className="h-3.5 w-3.5" />
              </button>
              <span className="w-px h-4 bg-border/60 mx-0.5" />
              <button
                type="button"
                onClick={() => insertFormatting('```ts\n', '\n```')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Blocco Codice (```)"
              >
                <Code className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('> ')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Citazione / Callout (>)"
              >
                <Quote className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('\n---\n')}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Separatore (---)"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>

              <span className="ml-auto text-[11px] text-muted-foreground pr-1">
                {activeMarkdown.length} caratteri
              </span>
            </div>
          )}

          {/* Main Area: Editor Textarea or Live Preview */}
          {viewMode === 'editor' ? (
            <textarea
              id="case-study-textarea"
              rows={16}
              value={activeMarkdown}
              onChange={(e) => setActiveMarkdown(e.target.value)}
              placeholder={`## La Genesi del Progetto\n\nSpiega perché è nato il progetto, il contesto di partenza e gli obiettivi...\n\n---\n\n## Sfide Tecniche & Soluzioni Ingegneristiche\n\n### 1. Titolo della Sfida\n- **Problema**: Dettaglio del problema...\n- **Soluzione**: Scelta architetturale o algoritmo adottato...\n- **Impatto**: Risultato misurabile ottenuto...`}
              className="w-full p-4 rounded-xl border border-border bg-zinc-950/40 text-foreground font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[360px]"
            />
          ) : (
            <div className="p-6 rounded-xl border border-border bg-zinc-950/40 min-h-[360px] max-h-[500px] overflow-y-auto">
              {activeMarkdown.trim().length > 0 ? (
                <MarkdownContent content={activeMarkdown} />
              ) : (
                <p className="text-muted-foreground text-sm italic text-center py-12">
                  Nessun contenuto Markdown inserito per la lingua {activeLang === 'it' ? 'italiana' : 'inglese'}. Passa alla modalità Editor per scrivere il testo!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-border flex items-center justify-between bg-muted/20">
          <div>
            {hasExistingCaseStudy && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={deleting || saving}
                className="text-xs text-destructive hover:bg-destructive/10 gap-1.5"
              >
                {deleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                Elimina Caso di Studio
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={saving || deleting}
              className="text-xs"
            >
              Annulla
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={saving || deleting}
              className="text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Salva Caso di Studio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
