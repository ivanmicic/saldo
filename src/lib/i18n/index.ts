import type { Locale } from "../types";
import type { Dictionary } from "./types";
import { en } from "./en";
import { sr } from "./sr";

export const dictionaries: Record<Locale, Dictionary> = {
  sr,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
