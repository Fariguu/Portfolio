"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  readonly className?: string;
  readonly showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: Readonly<ThemeToggleProps>) {
  const { setTheme, resolvedTheme } = useTheme();
  const isTransitioningRef = React.useRef(false);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const isDark =
      typeof document !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : resolvedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    const doc = document as Document & {
      startViewTransition?: (callback: () => void | Promise<void>) => {
        ready: Promise<void>;
      };
    };

    // Fallback immediato se View Transitions non sono supportate o se l'utente richiede reduced motion
    if (
      typeof window === "undefined" ||
      !doc.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    // Coordinate del centro del pulsante
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Raggio massimo per coprire l'angolo più lontano del viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready
      .then(() => {
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 450,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );

        animation.onfinish = () => {
          isTransitioningRef.current = false;
        };
      })
      .catch(() => {
        isTransitioningRef.current = false;
      });
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
        <Sun className="h-4 w-4 transition-transform duration-300 dark:hidden text-amber-600" aria-hidden="true" />
        <Moon className="h-4 w-4 transition-transform duration-300 hidden dark:block text-[#88fc9d]" aria-hidden="true" />
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
