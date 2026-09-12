import { z } from "zod";

export const PROJECT_TYPES = [
  "web-app",
  "showcase-site",
  "booking-system",
  "restyling-speed",
] as const;

export const FEATURE_OPTIONS = [
  "auth",
  "database",
  "payments",
  "maps",
  "multilang",
  "cms",
] as const;

export const TIMELINE_OPTIONS = ["urgent", "standard", "flexible"] as const;

export const MATERIAL_OPTIONS = ["ready", "in-progress", "none"] as const;

export const BUDGET_OPTIONS = [
  "tier-1",
  "tier-2",
  "tier-3",
  "tier-4",
  "undecided",
] as const;

export const quoteFormSchema = z.object({
  // Step 1: Tipologia
  projectType: z.enum(PROJECT_TYPES, {
    message: "Seleziona la tipologia di soluzione desiderata",
  }),

  // Step 2: Funzionalità
  features: z.array(z.enum(FEATURE_OPTIONS)).default([]),

  // Step 3: Tempistiche, Materiali e Budget
  timeline: z.enum(TIMELINE_OPTIONS, {
    message: "Seleziona una tempistica indicativa",
  }),
  materials: z.enum(MATERIAL_OPTIONS, {
    message: "Indica lo stato del materiale grafico/testuale",
  }),
  budget: z.enum(BUDGET_OPTIONS, {
    message: "Seleziona una fascia di budget indicativa",
  }),

  // Step 4: Dati di contatto & Dettagli
  firstName: z
    .string()
    .trim()
    .min(2, { message: "Il nome deve contenere almeno 2 caratteri" })
    .max(50, { message: "Il nome non può superare 50 caratteri" }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Il cognome deve contenere almeno 2 caratteri" })
    .max(50, { message: "Il cognome non può superare 50 caratteri" }),
  email: z
    .string()
    .trim()
    .email({ message: "Inserisci un indirizzo email valido" })
    .max(100, { message: "L'indirizzo email è troppo lungo" }),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Il numero di telefono è troppo lungo" })
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .trim()
    .max(3000, { message: "Le note non possono superare 3000 caratteri" })
    .optional()
    .or(z.literal("")),
  turnstileToken: z.string().optional(),
  locale: z.enum(["it", "en"]).default("it"),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type ProjectType = (typeof PROJECT_TYPES)[number];
export type FeatureOption = (typeof FEATURE_OPTIONS)[number];
export type TimelineOption = (typeof TIMELINE_OPTIONS)[number];
export type MaterialOption = (typeof MATERIAL_OPTIONS)[number];
export type BudgetOption = (typeof BUDGET_OPTIONS)[number];
