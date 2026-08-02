"use client";

import { useApp } from "@/context/AppContext";
import { formatMoney } from "@/lib/format";
import type { Currency } from "@/lib/types";

interface AmountProps {
  value: number;
  className?: string;
  signed?: boolean;
  /** Override active currency (e.g. historical snapshots). */
  currencyCode?: Currency;
}

export function Amount({
  value,
  className = "",
  signed = false,
  currencyCode,
}: AmountProps) {
  const { locale, currency } = useApp();
  const abs = Math.abs(value);
  const formatted = formatMoney(abs, locale);
  const code = currencyCode ?? currency;
  let prefix = "";
  if (signed) {
    if (value > 0) prefix = "+";
    if (value < 0) prefix = "−";
  }

  return (
    <span className={`tabular-nums ${className}`}>
      <span>
        {prefix}
        {formatted}
      </span>
      <span className="ml-1 text-[0.75em] font-medium opacity-70">{code}</span>
    </span>
  );
}
