import { en } from "@/content/en";
import { hi } from "@/content/hi";

export type Lang = "en" | "hi";
export const LOCALES: Lang[] = ["en", "hi"];
export const DEFAULT_LOCALE: Lang = "en";

export function getDictionary(lang: string) {
  if (lang === "hi") {
    return hi;
  }
  return en;
}

export function isValidLocale(lang: string): lang is Lang {
  return LOCALES.includes(lang as Lang);
}
