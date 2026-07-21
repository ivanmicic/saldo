"use client";

import { parseAmount } from "@/lib/budget";
import { EXPENSE_CATEGORIES, type ExpenseCategory } from "@/lib/types";
import { useApp } from "@/context/AppContext";

interface IncomeRowProps {
  id: string;
  label: string;
  amount: number;
  canRemove: boolean;
}

export function IncomeRow({ id, label, amount, canRemove }: IncomeRowProps) {
  const { dict, updateIncome, removeIncome } = useApp();

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_8rem_auto] sm:items-end sm:gap-3">
      <div>
        <label className="mb-1 block text-xs font-medium text-fg-muted" htmlFor={`income-label-${id}`}>
          {dict.budget.label}
        </label>
        <input
          id={`income-label-${id}`}
          type="text"
          value={label}
          onChange={(e) => updateIncome(id, { label: e.target.value })}
          className="w-full rounded-app-sm border border-border bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-fg-subtle"
          placeholder="…"
          autoComplete="off"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-fg-muted" htmlFor={`income-amount-${id}`}>
          {dict.budget.amount}
        </label>
        <input
          id={`income-amount-${id}`}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={amount || ""}
          onChange={(e) => updateIncome(id, { amount: parseAmount(e.target.value) })}
          className="w-full rounded-app-sm border border-border bg-bg px-3 py-2.5 text-sm text-fg tabular-nums"
          placeholder="0"
        />
      </div>
      <button
        type="button"
        onClick={() => removeIncome(id)}
        disabled={!canRemove}
        className="inline-flex min-h-10 items-center justify-center rounded-app-sm px-3 text-sm text-fg-muted transition-colors hover:text-danger disabled:cursor-not-allowed disabled:opacity-30 sm:mb-0.5"
        aria-label={dict.budget.remove}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 7h12M10 7V5h4v2M9 7v12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

interface ExpenseRowProps {
  id: string;
  label: string;
  amount: number;
  category: ExpenseCategory;
  canRemove: boolean;
}

export function ExpenseRow({ id, label, amount, category, canRemove }: ExpenseRowProps) {
  const { dict, updateExpense, removeExpense } = useApp();

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_8.5rem_7.5rem_auto] sm:items-end sm:gap-3">
      <div>
        <label className="mb-1 block text-xs font-medium text-fg-muted" htmlFor={`expense-label-${id}`}>
          {dict.budget.label}
        </label>
        <input
          id={`expense-label-${id}`}
          type="text"
          value={label}
          onChange={(e) => updateExpense(id, { label: e.target.value })}
          className="w-full rounded-app-sm border border-border bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-fg-subtle"
          placeholder="…"
          autoComplete="off"
        />
      </div>
      <div>
        <label
          className="mb-1 block text-xs font-medium text-fg-muted"
          htmlFor={`expense-category-${id}`}
        >
          {dict.budget.category}
        </label>
        <select
          id={`expense-category-${id}`}
          value={category}
          onChange={(e) =>
            updateExpense(id, { category: e.target.value as ExpenseCategory })
          }
          className="w-full rounded-app-sm border border-border bg-bg px-3 py-2.5 text-sm text-fg"
        >
          {EXPENSE_CATEGORIES.map((key) => (
            <option key={key} value={key}>
              {dict.categories[key]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          className="mb-1 block text-xs font-medium text-fg-muted"
          htmlFor={`expense-amount-${id}`}
        >
          {dict.budget.amount}
        </label>
        <input
          id={`expense-amount-${id}`}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={amount || ""}
          onChange={(e) => updateExpense(id, { amount: parseAmount(e.target.value) })}
          className="w-full rounded-app-sm border border-border bg-bg px-3 py-2.5 text-sm text-fg tabular-nums"
          placeholder="0"
        />
      </div>
      <button
        type="button"
        onClick={() => removeExpense(id)}
        disabled={!canRemove}
        className="inline-flex min-h-10 items-center justify-center rounded-app-sm px-3 text-sm text-fg-muted transition-colors hover:text-danger disabled:cursor-not-allowed disabled:opacity-30 sm:mb-0.5"
        aria-label={dict.budget.remove}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 7h12M10 7V5h4v2M9 7v12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
