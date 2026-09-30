"use client";

import * as React from "react";
import { Sparkles, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomDockProps {
  readonly dict: {
    readonly skills: string;
    readonly journey: string;
    readonly projects: string;
  };
}

export function MobileBottomDock({ dict }: Readonly<MobileBottomDockProps>) {
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  // Monitora la sezione attiva via IntersectionObserver
  React.useEffect(() => {
    const sectionIds = ["competenze", "percorso", "progetti"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.2, rootMargin: "-20% 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Gestione click: scroll fluido verso la sezione corrispondente
  const handleClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined" && window.history?.pushState) {
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  const navItems = [
    { id: "competenze", label: dict.skills, icon: Sparkles },
    { id: "percorso", label: dict.journey, icon: GraduationCap },
    { id: "progetti", label: dict.projects, icon: Briefcase },
  ];

  return (
    <nav
      aria-label="Navigazione rapida mobile"
      className={cn(
        "fixed bottom-3.5 left-1/2 -translate-x-1/2 z-50 md:hidden",
        "transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full border border-border/80 bg-card/85 backdrop-blur-xl shadow-xl shadow-black/10 dark:shadow-black/40 ring-1 ring-white/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 select-none",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-primary-foreground" : "text-brand-accent")} />
              <span className="capitalize">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
