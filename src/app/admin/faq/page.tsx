import { createAdminClient } from '@/lib/supabase/admin'
import { FAQManager } from './faq-manager'

export const dynamic = 'force-dynamic'

export default async function AdminFAQPage() {
  const supabase = createAdminClient()
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <FAQManager initialFaqs={faqs || []} />
    </div>
  )
}
