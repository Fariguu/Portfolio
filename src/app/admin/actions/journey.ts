"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAdminSession } from '@/lib/auth-guard'
import { revalidatePath, revalidateTag, updateTag } from 'next/cache'
import { translateJourneyData } from '@/lib/translate'

function revalidateJourneyCaches() {
  try {
    updateTag('journey')
  } catch {
    // Ignore in non-action context
  }
  try {
    revalidateTag('journey', 'default')
  } catch (err) {
    console.warn('[revalidateJourneyCaches] revalidateTag failed:', err)
  }
  revalidatePath('/', 'layout')
  revalidatePath('/en', 'layout')
  revalidatePath('/[locale]', 'layout')
  revalidatePath('/percorso')
  revalidatePath('/en/percorso')
  revalidatePath('/chi-sono')
  revalidatePath('/en/chi-sono')
  revalidatePath('/admin/journey')
  revalidatePath('/admin')
}

export async function createJourneyItem(formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const title = formData.get('title') as string
  const institution = formData.get('institution') as string
  const description = formData.get('description') as string
  const rawType = (formData.get('type') as string) || 'education'
  const type: 'education' | 'certification' | 'milestone' =
    rawType === 'certification' || rawType === 'milestone' ? rawType : 'education'
  const start_date = formData.get('start_date') as string
  const is_current = formData.get('is_current') === 'true' || formData.get('is_current') === 'on'
  const raw_end_date = formData.get('end_date') as string
  const end_date = is_current || !raw_end_date ? null : raw_end_date

  const tagsRaw = (formData.get('tags') as string) || ''
  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)

  const link_label = (formData.get('link_label') as string) || null
  const link_url = (formData.get('link_url') as string) || null
  const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'

  if (!title || !institution || !description || !start_date) {
    return { error: 'Titolo, istituzione, descrizione e data di inizio sono obbligatori' }
  }

  let title_en = (formData.get('title_en') as string) || ''
  let institution_en = (formData.get('institution_en') as string) || ''
  let description_en = (formData.get('description_en') as string) || ''
  let link_label_en = (formData.get('link_label_en') as string) || ''
  let tags_en: string[] = []

  if (!title_en.trim() || !institution_en.trim() || !description_en.trim()) {
    try {
      const auto = await translateJourneyData({
        title,
        institution,
        description,
        tags,
        link_label: link_label || undefined,
      })
      if (!title_en.trim()) title_en = auto.title_en
      if (!institution_en.trim()) institution_en = auto.institution_en
      if (!description_en.trim()) description_en = auto.description_en
      if (!link_label_en.trim()) link_label_en = auto.link_label_en
      tags_en = auto.tags_en
    } catch {
      tags_en = tags
    }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('journey_items').insert({
    title,
    institution,
    description,
    title_en: title_en.trim() || null,
    institution_en: institution_en.trim() || null,
    description_en: description_en.trim() || null,
    tags_en: tags_en.length > 0 ? tags_en : null,
    link_label_en: link_label_en.trim() || null,
    type,
    start_date,
    end_date,
    tags,
    link_label,
    link_url,
    sort_order,
    visible,
  })

  if (error) {
    return { error: error.message }
  }

  revalidateJourneyCaches()
  return { success: true }
}

export async function updateJourneyItem(id: string, formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const title = formData.get('title') as string
  const institution = formData.get('institution') as string
  const description = formData.get('description') as string
  const rawType = (formData.get('type') as string) || 'education'
  const type: 'education' | 'certification' | 'milestone' =
    rawType === 'certification' || rawType === 'milestone' ? rawType : 'education'
  const start_date = formData.get('start_date') as string
  const is_current = formData.get('is_current') === 'true' || formData.get('is_current') === 'on'
  const raw_end_date = formData.get('end_date') as string
  const end_date = is_current || !raw_end_date ? null : raw_end_date

  const tagsRaw = (formData.get('tags') as string) || ''
  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)

  const link_label = (formData.get('link_label') as string) || null
  const link_url = (formData.get('link_url') as string) || null
  const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'
  const autoTranslate = formData.get('auto_translate') === 'true'

  if (!title || !institution || !description || !start_date) {
    return { error: 'Titolo, istituzione, descrizione e data di inizio sono obbligatori' }
  }

  let title_en = (formData.get('title_en') as string) || ''
  let institution_en = (formData.get('institution_en') as string) || ''
  let description_en = (formData.get('description_en') as string) || ''
  let link_label_en = (formData.get('link_label_en') as string) || ''
  let tags_en: string[] = []

  if (autoTranslate || !title_en.trim() || !institution_en.trim() || !description_en.trim()) {
    try {
      const auto = await translateJourneyData({
        title,
        institution,
        description,
        tags,
        link_label: link_label || undefined,
      })
      if (autoTranslate || !title_en.trim()) title_en = auto.title_en
      if (autoTranslate || !institution_en.trim()) institution_en = auto.institution_en
      if (autoTranslate || !description_en.trim()) description_en = auto.description_en
      if (autoTranslate || !link_label_en.trim()) link_label_en = auto.link_label_en
      tags_en = auto.tags_en
    } catch {
      tags_en = tags
    }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('journey_items')
    .update({
      title,
      institution,
      description,
      title_en: title_en.trim() || null,
      institution_en: institution_en.trim() || null,
      description_en: description_en.trim() || null,
      tags_en: tags_en.length > 0 ? tags_en : null,
      link_label_en: link_label_en.trim() || null,
      type,
      start_date,
      end_date,
      tags,
      link_label,
      link_url,
      sort_order,
      visible,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidateJourneyCaches()
  return { success: true }
}

export async function deleteJourneyItem(id: string) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('journey_items').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidateJourneyCaches()
  return { success: true }
}

export async function toggleJourneyVisibility(id: string, currentVisible: boolean) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('journey_items')
    .update({ visible: !currentVisible, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidateJourneyCaches()
  return { success: true }
}
