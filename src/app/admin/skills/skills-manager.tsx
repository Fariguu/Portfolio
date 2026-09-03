"use client"

import { useState, type SyntheticEvent } from 'react'
import type { Skill } from '@/lib/database.types'
import { AVAILABLE_ICONS, getIconComponent } from '@/lib/icons'
import {
  createSkill,
  updateSkill,
  deleteSkill,
  toggleSkillVisibility,
} from '@/app/admin/actions/skills'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Layers,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react'

interface SkillsManagerProps {
  readonly initialSkills: Skill[]
}

export function SkillsManager({ initialSkills }: Readonly<SkillsManagerProps>) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Form states
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [iconName, setIconName] = useState('MonitorSmartphone')
  const [sortOrder, setSortOrder] = useState('1')
  const [visible, setVisible] = useState(true)

  const openCreateModal = () => {
    setEditingSkill(null)
    setName('')
    setDescription('')
    setIconName('MonitorSmartphone')
    setSortOrder((skills.length + 1).toString())
    setVisible(true)
    setIsCreating(true)
    setErrorMsg(null)
  }

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill)
    setName(skill.name)
    setDescription(skill.description)
    setIconName(skill.icon_name || 'MonitorSmartphone')
    setSortOrder(skill.sort_order.toString())
    setVisible(skill.visible)
    setIsCreating(true)
    setErrorMsg(null)
  }

  const handleClose = () => {
    setIsCreating(false)
    setEditingSkill(null)
    setErrorMsg(null)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('icon_name', iconName)
    formData.append('sort_order', sortOrder)
    formData.append('visible', visible ? 'true' : 'false')

    try {
      if (editingSkill) {
        const res = await updateSkill(editingSkill.id, formData)
        if (res.error) throw new Error(res.error)
        setSkills((prev) =>
          prev.map((s) =>
            s.id === editingSkill.id
              ? {
                  ...s,
                  name,
                  description,
                  icon_name: iconName,
                  sort_order: Number.parseInt(sortOrder, 10) || 0,
                  visible,
                }
              : s
          )
        )
      } else {
        const res = await createSkill(formData)
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
    if (!window.confirm('Sei sicuro di voler eliminare questa competenza?')) {
      return
    }

    try {
      const res = await deleteSkill(id)
      if (res.error) throw new Error(res.error)
      setSkills((prev) => prev.filter((s) => s.id !== id))
    } catch (err: any) {
      alert(err.message || 'Errore durante l\'eliminazione')
    }
  }

  const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      setSkills((prev) =>
        prev.map((s) => (s.id === id ? { ...s, visible: !currentVisible } : s))
      )
      const res = await toggleSkillVisibility(id, currentVisible)
      if (res.error) throw new Error(res.error)
    } catch (err: any) {
      alert(err.message || 'Errore nel cambio di visibilità')
      setSkills((prev) =>
        prev.map((s) => (s.id === id ? { ...s, visible: currentVisible } : s))
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" /> Competenze &amp; Metodologie
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aggiungi, modifica o elimina le tecnologie e i metodi di lavoro mostrati nel sito
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Nuova Competenza
        </Button>
      </div>

      {/* Form / Modal Inline */}
      {isCreating && (
        <div className="p-6 rounded-2xl border-2 border-primary/30 bg-card shadow-md space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-lg font-bold text-foreground">
              {editingSkill ? 'Modifica Competenza' : 'Aggiungi Nuova Competenza'}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label htmlFor="skill_name" className="text-xs font-semibold text-foreground">
                  Titolo / Nome Competenza *
                </label>
                <input
                  id="skill_name"
                  type="text"
                  placeholder="es. Frontend Moderno con Next.js"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="skill_sort_order" className="text-xs font-semibold text-foreground">
                  Ordine di visualizzazione
                </label>
                <input
                  id="skill_sort_order"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="skill_description" className="text-xs font-semibold text-foreground">
                Descrizione *
              </label>
              <textarea
                id="skill_description"
                rows={3}
                placeholder="Descrivi le tecnologie e il metodo che applichi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>

              {/* Icon Picker */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-foreground block">
                  Seleziona Icona:
                </span>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-h-36 overflow-y-auto p-2 border border-border rounded-xl bg-muted/20">
                  {Object.keys(AVAILABLE_ICONS).map((iconKey) => {
                    const IconCmp = AVAILABLE_ICONS[iconKey]
                    const isSelected = iconName === iconKey
                    return (
                      <button
                        key={iconKey}
                        type="button"
                        title={iconKey}
                        onClick={() => setIconName(iconKey)}
                        className={`p-2.5 rounded-lg flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                            : 'bg-background hover:bg-secondary text-foreground'
                        }`}
                      >
                        <IconCmp className="h-5 w-5" />
                      </button>
                    )
                  })}
                </div>
              </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="skill_visible"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="skill_visible" className="text-sm font-medium text-foreground cursor-pointer">
                Mostra questa competenza sul sito pubblico
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                Annulla
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editingSkill ? 'Salva Modifiche' : 'Crea Competenza'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* List of Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => {
          const Icon = getIconComponent(skill.icon_name)
          return (
            <div
              key={skill.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                skill.visible
                  ? 'border-border bg-card shadow-sm'
                  : 'border-dashed border-border/70 bg-muted/30 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-base leading-tight">
                        {skill.name}
                      </h3>
                      <span className="text-xs text-muted-foreground font-mono">
                        Ordine: {skill.sort_order}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleVisibility(skill.id, skill.visible)}
                      title={skill.visible ? 'Nascondi' : 'Mostra'}
                      className="h-8 w-8 p-0"
                    >
                      {skill.visible ? (
                        <Eye className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(skill)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(skill.id)}
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {!skill.visible && (
                <div className="mt-3 pt-2 border-t border-border/40 text-xs text-amber-500 font-medium flex items-center gap-1">
                  <EyeOff className="h-3 w-3" /> Nascosta sul sito pubblico
                </div>
              )}
            </div>
          )
        })}

        {skills.length === 0 && (
          <div className="col-span-full text-center py-12 border-2 border-dashed border-border rounded-2xl p-6">
            <p className="text-muted-foreground text-sm">
              Nessuna competenza trovata. Clicca su &quot;Nuova Competenza&quot; per iniziare!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
