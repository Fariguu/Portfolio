"use client";

import * as React from "react";
import {
  Loader2,
  ZoomIn,
  ZoomOut,
  Download,
  ExternalLink,
  AlertCircle,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CvPdfViewerProps {
  readonly pdfUrl: string;
}

export function CvPdfViewer({ pdfUrl }: Readonly<CvPdfViewerProps>) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = React.useState<number>(0);
  const [scale, setScale] = React.useState<number>(1.1);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const canvasRefs = React.useRef<Map<number, HTMLCanvasElement>>(new Map());

  React.useEffect(() => {
    let isCancelled = false;
    const renderTasks: Array<{ cancel: () => void }> = [];

    async function loadPdf() {
      // Su mobile (< 768px) evitiamo il download e il parsing di pdfjs-dist per massimizzare le performance
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Import dinamico lato client per evitare problemi SSR
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: "/cmaps/",
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        setNumPages(pdf.numPages);
        setIsLoading(false);

        // Renderizza ogni pagina: prima pagina immediata, pagine successive con yielding del main thread
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (isCancelled) break;

          // Se ci sono pagine successive alla prima, cedi il thread per eliminare i Long Tasks
          if (pageNum > 1) {
            await new Promise<void>((resolve) => {
              if (typeof requestIdleCallback !== "undefined") {
                requestIdleCallback(() => resolve(), { timeout: 100 });
              } else {
                setTimeout(resolve, 16);
              }
            });
            if (isCancelled) break;
          }

          const page = await pdf.getPage(pageNum);
          const canvas = canvasRefs.current.get(pageNum);
          if (!canvas) continue;

          const context = canvas.getContext("2d", { alpha: false });
          if (!context) continue;

          const containerWidth = containerRef.current?.clientWidth || 800;
          const initialViewport = page.getViewport({ scale: 1 });
          const targetWidth = Math.min(containerWidth - 32, 850);
          const baseScale = targetWidth / initialViewport.width;
          const effectiveScale = baseScale * scale;

          const viewport = page.getViewport({ scale: effectiveScale });

          // Supporto display nitido con pixelRatio ottimizzato a max 1.5x (risparmia oltre 60% di memoria e compute CPU/GPU)
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
          canvas.width = Math.floor(viewport.width * pixelRatio);
          canvas.height = Math.floor(viewport.height * pixelRatio);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

          const renderTask = page.render({
            canvasContext: context,
            viewport,
          });
          renderTasks.push(renderTask);

          try {
            await renderTask.promise;
          } catch (renderErr: unknown) {
            if (
              renderErr &&
              typeof renderErr === "object" &&
              "name" in renderErr &&
              (renderErr as { name: string }).name === "RenderingCancelledException"
            ) {
              return;
            }
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("[CvPdfViewer] Errore caricamento PDF:", err);
          setError("Impossibile caricare il visualizzatore PDF.");
          setIsLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isCancelled = true;
      renderTasks.forEach((t) => {
        try {
          t.cancel();
        } catch {
          // Task già concluso
        }
      });
    };
  }, [pdfUrl, scale]);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.15, 2.0));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.15, 0.7));
  const handleResetZoom = () => setScale(1.1);

  return (
    <div ref={containerRef} className="w-full space-y-4">
      {/* ================= VISTA MOBILE: CARD PULITA CON ANTEPRIMA DOCUMENTO E DOWNLOAD DIRETTO ================= */}
      <div className="block md:hidden">
        <div className="p-5 rounded-2xl border border-border/80 bg-card/90 backdrop-blur-sm shadow-sm space-y-4 text-center">
          {/* Mockup documento A4 proporzionato con pulsante centrato e margini ottimali */}
          <div className="relative mx-auto w-44 h-60 bg-white text-slate-800 rounded-xl shadow-lg border border-black/10 p-3.5 flex flex-col justify-between overflow-hidden group">
            <div className="space-y-2 text-left">
              <div className="w-16 h-2 bg-emerald-500 rounded-xs" />
              <div className="w-28 h-1.5 bg-slate-300 rounded-xs" />
              <div className="w-20 h-1 bg-slate-200 rounded-xs" />
              <div className="pt-2 space-y-1">
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
                <div className="w-32 h-1 bg-slate-200 rounded-xs" />
                <div className="w-24 h-1 bg-slate-200 rounded-xs" />
              </div>
              <div className="pt-2 space-y-1">
                <div className="w-28 h-1 bg-slate-300 rounded-xs" />
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
                <div className="w-28 h-1 bg-slate-200 rounded-xs" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-1 text-[9px] text-slate-400 font-mono">
              <span>PDF Ufficiale</span>
              <span>A4</span>
            </div>

            {/* Overlay interattivo cliccabile con pillola morbida ben distanziata dai bordi */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-slate-900/5 active:bg-slate-900/15 transition-colors flex items-center justify-center cursor-pointer p-2"
            >
              <span className="px-3 py-1.5 rounded-full bg-white/95 text-slate-800 text-[11px] font-semibold border border-slate-200/90 shadow-sm backdrop-blur-xs flex items-center gap-1.5 transition-transform group-hover:scale-105 group-active:scale-95 whitespace-nowrap">
                <ExternalLink className="w-3 h-3 text-primary shrink-0" />
                <span>Tocca per visualizzare</span>
              </span>
            </a>
          </div>

          <div className="pt-1">
            <Button
              asChild
              size="lg"
              className="w-full h-11 rounded-xl text-xs sm:text-sm font-semibold gap-2 shadow-xs cursor-pointer"
            >
              <a href="/api/cv/download" download="CV_Gabriele_Farigu.pdf">
                <Download className="h-4 w-4" />
                <span>Scarica File PDF</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* ================= VISTA DESKTOP: FOGLI BIANCHI PULITI ================= */}
      <div className="hidden md:block space-y-4">
        {/* Barra di controllo minimale */}
        <div className="w-full flex items-center justify-between gap-2 p-2.5 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm text-xs sm:text-sm shadow-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-medium pl-1">
            <Layers className="h-4 w-4 text-primary" />
            {numPages > 0 ? (
              <span>Documento • {numPages} {numPages === 1 ? "pagina" : "pagine"}</span>
            ) : (
              <span>Caricamento documento...</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Riduci zoom"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetZoom}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer font-mono"
              title="Reimposta zoom originale"
            >
              {Math.round(scale * 100)}%
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Aumenta zoom"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            <div className="h-4 w-[1px] bg-border mx-1" aria-hidden="true" />

            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Schermo Intero</span>
              </a>
            </Button>

            <Button asChild size="sm" variant="outline" className="h-8 px-2.5 text-xs gap-1.5 rounded-lg border-border/80 hover:border-brand-accent/50 hover:text-brand-accent">
              <a href="/api/cv/download" download="CV_Gabriele_Farigu.pdf">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Scarica</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Container con min-height stabile per eliminare Cumulative Layout Shift (CLS = 0) */}
        <div className="relative w-full flex flex-col items-center min-h-[850px]">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xs space-y-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Generazione visualizzazione del curriculum in corso...</p>
            </div>
          )}

          {/* Error Fallback */}
          {error && (
            <div className="w-full p-8 rounded-2xl border border-destructive/20 bg-destructive/5 text-center space-y-3">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
              <p className="text-sm text-destructive">{error}</p>
              <Button asChild size="sm" variant="outline">
                <a href="/api/cv/download" download="CV_Gabriele_Farigu.pdf">
                  <Download className="h-4 w-4 mr-1.5" />
                  Scarica il PDF direttamente
                </a>
              </Button>
            </div>
          )}

          {/* Pagine del PDF come veri fogli bianchi puliti con aspect-ratio stabile */}
          <div className="w-full flex flex-col items-center space-y-6">
            {Array.from({ length: numPages || 1 }, (_, i) => i + 1).map((pageNum) => (
              <div
                key={pageNum}
                className="relative flex flex-col items-center bg-white dark:bg-white rounded-xl shadow-xl border border-black/10 overflow-hidden transition-shadow hover:shadow-2xl w-full max-w-[850px] min-h-[800px] aspect-[1/1.414]"
              >
                <canvas
                  ref={(el) => {
                    if (el) {
                      canvasRefs.current.set(pageNum, el);
                    } else {
                      canvasRefs.current.delete(pageNum);
                    }
                  }}
                  className="block max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
