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

  const handleToggle = () => {
    const isDark =
      typeof document !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : resolvedTheme === "dark";
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size={showLabel ? "default" : "icon"}
      onClick={handleToggle}
      className={`h-9 rounded-full relative transition-colors ${
        showLabel ? "px-3 justify-start gap-2.5 w-full" : "w-9"
      } ${className || ""}`}
      title="Alterna tema chiaro/scuro"
      aria-label="Alterna tema chiaro/scuro"
    >
      <div className="relative h-4 w-4 flex items-center justify-center">
        <Sun className="h-4 w-4 transition-transform duration-300 dark:hidden text-amber-600" />
        <Moon className="h-4 w-4 transition-transform duration-300 hidden dark:block text-[#88fc9d]" />
      </div>
      {showLabel && (
        <span className="text-sm font-medium">
          <span className="dark:hidden">Tema Chiaro</span>
          <span className="hidden dark:inline">Tema Scuro</span>
        </span>
      )}
      <span className="sr-only">Alterna tema chiaro e scuro</span>
    </Button>
  );
}
