"use server";

import { Resend } from "resend";
import { contactFormSchema, type ContactFormData } from "@/lib/contact-schema";
import { verifyTurnstileToken } from "@/lib/turnstile";

export interface ContactActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

function formatValidationErrors(
  issues: ReadonlyArray<{ path?: readonly PropertyKey[]; message: string }>
) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of issues) {
    const field = String(issue.path?.[0] || "form");
    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }
    fieldErrors[field].push(issue.message);
  }
  const firstErrorMessage =
    issues[0]?.message ||
    "Dati del modulo non validi. Controlla i campi inseriti.";

  return { fieldErrors, firstErrorMessage };
}

async function sendNotificationEmail(
  resend: Resend,
  sender: string,
  adminEmail: string,
  data: ContactFormData
) {
  const { firstName, lastName, email, message, locale } = data;
  const langTag = locale === "en" ? " [EN]" : " [IT]";

  return resend.emails.send({
    from: sender,
    to: [adminEmail],
    replyTo: `${firstName} ${lastName} <${email}>`,
    subject: `Nuovo messaggio da ${firstName} ${lastName}${langTag} — Portfolio`,
    text: `Nuovo messaggio ricevuto dal form contatti del Portfolio:\n\nMittente: ${firstName} ${lastName}\nEmail: ${email}\nLingua: ${locale || "it"}\n\nMessaggio:\n${message}\n\n---\nPuoi rispondere direttamente a questa email per contattare ${firstName}.`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px;">
        <h2 style="color: #09090b; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f4f4f5; padding-bottom: 12px;">
          📩 Nuovo messaggio dal Portfolio (${(locale || "it").toUpperCase()})
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px; width: 90px;"><strong>Mittente:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px;"><strong>Email:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px;"><strong>Lingua:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;">${locale === "en" ? "Inglese" : "Italiano"}</td>
          </tr>
        </table>
        <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; border-left: 4px solid #18181b; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #27272a;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #a1a1aa; margin: 0; text-align: center;">
          Ricevuto tramite il modulo contatti su gabrielefarigu.it • Premi "Rispondi" per scrivere a ${email}
        </p>
      </div>
    `,
  });
}

async function sendAutoReplyEmail(
  resend: Resend,
  sender: string,
  data: ContactFormData
) {
  try {
    const { firstName, email, locale } = data;
    const isEn = locale === "en";
    const subject = isEn
      ? "Thank you for reaching out — Gabriele Farigu"
      : "Ho ricevuto il tuo messaggio — Gabriele Farigu";

    const text = isEn
      ? `Hi ${firstName},\n\nThank you for reaching out through my portfolio!\n\nI have received your message and will get back to you as soon as possible.\n\nBest regards,\nGabriele Farigu\nhttps://github.com/Fariguu`
      : `Ciao ${firstName},\n\ngrazie per avermi contattato tramite il mio portfolio!\n\nHo ricevuto la tua richiesta e ti risponderò il prima possibile.\n\nA presto,\nGabriele Farigu\nhttps://github.com/Fariguu`;

    const title = isEn
      ? `Thank you for your message, ${firstName}! 👋`
      : `Grazie per il tuo messaggio, ${firstName}! 👋`;

    const body1 = isEn
      ? "I have successfully received your inquiry submitted via my portfolio."
      : "Ho ricevuto correttamente la tua richiesta tramite il modulo contatti del mio portfolio.";

    const body2 = isEn
      ? "I will carefully review your message and reply to this email address shortly."
      : "Leggerò con cura quanto mi hai scritto e mi metterò in contatto con te a questo indirizzo email il prima possibile.";

    const role = isEn ? "Web & Software Developer" : "Sviluppatore Web & Software";

    const { error: autoReplyError } = await resend.emails.send({
      from: sender,
      to: [email],
      subject,
      text,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px;">
          <h2 style="color: #09090b; margin-top: 0; font-size: 20px;">
            ${title}
          </h2>
          <p style="font-size: 15px; line-height: 1.6; color: #3f3f46;">
            ${body1}
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #3f3f46;">
            ${body2}
          </p>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f4f4f5; font-size: 14px; color: #71717a;">
            <p style="margin: 0; font-weight: 600; color: #18181b;">Gabriele Farigu</p>
            <p style="margin: 4px 0 0 0; font-size: 13px;">${role}</p>
            <p style="margin: 8px 0 0 0; font-size: 12px;">
              <a href="https://github.com/Fariguu" style="color: #2563eb; text-decoration: none;">GitHub</a> • 
              <a href="https://www.linkedin.com/in/gabriele-farigu-3863b1312/" style="color: #2563eb; text-decoration: none;">LinkedIn</a>
            </p>
          </div>
        </div>
      `,
    });

    if (autoReplyError) {
      console.warn(
        "[Resend] Auto-responder non inviato dall'API:",
        autoReplyError.message || autoReplyError
      );
    }
  } catch (autoReplyErr) {
    console.warn(
      "[Resend] Eccezione durante l'invio dell'auto-responder:",
      autoReplyErr
    );
  }
}

export async function sendContactEmail(
  rawData: unknown
): Promise<ContactActionResult> {
  // 1. Validazione con Zod
  const validation = contactFormSchema.safeParse(rawData);
  if (!validation.success) {
    const { fieldErrors, firstErrorMessage } = formatValidationErrors(validation.error.issues);
    return {
      success: false,
      error: firstErrorMessage,
      fieldErrors,
    };
  }

  const data = validation.data;

  // 2. Verifica token Cloudflare Turnstile
  const turnstileCheck = await verifyTurnstileToken(data.turnstileToken);
  if (!turnstileCheck.success) {
    return {
      success: false,
      error: turnstileCheck.error || (data.locale === "en" ? "Security check failed." : "Verifica di sicurezza non superata."),
    };
  }

  // 3. Invio email tramite Resend
  const resendApiKey = process.env.RESEND_API_KEY;

  // Se la chiave Resend non è ancora impostata (es. test iniziale in locale senza account Resend)
  if (!resendApiKey) {
    console.warn(
      "[Contact Action] RESEND_API_KEY non trovata nelle variabili d'ambiente. Simulazione invio riuscito in locale:",
      { firstName: data.firstName, lastName: data.lastName, email: data.email, locale: data.locale, messagePreview: data.message.slice(0, 80) }
    );
    return { success: true };
  }

  try {
    const resend = new Resend(resendApiKey);
    const adminEmail = process.env.ADMIN_EMAIL || "farigugabriele@gmail.com";
    const sender =
      process.env.CONTACT_EMAIL_FROM ||
      "Portfolio Gabriele Farigu <onboarding@resend.dev>";

    // Invia email di notifica a Gabriele
    const { error: notificationError } = await sendNotificationEmail(
      resend,
      sender,
      adminEmail,
      data
    );

    if (notificationError) {
      console.error("[Resend] Errore invio notifica:", notificationError);
      return {
        success: false,
        error:
          data.locale === "en"
            ? "Error sending email. Please try again in a few moments."
            : "Errore durante l'invio dell'email. Riprova tra qualche minuto.",
      };
    }

    // Invia email di cortesia / conferma automatica al mittente (auto-responder)
    await sendAutoReplyEmail(resend, sender, data);

    return { success: true };
  } catch (err: unknown) {
    console.error("[Contact Action] Eccezione non gestita:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Si è verificato un errore imprevisto durante l'invio. Riprova più tardi.",
    };
  }
}
