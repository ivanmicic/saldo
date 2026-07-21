import type { Locale } from "./types";

/** Deterministic money formatting — avoids Node vs browser Intl hydration diffs. */
export function formatMoney(amount: number, locale: Locale): string {
  const negative = amount < 0;
  const abs = Math.abs(amount);
  const hasFraction = !Number.isInteger(abs);
  const fixed = hasFraction ? abs.toFixed(2) : String(Math.round(abs));
  const [intRaw, fraction] = fixed.split(".");

  const groupSep = locale === "sr" ? "." : ",";
  const decimalSep = locale === "sr" ? "," : ".";
  const grouped = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, groupSep);
  const body = fraction ? `${grouped}${decimalSep}${fraction}` : grouped;

  return negative ? `−${body}` : body;
}

export function formatSignedMoney(amount: number, locale: Locale): string {
  const formatted = formatMoney(Math.abs(amount), locale);
  if (amount > 0) return `+${formatted}`;
  if (amount < 0) return `−${formatted}`;
  return formatted;
}
