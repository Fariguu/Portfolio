"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth-guard";
import { unstable_cache, revalidatePath, revalidateTag, updateTag } from "next/cache";

const CV_FILE_PATH = "cv/curriculum.pdf";
const BUCKET_NAME = "portfolio-media";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface CvInfo {
  readonly exists: boolean;
  readonly url: string | null;
  readonly updatedAt: string | null;
  readonly size: number | null;
}

export const getCvInfo = unstable_cache(
  async (): Promise<CvInfo> => {
    try {
      const supabase = createAdminClient();
      const { data: files, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list("cv", {
          limit: 10,
          search: "curriculum.pdf",
        });

      if (error || !files) {
        console.warn("[getCvInfo] storage list warning:", error?.message);
        return { exists: false, url: null, updatedAt: null, size: null };
      }

      const cvFile = files.find((f) => f.name === "curriculum.pdf");
      if (!cvFile) {
        return { exists: false, url: null, updatedAt: null, size: null };
      }

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(CV_FILE_PATH);

      return {
        exists: true,
        url: publicUrlData.publicUrl,
        updatedAt: cvFile.updated_at || cvFile.created_at || null,
        size: cvFile.metadata?.size || null,
      };
    } catch (err) {
      console.error("[getCvInfo] exception:", err);
      return { exists: false, url: null, updatedAt: null, size: null };
    }
  },
  ["cv-info"],
  { revalidate: 3600, tags: ["cv"] }
);

export async function uploadCvAction(formData: FormData) {
  try {
    const authCheck = await verifyAdminSession();
    if (!authCheck.authorized) {
      return { error: authCheck.error || "Non autorizzato" };
    }

    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) {
      return { error: "Nessun file selezionato" };
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return { error: "Il file deve essere in formato PDF (.pdf)" };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { error: "Il file supera la dimensione massima consentita di 10 MB" };
    }

    const supabase = createAdminClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(CV_FILE_PATH, buffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      return { error: `Errore caricamento su storage: ${uploadError.message}` };
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(CV_FILE_PATH);

    // Invalida cache
    try {
      updateTag("cv");
    } catch {
      // Ignore in non-action context
    }
    try {
      revalidateTag("cv", "default");
    } catch {
      // Ignore
    }

    revalidatePath("/curriculum");
    revalidatePath("/admin/curriculum");
    revalidatePath("/admin");

    return { success: true, url: publicUrlData.publicUrl };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return { error: `Impossibile completare l'upload: ${message}` };
  }
}

export async function deleteCvAction() {
  try {
    const authCheck = await verifyAdminSession();
    if (!authCheck.authorized) {
      return { error: authCheck.error || "Non autorizzato" };
    }

    const supabase = createAdminClient();
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([CV_FILE_PATH]);

    if (error) {
      return { error: `Errore rimozione file: ${error.message}` };
    }

    try {
      updateTag("cv");
    } catch {
      // Ignore
    }
    try {
      revalidateTag("cv", "default");
    } catch {
      // Ignore
    }

    revalidatePath("/curriculum");
    revalidatePath("/admin/curriculum");
    revalidatePath("/admin");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return { error: `Impossibile rimuovere il CV: ${message}` };
  }
}
