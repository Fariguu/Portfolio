"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAdminSession } from '@/lib/auth-guard'
import { revalidatePath } from 'next/cache'

export async function createJourneyItem(formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const title = formData.get('title') as string
  const institution = formData.get('institution') as string
  const description = formData.get('description') as string
  const type = (formData.get('type') as any) || 'education'
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

  const supabase = createAdminClient()
  const { error } = await supabase.from('journey_items').insert({
    title,
    institution,
    description,
    type: type as 'education' | 'certification' | 'milestone',
    start_date,
    end_date,
    tags,
    link_label,
    link_url,
    sort_order,
    visible,
  } as any)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/journey')
  revalidatePath('/admin')
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
  const type = (formData.get('type') as any) || 'education'
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

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('journey_items')
    .update({
      title,
      institution,
      description,
      type: type as 'education' | 'certification' | 'milestone',
      start_date,
      end_date,
      tags,
      link_label,
      link_url,
      sort_order,
      visible,
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/journey')
  revalidatePath('/admin')
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

  revalidatePath('/')
  revalidatePath('/admin/journey')
  revalidatePath('/admin')
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

  revalidatePath('/')
  revalidatePath('/admin/journey')
  return { success: true }
}
