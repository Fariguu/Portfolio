import { NextResponse } from "next/server";
import { sendContactEmail } from "@/app/actions/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await sendContactEmail(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Si è verificato un errore imprevisto.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
