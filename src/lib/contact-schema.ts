import { z } from "zod";

export const contactFormSchema = z.object({
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
  message: z
    .string()
    .trim()
    .min(10, { message: "Il messaggio deve contenere almeno 10 caratteri" })
    .max(3000, { message: "Il messaggio non può superare 3000 caratteri" }),
  turnstileToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
