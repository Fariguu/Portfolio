/**
 * Servizio di traduzione automatica (Italiano -> Inglese)
 * Utilizza prioritariamente Google Gemini API con prompt ottimizzato per lessico tecnico/developer.
 * Se la chiave non è disponibile o fallisce, adotta un fallback automatico su MyMemory Translate.
 */

export interface ProjectTranslationInput {
  title?: string
  description?: string
  github_label?: string
  status_badge?: string
}

export interface ProjectTranslationOutput {
  title_en: string
  description_en: string
  github_label_en: string
  status_badge_en: string
}

/**
 * Modelli Gemini supportati in ordine di priorità.
 * Se un modello viene deprecato (es. 404), viene automaticamente testato il successivo.
 */
const GEMINI_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-flash-latest',
  'gemini-3.7-flash',
]

interface GeminiCallParams {
  prompt: string
  apiKey: string
  jsonMode?: boolean
}

/**
 * Esegue una chiamata all'API Gemini con fallback trasparente tra i modelli disponibili.
 */
async function callGeminiWithFallback(params: GeminiCallParams): Promise<string> {
  let lastError: Error | null = null

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${params.apiKey}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: params.prompt }] }],
          generationConfig: {
            temperature: 0.2,
            ...(params.jsonMode ? { responseMimeType: 'application/json' } : {}),
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        lastError = new Error(`Modello ${model} (${response.status}): ${errorText}`)
        continue
      }

      const data = await response.json()
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (rawText && rawText.trim().length > 0) {
        return rawText.trim()
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
    }
  }

  throw lastError || new Error('Tutti i modelli Gemini hanno fallito la chiamata.')
}

/**
 * Traduce un batch di campi di un progetto software da IT a EN tramite Google Gemini API.
 */
async function translateWithGemini(
  input: ProjectTranslationInput,
  apiKey: string
): Promise<ProjectTranslationOutput | null> {
  try {
    const prompt = `You are a professional software engineer and bilingual translator (Italian to English).
Translate the following portfolio project fields from Italian to fluent, technical, idiomatic English suitable for a top-tier developer portfolio.
Do not invent facts, maintain the meaning and tone accurately.
Recognize software terminology properly (e.g. "Bozza Architettura" -> "Architecture Draft", "In sviluppo attivo" -> "Active Development", "Codice GitHub" -> "GitHub Code").

Input JSON:
${JSON.stringify({
  title: input.title || '',
  description: input.description || '',
  github_label: input.github_label || '',
  status_badge: input.status_badge || '',
})}

Respond ONLY with a valid raw JSON object with exactly these keys:
{
  "title_en": "...",
  "description_en": "...",
  "github_label_en": "...",
  "status_badge_en": "..."
}`

    const rawText = await callGeminiWithFallback({
      prompt,
      apiKey,
      jsonMode: true,
    })

    // Rimuove eventuali backticks markdown se presenti
    const cleanedText = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()

    const parsed = JSON.parse(cleanedText) as ProjectTranslationOutput
    return {
      title_en: parsed.title_en?.trim() || '',
      description_en: parsed.description_en?.trim() || '',
      github_label_en: parsed.github_label_en?.trim() || '',
      status_badge_en: parsed.status_badge_en?.trim() || '',
    }
  } catch (err) {
    console.warn('[translate] Errore chiamata Gemini:', err)
    return null
  }
}

/**
 * Traduce un singolo testo usando MyMemory Free API (fallback privo di chiavi)
 */
