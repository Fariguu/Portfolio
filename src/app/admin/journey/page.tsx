import { createAdminClient } from '@/lib/supabase/admin'
import { JourneyManager } from './journey-manager'

export const dynamic = 'force-dynamic'

export default async function AdminJourneyPage() {
  const supabase = createAdminClient()
  const { data: items } = await supabase
    .from('journey_items')
    .select('*')
    .order('start_date', { ascending: true })
    .order('sort_order', { ascending: true })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <JourneyManager initialItems={items || []} />
    </div>
  )
}
