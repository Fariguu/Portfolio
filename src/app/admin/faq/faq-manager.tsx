"use client"

import { useState, useEffect, type SyntheticEvent } from 'react'
import type { FAQItem } from '@/lib/database.types'
import {
  createFAQ,
  updateFAQ,
  deleteFAQ,
  toggleFAQVisibility,
  translateFAQFields,
} from '@/app/admin/actions/faq'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  HelpCircle,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
  Languages,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQManagerProps {
  readonly initialFaqs: FAQItem[]
}

type ToastType = 'success' | 'error'

interface ToastState {
  type: ToastType
  message: string
  exiting: boolean
}

export function FAQManager({ initialFaqs }: Readonly<FAQManagerProps>) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs)
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [translating, setTranslating] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastState | null>(null)

  // Active language tab in modal: "it" | "en"
  const [activeTab, setActiveTab] = useState<'it' | 'en'>('it')

  // Form states
  const [questionIt, setQuestionIt] = useState('')
  const [answerIt, setAnswerIt] = useState('')
  const [questionEn, setQuestionEn] = useState('')
  const [answerEn, setAnswerEn] = useState('')
  const [sortOrder, setSortOrder] = useState('1')
  const [visible, setVisible] = useState(true)

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ type, message, exiting: false })
  }

  // Gestione timer e uscita fluida del toast
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
    setEditingFaq(null)
    setQuestionIt('')
    setAnswerIt('')
    setQuestionEn('')
    setAnswerEn('')
    setSortOrder((faqs.length + 1).toString())
    setVisible(true)
    setIsCreating(true)
    setActiveTab('it')
    setErrorMsg(null)
  }

  const openEditModal = (faq: FAQItem) => {
    setEditingFaq(faq)
    setQuestionIt(faq.question_it)
    setAnswerIt(faq.answer_it)
    setQuestionEn(faq.question_en || '')
    setAnswerEn(faq.answer_en || '')
    setSortOrder(faq.sort_order.toString())
    setVisible(faq.visible)
    setIsCreating(true)
    setActiveTab('it')
    setErrorMsg(null)
  }

  const handleClose = () => {
    setIsCreating(false)
    setEditingFaq(null)
    setErrorMsg(null)
  }

  // Auto-translate using AI / Gemini service
  const handleAutoTranslate = async () => {
    if (!questionIt.trim() && !answerIt.trim()) {
      showToast('Scrivi prima la domanda o la risposta in italiano per poterla tradurre.', 'error')
      return
    }

    setTranslating(true)
    setErrorMsg(null)

    const formData = new FormData()
    formData.append('question_it', questionIt)
    formData.append('answer_it', answerIt)

    try {
      const res = await translateFAQFields(formData)
      if (res.error) throw new Error(res.error)

      if (res.translation) {
        if (res.translation.question_en) setQuestionEn(res.translation.question_en)
        if (res.translation.answer_en) setAnswerEn(res.translation.answer_en)
        showToast('Traduzione completata con successo!', 'success')
        setActiveTab('en') // Switch automatically to English tab to review
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Errore durante la traduzione automatica'
      setErrorMsg(msg)
      showToast(msg, 'error')
    } finally {
      setTranslating(false)
    }
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const formData = new FormData()
    formData.append('question_it', questionIt)
    formData.append('answer_it', answerIt)
    formData.append('question_en', questionEn)
    formData.append('answer_en', answerEn)
    formData.append('sort_order', sortOrder)
    formData.append('visible', visible ? 'true' : 'false')

    try {
      if (editingFaq) {
        const res = await updateFAQ(editingFaq.id, formData)
        if (res.error) throw new Error(res.error)
        setFaqs((prev) =>
          prev.map((f) =>
            f.id === editingFaq.id
              ? {
                  ...f,
                  question_it: questionIt,
                  answer_it: answerIt,
                  question_en: questionEn || null,
                  answer_en: answerEn || null,
                  sort_order: Number.parseInt(sortOrder, 10) || 0,
                  visible,
                }
              : f
          ).sort((a, b) => a.sort_order - b.sort_order)
        )
        showToast('FAQ aggiornata con successo!', 'success')
      } else {
        const res = await createFAQ(formData)
        if (res.error) throw new Error(res.error)
        window.location.reload()
      }
      handleClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Si è verificato un errore'
      setErrorMsg(msg)
      showToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare definitivamente questa FAQ?')) return
    try {
      const res = await deleteFAQ(id)
      if (res.error) throw new Error(res.error)
      setFaqs((prev) => prev.filter((f) => f.id !== id))
      showToast('FAQ eliminata con successo.', 'success')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Errore durante la cancellazione'
      showToast(msg, 'error')
    }
  }

  const handleToggleVisibility = async (id: string, current: boolean) => {
    try {
      setFaqs((prev) =>
        prev.map((f) => (f.id === id ? { ...f, visible: !current } : f))
      )
      const res = await toggleFAQVisibility(id, current)
      if (res.error) {
        setFaqs((prev) =>
          prev.map((f) => (f.id === id ? { ...f, visible: current } : f))
        )
        showToast(res.error, 'error')
      } else {
        showToast(current ? 'FAQ nascosta dal sito' : 'FAQ resa visibile sul sito', 'success')
      }
    } catch {
      setFaqs((prev) =>
        prev.map((f) => (f.id === id ? { ...f, visible: current } : f))
      )
      showToast('Errore di comunicazione con il server', 'error')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-brand-accent" />
            Gestione Domande Frequenti (FAQ)
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aggiungi, modifica o nascondi le domande visibili in homepage e sincronizzate con Schema.org FAQPage.
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Nuova FAQ</span>
        </Button>
      </div>

      {/* Lista FAQ */}
      <div className="grid grid-cols-1 gap-4">
        {faqs.length === 0 ? (
          <div className="text-center py-12 bg-background border border-dashed border-border rounded-xl">
            <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Nessuna domanda presente. Creane una per iniziare!</p>
          </div>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className={`flex flex-col md:flex-row md:items-start justify-between p-6 rounded-2xl border bg-background transition-all gap-5 ${
                faq.visible ? 'border-border shadow-xs' : 'border-dashed border-border/50 opacity-60'
              }`}
            >
              <div className="space-y-3 flex-1">
                {/* Header item con ordine e badge visibilità */}
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border">
                    #{faq.sort_order}
                  </span>
                  {!faq.visible && (
                    <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      Nascosta
                    </span>
                  )}
                  {faq.question_en && (
                    <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/60">
                      EN disponibile
                    </span>
                  )}
                </div>

                {/* Domanda e Risposta (Italiano) */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-base leading-snug">
                    {faq.question_it}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {faq.answer_it}
                  </p>
                </div>
              </div>

              {/* Azioni */}
              <div className="flex items-center gap-2 self-end md:self-start shrink-0 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleVisibility(faq.id, faq.visible)}
                  title={faq.visible ? 'Nascondi dal sito' : 'Mostra sul sito'}
                >
                  {faq.visible ? (
                    <Eye className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(faq)}
                  title="Modifica"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(faq.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  title="Elimina"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Creazione / Modifica Ristrutturato */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="bg-background border border-border w-full max-w-3xl rounded-2xl shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150 my-8 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/20">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-brand-accent" />
                  {editingFaq ? 'Modifica FAQ' : 'Crea Nuova FAQ'}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Compila i testi in italiano e genera la traduzione in inglese con un click.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="px-6 space-y-5">
              {/* Notifiche Errore */}
              {errorMsg && (
                <div className="p-3.5 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-2.5 text-destructive text-xs sm:text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Toolbar Lingue & Azione Traduci */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-secondary/50 rounded-xl border border-border/60">
                {/* Clean Segmented Tab Control */}
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border/60">
                  <button
                    type="button"
                    onClick={() => setActiveTab('it')}
                    className={cn(
                      "px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors font-sans",
                      activeTab === 'it'
                        ? "bg-background text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Italiano
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('en')}
                    className={cn(
                      "px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors font-sans",
                      activeTab === 'en'
                        ? "bg-background text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    English
                  </button>
                </div>

                {/* Pulsante Traduci con AI */}
                <Button
                  type="button"
                  onClick={handleAutoTranslate}
                  disabled={translating || !questionIt.trim()}
                  variant="outline"
                  size="sm"
                  className="bg-brand-accent/10 border-brand-accent/30 text-brand-accent hover:bg-brand-accent/20 hover:text-brand-accent flex items-center gap-2 text-xs font-semibold h-9 shadow-xs"
                >
                  {translating ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Traduzione in corso...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Traduci in Inglese con AI</span>
                    </>
                  )}
                </Button>
              </div>

              <form id="faq-form" onSubmit={handleSubmit} className="space-y-5">
                {/* SCHEDA ITALIANO */}
                {activeTab === 'it' && (
                  <div className="space-y-4 animate-in fade-in-50 duration-150">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground flex items-center justify-between">
                        <span>Domanda in Italiano *</span>
                        <span className="text-xs font-normal text-muted-foreground">La domanda posta dal cliente</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={questionIt}
                        onChange={(e) => setQuestionIt(e.target.value)}
                        placeholder="es. Cosa serve per iniziare a realizzare un progetto?"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground flex items-center justify-between">
                        <span>Risposta in Italiano *</span>
                        <span className="text-xs font-normal text-muted-foreground">Spiegazione chiara e trasparente</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={answerIt}
                        onChange={(e) => setAnswerIt(e.target.value)}
                        placeholder="Descrivi in modo professionale come operi, quali passaggi segui e quali sono i vantaggi..."
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs resize-y"
                      />
                    </div>
                  </div>
                )}

                {/* SCHEDA INGLESE */}
                {activeTab === 'en' && (
                  <div className="space-y-4 animate-in fade-in-50 duration-150">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground flex items-center justify-between">
                        <span>Question (English)</span>
                        <span className="text-xs font-normal text-muted-foreground">Mostrata quando la lingua è /en</span>
                      </label>
                      <input
                        type="text"
                        value={questionEn}
                        onChange={(e) => setQuestionEn(e.target.value)}
                        placeholder="e.g. What is needed to start building a project or website?"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground flex items-center justify-between">
                        <span>Answer (English)</span>
                        <span className="text-xs font-normal text-muted-foreground">Clear and professional explanation</span>
                      </label>
                      <textarea
                        rows={6}
                        value={answerEn}
                        onChange={(e) => setAnswerEn(e.target.value)}
                        placeholder="Clear, professional explanation in English..."
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs resize-y"
                      />
                    </div>

                    {!questionEn.trim() && (
                      <div className="p-3 bg-secondary/60 rounded-xl text-xs text-muted-foreground flex items-center justify-between">
                        <span>I campi in inglese sono ancora vuoti.</span>
                        <button
                          type="button"
                          onClick={handleAutoTranslate}
                          className="text-brand-accent hover:underline font-semibold"
                        >
                          Genera ora con AI ➔
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Opzioni di Pubblicazione e Ordinamento */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-secondary/30 border border-border/60">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-foreground">
                      Posizione / Ordine:
                    </label>
                    <input
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-20 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground text-center font-bold focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={(e) => setVisible(e.target.checked)}
                      className="h-4 w-4 rounded-sm border-border text-primary focus:ring-primary"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-foreground">
                      Visibile sul sito pubblico
                    </span>
                  </label>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-muted/20">
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Premi Salva per rendere operative le modifiche sul sito.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Annulla
                </Button>
                <Button form="faq-form" type="submit" disabled={loading} className="gap-2 px-5">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingFaq ? 'Salva Modifiche' : 'Crea FAQ'}
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Toast fluttuante pastello (verde per successo, rosso per errore) con contenitore isolato anti-scrollbar */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-60 flex justify-end p-4 sm:p-6 overflow-hidden">
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full select-none max-w-md shadow-lg transition-all",
              toast.exiting ? "animate-toast-out" : "animate-toast-in",
              toast.type === 'success'
                ? "bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-100 border border-emerald-200/90 dark:border-emerald-800/80 shadow-emerald-500/10 backdrop-blur-md"
                : "bg-rose-50/95 dark:bg-rose-950/90 text-rose-900 dark:text-rose-100 border border-rose-200/90 dark:border-rose-800/80 shadow-rose-500/10 backdrop-blur-md"
            )}
          >
            {toast.type === 'success' ? (
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-200/60 dark:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300 shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-rose-200/60 dark:bg-rose-800/60 text-rose-700 dark:text-rose-300 shrink-0">
                <AlertCircle className="h-3.5 w-3.5" />
              </div>
            )}
            <span className="text-xs sm:text-sm font-medium leading-tight">
              {toast.message}
            </span>
            <button
              type="button"
              onClick={dismissToast}
              className={cn(
                "p-1 rounded-full transition-colors shrink-0 ml-1",
                toast.type === 'success'
                  ? "text-emerald-700/60 hover:text-emerald-950 dark:text-emerald-300/60 dark:hover:text-emerald-100 hover:bg-emerald-200/50 dark:hover:bg-emerald-800/50"
                  : "text-rose-700/60 hover:text-rose-950 dark:text-rose-300/60 dark:hover:text-rose-100 hover:bg-rose-200/50 dark:hover:bg-rose-800/50"
              )}
              aria-label="Chiudi notifica"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
