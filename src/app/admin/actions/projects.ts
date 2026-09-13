"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAdminSession } from '@/lib/auth-guard'
import { revalidatePath } from 'next/cache'
import { translateProjectData, translateMarkdownCaseStudy } from '@/lib/translate'

async function uploadImageIfPresent(file: File | null, existingUrl?: string): Promise<string> {
  if (!file || file.size === 0) {
    return existingUrl || ''
  }

  const supabase = createAdminClient()
  const fileExt = file.name.split('.').pop() || 'png'
  const fileName = `projects/${Date.now()}_${crypto.randomUUID()}.${fileExt}`
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error: uploadError } = await supabase.storage
    .from('portfolio-media')
    .upload(fileName, buffer, {
      contentType: file.type || 'image/png',
      upsert: true,
    })

  if (uploadError) {
    throw new Error(`Errore caricamento immagine: ${uploadError.message}`)
  }

  const { data: publicUrlData } = supabase.storage
    .from('portfolio-media')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}

/**
 * Azione Server per tradurre al volo i campi dal form prima del salvataggio
 */
export async function translateProjectFields(formData: FormData) {
  try {
    const authCheck = await verifyAdminSession()
    if (!authCheck.authorized) {
      return { error: authCheck.error || 'Non autorizzato' }
    }

    const title = (formData.get('title') as string) || ''
    const description = (formData.get('description') as string) || ''
    const github_label = (formData.get('github_label') as string) || ''
    const status_badge = (formData.get('status_badge') as string) || ''

    const translation = await translateProjectData({
      title,
      description,
      github_label,
      status_badge,
    })

    return { success: true, translation }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Errore durante la traduzione' }
  }
}

