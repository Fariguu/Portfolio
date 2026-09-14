"use client";

import * as React from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function VercelAnalytics() {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
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

    return () => cleanup();
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
