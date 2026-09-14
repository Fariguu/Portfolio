"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  readonly items: ReadonlyArray<FaqItem>;
}

export function FaqAccordion({ items }: Readonly<FaqAccordionProps>) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {items.map((item, index) => (
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
  );
}
