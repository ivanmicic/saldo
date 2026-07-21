"use client";

import { Amount } from "@/components/Amount";
import { ExpenseRow, IncomeRow } from "@/components/LineItemRows";
import { useApp } from "@/context/AppContext";

export function SaldoSummary() {
  const { dict, totals } = useApp();
  const { saldo, incomeTotal, expenseTotal } = totals;

  const statusText =
    saldo > 0 ? dict.saldo.positive : saldo < 0 ? dict.saldo.negative : dict.saldo.zero;

  const saldoTone =
    saldo > 0 ? "text-income-fg" : saldo < 0 ? "text-expense-fg" : "text-saldo-fg";

  return (
    <aside
      className="rounded-app border border-border bg-saldo-soft/60 p-5 sm:p-6"
      aria-live="polite"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-saldo">
        {dict.saldo.title}
      </p>
      <p className="mt-1 text-sm text-fg-muted">{dict.saldo.remaining}</p>
      <p className={`mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl ${saldoTone}`}>
        <Amount value={saldo} signed />
      </p>
      <p className={`mt-2 text-sm font-medium ${saldoTone}`}>{statusText}</p>

      <dl className="mt-6 space-y-3 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <dt className="text-fg-muted">{dict.saldo.incomeLabel}</dt>
          <dd className="font-medium text-income-fg">
            <Amount value={incomeTotal} />
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <dt className="text-fg-muted">{dict.saldo.expenseLabel}</dt>
          <dd className="font-medium text-expense-fg">
            <Amount value={expenseTotal} />
          </dd>
        </div>
      </dl>
    </aside>
  );
}

export function BudgetWorkspace() {
  const { dict, budget, totals, addIncome, addExpense } = useApp();

  return (
    <section id="budget" className="border-b border-border" aria-labelledby="budget-title">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id="budget-title"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            {dict.budget.title}
          </h2>
          <p className="mt-3 text-fg-muted">{dict.budget.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div className="space-y-6">
            {/* Income */}
            <section
              className="rounded-app border border-border bg-bg-elevated p-4 shadow-soft sm:p-5"
              aria-labelledby="income-heading"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h3 id="income-heading" className="text-lg font-semibold text-income-fg">
                    {dict.budget.incomeTitle}
                  </h3>
                  <p className="mt-1 text-sm text-fg-muted">{dict.budget.incomeHint}</p>
                </div>
                <p className="text-sm font-medium text-income-fg">
                  <span className="mr-2 text-fg-muted">{dict.budget.totalIncome}</span>
                  <Amount value={totals.incomeTotal} />
                </p>
              </div>

              <div className="mt-4 space-y-4">
                {budget.incomes.length === 0 ? (
                  <p className="text-sm text-fg-muted">{dict.budget.emptyIncome}</p>
                ) : (
                  budget.incomes.map((item) => (
                    <IncomeRow
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      amount={item.amount}
                      canRemove={budget.incomes.length > 1}
                    />
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={addIncome}
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-app-sm border border-income/30 bg-income-soft px-3.5 py-2 text-sm font-semibold text-income-fg transition-opacity hover:opacity-90"
              >
                <span aria-hidden="true">+</span>
                {dict.budget.addIncome}
              </button>
            </section>

            {/* Expenses */}
            <section
              className="rounded-app border border-border bg-bg-elevated p-4 shadow-soft sm:p-5"
              aria-labelledby="expense-heading"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h3 id="expense-heading" className="text-lg font-semibold text-expense-fg">
                    {dict.budget.expenseTitle}
                  </h3>
                  <p className="mt-1 text-sm text-fg-muted">{dict.budget.expenseHint}</p>
                </div>
                <p className="text-sm font-medium text-expense-fg">
                  <span className="mr-2 text-fg-muted">{dict.budget.totalExpense}</span>
                  <Amount value={totals.expenseTotal} />
                </p>
              </div>

              <div className="mt-4 space-y-4">
                {budget.expenses.length === 0 ? (
                  <p className="text-sm text-fg-muted">{dict.budget.emptyExpense}</p>
                ) : (
                  budget.expenses.map((item) => (
                    <ExpenseRow
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      amount={item.amount}
                      category={item.category}
                      canRemove={budget.expenses.length > 1}
                    />
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={addExpense}
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-app-sm border border-expense/30 bg-expense-soft px-3.5 py-2 text-sm font-semibold text-expense-fg transition-opacity hover:opacity-90"
              >
                <span aria-hidden="true">+</span>
                {dict.budget.addExpense}
              </button>
            </section>
          </div>

          <div className="lg:sticky lg:top-20">
            <SaldoSummary />
          </div>
        </div>
      </div>

      {/* Mobile sticky saldo bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-elevated/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-fg-subtle">{dict.saldo.stickyLabel}</p>
            <p
              className={`truncate text-sm ${
                totals.saldo > 0
                  ? "text-income-fg"
                  : totals.saldo < 0
                    ? "text-expense-fg"
                    : "text-fg-muted"
              }`}
            >
              {totals.saldo > 0
                ? dict.saldo.stickyPositive
                : totals.saldo < 0
                  ? dict.saldo.stickyNegative
                  : dict.saldo.stickyZero}
            </p>
          </div>
          <span
            className={`shrink-0 font-display text-lg font-semibold tabular-nums ${
              totals.saldo > 0
                ? "text-income-fg"
                : totals.saldo < 0
                  ? "text-expense-fg"
                  : "text-saldo-fg"
            }`}
          >
            <Amount value={totals.saldo} signed />
          </span>
        </div>
      </div>
    </section>
  );
}
