"use client";

import { Amount } from "@/components/Amount";
import { useApp } from "@/context/AppContext";
import { EXPENSE_CATEGORIES } from "@/lib/types";

export function MonthlyOverview() {
  const { dict, totals } = useApp();
  const { incomeTotal, expenseTotal, saldo, expensesByCategory } = totals;
  const max = Math.max(incomeTotal, expenseTotal, 1);

  const top = EXPENSE_CATEGORIES.map((category) => ({
    category,
    amount: expensesByCategory[category],
  })).sort((a, b) => b.amount - a.amount)[0];

  const topPercent =
    expenseTotal > 0 && top ? Math.round((top.amount / expenseTotal) * 100) : 0;

  const topCategoryText =
    expenseTotal > 0 && top && top.amount > 0
      ? dict.overview.topCategory
          .replace("{category}", dict.categories[top.category])
          .replace("{percent}", String(topPercent))
      : dict.overview.topCategoryEmpty;

  const saldoStatus =
    saldo > 0
      ? dict.overview.saldoPositive
      : saldo < 0
        ? dict.overview.saldoNegative
        : dict.overview.saldoZero;

  return (
    <section id="overview" className="border-b border-border" aria-labelledby="overview-title">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id="overview-title"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            {dict.overview.title}
          </h2>
          <p className="mt-3 text-fg-muted">{dict.overview.subtitle}</p>
        </div>

        <div className="mt-10 rounded-app border border-border bg-bg-elevated p-5 shadow-soft sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-fg">{dict.overview.thisMonth}</p>
            <p className="text-sm text-fg-muted">{dict.overview.note}</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <OverviewStat
              label={dict.overview.income}
              value={incomeTotal}
              barClass="bg-income"
              width={(incomeTotal / max) * 100}
              valueClass="text-income-fg"
            />
            <OverviewStat
              label={dict.overview.expenses}
              value={expenseTotal}
              barClass="bg-expense"
              width={(expenseTotal / max) * 100}
              valueClass="text-expense-fg"
            />
            <OverviewStat
              label={dict.overview.saldo}
              value={saldo}
              barClass="bg-saldo"
              width={(Math.abs(saldo) / max) * 100}
              valueClass={
                saldo > 0 ? "text-income-fg" : saldo < 0 ? "text-expense-fg" : "text-saldo-fg"
              }
              signed
            />
          </div>

          <div className="mt-6 space-y-1.5 border-t border-border pt-5 text-sm text-fg-muted">
            <p>{saldoStatus}</p>
            <p>{topCategoryText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewStat({
  label,
  value,
  barClass,
  width,
  valueClass,
  signed = false,
}: {
  label: string;
  value: number;
  barClass: string;
  width: number;
  valueClass: string;
  signed?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-fg-muted">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold ${valueClass}`}>
        <Amount value={value} signed={signed} />
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg-muted" aria-hidden="true">
        <div
          className={`h-full rounded-full ${barClass} transition-[width] duration-300`}
          style={{ width: `${Math.min(100, Math.max(0, width))}%` }}
        />
      </div>
    </div>
  );
}
