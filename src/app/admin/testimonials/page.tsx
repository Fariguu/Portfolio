import { createAdminClient } from '@/lib/supabase/admin'
import { TestimonialsManager } from './testimonials-manager'

export const dynamic = 'force-dynamic'

export default async function AdminTestimonialsPage() {
  const supabase = createAdminClient()
  
  const [{ data: testimonials }, { data: projects }] = await Promise.all([
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true }),
    supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true }),
  ])

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <TestimonialsManager
        initialTestimonials={testimonials || []}
        availableProjects={projects || []}
      />
    </div>
  )
}
