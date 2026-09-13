"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth-guard";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", "main")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Errore recupero profilo:", error);
    }
    return data || null;
  } catch (err) {
    console.error("Eccezione recupero profilo:", err);
    return null;
  }
}

export async function updateProfile(formData: FormData) {
  const authCheck = await verifyAdminSession();
  if (!authCheck.authorized) {
    return { error: authCheck.error || "Non autorizzato" };
  }

  const headline_it = (formData.get("headline_it") as string)?.trim() || null;
  const headline_en = (formData.get("headline_en") as string)?.trim() || null;
  const bio_it = (formData.get("bio_it") as string)?.trim();
  const bio_en = (formData.get("bio_en") as string)?.trim() || null;

  if (!bio_it) {
    return { error: "La biografia in italiano è obbligatoria" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("profile").upsert(
    {
      id: "main",
      headline_it,
      headline_en,
      bio_it,
      bio_en,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/chi-sono");
  revalidatePath("/en/chi-sono");
  revalidatePath("/admin/profile");
  revalidatePath("/admin");

  return { success: true };
}
