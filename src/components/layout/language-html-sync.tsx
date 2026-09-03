"use client";

import * as React from "react";
import type { Locale } from "@/lib/i18n/config";

export function LanguageHtmlSync({ locale }: { locale: Locale }) {
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
