"use client"

import { useState, useEffect, type SyntheticEvent } from 'react'
import type { Testimonial, Project } from '@/lib/database.types'
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialVisibility,
  translateTestimonialFields,
} from '@/app/admin/actions/testimonials'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MessageSquareQuote,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
  Languages,
  CheckCircle2,
  Star,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TestimonialsManagerProps {
  readonly initialTestimonials: Testimonial[]
  readonly availableProjects?: Project[]
}

type ToastType = 'success' | 'error'

interface ToastState {
  type: ToastType
  message: string
  exiting: boolean
}

export function TestimonialsManager({
  initialTestimonials,
  availableProjects = [],
}: Readonly<TestimonialsManagerProps>) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [translating, setTranslating] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastState | null>(null)

  // Tab lingua modale: "it" | "en"
  const [activeTab, setActiveTab] = useState<'it' | 'en'>('it')

  // Form states
  const [authorName, setAuthorName] = useState('')
  const [roleIt, setRoleIt] = useState('')
  const [roleEn, setRoleEn] = useState('')
  const [quoteIt, setQuoteIt] = useState('')
  const [quoteEn, setQuoteEn] = useState('')
  const [rating, setRating] = useState(5)
  const [dateStr, setDateStr] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [companyLogoUrl, setCompanyLogoUrl] = useState('')
  const [companyUrl, setCompanyUrl] = useState('')
  const [projectSlug, setProjectSlug] = useState('')
  const [sortOrder, setSortOrder] = useState('1')
  const [visible, setVisible] = useState(true)

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ type, message, exiting: false })
  }

  useEffect(() => {
    if (!toast) return

    if (!toast.exiting) {
      const timer = setTimeout(() => {
        setToast((prev) => (prev ? { ...prev, exiting: true } : null))
      }, 3400)
      return () => clearTimeout(timer)
    }

    const cleanupTimer = setTimeout(() => {
      setToast(null)
    }, 350)
    return () => clearTimeout(cleanupTimer)
  }, [toast])

  const dismissToast = () => {
    setToast((prev) => (prev ? { ...prev, exiting: true } : null))
  }

  const openCreateModal = () => {
    const currentMonth = new Date().toLocaleString('it-IT', { month: 'long', year: 'numeric' })
    setEditingItem(null)
    setAuthorName('')
    setRoleIt('')
    setRoleEn('')
    setQuoteIt('')
    setQuoteEn('')
    setRating(5)
    setDateStr(currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1))
    setAvatarUrl('')
    setCompanyLogoUrl('')
    setCompanyUrl('')
    setProjectSlug('')
    setSortOrder((testimonials.length + 1).toString())
    setVisible(true)
    setIsCreating(true)
    setActiveTab('it')
    setErrorMsg(null)
  }

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item)
    setAuthorName(item.author_name)
    setRoleIt(item.role_or_project_it)
    setRoleEn(item.role_or_project_en || '')
    setQuoteIt(item.quote_it)
    setQuoteEn(item.quote_en || '')
    setRating(item.rating || 5)
    setDateStr(item.date)
    setAvatarUrl(item.avatar_url || '')
    setCompanyLogoUrl(item.company_logo_url || '')
    setCompanyUrl(item.company_url || '')
    setProjectSlug(item.project_slug || '')
    setSortOrder(item.sort_order.toString())
    setVisible(item.visible)
    setIsCreating(false)
    setActiveTab('it')
    setErrorMsg(null)
  }

  const closeModal = () => {
    setEditingItem(null)
    setIsCreating(false)
    setErrorMsg(null)
  }

  const handleTranslateAI = async () => {
    if (!roleIt.trim() && !quoteIt.trim()) {
      setErrorMsg('Compila almeno il Ruolo/Commessa o la Recensione in Italiano per avviare la traduzione AI.')
      return
    }

    setTranslating(true)
    setErrorMsg(null)

    const formData = new FormData()
    formData.append('role_or_project_it', roleIt)
    formData.append('quote_it', quoteIt)

    try {
      const res = await translateTestimonialFields(formData)
      if (res.error) {
        setErrorMsg(res.error)
      } else if (res.translation) {
        if (res.translation.role_or_project_en) setRoleEn(res.translation.role_or_project_en)
        if (res.translation.quote_en) setQuoteEn(res.translation.quote_en)
        setActiveTab('en')
        showToast('Campi tradotti con successo con AI! ✨', 'success')
      }
    } catch {
      setErrorMsg('Errore di comunicazione durante la traduzione.')
    } finally {
      setTranslating(false)
    }
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!authorName.trim() || !roleIt.trim() || !quoteIt.trim()) {
      setErrorMsg('Nome Autore, Ruolo/Commessa e Recensione in Italiano sono obbligatori.')
      return
    }

    setLoading(true)
    setErrorMsg(null)

    const formData = new FormData()
    formData.append('author_name', authorName)
    formData.append('role_or_project_it', roleIt)
    formData.append('role_or_project_en', roleEn)
    formData.append('quote_it', quoteIt)
    formData.append('quote_en', quoteEn)
    formData.append('rating', rating.toString())
    formData.append('date', dateStr)
    formData.append('avatar_url', avatarUrl)
    formData.append('company_logo_url', companyLogoUrl)
    formData.append('company_url', companyUrl)
    formData.append('project_slug', projectSlug)
    formData.append('sort_order', sortOrder)
    formData.append('visible', visible ? 'true' : 'false')

    try {
      if (editingItem) {
        const res = await updateTestimonial(editingItem.id, formData)
        if (res.error) {
          setErrorMsg(res.error)
        } else {
          setTestimonials((prev) =>
            prev.map((t) =>
              t.id === editingItem.id
                ? {
                    ...t,
                    author_name: authorName,
                    role_or_project_it: roleIt,
                    role_or_project_en: roleEn || null,
                    quote_it: quoteIt,
                    quote_en: quoteEn || null,
                    rating,
                    date: dateStr,
                    avatar_url: avatarUrl || null,
                    company_logo_url: companyLogoUrl || null,
                    company_url: companyUrl || null,
                    project_slug: projectSlug || null,
                    sort_order: Number.parseInt(sortOrder, 10) || 0,
                    visible,
                  }
                : t
            )
          )
          closeModal()
          showToast('Testimonianza aggiornata con successo! 🎉')
        }
      } else {
        const res = await createTestimonial(formData)
        if (res.error) {
          setErrorMsg(res.error)
        } else {
          // Ricrea stato ottimistico
          const newItem: Testimonial = {
            id: 'temp-' + Date.now(),
            author_name: authorName,
            role_or_project_it: roleIt,
            role_or_project_en: roleEn || null,
            quote_it: quoteIt,
            quote_en: quoteEn || null,
            rating,
            date: dateStr,
            avatar_url: avatarUrl || null,
            company_logo_url: companyLogoUrl || null,
            company_url: companyUrl || null,
            project_slug: projectSlug || null,
            sort_order: Number.parseInt(sortOrder, 10) || 0,
            visible,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
          setTestimonials((prev) => [...prev, newItem])
          closeModal()
          showToast('Nuova testimonianza creata con successo! 🎉')
        }
      }
    } catch {
      setErrorMsg('Errore imprevisto durante il salvataggio.')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
    const nextVisible = !currentVisible
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: nextVisible } : t))
    )
    const res = await toggleTestimonialVisibility(id, nextVisible)
    if (res.error) {
      // rollback
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: currentVisible } : t))
      )
      showToast(res.error, 'error')
    } else {
      showToast(
        nextVisible ? 'Testimonianza ora visibile sul sito' : 'Testimonianza nascosta dal sito'
      )
    }
  }

  const handleDelete = async (id: string, author: string) => {
    if (!confirm(`Sei sicuro di voler eliminare definitivamente la testimonianza di "${author}"?`)) {
      return
    }

    const previous = [...testimonials]
    setTestimonials((prev) => prev.filter((t) => t.id !== id))

    const res = await deleteTestimonial(id)
    if (res.error) {
      setTestimonials(previous)
      showToast(res.error, 'error')
    } else {
      showToast('Testimonianza rimossa con successo')
    }
  }

  const visibleCount = testimonials.filter((t) => t.visible).length

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 transform',
            toast.exiting
              ? 'opacity-0 translate-y-2 scale-95'
              : 'opacity-100 translate-y-0 scale-100',
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-800 text-emerald-100'
              : 'bg-red-950/90 border-red-800 text-red-100'
          )}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={dismissToast}
            className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Chiudi notifica"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background/80 p-6 rounded-2xl border border-border shadow-xs backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <MessageSquareQuote className="h-6 w-6 text-primary" />
              <span>Gestione Testimonianze & Social Proof</span>
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Gestisci recensioni, feedback clienti, votazioni a stelle e dati strutturati Schema.org Review & AggregateRating.
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-secondary font-medium text-foreground">
              Totale: {testimonials.length}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
              Visibili sul sito: {visibleCount}
            </span>
            {visibleCount === 0 && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                Sezione attualmente nascosta in Homepage
              </span>
            )}
          </div>
        </div>

        <Button onClick={openCreateModal} className="shrink-0 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nuova Testimonianza</span>
        </Button>
      </div>

      {/* Lista Testimonianze */}
      {testimonials.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/80 bg-background/40">
          <MessageSquareQuote className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <h2 className="text-lg font-semibold text-foreground">Nessuna testimonianza presente</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            La sezione in Homepage rimarrà completamente nascosta (zero ingombro) finché non aggiungerai almeno una recensione con visibilità attiva.
          </p>
          <Button onClick={openCreateModal} variant="outline" className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Crea la prima recensione
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={cn(
                'relative flex flex-col justify-between p-5 rounded-xl border bg-card/60 backdrop-blur-sm transition-all shadow-xs',
                item.visible ? 'border-border' : 'border-border/40 opacity-70 bg-muted/20'
              )}
            >
              <div>
                {/* Header card */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">
                      {item.author_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                        {item.author_name}
                        {item.company_url && (
                          <a
                            href={item.company_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors inline-block"
                            title="Visita sito / LinkedIn"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </h2>
                      <p className="text-xs text-muted-foreground">{item.role_or_project_it}</p>
                    </div>
                  </div>

                  {/* Rating stelle */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-3.5 w-3.5',
                          i < item.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-muted-foreground/30'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Citazione IT */}
                <div className="mt-3 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/40 italic">
                  &ldquo;{item.quote_it}&rdquo;
                </div>

                {/* Badge EN se tradotto */}
                {item.quote_en ? (
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                    <Languages className="h-3 w-3" /> Traduzione Inglese disponibile
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-500 font-medium">
                    <AlertCircle className="h-3 w-3" /> Manca traduzione Inglese
                  </div>
                )}
              </div>

              {/* Footer card */}
              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>Ordine: #{item.sort_order}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(item.id, item.visible)}
                    className={cn(
                      'p-1.5 rounded-md transition-colors',
                      item.visible
                        ? 'text-emerald-500 hover:bg-emerald-500/10'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                    title={item.visible ? 'Nascondi' : 'Mostra'}
                    aria-label={item.visible ? 'Nascondi' : 'Mostra'}
                  >
                    {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Modifica"
                    aria-label="Modifica"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.author_name)}
                    className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                    title="Elimina"
                    aria-label="Elimina"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODALE DI CREAZIONE / MODIFICA */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquareQuote className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {editingItem ? 'Modifica Testimonianza' : 'Nuova Testimonianza'}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Inserisci i dettagli in Italiano e genera la versione Inglese con AI
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                aria-label="Chiudi modale"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              {errorMsg && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Dati Autore & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Nome Autore / Committente *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Es. Mario Rossi o Nome Azienda"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Valutazione (Stelle 1-5) *
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                        title={`${star} stelle`}
                      >
                        <Star
                          className={cn(
                            'h-5 w-5',
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-muted-foreground/30'
                          )}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-muted-foreground ml-2 font-medium">
                      ({rating}/5 stelle)
                    </span>
                  </div>
                </div>
              </div>

              {/* Schede Lingua IT / EN con Bottone AI */}
              <div className="border border-border/80 rounded-xl p-4 bg-muted/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('it')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
                        activeTab === 'it'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:bg-muted'
                      )}
                    >
                      🇮🇹 Italiano (Principale)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('en')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
                        activeTab === 'en'
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'text-muted-foreground hover:bg-muted'
                      )}
                    >
                      🇬🇧 Inglese
                    </button>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleTranslateAI}
                    disabled={translating}
                    className="text-xs flex items-center gap-1.5 border-primary/40 text-primary hover:bg-primary/10"
                  >
                    {translating ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                    <span>{translating ? 'Traduzione in corso...' : 'Traduci con AI ✨'}</span>
                  </Button>
                </div>

                {activeTab === 'it' ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Ruolo o Commessa (IT) *
                      </label>
                      <input
                        type="text"
                        required
                        value={roleIt}
                        onChange={(e) => setRoleIt(e.target.value)}
                        placeholder="Es. Committente - Piattaforma Gestionale SaaS"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Testo Recensione (IT) *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={quoteIt}
                        onChange={(e) => setQuoteIt(e.target.value)}
                        placeholder="Cosa dice il cliente del tuo lavoro, precisione o risultati ottenuti..."
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Ruolo o Commessa (EN)
                      </label>
                      <input
                        type="text"
                        value={roleEn}
                        onChange={(e) => setRoleEn(e.target.value)}
                        placeholder="Es. Client - SaaS Management Platform"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Testo Recensione (EN)
                      </label>
                      <textarea
                        rows={4}
                        value={quoteEn}
                        onChange={(e) => setQuoteEn(e.target.value)}
                        placeholder="Client testimonial in English..."
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Dati Aggiuntivi: Data, Link, Caso Studio, Ordine */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Data Riferimento
                  </label>
                  <input
                    type="text"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    placeholder="Es. Agosto 2026"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Sito Web / Profilo LinkedIn
                  </label>
                  <input
                    type="url"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Collega a Caso di Studio (Opzionale)
                  </label>
                  <select
                    value={projectSlug}
                    onChange={(e) => setProjectSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Nessun collegamento</option>
                    {availableProjects.map((p) => (
                      <option key={p.id} value={p.slug || ''}>
                        {p.title} {p.slug ? `(/progetti/${p.slug})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Ordine di Visualizzazione
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Visibilità Switch */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="visibleSwitch"
                  checked={visible}
                  onChange={(e) => setVisible(e.target.checked)}
                  className="h-4 w-4 rounded text-primary focus:ring-primary/20 border-border"
                />
                <label htmlFor="visibleSwitch" className="text-xs font-medium text-foreground cursor-pointer">
                  Visibile sul portfolio pubblico (se deselezionato, la recensione rimane salvata ma non viene esposta)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <Button type="button" variant="outline" onClick={closeModal} disabled={loading}>
                  Annulla
                </Button>
                <Button type="submit" disabled={loading} className="min-w-[120px]">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {editingItem ? 'Salva Modifiche' : 'Crea Testimonianza'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
