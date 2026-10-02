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

  // Monitora la sezione attiva via IntersectionObserver e resetta quando si è nella Hero (solo viewport mobile)
  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const sectionIds = ["chi-sono", "competenze", "percorso", "progetti"];

    // Singola istanza IntersectionObserver per tutte le sezioni
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "chi-sono" || window.scrollY < 180) {
              setActiveSection((prev) => (prev ? "" : prev));
            } else {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.25, rootMargin: "-15% 0px -35% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    let ticking = false;
    const checkHeroScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY < 180) {
          setActiveSection((prev) => (prev ? "" : prev));
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", checkHeroScroll, { passive: true });
    checkHeroScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkHeroScroll);
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
      className="fixed bottom-3.5 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-300 ease-in-out"
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
                "flex items-center gap-1.5 px-3.5 py-2.5 min-h-[40px] rounded-full text-xs font-medium transition-all duration-200 active:scale-95 select-none",
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
