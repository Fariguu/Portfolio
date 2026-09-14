"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const SaturnOrbit = dynamic(
  () => import("./saturn-orbit").then((mod) => mod.SaturnOrbit),
  { ssr: false }
);

export function DesktopOrbit() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    // Carica SaturnOrbit unicamente se il viewport è desktop (>= 768px).
    // Su mobile (< 768px), il modulo saturn-orbit e le sue icone non vengono neppure scaricati.
    const checkViewport = () => {
      if (window.innerWidth >= 768) {
        setIsDesktop(true);
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (!isDesktop) {
    return null;
  }

  return <SaturnOrbit />;
}