async function translateTextWithMyMemory(text: string): Promise<string> {
  if (!text || text.trim().length === 0) return ''
  try {
    const encoded = encodeURIComponent(text.trim())
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encoded}&langpair=it|en`)
    if (!res.ok) return text
    const json = await res.json()
    const translated = json?.responseData?.translatedText
    return typeof translated === 'string' && translated.length > 0 ? translated : text
  } catch {
    return text
  }
}

/**
 * Fallback translation using MyMemory
 */
async function fallbackTranslate(input: ProjectTranslationInput): Promise<ProjectTranslationOutput> {
  const [title_en, description_en, github_label_en, status_badge_en] = await Promise.all([
    input.title ? translateTextWithMyMemory(input.title) : Promise.resolve(''),
    input.description ? translateTextWithMyMemory(input.description) : Promise.resolve(''),
    input.github_label ? translateTextWithMyMemory(input.github_label) : Promise.resolve(''),
    input.status_badge ? translateTextWithMyMemory(input.status_badge) : Promise.resolve(''),
  ])

  return {
    title_en,
    description_en,
    github_label_en,
    status_badge_en,
  }
}

/**
 * Funzione principale:
 * Traduce i campi di un progetto dall'italiano all'inglese.
 */
export async function translateProjectData(
  input: ProjectTranslationInput
): Promise<ProjectTranslationOutput> {
  const apiKey = process.env.GEMINI_API_KEY?.trim()

  if (apiKey) {
    const geminiResult = await translateWithGemini(input, apiKey)
    if (geminiResult && (geminiResult.title_en || geminiResult.description_en)) {
      return geminiResult
    }
  }

  return fallbackTranslate(input)
}

export interface FAQTranslationInput {
  question_it?: string
  answer_it?: string
}

export interface FAQTranslationOutput {
  question_en: string
  answer_en: string
}

async function translateFAQWithGemini(
  input: FAQTranslationInput,
  apiKey: string
): Promise<FAQTranslationOutput | null> {
  try {
    const prompt = `You are a professional software engineer and bilingual translator (Italian to English).
Translate the following FAQ question and answer from Italian to fluent, professional, and clear English suitable for a web developer and consultant portfolio.
Maintain the exact meaning and friendly yet technical tone.

Input JSON:
${JSON.stringify({
  question_it: input.question_it || '',
  answer_it: input.answer_it || '',
})}

Respond ONLY with a valid raw JSON object with exactly these keys:
{
  "question_en": "...",
  "answer_en": "..."
}`

    const rawText = await callGeminiWithFallback({
      prompt,
      apiKey,
      jsonMode: true,
    })

    const cleanedText = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()

    const parsed = JSON.parse(cleanedText) as FAQTranslationOutput
    return {
      question_en: parsed.question_en?.trim() || '',
      answer_en: parsed.answer_en?.trim() || '',
    }
  } catch {
    return null
  }
}

export async function translateFAQData(
  input: FAQTranslationInput
): Promise<FAQTranslationOutput> {
  const apiKey = process.env.GEMINI_API_KEY?.trim()

  if (apiKey) {
    const geminiResult = await translateFAQWithGemini(input, apiKey)
    if (geminiResult && (geminiResult.question_en || geminiResult.answer_en)) {
      return geminiResult
    }
  }

  const [question_en, answer_en] = await Promise.all([
    input.question_it ? translateTextWithMyMemory(input.question_it) : Promise.resolve(''),
    input.answer_it ? translateTextWithMyMemory(input.answer_it) : Promise.resolve(''),
  ])

  return {
    question_en,
    answer_en,
  }
}

/**
 * Traduce un testo completo in formato Markdown da Italiano a Inglese preservando
 * rigorosamente la sintassi Markdown (titoli, liste, blocchi di codice, grassetto, tabelle, ecc.).
 * Solleva un errore esplicito se la chiave GEMINI_API_KEY non è configurata o se la traduzione fallisce.
 */
export async function translateMarkdownCaseStudy(markdown: string): Promise<string> {
  if (!markdown || !markdown.trim()) return ''

  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error(
      "Chiave GEMINI_API_KEY non configurata nelle variabili d'ambiente (su Vercel o in locale). Aggiungila nelle impostazioni del progetto per abilitare la traduzione automatica con IA."
    )
  }

  const prompt = `You are a professional software engineer and bilingual translator (Italian to English).
Translate the following project case study written in Markdown from Italian to fluent, technical, idiomatic English suitable for a top-tier software engineer portfolio.

CRITICAL INSTRUCTIONS:
1. Preserve ALL Markdown formatting EXACTLY: headers (#, ##, ###), bold (**text**), lists (- or 1.), blockquotes (>), horizontal rules (---), tables, and code blocks (\`\`\`lang ... \`\`\`).
2. Do not translate code, variable names, URLs, or file paths inside code blocks or inline backticks.
3. Maintain technical accuracy (e.g. "computo metrico" -> "cost estimation / bill of quantities", "trulli e masserie" -> "trulli and masserie (historic Apulian stone estates)").
4. Output ONLY the translated Markdown text directly without any extra wrapping, meta-commentary or JSON.

Markdown input:
${markdown}`

  try {
    const rawText = await callGeminiWithFallback({
      prompt,
      apiKey,
      jsonMode: false,
    })

    return rawText
      .replace(/^```markdown\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    throw new Error(`Errore durante la traduzione con Gemini: ${msg}`)
  }
}

export interface TestimonialTranslationInput {
  role_or_project_it?: string
  quote_it?: string
}

export interface TestimonialTranslationOutput {
  role_or_project_en: string
  quote_en: string
}

/**
 * Traduce i dati di una testimonianza (ruolo/commessa e citazione) da Italiano a Inglese.
 */
export async function translateTestimonialData(
  input: TestimonialTranslationInput
): Promise<TestimonialTranslationOutput> {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (apiKey) {
    try {
      const prompt = `You are a professional bilingual translator (Italian to English) specialized in professional recommendations, client testimonials, and endorsements for software engineers and web developers.
Translate the following testimonial fields from Italian to fluent, authentic, idiomatic English suitable for a professional software engineer's portfolio.
Maintain the exact sentiment, authenticity, and enthusiasm of the client's review.

Input JSON:
${JSON.stringify({
  role_or_project: input.role_or_project_it || '',
  quote: input.quote_it || '',
})}

Respond ONLY with a valid raw JSON object with exactly these keys:
{
  "role_or_project_en": "...",
  "quote_en": "..."
}`

      const rawJson = await callGeminiWithFallback({
        prompt,
        apiKey,
        jsonMode: true,
      })

      const cleanedText = rawJson
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim()

      const parsed = JSON.parse(cleanedText)
      return {
        role_or_project_en: parsed.role_or_project_en || '',
        quote_en: parsed.quote_en || '',
      }
    } catch {
      // Fallback
    }
  }

  // Fallback se Gemini non è disponibile
  let role_or_project_en = ''
  let quote_en = ''
  if (input.role_or_project_it) {
    role_or_project_en = await translateTextWithMyMemory(input.role_or_project_it)
  }
  if (input.quote_it) {
    quote_en = await translateTextWithMyMemory(input.quote_it)
  }

  return {
    role_or_project_en,
    quote_en,
  }
}

