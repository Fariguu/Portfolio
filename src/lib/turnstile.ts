interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

/**
 * Valida un token Cloudflare Turnstile interrogando le API di Cloudflare.
 * Se la chiave segreta non è configurata (es. ambiente di sviluppo locale prima della registrazione),
 * consente il passaggio registrando un avviso nei log.
 */
export async function verifyTurnstileToken(
  token?: string,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    // In ambiente dev o senza credenziali Cloudflare, non bloccare l'invio
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Turnstile] CLOUDFLARE_TURNSTILE_SECRET_KEY non configurata. Validazione bot ignorata in modalità sviluppo."
      );
    }
    return { success: true };
  }

  if (!token) {
    return {
      success: false,
      error: "Verifica di sicurezza anti-bot mancante. Ricarica la pagina e riprova.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const result = (await response.json()) as TurnstileVerifyResponse;

    if (result.success) {
      return { success: true };
    }

    return {
      success: false,
      error: "Verifica anti-bot fallita. Per favore, riprova.",
    };
  } catch (err: any) {
    console.error("[Turnstile] Errore durante la verifica con Cloudflare:", err);
    return {
      success: false,
      error: "Impossibile contattare il servizio di verifica di sicurezza. Riprova più tardi.",
    };
  }
}
