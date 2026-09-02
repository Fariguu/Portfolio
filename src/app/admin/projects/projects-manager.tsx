"use client"

import { useState, useRef } from 'react'
import type { Project } from '@/lib/database.types'
import {
  createProject,
  updateProject,
  deleteProject,
  toggleProjectVisibility,
  toggleProjectFeatured,
} from '@/app/admin/actions/projects'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  FolderGit2,
  Lock,
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import Image from 'next/image'

interface ProjectsManagerProps {
  initialProjects: Project[]
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [manualImageUrl, setManualImageUrl] = useState('')
  const [tags, setTags] = useState('')
  const [statusBadge, setStatusBadge] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [githubLabel, setGithubLabel] = useState('Codice GitHub')
  const [isPrivate, setIsPrivate] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [visible, setVisible] = useState(true)
  const [sortOrder, setSortOrder] = useState('1')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const openCreateModal = () => {
    setEditingProject(null)
    setTitle('')
    setDescription('')
    setImageFile(null)
    setImagePreview('')
    setManualImageUrl('')
    setTags('')
    setStatusBadge('')
    setDemoUrl('')
    setGithubUrl('')
    setGithubLabel('Codice GitHub')
    setIsPrivate(false)
    setFeatured(false)
    setVisible(true)
    setSortOrder((projects.length + 1).toString())
    setIsCreating(true)
    setErrorMsg(null)
  }

  const openEditModal = (project: Project) => {
    setEditingProject(project)
    setTitle(project.title)
    setDescription(project.description)
    setImageFile(null)
    setImagePreview(project.image_url)
    setManualImageUrl(project.image_url)
    setTags((project.tags || []).join(', '))
    setStatusBadge(project.status_badge || '')
    setDemoUrl(project.demo_url || '')
    setGithubUrl(project.github_url || '')
    setGithubLabel(project.github_label || 'Codice GitHub')
    setIsPrivate(project.is_private)
    setFeatured(project.featured)
    setVisible(project.visible)
    setSortOrder(project.sort_order.toString())
    setIsCreating(true)
    setErrorMsg(null)
  }

