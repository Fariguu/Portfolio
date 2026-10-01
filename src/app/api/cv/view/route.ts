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
        "Content-Disposition": 'inline; filename="CV_Gabriele_Farigu.pdf"',
        "Content-Length": buffer.length.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("[CV View Error]", err);
    return new NextResponse("Errore durante la visualizzazione del curriculum", { status: 500 });
  }
}
