"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAdminSession } from '@/lib/auth-guard'
import { revalidatePath } from 'next/cache'
import { translateFAQData } from '@/lib/translate'

export async function translateFAQFields(formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const question_it = (formData.get('question_it') as string) || ''
  const answer_it = (formData.get('answer_it') as string) || ''

  if (!question_it && !answer_it) {
    return { error: 'Inserisci almeno la domanda o la risposta in italiano per avviare la traduzione' }
  }

  try {
    const translation = await translateFAQData({ question_it, answer_it })
    return { success: true, translation }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Errore durante la traduzione' }
  }
}

export async function createFAQ(formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const question_it = formData.get('question_it') as string
  const answer_it = formData.get('answer_it') as string
  const question_en = (formData.get('question_en') as string) || null
  const answer_en = (formData.get('answer_en') as string) || null
  const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'

  if (!question_it || !answer_it) {
    return { error: 'Domanda e risposta in italiano sono obbligatorie' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('faqs').insert({
    question_it,
    answer_it,
    question_en,
    answer_en,
    sort_order,
    visible,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/admin/faq')
  revalidatePath('/admin')
  return { success: true }
}

export async function updateFAQ(id: string, formData: FormData) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const question_it = formData.get('question_it') as string
  const answer_it = formData.get('answer_it') as string
  const question_en = (formData.get('question_en') as string) || null
  const answer_en = (formData.get('answer_en') as string) || null
  const sort_order = Number.parseInt((formData.get('sort_order') as string) || '0', 10)
  const visible = formData.get('visible') === 'true' || formData.get('visible') === 'on'

  if (!question_it || !answer_it) {
    return { error: 'Domanda e risposta in italiano sono obbligatorie' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('faqs')
    .update({
      question_it,
      answer_it,
      question_en,
      answer_en,
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
  revalidatePath('/admin/faq')
  revalidatePath('/admin')
  return { success: true }
}

export async function deleteFAQ(id: string) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('faqs').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/admin/faq')
  revalidatePath('/admin')
  return { success: true }
}

export async function toggleFAQVisibility(id: string, currentVisible: boolean) {
  const authCheck = await verifyAdminSession()
  if (!authCheck.authorized) {
    return { error: authCheck.error || 'Non autorizzato' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('faqs')
    .update({ visible: !currentVisible, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/admin/faq')
  return { success: true }
}
