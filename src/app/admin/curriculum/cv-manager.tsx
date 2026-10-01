"use client";

import * as React from "react";
import { uploadCvAction, deleteCvAction, type CvInfo } from "@/app/admin/actions/cv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ExternalLink,
  Loader2,
  Calendar,
  HardDrive,
} from "lucide-react";
import Link from "next/link";
import { CvPdfViewer } from "@/components/ui/cv-pdf-viewer";

interface CvManagerProps {
  readonly initialCvInfo: CvInfo;
}

export function CvManager({ initialCvInfo }: Readonly<CvManagerProps>) {
  const [cvInfo, setCvInfo] = React.useState<CvInfo>(initialCvInfo);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | null) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg("Seleziona esclusivamente un file PDF (.pdf)");
      setSelectedFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Il file supera la dimensione massima di 10 MB");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    validateAndSetFile(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await uploadCvAction(formData);
      if (result.error) {
        setErrorMsg(result.error);
      } else {
        setSuccessMsg("Curriculum caricato con successo su Supabase Storage!");
        setCvInfo({
          exists: true,
          url: `${result.url}?v=${Date.now()}`,
          updatedAt: new Date().toISOString(),
          size: selectedFile.size,
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Errore durante l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare il curriculum attuale?")) {
      return;
    }

    setIsDeleting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await deleteCvAction();
      if (result.error) {
        setErrorMsg(result.error);
      } else {
        setSuccessMsg("Curriculum rimosso con successo");
        setCvInfo({
          exists: false,
          url: null,
          updatedAt: null,
          size: null,
        });
        setSelectedFile(null);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Errore durante l'eliminazione");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "N/D";
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (isoString: string | null) => {
    if (!isoString) return "N/D";
    try {
      return new Date(isoString).toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Messages */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Stato del Curriculum
              </CardTitle>
              <CardDescription className="mt-1">
                Verifica se il file PDF è attualmente pubblicato e raggiungibile dai recruiter
              </CardDescription>
            </div>
            <div>
              {cvInfo.exists ? (
                <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 py-1 px-3">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Pubblicato Online</span>
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Nessun File Caricato</span>
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {cvInfo.exists ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-xl bg-muted/40 border border-border/60">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Ultimo Aggiornamento
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatDate(cvInfo.updatedAt)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <HardDrive className="h-3.5 w-3.5" /> Dimensione
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatFileSize(cvInfo.size)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> Destinazione Storage
                  </p>
                  <p className="text-sm font-mono text-muted-foreground truncate">
                    portfolio-media/cv/curriculum.pdf
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/curriculum" target="_blank" className="flex items-center gap-1.5">
                    <ExternalLink className="h-4 w-4" />
                    <span>Visualizza Pagina Pubblica</span>
                  </Link>
                </Button>
                {cvInfo.exists && (
                  <Button asChild size="sm" variant="secondary">
                    <a href="/api/cv/view" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>Apri PDF Diretto</span>
                    </a>
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                  disabled={isDeleting || isUploading}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive ml-auto cursor-pointer"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-1.5" />
                  )}
                  <span>Rimuovi File</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-sm text-muted-foreground">
              Non è ancora stato caricato alcun file PDF. Utilizza il modulo sottostante per effettuare il primo upload.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-primary" />
            {cvInfo.exists ? "Sostituisci Curriculum" : "Carica Curriculum"}
          </CardTitle>
          <CardDescription>
            Trascina qui il file PDF oppure selezionalo dal dispositivo. Il file sovrascriverà automaticamente la versione precedente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border/80 hover:border-primary/50 hover:bg-muted/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {selectedFile
                      ? `File selezionato: ${selectedFile.name}`
                      : "Trascina qui il tuo file PDF, oppure fai clic per sfogliare"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedFile
                      ? `Dimensione: ${formatFileSize(selectedFile.size)}`
                      : "Formato supportato: PDF (max 10 MB)"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              {selectedFile && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  disabled={isUploading}
                >
                  Annulla
                </Button>
              )}
              <Button
                type="submit"
                disabled={!selectedFile || isUploading}
                className="cursor-pointer gap-2"
              >
                {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{isUploading ? "Caricamento in corso..." : cvInfo.exists ? "Sostituisci PDF" : "Carica PDF"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* PDF Preview Card */}
      {cvInfo.exists && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Anteprima del Curriculum
            </CardTitle>
            <CardDescription>
              Visualizzazione ad alta definizione identica a quella pubblica
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 bg-muted/10 rounded-b-xl">
            <CvPdfViewer />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
