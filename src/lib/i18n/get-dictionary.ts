import { defaultLocale, type Locale } from "./config";
import { itDictionary } from "./dictionaries/it";
import { enDictionary } from "./dictionaries/en";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = {
  it: itDictionary,
  en: enDictionary,
};

export function getDictionary(locale?: string): Dictionary {
  if (locale === "en") {
    return dictionaries.en;
  }
  return dictionaries[defaultLocale];
}
