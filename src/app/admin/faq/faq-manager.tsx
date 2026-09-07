"use client"

import { useState, type SyntheticEvent } from 'react'
import type { FAQItem } from '@/lib/database.types'
import {
  createFAQ,
  updateFAQ,
  deleteFAQ,
  toggleFAQVisibility,
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
} from 'lucide-react'

interface FAQManagerProps {
  readonly initialFaqs: FAQItem[]
}

export function FAQManager({ initialFaqs }: Readonly<FAQManagerProps>) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs)
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Form states
  const [questionIt, setQuestionIt] = useState('')
  const [answerIt, setAnswerIt] = useState('')
  const [questionEn, setQuestionEn] = useState('')
  const [answerEn, setAnswerEn] = useState('')
  const [sortOrder, setSortOrder] = useState('1')
  const [visible, setVisible] = useState(true)

  const openCreateModal = () => {
    setEditingFaq(null)
    setQuestionIt('')
    setAnswerIt('')
    setQuestionEn('')
    setAnswerEn('')
    setSortOrder((faqs.length + 1).toString())
    setVisible(true)
    setIsCreating(true)
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
    setErrorMsg(null)
  }

  const handleClose = () => {
    setIsCreating(false)
    setEditingFaq(null)
    setErrorMsg(null)
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
      } else {
        const res = await createFAQ(formData)
        if (res.error) throw new Error(res.error)
        window.location.reload()
      }
      handleClose()
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Si è verificato un errore')
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
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Errore durante la cancellazione')
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
        alert(res.error)
      }
    } catch {
      setFaqs((prev) =>
        prev.map((f) => (f.id === id ? { ...f, visible: current } : f))
      )
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
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border bg-background transition-all gap-4 ${
                faq.visible ? 'border-border' : 'border-dashed border-border/50 opacity-60'
              }`}
            >
              <div className="space-y-1.5 flex-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    #{faq.sort_order}
                  </span>
                  <h3 className="font-semibold text-foreground text-base">
                    {faq.question_it}
                  </h3>
                  {!faq.visible && (
                    <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                      Nascosta
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {faq.answer_it}
                </p>
                {faq.question_en && (
                  <p className="text-xs text-muted-foreground/70 italic">
                    EN: {faq.question_en}
                  </p>
                )}
              </div>

              {/* Azioni */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
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

      {/* Modal Creazione / Modifica */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-background border border-border w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-foreground">
                {editingFaq ? 'Modifica FAQ' : 'Crea Nuova FAQ'}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">
                  Domanda (Italiano) *
                </label>
                <input
                  type="text"
                  required
                  value={questionIt}
                  onChange={(e) => setQuestionIt(e.target.value)}
                  placeholder="es. Cosa serve per iniziare un progetto?"
                  className="w-full rounded-lg border border-border bg-muted/40 px-3.5 py-2 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">
                  Risposta (Italiano) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={answerIt}
                  onChange={(e) => setAnswerIt(e.target.value)}
                  placeholder="Spiega in modo chiaro e trasparente..."
                  className="w-full rounded-lg border border-border bg-muted/40 px-3.5 py-2 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/50">
                <div className="space-y-1.5">
                  <label className="font-medium text-muted-foreground text-xs">
                    Question (English - Opzionale)
                  </label>
                  <input
                    type="text"
                    value={questionEn}
                    onChange={(e) => setQuestionEn(e.target.value)}
                    placeholder="e.g. What is needed to start?"
                    className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-medium text-muted-foreground text-xs">
                    Answer (English - Opzionale)
                  </label>
                  <textarea
                    rows={2}
                    value={answerEn}
                    onChange={(e) => setAnswerEn(e.target.value)}
                    placeholder="Clear explanation in English..."
                    className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="space-y-1 w-32">
                  <label className="font-semibold text-foreground text-xs">
                    Ordine (Sort Order)
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-4">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                    className="h-4 w-4 rounded-sm border-border text-primary focus:ring-primary"
                  />
                  <span className="font-medium text-foreground text-sm">
                    Visibile sul sito
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Annulla
                </Button>
                <Button type="submit" disabled={loading} className="gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingFaq ? 'Salva Modifiche' : 'Crea FAQ'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
