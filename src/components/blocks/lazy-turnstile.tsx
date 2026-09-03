"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((m) => m.Turnstile),
  {
    ssr: false,
    loading: () => <div className="h-[65px] w-full" aria-hidden="true" />,
  }
);

interface LazyTurnstileProps {
  readonly siteKey: string;
  readonly onSuccess: (token: string) => void;
  readonly onError: () => void;
  readonly onExpire: () => void;
}

export function LazyTurnstile({
  siteKey,
  onSuccess,
  onError,
  onExpire,
}: Readonly<LazyTurnstileProps>) {
  const [shouldRender, setShouldRender] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Se IntersectionObserver non è supportato, renderizza subito
    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="pt-1 flex justify-center sm:justify-start min-h-[65px]">
      {shouldRender ? (
        <Turnstile
          siteKey={siteKey}
          onSuccess={onSuccess}
          onError={onError}
          onExpire={onExpire}
          options={{
            theme: "auto",
            size: "flexible",
          }}
        />
      ) : (
        <div className="h-[65px] w-full" aria-hidden="true" />
      )}
    </div>
  );
}
