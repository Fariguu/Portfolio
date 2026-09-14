"use client";

import * as React from "react";

export function PwaManifest() {
  React.useEffect(() => {
    // Inietta il manifest solo dopo che la pagina ha completato il caricamento critico (idle)
    const addManifest = () => {
      if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement("link");
        link.rel = "manifest";
        link.href = "/manifest.webmanifest";
        document.head.appendChild(link);
      }
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(addManifest, { timeout: 3000 });
      } else {
        setTimeout(addManifest, 1500);
      }
    }
  }, []);

  return null;
}
