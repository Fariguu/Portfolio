import { createAdminClient } from '@/lib/supabase/admin'
import { ProjectsManager } from './projects-manager'

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  const supabase = createAdminClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ProjectsManager initialProjects={projects || []} />
    </div>
  )
}
