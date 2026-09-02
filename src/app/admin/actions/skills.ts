"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAdminSession } from '@/lib/auth-guard'
import { revalidatePath } from 'next/cache'

export async function createSkill(formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const icon_name = (formData.get('icon_name') as string) || 'MonitorSmartphone'
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'

  if (!name || !description) {
    return { error: 'Nome e descrizione sono obbligatori' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('skills').insert({
    name,
    description,
    icon_name,
    sort_order,
    visible,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/skills')
  revalidatePath('/admin')
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
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'

  if (!name || !description) {
    return { error: 'Nome e descrizione sono obbligatori' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('skills')
    .update({
      name,
      description,
      icon_name,
      sort_order,
      visible,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/skills')
  revalidatePath('/admin')
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

  revalidatePath('/')
  revalidatePath('/admin/skills')
  revalidatePath('/admin')
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

  revalidatePath('/')
  revalidatePath('/admin/skills')
  return { success: true }
}
