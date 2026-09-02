import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gabriele Farigu | Sviluppatore Web & Software",
    short_name: "GF Portfolio",
    description:
      "Portfolio di Gabriele Farigu, sviluppatore web e software specializzato in Next.js, React, TypeScript e Supabase.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
