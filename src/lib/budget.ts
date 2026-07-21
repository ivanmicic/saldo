import type { BudgetState, BudgetTotals, ExpenseCategory } from "./types";
import { EXPENSE_CATEGORIES } from "./types";

export function parseAmount(value: string): number {
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const n = Number.parseFloat(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function calculateTotals(state: BudgetState): BudgetTotals {
  const incomeTotal = state.incomes.reduce((sum, item) => sum + (item.amount || 0), 0);
  const expenseTotal = state.expenses.reduce((sum, item) => sum + (item.amount || 0), 0);

  const expensesByCategory = EXPENSE_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<ExpenseCategory, number>,
  );

  for (const expense of state.expenses) {
    expensesByCategory[expense.category] += expense.amount || 0;
  }

  return {
    incomeTotal,
    expenseTotal,
    saldo: incomeTotal - expenseTotal,
    expensesByCategory,
  };
}
