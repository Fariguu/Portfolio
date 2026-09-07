import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createClient } from "@/lib/supabase/server";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

interface FAQProps {
  readonly dict: Dictionary;
  readonly locale?: Locale;
}

export async function FAQ({ dict, locale = "it" }: Readonly<FAQProps>) {
  let faqList = dict.faq.items;

  // Recupero dinamico da Supabase con fallback automatico sul dizionario statico
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      faqList = data.map((item) => ({
        question:
          locale === "en" && item.question_en
            ? item.question_en
            : item.question_it,
        answer:
          locale === "en" && item.answer_en
            ? item.answer_en
            : item.answer_it,
      }));
    }
  } catch {
    // In caso di errore o assenza di connessione DB, mantiene dict.faq.items
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="w-full py-24 bg-muted/20 relative border-t border-border/40">
      {/* Schema.org FAQPage per Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container px-4 md:px-6 mx-auto">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <p className="text-base font-semibold leading-7 text-primary dark:text-[#88fc9d]">
            {dict.faq.badge}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {dict.faq.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {dict.faq.description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="bg-background rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqList.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                    <span>{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground pt-1">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
