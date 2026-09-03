import { createAdminClient } from '@/lib/supabase/admin'
import { SkillsManager } from './skills-manager'

export const dynamic = 'force-dynamic'

export default async function AdminSkillsPage() {
  const supabase = createAdminClient()
  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <SkillsManager initialSkills={skills || []} />
    </div>
  )
}
