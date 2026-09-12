"use server";

import { Resend } from "resend";
import { quoteFormSchema, type QuoteFormData } from "@/lib/quote-schema";
import { verifyTurnstileToken } from "@/lib/turnstile";

export interface QuoteActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

const PROJECT_TYPE_LABELS: Record<string, { it: string; en: string }> = {
  "web-app": { it: "Web App / Piattaforma personalizzata", en: "Custom Web App / Platform" },
  "showcase-site": { it: "Sito Vetrina ad Alte Prestazioni", en: "High-Performance Showcase Site" },
  "booking-system": { it: "Sistema di Prenotazione / Calendario", en: "Booking & Scheduling System" },
  "restyling-speed": { it: "Restyling & Ottimizzazione Velocità", en: "Redesign & Speed Optimization" },
};

const FEATURE_LABELS: Record<string, { it: string; en: string }> = {
  auth: { it: "Area Riservata & Login Utenti", en: "User Accounts & Protected Area" },
  database: { it: "Database Cloud & Storico Dati (Supabase)", en: "Cloud Database & Records (Supabase)" },
  payments: { it: "Calcolatore Prezzi / Pagamenti Online (Stripe/PayPal)", en: "Price Calculator / Online Payments" },
  maps: { it: "Mappe Interattive & Geocoding (Leaflet)", en: "Interactive Maps & Geocoding (Leaflet)" },
  multilang: { it: "Supporto Multilingua (i18n)", en: "Multilingual Support (i18n)" },
  cms: { it: "Pannello di Controllo Admin / CMS", en: "Admin Dashboard / Custom CMS" },
};

const TIMELINE_LABELS: Record<string, { it: string; en: string }> = {
  urgent: { it: "Urgente (< 1 mese)", en: "Urgent (< 1 month)" },
  standard: { it: "Standard (1 - 2 mesi)", en: "Standard (1 - 2 months)" },
  flexible: { it: "Flessibile / Senza fretta", en: "Flexible / No rush" },
};

const MATERIAL_LABELS: Record<string, { it: string; en: string }> = {
  ready: { it: "Sì, testi e grafica pronti", en: "Yes, copy and assets ready" },
  "in-progress": { it: "In fase di lavorazione", en: "In progress / Drafts available" },
  none: { it: "Da definire da zero", en: "Need to create from scratch" },
};

