"use client";

import { useApp } from "@/context/AppContext";
import { formatMoney } from "@/lib/format";

const samplePreview = {
  saldo: 42500,
  income: 120000,
  expenses: 77500,
  incomeShare: 72,
  expenseShare: 46,
  status: "positive" as const,
};

export function Hero() {
  const { dict, locale } = useApp();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="animate-fade-up font-display text-sm font-medium tracking-[0.04em] text-saldo">
            {dict.brand.name}
          </p>
          <h1
            id="hero-title"
            className="animate-fade-up delay-1 mt-3 max-w-xl font-display text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.03em] text-fg sm:text-5xl"
          >
            {dict.hero.title}
          </h1>
          <p className="animate-fade-up delay-2 mt-5 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
            {dict.hero.subtitle}
          </p>
          <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">
            <a
              href="#budget"
              className="inline-flex min-h-11 items-center justify-center rounded-app bg-saldo px-5 py-2.5 text-sm font-semibold text-bg-elevated transition-opacity hover:opacity-90"
            >
              {dict.hero.primaryCta}
            </a>
            <a
              href="#how"
              className="inline-flex min-h-11 items-center justify-center rounded-app border border-border-strong bg-bg-elevated px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-bg-muted"
            >
              {dict.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div
          className="animate-fade-in delay-2 relative mx-auto w-full max-w-md lg:mx-0"
          aria-hidden="true"
        >
          <div className="rounded-app border border-border bg-bg-elevated p-5 shadow-soft sm:p-6">
            <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-fg-subtle">
                  {dict.saldo.title}
                </p>
                <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-saldo-fg tabular-nums">
                  {formatMoney(samplePreview.saldo, locale)}
                  <span className="ml-1 text-sm font-medium text-fg-subtle">
                    {dict.budget.currency}
                  </span>
                </p>
              </div>
              <span className="rounded-app-sm bg-income-soft px-2.5 py-1 text-xs font-medium text-income-fg">
                {dict.hero.previewPositive}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-fg-muted">
                  <span className="h-2 w-2 rounded-full bg-income" />
                  {dict.saldo.incomeLabel}
                </span>
                <span className="font-medium text-income-fg tabular-nums">
                  {formatMoney(samplePreview.income, locale)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bg-muted">
                <div
                  className="h-full rounded-full bg-income"
                  style={{ width: `${samplePreview.incomeShare}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2 text-sm">
                <span className="flex items-center gap-2 text-fg-muted">
                  <span className="h-2 w-2 rounded-full bg-expense" />
                  {dict.saldo.expenseLabel}
                </span>
                <span className="font-medium text-expense-fg tabular-nums">
                  {formatMoney(samplePreview.expenses, locale)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bg-muted">
                <div
                  className="h-full rounded-full bg-expense"
                  style={{ width: `${samplePreview.expenseShare}%` }}
                />
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-fg-muted">{dict.brand.slogan}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
