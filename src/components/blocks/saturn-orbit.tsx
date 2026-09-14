"use client";

import React, { useEffect, useRef, useState, useId, useSyncExternalStore } from "react";
import { TECH_ITEMS, getInitialOrbitStyle } from "@/lib/tech-stack";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function SaturnOrbit() {
  const uniqueId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const rotationRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const [dimensions, setDimensions] = useState({ rx: 540, ry: 220 });
  const [isInView, setIsInView] = useState(true);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Rilevamento e calcolo raggio responsive (solo desktop)
  useEffect(() => {
    function updateDimensions() {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      if (width < 768) return;

      if (width < 1024) {
        setDimensions({ rx: Math.min(width * 0.44, 390), ry: 195 });
      } else {
        setDimensions({ rx: Math.min(width * 0.46, 540), ry: 220 });
      }
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // IntersectionObserver: azzera il loop rAF quando la hero non è nel viewport
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Monitoraggio dello scroll per l'effetto cinematico (solo desktop)
  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current || window.innerWidth < 768) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      const scrollDistance = Math.max(0, -rect.top);
      const progress = Math.min(1, scrollDistance / (windowHeight * 0.7));
      scrollProgressRef.current = progress;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loop di animazione a 60fps con requestAnimationFrame (solo desktop in view senza reduced-motion)
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768 || !isInView || prefersReducedMotion) return;

    let animId: number;
    let lastTime = performance.now();
    const durationSeconds = 56; // Rivoluzione lenta, distensiva ed elegante

    function step(now: number) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Avanzamento rotazione continuo
      rotationRef.current = (rotationRef.current + ((2 * Math.PI) / durationSeconds) * delta) % (2 * Math.PI);

      const currentRot = rotationRef.current;
      const totalItems = TECH_ITEMS.length;
      const scrollProg = scrollProgressRef.current;

      // Effetto allargamento: moltiplica i raggi fino a 2.8x ed esegue il fade-out
      const expansionFactor = 1 + scrollProg * 1.8;
      const currentRx = dimensions.rx * expansionFactor;
      const currentRy = dimensions.ry * expansionFactor;
      const scrollFadeOpacity = Math.max(0, 1 - scrollProg * 1.3);

      itemsRef.current.forEach((el, index) => {
        if (!el) return;

        const baseAngle = (index / totalItems) * 2 * Math.PI;
        const angle = (baseAngle + currentRot) % (2 * Math.PI);

        const x = Math.cos(angle) * currentRx;
        const y = Math.sin(angle) * currentRy;

        // Profondità: sin(angle) > 0 davanti (sotto nello schermo), sin(angle) < 0 dietro (sopra)
        const depth = Math.sin(angle);

        let scale: number;
        let opacity: number;

        if (depth >= 0) {
          scale = 0.95 + depth * 0.12;
          opacity = 0.85 + depth * 0.15;
        } else {
          const absDepth = Math.abs(depth);
          scale = 0.95 - absDepth * 0.22;
          opacity = 0.85 - absDepth * 0.48;
        }

        const zoomScale = scale * (1 + scrollProg * 0.6);
        const finalOpacity = opacity * scrollFadeOpacity;
        const zIndex = depth >= 0 ? 25 : 5;

        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0px) scale(${zoomScale.toFixed(2)})`;
        el.style.opacity = finalOpacity.toFixed(2);
        el.style.zIndex = `${zIndex}`;
        el.style.pointerEvents = scrollProg > 0.6 ? "none" : "auto";
      });

      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [dimensions, isInView, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hidden md:block absolute inset-0 pointer-events-none z-20 select-none overflow-visible"
    >
      {TECH_ITEMS.map((item, index) => (
        <div
          key={item.name}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          style={getInitialOrbitStyle(index)}
          className="absolute top-1/2 left-1/2 pointer-events-auto will-change-transform cursor-default group"
        >
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl backdrop-blur-xs transition-all duration-200 hover:scale-115">
            <div className="w-4 h-4 flex items-center justify-center shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-120">
              {item.svg(`orbit-${uniqueId}-${index}`)}
            </div>
            <span className="text-xs font-semibold tracking-wide text-foreground/85 group-hover:text-brand-accent transition-colors duration-200 whitespace-nowrap">
              {item.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
