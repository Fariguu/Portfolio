import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/url";
import { getAllCaseStudies } from "@/lib/data/case-studies";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const caseStudies = getAllCaseStudies();
  const slugs = new Set<string>(caseStudies.map((cs) => cs.slug));

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("slug")
      .not("case_study_md", "is", null)
      .eq("visible", true);

    if (data) {
      for (const p of data) {
        if (p.slug) slugs.add(p.slug);
      }
    }
  } catch {
    // Fallback static
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          it: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          it: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          it: `${baseUrl}/privacy`,
          en: `${baseUrl}/en/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          it: `${baseUrl}/privacy`,
          en: `${baseUrl}/en/privacy`,
        },
      },
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = Array.from(slugs).flatMap((projectSlug) => {
    const itUrl = `${baseUrl}/progetti/${projectSlug}`;
    const enUrl = `${baseUrl}/en/progetti/${projectSlug}`;
    const alternates = {
      languages: {
        it: itUrl,
        en: enUrl,
      },
    };

    return [
      {
        url: itUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates,
      },
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates,
      },
    ];
  });

  return [...staticRoutes, ...projectRoutes];
}
