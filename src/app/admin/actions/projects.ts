"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

async function uploadImageIfPresent(file: File | null, existingUrl?: string): Promise<string> {
  if (!file || file.size === 0) {
    return existingUrl || ''
  }

  const supabase = createAdminClient()
  const fileExt = file.name.split('.').pop() || 'png'
  const fileName = `projects/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error: uploadError } = await supabase.storage
    .from('portfolio-media')
    .upload(fileName, buffer, {
      contentType: file.type,
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

export async function createProject(formData: FormData) {
  try {
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
    const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10)

    if (!title || !description) {
      return { error: 'Titolo e descrizione sono obbligatori' }
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
      is_private,
      featured,
      visible,
      sort_order,
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/admin/projects')
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Errore durante il salvataggio del progetto' }
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
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
    const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10)

    if (!title || !description) {
      return { error: 'Titolo e descrizione sono obbligatori' }
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
    revalidatePath('/admin/projects')
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Errore durante l\'aggiornamento del progetto' }
  }
}

export async function deleteProject(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/projects')
  revalidatePath('/admin')
  return { success: true }
}

export async function toggleProjectVisibility(id: string, currentVisible: boolean) {
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
  return { success: true }
}

export async function toggleProjectFeatured(id: string, currentFeatured: boolean) {
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
