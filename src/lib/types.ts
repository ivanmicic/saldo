export type Locale = "sr" | "en";
export type Theme = "light" | "dark";
export type Currency = "RSD" | "EUR";

export type ExpenseCategory =
  | "housing"
  | "bills"
  | "food"
  | "transport"
  | "kids"
  | "health"
  | "entertainment"
  | "other";

export interface LineItem {
  id: string;
  label: string;
  amount: number;
}

export interface ExpenseItem extends LineItem {
  category: ExpenseCategory;
}

export interface BudgetState {
  incomes: LineItem[];
  expenses: ExpenseItem[];
}

export interface BudgetTotals {
  incomeTotal: number;
  expenseTotal: number;
  saldo: number;
  expensesByCategory: Record<ExpenseCategory, number>;
}

/** Compact saved month — totals only, for local history. */
export interface MonthSnapshot {
  id: string;
  year: number;
  month: number; // 1–12
  currency: Currency;
  incomeTotal: number;
  expenseTotal: number;
  saldo: number;
  topCategory: ExpenseCategory | null;
  topCategoryAmount: number;
  savedAt: string;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "housing",
  "bills",
  "food",
  "transport",
  "kids",
  "health",
  "entertainment",
  "other",
];

export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createIncome(partial?: Partial<LineItem>): LineItem {
  return {
    id: createId(),
    label: "",
    amount: 0,
    ...partial,
  };
}

export function createExpense(partial?: Partial<ExpenseItem>): ExpenseItem {
  return {
    id: createId(),
    label: "",
    amount: 0,
    category: "other",
    ...partial,
  };
}
