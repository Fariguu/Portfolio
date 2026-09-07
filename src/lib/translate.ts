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

    // Endpoint standard Gemini 2.5 Flash
    const model = 'gemini-2.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    })

    if (!response.ok) {
      console.warn(`[translate] Gemini API error (${response.status}):`, await response.text())
      return null
    }

    const data = await response.json()
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!rawText) return null

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

    const model = 'gemini-2.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    })

    if (!response.ok) return null

    const data = await response.json()
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!rawText) return null

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
 * rigorosamente la sintassi Markdown (titoli, liste, blocchi di codice, grassetto, ecc.).
 */
export async function translateMarkdownCaseStudy(markdown: string): Promise<string> {
  if (!markdown || !markdown.trim()) return ''

  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (apiKey) {
    try {
      const prompt = `You are a professional software engineer and bilingual translator (Italian to English).
Translate the following project case study written in Markdown from Italian to fluent, technical, idiomatic English suitable for a top-tier software engineer portfolio.

CRITICAL INSTRUCTIONS:
1. Preserve ALL Markdown formatting EXACTLY: headers (#, ##, ###), bold (**text**), lists (- or 1.), blockquotes (>), horizontal rules (---), and code blocks (\`\`\`lang ... \`\`\`).
2. Do not translate code, variable names, URLs, or file paths inside code blocks or inline backticks.
3. Maintain technical accuracy (e.g. "computo metrico" -> "cost estimation / bill of quantities", "trulli e masserie" -> "trulli and masserie (historic Apulian stone estates)").
4. Output ONLY the translated Markdown text directly without any extra wrapping, meta-commentary or JSON.

Markdown input:
${markdown}`

      const model = 'gemini-2.5-flash'
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (rawText && rawText.trim().length > 0) {
          return rawText
            .replace(/^```markdown\s*/i, '')
            .replace(/```\s*$/i, '')
            .trim()
        }
      }
    } catch {
      // Fallback
    }
  }

  // Fallback se Gemini non è configurato: restituisce il testo originale
  return markdown
}

