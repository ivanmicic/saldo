"use client";

import { useMemo } from "react";
import { getSavingsAdvice } from "@/lib/advice";
import { useApp } from "@/context/AppContext";

export function SavingsAdvice() {
  const { dict, locale, currency, totals, budget } = useApp();

  const tips = useMemo(
    () =>
      getSavingsAdvice({
        totals,
        expenseCount: budget.expenses.filter((e) => e.amount > 0).length,
        locale,
        currency,
        dict,
      }),
    [totals, budget.expenses, locale, currency, dict],
  );

  return (
    <section id="advice" className="border-b border-border" aria-labelledby="advice-title">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id="advice-title"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            {dict.advice.title}
          </h2>
          <p className="mt-3 text-fg-muted">{dict.advice.subtitle}</p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {tips.map((tip, index) => {
            const isPrimary = index === 0;

            return (
              <li
                key={tip.id}
                className={
                  isPrimary
                    ? "rounded-app border border-saldo/35 bg-saldo-soft/50 p-5 shadow-soft sm:p-6"
                    : "rounded-app border border-border bg-bg-elevated p-5 shadow-soft"
                }
              >
                {isPrimary ? (
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-saldo">
                    {dict.advice.primaryLabel}
                  </p>
                ) : null}
                <p
                  className={`font-display text-sm font-semibold tabular-nums ${
                    isPrimary ? "mt-2 text-saldo" : "text-fg-subtle"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3
                  className={`mt-3 font-semibold text-fg ${
                    isPrimary ? "text-lg" : "text-base"
                  }`}
                >
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{tip.body}</p>
                {tip.reason ? (
                  <p className="mt-4 border-t border-border/70 pt-3 text-xs leading-relaxed text-fg-subtle">
                    {tip.reason}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