  const handleClose = () => {
    setIsCreating(false)
    setEditingProject(null)
    setImageFile(null)
    setImagePreview('')
    setErrorMsg(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMsg('Il file selezionato supera gli 8MB. Seleziona un\'immagine più leggera.')
        if (fileInputRef.current) fileInputRef.current.value = ''
        setImageFile(null)
        setImagePreview(editingProject?.image_url || '')
        return
      }
      setErrorMsg(null)
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    if (imageFile && imageFile.size > 8 * 1024 * 1024) {
      setErrorMsg('Il file selezionato supera gli 8MB.')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    if (imageFile) {
      formData.append('image_file', imageFile)
    }
    if (editingProject) {
      formData.append('existing_image_url', editingProject.image_url)
    }
    formData.append('image_url', manualImageUrl)
    formData.append('tags', tags)
    formData.append('status_badge', statusBadge)
    formData.append('demo_url', demoUrl)
    formData.append('github_url', githubUrl)
    formData.append('github_label', githubLabel)
    formData.append('is_private', isPrivate.toString())
    formData.append('featured', featured.toString())
    formData.append('visible', visible.toString())
    formData.append('sort_order', sortOrder)

    try {
      if (editingProject) {
        const res = await updateProject(editingProject.id, formData)
        if (res.error) throw new Error(res.error)
        window.location.reload()
      } else {
        const res = await createProject(formData)
        if (res.error) throw new Error(res.error)
        window.location.reload()
      }
      handleClose()
    } catch (err: any) {
      const msg = err.message || ''
      if (msg.toLowerCase().includes('unexpected response') || msg.toLowerCase().includes('failed to fetch')) {
        setErrorMsg('Errore di comunicazione con il server. La sessione potrebbe essere scaduta o il file selezionato è troppo grande. Riprova ad accedere o seleziona un file più leggero.')
      } else {
        setErrorMsg(msg || 'Si è verificato un errore durante il salvataggio')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo progetto?')) {
      return
    }

    try {
      const res = await deleteProject(id)
      if (res.error) throw new Error(res.error)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      alert(err.message || 'Errore durante l\'eliminazione')
    }
  }

  const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, visible: !currentVisible } : p))
      )
      const res = await toggleProjectVisibility(id, currentVisible)
      if (res.error) throw new Error(res.error)
    } catch (err: any) {
      alert(err.message || 'Errore nel cambio di visibilità')
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, visible: currentVisible } : p))
      )
    }
  }

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !currentFeatured } : p))
      )
      const res = await toggleProjectFeatured(id, currentFeatured)
      if (res.error) throw new Error(res.error)
    } catch (err: any) {
      alert(err.message || 'Errore nel cambio evidenza')
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: currentFeatured } : p))
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FolderGit2 className="h-7 w-7 text-primary" /> Progetti del Portfolio
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Carica e gestisci i progetti: screenshot, tags, link al codice e visibilità
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Nuovo Progetto
        </Button>
      </div>

      {/* Form / Modal Inline */}
      {isCreating && (
        <div className="p-6 rounded-2xl border-2 border-primary/30 bg-card shadow-md space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-lg font-bold text-foreground">
              {editingProject ? 'Modifica Progetto' : 'Aggiungi Nuovo Progetto'}
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Titolo Progetto *
                </label>
                <input
                  type="text"
                  placeholder="es. Impresa Edile"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Badge Stato (opzionale)
                </label>
                <input
                  type="text"
                  placeholder="es. In sviluppo attivo"
                  value={statusBadge}
                  onChange={(e) => setStatusBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Image Upload / URL */}
            <div className="space-y-2 p-4 rounded-xl bg-muted/20 border border-border/60">
              <label className="text-xs font-semibold text-foreground block">
                Immagine di Copertina *
              </label>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {imagePreview ? (
                  <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-border shrink-0 bg-muted">
                    <Image
                      src={imagePreview}
                      alt="Anteprima"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full sm:w-48 h-32 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground shrink-0 bg-muted/30">
                    <ImageIcon className="h-8 w-8 mb-1 opacity-50" />
                    <span className="text-xs">Nessuna immagine</span>
                  </div>
                )}

                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5"
                    >
                      <Upload className="h-4 w-4" /> Carica file dal computer
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, WebP fino a 8MB (salvato su Supabase Storage)
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground block">
                      Oppure inserisci un URL diretto:
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={manualImageUrl}
                      onChange={(e) => {
                        setManualImageUrl(e.target.value)
                        if (!imageFile) setImagePreview(e.target.value)
                      }}
                      className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Descrizione Dettagliata *
              </label>
              <textarea
                rows={3}
                placeholder="Descrivi l'architettura, le funzionalità chiave e le sfide risolte..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Tecnologie / Tags (separati da virgola)
                </label>
                <input
                  type="text"
                  placeholder="Next.js 16, React 19, TypeScript, Supabase"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Ordine di visualizzazione
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  URL GitHub (opzionale)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Testo Pulsante GitHub
                </label>
                <input
                  type="text"
                  placeholder="es. Codice GitHub / Bozza"
                  value={githubLabel}
                  onChange={(e) => setGithubLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  URL Demo Live (opzionale)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Checkboxes / Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <label className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-secondary/40">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> In Evidenza
                </span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-secondary/40">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" /> Repo Privato
                </span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-secondary/40">
                <input
                  type="checkbox"
                  checked={visible}
                  onChange={(e) => setVisible(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-emerald-500" /> Visibile sul sito
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                Annulla
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editingProject ? 'Salva Modifiche' : 'Crea Progetto'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`rounded-2xl border flex flex-col overflow-hidden transition-all ${
              project.visible
                ? 'bg-card border-border/70 shadow-sm'
                : 'bg-muted/30 border-dashed border-border opacity-70'
            }`}
          >
            {/* Project Image */}
            <div className="relative w-full h-44 bg-muted overflow-hidden">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                {project.featured && (
                  <span className="bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                    <Star className="h-2.5 w-2.5 fill-white" /> In Evidenza
                  </span>
                )}
                {project.status_badge && (
                  <span className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full border border-border">
                    {project.status_badge}
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground text-lg">{project.title}</h3>
                  {project.is_private && (
                    <span className="flex items-center text-xs text-muted-foreground gap-1" title="Repo Privato">
                      <Lock className="h-3 w-3" /> Privato
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] rounded bg-secondary text-secondary-foreground font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Actions Toolbar */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFeatured(project.id, project.featured)}
                    title={project.featured ? 'Rimuovi da In Evidenza' : 'Metti In Evidenza'}
                    className="h-8 w-8 p-0"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        project.featured ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
                      }`}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleVisibility(project.id, project.visible)}
                    title={project.visible ? 'Nascondi dal sito' : 'Mostra sul sito'}
                    className="h-8 w-8 p-0"
                  >
                    {project.visible ? (
                      <Eye className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(project)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 border-2 border-dashed border-border rounded-2xl p-6">
            <p className="text-muted-foreground text-sm">
              Nessun progetto presente. Clicca su &quot;Nuovo Progetto&quot; per caricarne uno!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
