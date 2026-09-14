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
  readonly userInteracted?: boolean;
}

export function LazyTurnstile({
  siteKey,
  onSuccess,
  onError,
  onExpire,
  userInteracted = false,
}: Readonly<LazyTurnstileProps>) {
  const [shouldRender, setShouldRender] = React.useState(false);

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

    if (userInteracted) {
      setShouldRender(true);
    }
  }, [userInteracted]);

  return (
    <div className="pt-1 flex justify-center sm:justify-start min-h-[65px]">
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
