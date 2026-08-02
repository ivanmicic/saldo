"use client";

import { useState } from "react";
import { Amount } from "@/components/Amount";
import { useApp } from "@/context/AppContext";
import { formatMonthLabel } from "@/lib/history";

export function MonthHistory() {
  const {
    dict,
    locale,
    history,
    saveMonthSnapshot,
    deleteMonthSnapshot,
  } = useApp();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = () => {
    const result = saveMonthSnapshot();
    if (result === "empty") {
      setFeedback(dict.history.emptyBudget);
      return;
    }
    if (result === "cancelled") {
      setFeedback(null);
      return;
    }
    setFeedback(dict.history.saved);
  };

  const handleDelete = (id: string, year: number, month: number) => {
    const label = formatMonthLabel(year, month, locale);
    if (!window.confirm(dict.history.deleteConfirm.replace("{month}", label))) {
      return;
    }
    deleteMonthSnapshot(id);
    setFeedback(null);
  };

  return (
    <section id="history" className="border-b border-border" aria-labelledby="history-title">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="history-title"
              className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
            >
              {dict.history.title}
            </h2>
            <p className="mt-3 text-fg-muted">{dict.history.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="self-start inline-flex min-h-10 items-center justify-center rounded-app bg-saldo px-4 py-2 text-sm font-semibold text-bg-elevated transition-opacity hover:opacity-90 sm:self-auto sm:shrink-0"
          >
            {dict.history.save}
          </button>
        </div>

        <p className="mt-3 max-w-2xl text-sm text-fg-subtle">{dict.history.saveHint}</p>
        {feedback ? (
          <p className="mt-2 text-sm font-medium text-saldo-fg" role="status">
            {feedback}
          </p>
        ) : null}

        <div className="mt-10">
          {history.length === 0 ? (
            <p className="rounded-app border border-dashed border-border bg-bg-elevated/50 px-4 py-8 text-sm text-fg-muted">
              {dict.history.empty}
            </p>
          ) : (
            <ul className="space-y-3">
              {history.map((item) => {
                const label = formatMonthLabel(item.year, item.month, locale);
                const saldoTone =
                  item.saldo > 0
                    ? "text-income-fg"
                    : item.saldo < 0
                      ? "text-expense-fg"
                      : "text-saldo-fg";
                const topText =
                  item.topCategory && item.topCategoryAmount > 0
                    ? dict.history.topCategory.replace(
                        "{category}",
                        dict.categories[item.topCategory],
                      )
                    : null;

                return (
                  <li
                    key={item.id}
                    className="rounded-app border border-border bg-bg-elevated p-4 shadow-soft sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-fg">{label}</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-fg-subtle">
                          {item.currency}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.year, item.month)}
                        className="text-sm font-medium text-fg-subtle underline-offset-4 transition-colors hover:text-danger hover:underline"
                      >
                        {dict.history.delete}
                      </button>
                    </div>

                    <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div>
                        <dt className="text-sm text-fg-muted">{dict.overview.income}</dt>
                        <dd className="mt-0.5 font-medium text-income-fg">
                          <Amount value={item.incomeTotal} currencyCode={item.currency} />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-fg-muted">{dict.overview.expenses}</dt>
                        <dd className="mt-0.5 font-medium text-expense-fg">
                          <Amount value={item.expenseTotal} currencyCode={item.currency} />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-fg-muted">{dict.overview.saldo}</dt>
                        <dd className={`mt-0.5 font-display text-xl font-semibold ${saldoTone}`}>
                          <Amount value={item.saldo} signed currencyCode={item.currency} />
                        </dd>
                      </div>
                    </dl>

                    {topText ? (
                      <p className="mt-3 text-sm text-fg-muted">{topText}</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