const BUDGET_LABELS: Record<string, { it: string; en: string }> = {
  "tier-1": { it: "< €1.500", en: "< €1,500" },
  "tier-2": { it: "€1.500 - €3.000", en: "€1,500 - €3,000" },
  "tier-3": { it: "€3.000 - €6.000", en: "€3,000 - €6,000" },
  "tier-4": { it: "€6.000+", en: "€6,000+" },
  undecided: { it: "Da valutare insieme", en: "To be evaluated together" },
};

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
  data: QuoteFormData
) {
  const {
    firstName,
    lastName,
    email,
    phone,
    projectType,
    features,
    timeline,
    materials,
    budget,
    notes,
    locale,
  } = data;

  const isEn = locale === "en";
  const projectLabel = PROJECT_TYPE_LABELS[projectType]?.[isEn ? "en" : "it"] || projectType;
  const timelineLabel = TIMELINE_LABELS[timeline]?.[isEn ? "en" : "it"] || timeline;
  const materialsLabel = MATERIAL_LABELS[materials]?.[isEn ? "en" : "it"] || materials;
  const budgetLabel = BUDGET_LABELS[budget]?.[isEn ? "en" : "it"] || budget;
  const featuresList = features.map((f) => FEATURE_LABELS[f]?.[isEn ? "en" : "it"] || f);

  const featuresText = featuresList.length > 0 ? featuresList.map((f) => `• ${f}`).join("\n") : "Nessuna specifica aggiuntiva";
  const featuresHtml = featuresList.length > 0 ? featuresList.map((f) => `<li style="padding: 3px 0;">${f}</li>`).join("") : "<em>Nessuna funzionalità extra selezionata</em>";

  return resend.emails.send({
    from: sender,
    to: [adminEmail],
    replyTo: `${firstName} ${lastName} <${email}>`,
    subject: `🎯 Nuova Richiesta Preventivo da ${firstName} ${lastName} [${(locale || "it").toUpperCase()}]`,
    text: `Nuova richiesta di preventivo ricevuta tramite il Configuratore Guidato:\n\n` +
      `Cliente: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Telefono: ${phone || "Non indicato"}\n` +
      `Lingua: ${locale || "it"}\n\n` +
      `Tipologia Soluzione: ${projectLabel}\n` +
      `Tempistica Desiderata: ${timelineLabel}\n` +
      `Stato Materiali: ${materialsLabel}\n` +
      `Budget Indicativo: ${budgetLabel}\n\n` +
      `Funzionalità Richieste:\n${featuresText}\n\n` +
      `Note del Cliente:\n${notes || "Nessuna nota aggiuntiva"}\n\n` +
      `---\nRispondi direttamente a questa email per ricontattare ${firstName}.`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; color: #18181b; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px;">
        <h2 style="color: #09090b; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f4f4f5; padding-bottom: 12px;">
          🎯 Nuova Richiesta Preventivo (${(locale || "it").toUpperCase()})
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px; width: 140px;"><strong>Cliente:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;"><strong>${firstName} ${lastName}</strong></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px;"><strong>Email:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;"><a href="mailto:${email}" style="color: #047857; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px;"><strong>Telefono:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;">${phone || "<em>Non specificato</em>"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px;"><strong>Tipologia:</strong></td>
            <td style="padding: 6px 0; color: #047857; font-size: 14px; font-weight: 600;">${projectLabel}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px;"><strong>Tempistica:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;">${timelineLabel}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px;"><strong>Materiali:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;">${materialsLabel}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #71717a; font-size: 14px;"><strong>Budget Indicativo:</strong></td>
            <td style="padding: 6px 0; color: #18181b; font-size: 14px;">${budgetLabel}</td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 14px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Funzionalità Richieste:</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155;">
            ${featuresHtml}
          </ul>
        </div>

        ${
          notes
            ? `
        <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; border-left: 4px solid #047857; margin-bottom: 24px;">
          <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #71717a;">Note del cliente:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #27272a;">${notes}</p>
        </div>
        `
            : ""
        }

        <p style="font-size: 12px; color: #a1a1aa; margin: 0; text-align: center; border-top: 1px solid #f4f4f5; padding-top: 14px;">
          Ricevuto tramite il Configuratore Preventivo su gabrielefarigu.it • Rispondi direttamente per scrivere a ${email}
        </p>
      </div>
    `,
  });
}

async function sendAutoReplyEmail(
  resend: Resend,
  sender: string,
  data: QuoteFormData
) {
  try {
    const { firstName, email, projectType, budget, timeline, locale } = data;
    const isEn = locale === "en";

    const projectLabel = PROJECT_TYPE_LABELS[projectType]?.[isEn ? "en" : "it"] || projectType;
    const timelineLabel = TIMELINE_LABELS[timeline]?.[isEn ? "en" : "it"] || timeline;
    const budgetLabel = BUDGET_LABELS[budget]?.[isEn ? "en" : "it"] || budget;

    const subject = isEn
      ? "Your Project Quote Request has been received — Gabriele Farigu"
      : "Ho ricevuto la tua richiesta di preventivo — Gabriele Farigu";

    const text = isEn
      ? `Hi ${firstName},\n\nThank you for configuring your project on my portfolio!\n\nI have received your request for: ${projectLabel} (Timeline: ${timelineLabel}, Budget: ${budgetLabel}).\n\nI will analyze your specifications and get back to you with a detailed estimate within 24 hours.\n\nBest regards,\nGabriele Farigu\nhttps://github.com/Fariguu`
      : `Ciao ${firstName},\n\ngrazie per aver dedicato del tempo a configurare il tuo progetto sul mio portfolio!\n\nHo ricevuto i dettagli per: ${projectLabel} (Tempistica: ${timelineLabel}, Budget: ${budgetLabel}).\n\nEsaminerò le specifiche tecniche e ti risponderò con una proposta chiara e personalizzata entro 24 ore.\n\nA presto,\nGabriele Farigu\nhttps://github.com/Fariguu`;

    const title = isEn
      ? `Quote Request Received, ${firstName}! 🚀`
      : `Richiesta Preventivo Ricevuta, ${firstName}! 🚀`;

    const intro = isEn
      ? "Thank you for using my interactive configurator. Here is a quick recap of your submission:"
      : "Grazie per aver utilizzato il mio configuratore guidato. Ecco un riepilogo rapido di quanto selezionato:";

    return await resend.emails.send({
      from: sender,
      to: [email],
      subject,
      text,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #18181b; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px;">
          <h2 style="color: #09090b; margin-top: 0; font-size: 20px; font-weight: 700;">${title}</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #3f3f46;">${intro}</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>${isEn ? "Solution" : "Soluzione"}:</strong> ${projectLabel}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>${isEn ? "Timeline" : "Tempistica"}:</strong> ${timelineLabel}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>${isEn ? "Budget Range" : "Fascia Budget"}:</strong> ${budgetLabel}</p>
          </div>

          <p style="font-size: 15px; line-height: 1.6; color: #3f3f46;">
            ${
              isEn
                ? "I am already reviewing your requirements and will reply via email with a comprehensive feasibility analysis and quotation within <strong>24 business hours</strong>."
                : "Sto già esaminando le specifiche tecniche e ti risponderò via email con un'analisi di fattibilità e un preventivo trasparente entro <strong>24 ore lavorative</strong>."
            }
          </p>

          <p style="font-size: 14px; line-height: 1.5; color: #71717a; margin-top: 24px;">
            ${isEn ? "Best regards," : "Un cordiale saluto,"}<br>
            <strong style="color: #09090b;">Gabriele Farigu</strong><br>
            <span style="font-size: 13px;">Web & Software Developer</span>
          </p>
        </div>
      `,
    });
  } catch (autoReplyError) {
    console.error("Auto-reply quote email failed:", autoReplyError);
    return null;
  }
}

export async function submitQuoteRequestAction(
  data: QuoteFormData
): Promise<QuoteActionResult> {
  const result = quoteFormSchema.safeParse(data);

  if (!result.success) {
    const { fieldErrors, firstErrorMessage } = formatValidationErrors(
      result.error.issues
    );
    return {
      success: false,
      error: firstErrorMessage,
      fieldErrors,
    };
  }

  const { turnstileToken } = result.data;
  const isTurnstileValid = await verifyTurnstileToken(turnstileToken);

  if (!isTurnstileValid) {
    return {
      success: false,
      error:
        result.data.locale === "en"
          ? "Security verification failed. Please try again."
          : "Verifica di sicurezza non riuscita. Riprova.",
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const adminEmail = process.env.ADMIN_EMAIL || "farigugabriele@gmail.com";

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured. Simulating successful submission in dev mode.");
    return { success: true };
  }

  const resend = new Resend(resendApiKey);

  try {
    const emailResult = await sendNotificationEmail(
      resend,
      sender,
      adminEmail,
      result.data
    );

    if (emailResult.error) {
      console.error("Resend quote notification error:", emailResult.error);
      return {
        success: false,
        error:
          result.data.locale === "en"
            ? "Unable to send your request. Please try again later."
            : "Impossibile inviare la richiesta. Riprova più tardi.",
      };
    }

    // Invio auto-reply in background senza bloccare la risposta
    sendAutoReplyEmail(resend, sender, result.data).catch((err) =>
      console.error("Error sending auto-reply:", err)
    );

    return { success: true };
  } catch (error) {
    console.error("Quote action unexpected error:", error);
    return {
      success: false,
      error:
        result.data.locale === "en"
          ? "An unexpected error occurred. Please try again."
          : "Si è verificato un errore imprevisto. Riprova.",
    };
  }
}
