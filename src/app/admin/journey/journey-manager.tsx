"use client"

import { useState } from 'react'
import type { JourneyItem } from '@/lib/database.types'
import {
  createJourneyItem,
  updateJourneyItem,
  deleteJourneyItem,
  toggleJourneyVisibility,
} from '@/app/admin/actions/journey'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react'

interface JourneyManagerProps {
  initialItems: JourneyItem[]
}

function formatPeriod(startDateStr: string, endDateStr: string | null): string {
  try {
    const startYear = new Date(startDateStr).getFullYear()
    if (!endDateStr) {
      return `${startYear} — Presente`
    }
    const endYear = new Date(endDateStr).getFullYear()
    return `${startYear} — ${endYear}`
  } catch {
    return startDateStr
  }
}

export function JourneyManager({ initialItems }: JourneyManagerProps) {
  const [items, setItems] = useState<JourneyItem[]>(initialItems)
  const [editingItem, setEditingItem] = useState<JourneyItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Form states
  const [title, setTitle] = useState('')
  const [institution, setInstitution] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'education' | 'certification' | 'milestone'>('education')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isCurrent, setIsCurrent] = useState(false)
  const [tags, setTags] = useState('')
  const [linkLabel, setLinkLabel] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [sortOrder, setSortOrder] = useState('1')
  const [visible, setVisible] = useState(true)

  const openCreateModal = () => {
    setEditingItem(null)
    setTitle('')
    setInstitution('')
    setDescription('')
    setType('education')
    setStartDate(new Date().toISOString().substring(0, 10))
    setEndDate('')
    setIsCurrent(true)
    setTags('')
    setLinkLabel('')
    setLinkUrl('')
    setSortOrder((items.length + 1).toString())
    setVisible(true)
    setIsCreating(true)
    setErrorMsg(null)
  }

  const openEditModal = (item: JourneyItem) => {
    setEditingItem(item)
    setTitle(item.title)
    setInstitution(item.institution)
    setDescription(item.description)
    setType((item.type as any) || 'education')
    setStartDate(item.start_date ? item.start_date.substring(0, 10) : '')
    setEndDate(item.end_date ? item.end_date.substring(0, 10) : '')
    setIsCurrent(!item.end_date)
    setTags(item.tags ? item.tags.join(', ') : '')
    setLinkLabel(item.link_label || '')
    setLinkUrl(item.link_url || '')
    setSortOrder(item.sort_order.toString())
    setVisible(item.visible)
    setIsCreating(true)
    setErrorMsg(null)
  }

  const handleClose = () => {
    setIsCreating(false)
    setEditingItem(null)
    setErrorMsg(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('institution', institution)
    formData.append('description', description)
    formData.append('type', type)
    formData.append('start_date', startDate)
    formData.append('is_current', isCurrent ? 'true' : 'false')
    formData.append('end_date', isCurrent ? '' : endDate)
    formData.append('tags', tags)
    formData.append('link_label', linkLabel)
    formData.append('link_url', linkUrl)
    formData.append('sort_order', sortOrder)
    formData.append('visible', visible ? 'true' : 'false')

    try {
      if (editingItem) {
        const res = await updateJourneyItem(editingItem.id, formData)
        if (res.error) throw new Error(res.error)
        setItems((prev) =>
          prev.map((it) =>
            it.id === editingItem.id
              ? {
                  ...it,
                  title,
                  institution,
                  description,
                  type,
                  start_date: startDate,
                  end_date: isCurrent ? null : endDate || null,
                  tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
                  link_label: linkLabel || null,
                  link_url: linkUrl || null,
                  sort_order: parseInt(sortOrder, 10) || 0,
                  visible,
                }
              : it
          )
        )
      } else {
        const res = await createJourneyItem(formData)
        if (res.error) throw new Error(res.error)
        window.location.reload()
      }
      handleClose()
    } catch (err: any) {
      setErrorMsg(err.message || 'Si è verificato un errore')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Sei sicuro di voler eliminare questa tappa del percorso?')) {
      return
    }

    try {
      const res = await deleteJourneyItem(id)
      if (res.error) throw new Error(res.error)
      setItems((prev) => prev.filter((it) => it.id !== id))
    } catch (err: any) {
      alert(err.message || 'Errore durante l\'eliminazione')
    }
  }

  const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, visible: !currentVisible } : it))
      )
      const res = await toggleJourneyVisibility(id, currentVisible)
      if (res.error) throw new Error(res.error)
    } catch (err: any) {
      alert(err.message || 'Errore nel cambio di visibilità')
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, visible: currentVisible } : it))
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" /> Percorso &amp; Formazione
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestisci studi scolastici, percorsi universitari, certificazioni e traguardi
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Nuova Tappa
        </Button>
      </div>

      {/* Form / Modal Inline */}
      {isCreating && (
        <div className="p-6 rounded-2xl border-2 border-primary/30 bg-card shadow-md space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-lg font-bold text-foreground">
              {editingItem ? 'Modifica Tappa' : 'Aggiungi Nuova Tappa al Percorso'}
            </h2>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Titolo o Nome Corso/Diploma *
                </label>
                <input
                  type="text"
                  placeholder="Es. Laurea in Informatica (ITPS)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Istituto o Università *
                </label>
                <input
                  type="text"
                  placeholder="Es. Università degli Studi di Bari Aldo Moro"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Tipo di traguardo
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="education">Istruzione / Laurea / Diploma</option>
                  <option value="certification">Certificazione Professionale</option>
                  <option value="milestone">Esperienza / Traguardo</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Data di Inizio *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">
                    Data di Fine
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-primary font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCurrent}
                      onChange={(e) => setIsCurrent(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary h-3.5 w-3.5"
                    />
                    In corso / Presente
                  </label>
                </div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isCurrent}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Descrizione Dettagliata *
              </label>
              <textarea
                rows={3}
                placeholder="Fornisci dettagli sul percorso, materie studiate, competenze acquisite..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Tags / Parole Chiave (separati da virgola)
              </label>
              <input
                type="text"
                placeholder="es. Ingegneria del Software, Basi di Dati, Algoritmi"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Etichetta Link (opzionale)
                </label>
                <input
                  type="text"
                  placeholder="Es. Scheda Corso UniBa"
                  value={linkLabel}
                  onChange={(e) => setLinkLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  URL Link (opzionale)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="journey_visible"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="journey_visible" className="text-sm font-medium text-foreground cursor-pointer">
                Mostra questa tappa sul sito pubblico
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                Annulla
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editingItem ? 'Salva Modifiche' : 'Crea Tappa'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline List */}
      <div className="space-y-4">
        {items.map((item) => {
          const isCurrentItem = !item.end_date
          const formattedPeriod = formatPeriod(item.start_date, item.end_date)

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                item.visible
                  ? 'border-border bg-card shadow-sm'
                  : 'border-dashed border-border/70 bg-muted/30 opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formattedPeriod}
                    </span>
                    {isCurrentItem && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        In Corso
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground uppercase font-mono tracking-wider">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                    {item.type === 'education' ? (
                      <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : item.type === 'certification' ? (
                      <Award className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span>{item.institution}</span>
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {item.description}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.link_url && (
                    <div className="pt-1">
                      <a
                        href={item.link_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
                      >
                        {item.link_label || 'Vedi Link'}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleVisibility(item.id, item.visible)}
                    title={item.visible ? 'Nascondi' : 'Mostra'}
                    className="h-8 w-8 p-0"
                  >
                    {item.visible ? (
                      <Eye className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}

        {items.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl p-6">
            <p className="text-muted-foreground text-sm">
              Nessuna tappa formativa presente. Clicca su &quot;Nuova Tappa&quot; per iniziare!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}