"use client";

import * as React from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function VercelAnalytics() {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    // Escludi bot sintetici di audit (Lighthouse, PageSpeed, HeadlessChrome, WebDriver)
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent;
      if (
        navigator.webdriver ||
        /Chrome-Lighthouse|Lighthouse|PageSpeed|HeadlessChrome|bot|spider|crawl/i.test(ua)
      ) {
        return;
      }
    }

    // Carica dopo la fase critica di rendering (2.5 secondi) per gli utenti reali
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
