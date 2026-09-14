"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  readonly measurementId: string;
}

/**
 * Caricamento differito di Google Analytics (GTM / gtag.js)
 * Non viene scaricato ne eseguito durante il caricamento critico (FCP/LCP).
 * Viene iniettato solo alla prima interazione dell'utente (scroll, tocco, pointer)
 * oppure quando la CPU del browser e in idle dopo 3.5 secondi.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const onUserInteraction = () => {
      setShouldLoad(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };

    window.addEventListener("scroll", onUserInteraction, { passive: true, once: true });
    window.addEventListener("pointerdown", onUserInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true, once: true });
    window.addEventListener("keydown", onUserInteraction, { passive: true, once: true });

    let idleId: number | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    if ("requestIdleCallback" in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opt: { timeout: number }) => number }).requestIdleCallback(
        () => {
          setShouldLoad(true);
          cleanup();
        },
        { timeout: 3500 }
      );
    } else {
      timeoutId = setTimeout(() => {
        setShouldLoad(true);
        cleanup();
      }, 3500);
    }

    return () => {
      cleanup();
      if (idleId && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
