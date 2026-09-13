export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      skills: {
        Row: {
          id: string
          name: string
          description: string
          icon_name: string
          sort_order: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon_name?: string
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon_name?: string
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      journey_items: {
        Row: {
          id: string
          start_date: string
          end_date: string | null
          title: string
          institution: string
          description: string
          type: 'education' | 'certification' | 'milestone'
          tags: string[]
          link_label: string | null
          link_url: string | null
          sort_order: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          start_date: string
          end_date?: string | null
          title: string
          institution: string
          description: string
          type?: 'education' | 'certification' | 'milestone'
          tags?: string[]
          link_label?: string | null
          link_url?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          start_date?: string
          end_date?: string | null
          title?: string
          institution?: string
          description?: string
          type?: 'education' | 'certification' | 'milestone'
          tags?: string[]
          link_label?: string | null
          link_url?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          tags: string[]
          status_badge: string | null
          demo_url: string | null
          github_url: string | null
          github_label: string | null
          title_en: string | null
          description_en: string | null
          github_label_en: string | null
          status_badge_en: string | null
          slug: string | null
          case_study_md: string | null
          case_study_md_en: string | null
          is_private: boolean
          featured: boolean
          visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          tags?: string[]
          status_badge?: string | null
          demo_url?: string | null
          github_url?: string | null
          github_label?: string | null
          title_en?: string | null
          description_en?: string | null
          github_label_en?: string | null
          status_badge_en?: string | null
          slug?: string | null
          case_study_md?: string | null
          case_study_md_en?: string | null
          is_private?: boolean
          featured?: boolean
          visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          tags?: string[]
          status_badge?: string | null
          demo_url?: string | null
          github_url?: string | null
          github_label?: string | null
          title_en?: string | null
          description_en?: string | null
          github_label_en?: string | null
          status_badge_en?: string | null
          slug?: string | null
          case_study_md?: string | null
          case_study_md_en?: string | null
          is_private?: boolean
          featured?: boolean
          visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          id: string
          question_it: string
          answer_it: string
          question_en: string | null
          answer_en: string | null
          sort_order: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question_it: string
          answer_it: string
          question_en?: string | null
          answer_en?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question_it?: string
          answer_it?: string
          question_en?: string | null
          answer_en?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          author_name: string
          role_or_project_it: string
          role_or_project_en: string | null
          quote_it: string
          quote_en: string | null
          rating: number
          date: string
          avatar_url: string | null
          company_logo_url: string | null
          company_url: string | null
          project_slug: string | null
          sort_order: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_name: string
          role_or_project_it: string
          role_or_project_en?: string | null
          quote_it: string
          quote_en?: string | null
          rating?: number
          date: string
          avatar_url?: string | null
          company_logo_url?: string | null
          company_url?: string | null
          project_slug?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          role_or_project_it?: string
          role_or_project_en?: string | null
          quote_it?: string
          quote_en?: string | null
          rating?: number
          date?: string
          avatar_url?: string | null
          company_logo_url?: string | null
          company_url?: string | null
          project_slug?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          id: string
          headline_it: string | null
          headline_en: string | null
          bio_it: string
          bio_en: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          headline_it?: string | null
          headline_en?: string | null
          bio_it: string
          bio_en?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          headline_it?: string | null
          headline_en?: string | null
          bio_it?: string
          bio_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Skill = Database['public']['Tables']['skills']['Row']
export type JourneyItem = Database['public']['Tables']['journey_items']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type FAQItem = Database['public']['Tables']['faqs']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type Profile = Database['public']['Tables']['profile']['Row']

