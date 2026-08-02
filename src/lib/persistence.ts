import {
  EXPENSE_CATEGORIES,
  type BudgetState,
  type ExpenseCategory,
  type ExpenseItem,
  type LineItem,
} from "./types";

export const BUDGET_KEY = "saldo-budget";

const CATEGORY_SET = new Set<string>(EXPENSE_CATEGORIES);

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function sanitizeLineItem(raw: unknown, fallbackId: string): LineItem | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Partial<LineItem>;
  const id = typeof item.id === "string" && item.id.trim() ? item.id : fallbackId;
  const label = typeof item.label === "string" ? item.label : "";
  const amount = isFiniteNonNegative(item.amount) ? item.amount : 0;
  return { id, label, amount };
}

function sanitizeExpense(raw: unknown, fallbackId: string): ExpenseItem | null {
  const base = sanitizeLineItem(raw, fallbackId);
  if (!base) return null;
  const category =
    raw &&
    typeof raw === "object" &&
    typeof (raw as Partial<ExpenseItem>).category === "string" &&
    CATEGORY_SET.has((raw as Partial<ExpenseItem>).category as string)
      ? ((raw as Partial<ExpenseItem>).category as ExpenseCategory)
      : ("other" as ExpenseCategory);
  return { ...base, category };
}

/** Returns null when stored payload is missing or unusable. */
export function loadBudget(): BudgetState | null {
  try {
    const raw = window.localStorage.getItem(BUDGET_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<BudgetState>;
    if (!parsed || typeof parsed !== "object") return null;

    const incomes = Array.isArray(parsed.incomes)
      ? parsed.incomes
          .map((item, index) => sanitizeLineItem(item, `income-${index + 1}`))
          .filter((item): item is LineItem => item !== null)
      : [];

    const expenses = Array.isArray(parsed.expenses)
      ? parsed.expenses
          .map((item, index) => sanitizeExpense(item, `expense-${index + 1}`))
          .filter((item): item is ExpenseItem => item !== null)
      : [];

    if (incomes.length === 0 || expenses.length === 0) return null;

    return { incomes, expenses };
  } catch {
    return null;
  }
}

export function saveBudget(budget: BudgetState): void {
  try {
    window.localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
  } catch {
    // Quota / private mode — ignore; app still works in-memory.
  }
}

export function clearStoredBudget(): void {
  try {
    window.localStorage.removeItem(BUDGET_KEY);
  } catch {
    // ignore
  }
}
