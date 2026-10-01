import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from("portfolio-media")
      .download("cv/curriculum.pdf");

    if (error || !data) {
      return new NextResponse("Curriculum non trovato", { status: 404 });
    }

    const buffer = Buffer.from(await data.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="CV_Gabriele_Farigu.pdf"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("[CV Download Error]", err);
    return new NextResponse("Errore durante il download del curriculum", { status: 500 });
  }
}