export async function createProject(formData: FormData) {
  try {
    const authCheck = await verifyAdminSession()
    if (!authCheck.authorized) {
      return { error: authCheck.error || 'Non autorizzato' }
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image_file') as File | null
    const manualImageUrl = (formData.get('image_url') as string) || ''
    
    let image_url = manualImageUrl
    if (imageFile && imageFile.size > 0) {
      image_url = await uploadImageIfPresent(imageFile)
    }

    if (!image_url) {
      return { error: 'È necessario caricare un\'immagine o fornire un URL' }
    }

    const tagsRaw = (formData.get('tags') as string) || ''
    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    const status_badge = (formData.get('status_badge') as string) || null
    const demo_url = (formData.get('demo_url') as string) || null
    const github_url = (formData.get('github_url') as string) || null
    const github_label = (formData.get('github_label') as string) || 'Codice GitHub'
    const is_private = formData.get('is_private') === 'true' || formData.get('is_private') === 'on'
    const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on'
    const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'
    const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)

    let title_en = (formData.get('title_en') as string) || ''
    let description_en = (formData.get('description_en') as string) || ''
    let github_label_en = (formData.get('github_label_en') as string) || ''
    let status_badge_en = (formData.get('status_badge_en') as string) || ''

    if (!title || !description) {
      return { error: 'Titolo e descrizione sono obbligatori' }
    }

    // Se i campi in lingua inglese non sono stati inseriti a mano, traduciamo automaticamente
    if (!title_en.trim() || !description_en.trim() || !github_label_en.trim() || (status_badge && !status_badge_en.trim())) {
      const autoTranslated = await translateProjectData({
        title,
        description,
        github_label,
        status_badge: status_badge || undefined,
      })

      if (!title_en.trim()) title_en = autoTranslated.title_en
      if (!description_en.trim()) description_en = autoTranslated.description_en
      if (!github_label_en.trim()) github_label_en = autoTranslated.github_label_en || 'GitHub Code'
      if (status_badge && !status_badge_en.trim()) status_badge_en = autoTranslated.status_badge_en
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from('projects').insert({
      title,
      description,
      image_url,
      tags,
      status_badge,
      demo_url,
      github_url,
      github_label,
      title_en: title_en.trim() || null,
      description_en: description_en.trim() || null,
      github_label_en: github_label_en.trim() || null,
      status_badge_en: status_badge_en.trim() || null,
      is_private,
      featured,
      visible,
      sort_order,
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/[locale]', 'layout')
    revalidatePath('/admin/projects')
    revalidatePath('/admin')
    revalidatePath('/sitemap.xml')
    return { success: true }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Errore durante il salvataggio del progetto' }
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const authCheck = await verifyAdminSession()
    if (!authCheck.authorized) {
      return { error: authCheck.error || 'Non autorizzato' }
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image_file') as File | null
    const existingImageUrl = (formData.get('existing_image_url') as string) || ''
    const manualImageUrl = (formData.get('image_url') as string) || ''
    
    let image_url = existingImageUrl || manualImageUrl
    if (imageFile && imageFile.size > 0) {
      image_url = await uploadImageIfPresent(imageFile, existingImageUrl)
    } else if (manualImageUrl) {
      image_url = manualImageUrl
    }

    if (!image_url) {
      return { error: 'È necessario caricare un\'immagine o fornire un URL' }
    }

    const tagsRaw = (formData.get('tags') as string) || ''
    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    const status_badge = (formData.get('status_badge') as string) || null
    const demo_url = (formData.get('demo_url') as string) || null
    const github_url = (formData.get('github_url') as string) || null
    const github_label = (formData.get('github_label') as string) || 'Codice GitHub'
    const is_private = formData.get('is_private') === 'true' || formData.get('is_private') === 'on'
    const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on'
    const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'
    const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)

    let title_en = (formData.get('title_en') as string) || ''
    let description_en = (formData.get('description_en') as string) || ''
    let github_label_en = (formData.get('github_label_en') as string) || ''
    let status_badge_en = (formData.get('status_badge_en') as string) || ''

    if (!title || !description) {
      return { error: 'Titolo e descrizione sono obbligatori' }
    }

    // Se i campi in lingua inglese non sono stati inseriti a mano, traduciamo automaticamente
    if (!title_en.trim() || !description_en.trim() || !github_label_en.trim() || (status_badge && !status_badge_en.trim())) {
      const autoTranslated = await translateProjectData({
        title,
        description,
        github_label,
        status_badge: status_badge || undefined,
      })

      if (!title_en.trim()) title_en = autoTranslated.title_en
      if (!description_en.trim()) description_en = autoTranslated.description_en
      if (!github_label_en.trim()) github_label_en = autoTranslated.github_label_en || 'GitHub Code'
      if (status_badge && !status_badge_en.trim()) status_badge_en = autoTranslated.status_badge_en
    }

    const supabase = createAdminClient()
    const { error } = await supabase
      .from('projects')
      .update({
        title,
        description,
        image_url,
        tags,
        status_badge,
        demo_url,
        github_url,
        github_label,
        title_en: title_en.trim() || null,
        description_en: description_en.trim() || null,
        github_label_en: github_label_en.trim() || null,
        status_badge_en: status_badge_en.trim() || null,
        is_private,
        featured,
        visible,
        sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/[locale]', 'layout')
    revalidatePath('/admin/projects')
    revalidatePath('/admin')
    revalidatePath('/sitemap.xml')
    return { success: true }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Errore durante l\'aggiornamento del progetto' }
  }
}

export async function deleteProject(id: string) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/projects')
  revalidatePath('/admin')
  revalidatePath('/sitemap.xml')
  return { success: true }
}

export async function toggleProjectVisibility(id: string, currentVisible: boolean) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('projects')
    .update({ visible: !currentVisible, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/projects')
  revalidatePath('/sitemap.xml')
  return { success: true }
}

export async function toggleProjectFeatured(id: string, currentFeatured: boolean) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('projects')
    .update({ featured: !currentFeatured, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/projects')
  return { success: true }
}

export async function saveProjectCaseStudy({
  projectId,
  slug,
  caseStudyMd,
  caseStudyMdEn,
}: {
  projectId: string
  slug: string
  caseStudyMd: string
  caseStudyMdEn?: string
}) {
  try {
    const authCheck = await verifyAdminSession()
    if (!authCheck.authorized) {
      return { error: authCheck.error || 'Non autorizzato' }
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)+/g, '')
    if (!cleanSlug) {
      return { error: 'Lo slug del progetto è obbligatorio per il caso di studio' }
    }

    const cleanMd = caseStudyMd.trim()
    let cleanMdEn = (caseStudyMdEn || '').trim()

    // Se la versione inglese è vuota, proviamo a tradurla automaticamente
    if (!cleanMdEn && cleanMd) {
      try {
        cleanMdEn = await translateMarkdownCaseStudy(cleanMd)
      } catch (err) {
        console.warn('[saveProjectCaseStudy] Traduzione automatica EN non riuscita o API key assente:', err)
        cleanMdEn = ''
      }
    }

    const supabase = createAdminClient()
    const { error } = await supabase
      .from('projects')
      .update({
        slug: cleanSlug,
        case_study_md: cleanMd || null,
        case_study_md_en: cleanMdEn || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/[locale]', 'layout')
    revalidatePath('/progetti/[slug]', 'page')
    revalidatePath(`/progetti/${cleanSlug}`)
    revalidatePath(`/en/progetti/${cleanSlug}`)
    revalidatePath('/admin/projects')
    revalidatePath('/sitemap.xml')
    return { success: true, slug: cleanSlug, caseStudyMdEn: cleanMdEn }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Errore durante il salvataggio del caso di studio' }
  }
}

export async function deleteProjectCaseStudy(projectId: string) {
  try {
    const authCheck = await verifyAdminSession()
    if (!authCheck.authorized) {
      return { error: authCheck.error || 'Non autorizzato' }
    }

    const supabase = createAdminClient()
    const { error } = await supabase
      .from('projects')
      .update({
        case_study_md: null,
        case_study_md_en: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/[locale]', 'layout')
    revalidatePath('/admin/projects')
    revalidatePath('/sitemap.xml')
    return { success: true }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Errore durante l\'eliminazione del caso di studio' }
  }
}

export async function translateCaseStudyMarkdownAction(markdown: string) {
  try {
    const authCheck = await verifyAdminSession()
    if (!authCheck.authorized) {
      return { error: authCheck.error || 'Non autorizzato' }
    }

    const translated = await translateMarkdownCaseStudy(markdown)
    return { success: true, translated }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Errore durante la traduzione del Markdown' }
  }
}

