import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { VercelAnalytics } from "@/components/analytics/vercel-analytics";
import { getBaseUrl } from "@/lib/url";
import { siteConfig } from "@/lib/seo.config";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: siteConfig.title.default,
    template: siteConfig.title.template,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.creator, url: siteConfig.socials.github }],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {/* Google Analytics caricato su interaction o idle per non bloccare il caricamento critico (FCP/LCP/TBT) */}
        <GoogleAnalytics measurementId="G-0PDN3595Y5" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <VercelAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
