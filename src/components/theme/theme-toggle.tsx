"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  readonly className?: string;
  readonly showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: Readonly<ThemeToggleProps>) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={showLabel ? "default" : "icon"}
        className={`h-9 rounded-full ${showLabel ? "px-3 justify-start gap-2" : "w-9"} ${className || ""}`}
        aria-label="Cambia tema"
      >
        <span className="h-4 w-4" />
        {showLabel && <span className="text-sm">Tema</span>}
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size={showLabel ? "default" : "icon"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`h-9 rounded-full relative transition-colors ${
        showLabel ? "px-3 justify-start gap-2.5 w-full" : "w-9"
      } ${className || ""}`}
      title={isDark ? "Attiva tema chiaro" : "Attiva tema scuro"}
      aria-label="Alterna tema chiaro/scuro"
    >
      <div className="relative h-4 w-4 flex items-center justify-center">
        <Sun
          className={`h-4 w-4 transition-all duration-300 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-amber-600"
          }`}
        />
        <Moon
          className={`absolute h-4 w-4 transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-[#88fc9d]"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium">
          {isDark ? "Tema Scuro" : "Tema Chiaro"}
        </span>
      )}
      <span className="sr-only">Alterna tema chiaro e scuro</span>
    </Button>
  );
}
