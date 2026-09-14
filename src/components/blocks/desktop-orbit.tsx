"use client";

import * as React from "react";

export function DesktopOrbit() {
  const [OrbitComponent, setOrbitComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    // Carica SaturnOrbit unicamente se il viewport è desktop (>= 768px).
    // Su mobile (< 768px), non viene scaricato né valutato alcun byte di JS.
    const checkViewport = () => {
      if (window.innerWidth >= 768) {
        import("./saturn-orbit").then((mod) => {
          setOrbitComponent(() => mod.SaturnOrbit);
        });
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (!OrbitComponent) {
    return null;
  }

  return <OrbitComponent />;
}
