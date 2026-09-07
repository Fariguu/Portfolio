"use client";

import React, { useEffect, useRef, useState, useId } from "react";

interface TechItem {
  name: string;
  svg: (id: string) => React.ReactNode;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: "Next.js",
    svg: (id) => (
      <svg viewBox="0 0 180 180" className="w-4 h-4 fill-foreground" aria-hidden="true">
        <mask height="180" id={`mask-next-${id}`} maskUnits="userSpaceOnUse" width="180" x="0" y="0">
          <circle cx="90" cy="90" fill="white" r="90" />
        </mask>
        <g mask={`url(#mask-next-${id})`}>
          <circle cx="90" cy="90" fill="currentColor" r="90" />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            fill={`url(#paint0_linear-${id})`}
          />
          <rect fill={`url(#paint1_linear-${id})`} height="72" width="12" x="115" y="54" />
        </g>
        <defs>
          <linearGradient id={`paint0_linear-${id}`} gradientUnits="userSpaceOnUse" x1="109" x2="144.5" y1="116.5" y2="160.5">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`paint1_linear-${id}`} gradientUnits="userSpaceOnUse" x1="121" x2="120.799" y1="54" y2="106.875">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "React",
    svg: () => (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4 h-4" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#58c4dc" />
        <g stroke="#58c4dc" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    svg: () => (
      <svg viewBox="0 0 128 128" className="w-4 h-4" aria-hidden="true">
        <rect width="128" height="128" rx="16" fill="#3178c6" />
        <path
          d="M110.2 92.4c-1.8 4.4-4.8 7.9-9.1 10.4-4.3 2.5-9.6 3.8-15.8 3.8-4.7 0-9.1-.8-13.1-2.4-4.1-1.6-7.5-4-10.2-7.1l9.1-8.5c3.5 4.1 7.7 6.2 12.6 6.2 3.1 0 5.6-.7 7.4-2.1 1.9-1.4 2.8-3.4 2.8-5.8 0-2-.8-3.6-2.3-4.9-1.5-1.3-4.4-2.7-8.7-4.2-5.4-1.9-9.6-4.2-12.7-7-3.1-2.8-4.6-6.6-4.6-11.4 0-5.1 1.9-9.3 5.6-12.6 3.7-3.3 8.7-5 14.9-5 4.3 0 8.3.7 12 2.2s6.8 3.5 9.3 6.1l-8.5 8.7c-3.1-3.2-6.7-4.8-10.9-4.8-2.6 0-4.7.6-6.3 1.9s-2.4 2.9-2.4 4.9c0 1.8.8 3.3 2.3 4.5 1.5 1.2 4.3 2.4 8.3 3.8 5.7 2 10.2 4.4 13.4 7.2 3.2 2.8 4.8 6.7 4.8 11.7.2 3.5-.7 6.4-2.6 8.7zm-49.8-32.9H44.6V105H31.8V59.5H16.1V48.1h44.3v11.4z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    svg: () => (
      <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
        <path
          d="M12 18c2-6 7-9 15-9 10 0 13 8 21 9-2 6-7 9-15 9-10 0-13-8-21-9zm-12 12c2-6 7-9 15-9 10 0 13 8 21 9-2 6-7 9-15 9-10 0-13-8-21-9z"
          fill="#38bdf8"
        />
      </svg>
    ),
  },
  {
    name: "Supabase",
    svg: (id) => (
      <svg viewBox="0 0 109 113" className="w-4 h-4" aria-hidden="true">
        <path
          d="M63.7076 110.284C60.848 113.885 55.0343 111.917 54.9453 107.319L54.474 82.9904C54.4447 81.4784 53.2201 80.2678 51.7077 80.2526L10.0531 79.8336C3.90483 79.7718 0.697471 72.4939 4.92055 68.0416L65.426 4.24925C68.2856 0.648261 74.0993 2.6166 74.1883 7.21446L74.457 31.5432C74.4737 33.0552 75.6983 34.2658 77.2107 34.281L118.663 34.7C124.811 34.7618 128.019 42.0397 123.796 46.492L63.7076 110.284Z"
          fill={`url(#supabase-grad-${id})`}
        />
        <defs>
          <linearGradient id={`supabase-grad-${id}`} x1="64" y1="0" x2="64" y2="113" gradientUnits="userSpaceOnUse">
            <stop stopColor="#24b47e" />
            <stop offset="1" stopColor="#3ecf8e" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    svg: () => (
      <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
        <path
          d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm8.6 28.5c-.8.8-2 1.3-3.4 1.3-1.8 0-3.3-.8-4.2-2.1-.4-.6-.7-1.3-.9-2.1-.4 1.1-1.1 2-2 2.7-1.1.9-2.6 1.4-4.2 1.4-1.9 0-3.5-.6-4.6-1.7-1.2-1.1-1.8-2.7-1.8-4.6 0-2.3 1-4.2 2.8-5.3 1.5-1 3.6-1.5 6.1-1.5h3.4v-1.8c0-1.2-.3-2.2-.9-2.8-.7-.7-1.8-1-3.2-1-1.2 0-2.3.3-3.1.8-.8.5-1.3 1.2-1.6 2l-3.2-1.4c.6-1.4 1.6-2.6 3-3.5 1.5-.9 3.2-1.4 5.2-1.4 2.6 0 4.7.7 6.1 2.1 1.4 1.4 2.1 3.5 2.1 6.2v8.8c0 .8.2 1.4.6 1.8.4.4.9.6 1.6.6.6 0 1.1-.2 1.5-.5.4-.3.7-.8.9-1.3l2.8 1.4c-.4.9-.9 1.7-1.7 2.4z"
          fill="#336791"
        />
      </svg>
    ),
  },
  {
    name: "Python",
    svg: () => (
      <svg viewBox="0 0 128 128" className="w-4 h-4" aria-hidden="true">
        <path
          d="M63.3 4c-15.8 0-25.1 6.9-25.1 20.3v10.5h25.7v3.5H23.5C9.8 38.3 0 48.7 0 63.8c0 15.6 9.4 25.1 22.9 25.1h8.2v-11.4c0-8.4 7.2-15.5 15.8-15.5h25.4c7.3 0 13.2-6.1 13.2-13.4V24.3C85.5 10.3 76.5 4 63.3 4zm-13.4 8.2c2.7 0 4.8 2.2 4.8 4.8s-2.2 4.8-4.8 4.8-4.8-2.2-4.8-4.8 2.1-4.8 4.8-4.8z"
          fill="#3776ab"
        />
        <path
          d="M64.7 124c15.8 0 25.1-6.9 25.1-20.3V93.2H64.1v-3.5h40.4c13.7 0 23.5-10.4 23.5-25.5 0-15.6-9.4-25.1-22.9-25.1h-8.2v11.4c0 8.4-7.2 15.5-15.8 15.5H55.7c-7.3 0-13.2 6.1-13.2 13.4v14.3c0 14 9 20.3 22.2 20.3zm13.4-8.2c-2.7 0-4.8-2.2-4.8-4.8s2.2-4.8 4.8-4.8 4.8 2.2 4.8 4.8-2.1 4.8-4.8 4.8z"
          fill="#ffd43b"
        />
      </svg>
    ),
  },
  {
    name: "Java",
    svg: () => (
      <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
        <path
          d="M21.2 40.5c-5.8-.3-10.7-1.4-14.7-3.1 0 0-1 .7 1.6 1.4 7.6 1.9 24.3 2.1 32.7-.2 0 0 .9-.8-.9-1-6.4-.6-12.8.2-18.7.9z"
          fill="#ea2d2e"
        />
        <path
          d="M19.1 36.3c-4.8-.2-9.4-1.2-13.8-2.8 0 0-1.1.7 1.5 1.3 6.9 1.6 22 1.8 30.6-.2 0 0 .9-.8-.9-1-5.7-.4-12 .4-17.4.7z"
          fill="#ea2d2e"
        />
        <path
          d="M25.4 23.8c2.1 2.3.6 4.3.6 4.3s5.4-2.8 2.8-6.1c-2.4-3.1-4.3-4.6-8.8-7.5-1.5-.9-2.9-1.9-2.9-1.9s.7 1.2 2 2.1c5.2 3.6 4.5 7 6.3 9.1z"
          fill="#5382a1"
        />
        <path
          d="M36.1 32.2c.4.3 1 .5 1.5.8 5.6-2.9 8.2-6.5 4.3-10.4-1.1-1.1-2.9-1.7-4.4-1.8.8 1 1.4 2.1 1.6 3.4 1 5-4.2 6.6-3 8z"
          fill="#ea2d2e"
        />
      </svg>
    ),
  },
  {
    name: "C Lang",
    svg: () => (
      <svg viewBox="0 0 128 128" className="w-4 h-4" aria-hidden="true">
        <path
          d="M116.6 89.2c-7.3 18.7-25.2 32-46.3 32-27.6 0-50-22.4-50-50s22.4-50 50-50c20.5 0 38 12.5 45.7 30.5l-19.8 8.1C91.9 46.8 80 38.8 70.3 38.8c-17.9 0-32.4 14.5-32.4 32.4s14.5 32.4 32.4 32.4c9.9 0 21.7-8.1 25.9-20.9l20.4 6.5z"
          fill="#00599C"
        />
        <path
          d="M70.3 46.8c13.5 0 24.4 11 24.4 24.4s-11 24.4-24.4 24.4-24.4-11-24.4-24.4 11-24.4 24.4-24.4m0-8c-17.9 0-32.4 14.5-32.4 32.4s14.5 32.4 32.4 32.4 32.4-14.5 32.4-32.4-14.5-32.4-32.4-32.4z"
          fill="#659AD2"
        />
      </svg>
    ),
  },
  {
    name: "Leaflet",
    svg: () => (
      <svg viewBox="0 0 100 100" className="w-4 h-4" aria-hidden="true">
        <path
          d="M49.9 5.8c-1.8 0-3.4 1.1-4.1 2.8L12.5 86.8c-.8 1.9-.3 4.1 1.3 5.4 1.6 1.3 3.8 1.4 5.5.4l30.6-18.2 30.6 18.2c.9.5 1.9.8 2.9.8.9 0 1.8-.3 2.6-.8 1.6-1.3 2.1-3.5 1.3-5.4L54 8.6c-.7-1.7-2.3-2.8-4.1-2.8z"
          fill="#199900"
        />
      </svg>
    ),
  },
  {
    name: "Vercel",
    svg: () => (
      <svg viewBox="0 0 1155 1000" className="w-4 h-4 fill-foreground" aria-hidden="true">
        <path d="m577.3 0 577.4 1000H0z" />
      </svg>
    ),
  },
];

interface SaturnOrbitProps {
  readonly children: React.ReactNode;
}

export function SaturnOrbit({ children }: Readonly<SaturnOrbitProps>) {
  const uniqueId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const isHoveredRef = useRef(false);
  const rotationRef = useRef(0);
  const [dimensions, setDimensions] = useState({ rx: 430, ry: 135 });

  // Calcolo raggio responsive in base alla larghezza dello stage
  useEffect(() => {
    function updateDimensions() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;

      if (width < 640) {
        // Schermi piccoli (Mobile)
        setDimensions({ rx: Math.min(width * 0.46, 210), ry: 85 });
      } else if (width < 1024) {
        // Tablet
        setDimensions({ rx: Math.min(width * 0.44, 340), ry: 110 });
      } else {
        // Desktop
        setDimensions({ rx: 430, ry: 135 });
      }
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Loop di animazione a 60fps con requestAnimationFrame
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const durationSeconds = 36; // Secondi per completare una rivoluzione completa

    function step(now: number) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Avanzamento rotazione solo se non siamo in pausa hover
      if (!isHoveredRef.current) {
        rotationRef.current = (rotationRef.current + ((2 * Math.PI) / durationSeconds) * delta) % (2 * Math.PI);
      }

      const currentRot = rotationRef.current;
      const totalItems = TECH_ITEMS.length;

      itemsRef.current.forEach((el, index) => {
        if (!el) return;

        const baseAngle = (index / totalItems) * 2 * Math.PI;
        const angle = (baseAngle + currentRot) % (2 * Math.PI);

        const x = Math.cos(angle) * dimensions.rx;
        const y = Math.sin(angle) * dimensions.ry;

        // Profondità: sin(angle) > 0 davanti (sotto nello schermo), sin(angle) < 0 dietro (sopra)
        const depth = Math.sin(angle);

        let scale: number;
        let opacity: number;
        let zIndex: number;

        if (depth >= 0) {
          // DAVANTI: scala reale piena, opacità 100%, z-index alto per passare sopra il glow
          scale = 0.96 + depth * 0.12;
          opacity = 0.85 + depth * 0.15;
          zIndex = 35;
        } else {
          // DIETRO: si rimpicciolisce progressivamente, opacità sfuma, z-index basso per passare dietro al nome
          const absDepth = Math.abs(depth);
          scale = 0.96 - absDepth * 0.22;
          opacity = 0.85 - absDepth * 0.48;
          zIndex = 10;
        }

        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0px) scale(${scale.toFixed(2)})`;
        el.style.opacity = opacity.toFixed(2);
        el.style.zIndex = `${zIndex}`;
      });

      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[580px] md:min-h-[620px] flex items-center justify-center select-none overflow-visible"
    >
      {/* Tracciato ellittico sottile di Saturno */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-5"
        aria-hidden="true"
      >
        <ellipse
          cx="50%"
          cy="50%"
          rx={dimensions.rx}
          ry={dimensions.ry}
          fill="none"
          stroke="currentColor"
          className="text-brand-accent/15"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
      </svg>

      {/* Il Pianeta / Contenuto Centrale (Gabriele Farigu) */}
      <div className="relative z-25 flex flex-col items-center justify-center max-w-2xl text-center pointer-events-auto">
        {children}
      </div>

      {/* Layer orbitante: Billboard items (sempre orizzontali) */}
      <div className="absolute inset-0 pointer-events-none">
        {TECH_ITEMS.map((item, index) => (
          <div
            key={item.name}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="absolute top-1/2 left-1/2 pointer-events-auto will-change-transform cursor-pointer group"
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
          >
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl backdrop-blur-xs transition-all duration-200 hover:scale-115">
              <div className="w-4 h-4 flex items-center justify-center shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-120">
                {item.svg(uniqueId)}
              </div>
              <span className="text-xs font-semibold tracking-wide text-foreground/85 group-hover:text-brand-accent transition-colors duration-200 whitespace-nowrap">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
