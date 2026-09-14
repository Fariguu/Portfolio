import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Database } from "@/lib/database.types";

type Skill = Database["public"]["Tables"]["skills"]["Row"];
type JourneyItem = Database["public"]["Tables"]["journey_items"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
type Faq = Database["public"]["Tables"]["faqs"]["Row"];
type Profile = Database["public"]["Tables"]["profile"]["Row"];

export const getCachedSkills = unstable_cache(
  async (): Promise<Skill[] | null> => {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // Fallback silenzioso
    }
    return null;
  },
  ["public-skills"],
  { revalidate: 3600, tags: ["skills"] }
);

export const getCachedJourney = unstable_cache(
  async (): Promise<JourneyItem[] | null> => {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("journey_items")
        .select("*")
        .eq("visible", true)
        .order("start_date", { ascending: true })
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // Fallback silenzioso
    }
    return null;
  },
  ["public-journey"],
  { revalidate: 3600, tags: ["journey"] }
);

export const getCachedProjects = unstable_cache(
  async (): Promise<Project[] | null> => {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // Fallback silenzioso
    }
    return null;
  },
  ["public-projects"],
  { revalidate: 3600, tags: ["projects"] }
);

export interface CachedTestimonialsResult {
  testimonials: Testimonial[];
  validCaseStudySlugs: string[];
}

export const getCachedTestimonials = unstable_cache(
  async (): Promise<CachedTestimonialsResult> => {
    try {
      const supabase = createPublicClient();
      const { data: testimonials, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      if (error || !testimonials) {
        return { testimonials: [], validCaseStudySlugs: [] };
      }

      let validCaseStudySlugs: string[] = [];
      if (testimonials.length > 0) {
        const { data: projectsData } = await supabase
          .from("projects")
          .select("slug, case_study_md, case_study_md_en")
          .eq("visible", true);

        if (projectsData) {
          validCaseStudySlugs = projectsData
            .filter(
              (p) =>
                Boolean(
                  (p.case_study_md && p.case_study_md.trim().length > 0) ||
                    (p.case_study_md_en && p.case_study_md_en.trim().length > 0)
                ) && Boolean(p.slug)
            )
            .map((p) => p.slug as string);
        }
      }

      return { testimonials, validCaseStudySlugs };
    } catch {
      return { testimonials: [], validCaseStudySlugs: [] };
    }
  },
  ["public-testimonials"],
  { revalidate: 3600, tags: ["testimonials", "projects"] }
);

export const getCachedFaqs = unstable_cache(
  async (): Promise<Faq[] | null> => {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // Fallback silenzioso
    }
    return null;
  },
  ["public-faqs"],
  { revalidate: 3600, tags: ["faqs"] }
);

export const getCachedProfile = unstable_cache(
  async (): Promise<Profile | null> => {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", "main")
        .single();
      if (!error && data) {
        return data;
      }
    } catch {
      // Fallback silenzioso
    }
    return null;
  },
  ["public-profile"],
  { revalidate: 3600, tags: ["profile"] }
);
