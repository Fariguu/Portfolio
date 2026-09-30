"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAdminSession } from '@/lib/auth-guard'
import { revalidatePath, revalidateTag, updateTag } from 'next/cache'
import { translateSkillData } from '@/lib/translate'

function revalidateSkillCaches() {
  try {
    updateTag('skills')
  } catch {
    // Ignore in non-action context
  }
  try {
    revalidateTag('skills', 'default')
  } catch (err) {
    console.warn('[revalidateSkillCaches] revalidateTag failed:', err)
  }
  revalidatePath('/', 'layout')
  revalidatePath('/en', 'layout')
  revalidatePath('/[locale]', 'layout')
  revalidatePath('/competenze')
  revalidatePath('/en/competenze')
  revalidatePath('/admin/skills')
  revalidatePath('/admin')
}

export async function createSkill(formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const icon_name = (formData.get('icon_name') as string) || 'MonitorSmartphone'
  const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'

  if (!name || !description) {
    return { error: 'Nome e descrizione sono obbligatori' }
  }

  let name_en = (formData.get('name_en') as string) || ''
  let description_en = (formData.get('description_en') as string) || ''

  if (!name_en.trim() || !description_en.trim()) {
    try {
      const auto = await translateSkillData({ name, description })
      if (!name_en.trim()) name_en = auto.name_en
      if (!description_en.trim()) description_en = auto.description_en
    } catch {
      // Fallback
    }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('skills').insert({
    name,
    description,
    name_en: name_en.trim() || null,
    description_en: description_en.trim() || null,
    icon_name,
    sort_order,
    visible,
  })

  if (error) {
    return { error: error.message }
  }

  revalidateSkillCaches()
  return { success: true }
}

export async function updateSkill(id: string, formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const icon_name = (formData.get('icon_name') as string) || 'MonitorSmartphone'
  const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'
  const autoTranslate = formData.get('auto_translate') === 'true'

  if (!name || !description) {
    return { error: 'Nome e descrizione sono obbligatori' }
  }

  let name_en = (formData.get('name_en') as string) || ''
  let description_en = (formData.get('description_en') as string) || ''

  if (autoTranslate || !name_en.trim() || !description_en.trim()) {
    try {
      const auto = await translateSkillData({ name, description })
      if (autoTranslate || !name_en.trim()) name_en = auto.name_en
      if (autoTranslate || !description_en.trim()) description_en = auto.description_en
    } catch {
      // Fallback
    }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('skills')
    .update({
      name,
      description,
      name_en: name_en.trim() || null,
      description_en: description_en.trim() || null,
      icon_name,
      sort_order,
      visible,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidateSkillCaches()
  return { success: true }
}

export async function deleteSkill(id: string) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('skills').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidateSkillCaches()
  return { success: true }
}

export async function toggleSkillVisibility(id: string, currentVisible: boolean) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('skills')
    .update({ visible: !currentVisible, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidateSkillCaches()
  return { success: true }
}
