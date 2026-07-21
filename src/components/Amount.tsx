"use client";

import { useApp } from "@/context/AppContext";
import { formatMoney } from "@/lib/format";

interface AmountProps {
  value: number;
  className?: string;
  signed?: boolean;
}

export function Amount({ value, className = "", signed = false }: AmountProps) {
  const { locale, dict } = useApp();
  const abs = Math.abs(value);
  const formatted = formatMoney(abs, locale);
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
      <span className="ml-1 text-[0.75em] font-medium opacity-70">{dict.budget.currency}</span>
    </span>
  );
}
