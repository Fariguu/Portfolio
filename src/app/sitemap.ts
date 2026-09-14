import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/url";
import { createPublicClient } from "@/lib/supabase/public";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const slugs = new Set<string>();

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("projects")
      .select("slug, case_study_md, case_study_md_en")
      .eq("visible", true);

    if (data) {
      for (const p of data) {
        const hasCaseStudy = Boolean(
          (p.case_study_md && p.case_study_md.trim().length > 0) ||
          (p.case_study_md_en && p.case_study_md_en.trim().length > 0)
        );
        if (p.slug && hasCaseStudy) {
          slugs.add(p.slug);
        }
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
    {
      url: `${baseUrl}/progetti`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          it: `${baseUrl}/progetti`,
          en: `${baseUrl}/en/progetti`,
        },
      },
    },
    {
      url: `${baseUrl}/en/progetti`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          it: `${baseUrl}/progetti`,
          en: `${baseUrl}/en/progetti`,
        },
      },
    },
    {
      url: `${baseUrl}/competenze`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          it: `${baseUrl}/competenze`,
          en: `${baseUrl}/en/competenze`,
        },
      },
    },
    {
      url: `${baseUrl}/en/competenze`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          it: `${baseUrl}/competenze`,
          en: `${baseUrl}/en/competenze`,
        },
      },
    },
    {
      url: `${baseUrl}/chi-sono`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          it: `${baseUrl}/chi-sono`,
          en: `${baseUrl}/en/chi-sono`,
        },
      },
    },
    {
      url: `${baseUrl}/en/chi-sono`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          it: `${baseUrl}/chi-sono`,
          en: `${baseUrl}/en/chi-sono`,
        },
      },
    },
    {
      url: `${baseUrl}/percorso`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          it: `${baseUrl}/percorso`,
          en: `${baseUrl}/en/percorso`,
        },
      },
    },
    {
      url: `${baseUrl}/en/percorso`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          it: `${baseUrl}/percorso`,
          en: `${baseUrl}/en/percorso`,
        },
      },
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          it: `${baseUrl}/contatti`,
          en: `${baseUrl}/en/contatti`,
        },
      },
    },
    {
      url: `${baseUrl}/en/contatti`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          it: `${baseUrl}/contatti`,
          en: `${baseUrl}/en/contatti`,
        },
      },
    },
    {
      url: `${baseUrl}/preventivo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          it: `${baseUrl}/preventivo`,
          en: `${baseUrl}/en/preventivo`,
        },
      },
    },
    {
      url: `${baseUrl}/en/preventivo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          it: `${baseUrl}/preventivo`,
          en: `${baseUrl}/en/preventivo`,
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
