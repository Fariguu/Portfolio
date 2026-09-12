"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAdminSession } from '@/lib/auth-guard'
import { revalidatePath } from 'next/cache'
import { translateTestimonialData } from '@/lib/translate'

export async function translateTestimonialFields(formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const role_or_project_it = (formData.get('role_or_project_it') as string) || ''
  const quote_it = (formData.get('quote_it') as string) || ''

  if (!role_or_project_it && !quote_it) {
    return { error: 'Inserisci almeno il ruolo/commessa o il testo della recensione in italiano' }
  }

  try {
    const translation = await translateTestimonialData({ role_or_project_it, quote_it })
    return { success: true, translation }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Errore durante la traduzione con AI' }
  }
}

export async function createTestimonial(formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const author_name = (formData.get('author_name') as string)?.trim()
  const role_or_project_it = (formData.get('role_or_project_it') as string)?.trim()
  const role_or_project_en = (formData.get('role_or_project_en') as string)?.trim() || null
  const quote_it = (formData.get('quote_it') as string)?.trim()
  const quote_en = (formData.get('quote_en') as string)?.trim() || null
  const rating = Math.min(5, Math.max(1, Number.parseInt((formData.get('rating') as string) || '5', 10)))
  const date = (formData.get('date') as string)?.trim() || new Date().toISOString().slice(0, 7)
  const avatar_url = (formData.get('avatar_url') as string)?.trim() || null
  const company_logo_url = (formData.get('company_logo_url') as string)?.trim() || null
  const company_url = (formData.get('company_url') as string)?.trim() || null
  const project_slug = (formData.get('project_slug') as string)?.trim() || null
  const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'

  if (!author_name || !role_or_project_it || !quote_it) {
    return { error: 'Nome autore, ruolo/commessa e recensione in italiano sono campi obbligatori' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('testimonials').insert({
    author_name,
    role_or_project_it,
    role_or_project_en,
    quote_it,
    quote_en,
    rating,
    date,
    avatar_url,
    company_logo_url,
    company_url,
    project_slug,
    sort_order,
    visible,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/admin/testimonials')
  revalidatePath('/admin')
  return { success: true }
}

export async function updateTestimonial(id: string, formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const author_name = (formData.get('author_name') as string)?.trim()
  const role_or_project_it = (formData.get('role_or_project_it') as string)?.trim()
  const role_or_project_en = (formData.get('role_or_project_en') as string)?.trim() || null
  const quote_it = (formData.get('quote_it') as string)?.trim()
  const quote_en = (formData.get('quote_en') as string)?.trim() || null
  const rating = Math.min(5, Math.max(1, Number.parseInt((formData.get('rating') as string) || '5', 10)))
  const date = (formData.get('date') as string)?.trim() || new Date().toISOString().slice(0, 7)
  const avatar_url = (formData.get('avatar_url') as string)?.trim() || null
  const company_logo_url = (formData.get('company_logo_url') as string)?.trim() || null
  const company_url = (formData.get('company_url') as string)?.trim() || null
  const project_slug = (formData.get('project_slug') as string)?.trim() || null
  const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'

  if (!author_name || !role_or_project_it || !quote_it) {
    return { error: 'Nome autore, ruolo/commessa e recensione in italiano sono campi obbligatori' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('testimonials')
    .update({
      author_name,
      role_or_project_it,
      role_or_project_en,
      quote_it,
      quote_en,
      rating,
      date,
      avatar_url,
      company_logo_url,
      company_url,
      project_slug,
      sort_order,
      visible,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/admin/testimonials')
  revalidatePath('/admin')
  return { success: true }
}

export async function deleteTestimonial(id: string) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/admin/testimonials')
  revalidatePath('/admin')
  return { success: true }
}

export async function toggleTestimonialVisibility(id: string, visible: boolean) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('testimonials')
    .update({ visible, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/admin/testimonials')
  revalidatePath('/admin')
  return { success: true }
}

export async function reorderTestimonials(items: { id: string; sort_order: number }[]) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const updates = items.map((item) =>
    supabase
      .from('testimonials')
      .update({ sort_order: item.sort_order, updated_at: new Date().toISOString() })
      .eq('id', item.id)
  )

  const results = await Promise.all(updates)
  const failed = results.find((r) => r.error)
  if (failed?.error) {
    return { error: failed.error.message }
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/admin/testimonials')
  revalidatePath('/admin')
  return { success: true }
}
