import type {
  BudgetTotals,
  Currency,
  ExpenseCategory,
  Locale,
  MonthSnapshot,
} from "./types";
import { EXPENSE_CATEGORIES, createId } from "./types";

export const HISTORY_KEY = "saldo-history";
export const MAX_SNAPSHOTS = 24;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function sanitizeSnapshot(raw: unknown): MonthSnapshot | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Partial<MonthSnapshot>;

  const year = item.year;
  const month = item.month;
  if (!isFiniteNumber(year) || !isFiniteNumber(month) || month < 1 || month > 12) {
    return null;
  }
  if (item.currency !== "RSD" && item.currency !== "EUR") return null;
  if (
    !isFiniteNumber(item.incomeTotal) ||
    !isFiniteNumber(item.expenseTotal) ||
    !isFiniteNumber(item.saldo)
  ) {
    return null;
  }

  const topCategory =
    typeof item.topCategory === "string" &&
    EXPENSE_CATEGORIES.includes(item.topCategory as ExpenseCategory)
      ? (item.topCategory as ExpenseCategory)
      : null;

  return {
    id: typeof item.id === "string" && item.id ? item.id : createId(),
    year: Math.trunc(year),
    month: Math.trunc(month),
    currency: item.currency,
    incomeTotal: item.incomeTotal,
    expenseTotal: item.expenseTotal,
    saldo: item.saldo,
    topCategory,
    topCategoryAmount: isFiniteNumber(item.topCategoryAmount) ? item.topCategoryAmount : 0,
    savedAt: typeof item.savedAt === "string" ? item.savedAt : new Date().toISOString(),
  };
}

export function loadHistory(): MonthSnapshot[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(sanitizeSnapshot)
      .filter((item): item is MonthSnapshot => item !== null)
      .sort(compareSnapshots);
  } catch {
    return [];
  }
}

export function persistHistory(snapshots: MonthSnapshot[]): void {
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(snapshots.slice(0, MAX_SNAPSHOTS)));
  } catch {
    // Quota / private mode — ignore
  }
}

function compareSnapshots(a: MonthSnapshot, b: MonthSnapshot): number {
  if (a.year !== b.year) return b.year - a.year;
  if (a.month !== b.month) return b.month - a.month;
  return b.savedAt.localeCompare(a.savedAt);
}

export function currentYearMonth(date = new Date()): { year: number; month: number } {
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

export function findSnapshotForMonth(
  snapshots: MonthSnapshot[],
  year: number,
  month: number,
  currency: Currency,
): MonthSnapshot | undefined {
  return snapshots.find(
    (item) => item.year === year && item.month === month && item.currency === currency,
  );
}

export function buildMonthSnapshot(
  totals: BudgetTotals,
  currency: Currency,
  year: number,
  month: number,
): MonthSnapshot {
  const top = EXPENSE_CATEGORIES.map((category) => ({
    category,
    amount: totals.expensesByCategory[category],
  })).sort((a, b) => b.amount - a.amount)[0];

  const hasTop = Boolean(top && top.amount > 0);

  return {
    id: createId(),
    year,
    month,
    currency,
    incomeTotal: totals.incomeTotal,
    expenseTotal: totals.expenseTotal,
    saldo: totals.saldo,
    topCategory: hasTop ? top.category : null,
    topCategoryAmount: hasTop ? top.amount : 0,
    savedAt: new Date().toISOString(),
  };
}

/** Upsert by year + month + currency; newest first; cap length. */
export function upsertSnapshot(
  snapshots: MonthSnapshot[],
  next: MonthSnapshot,
): MonthSnapshot[] {
  const withoutSameMonth = snapshots.filter(
    (item) =>
      !(
        item.year === next.year &&
        item.month === next.month &&
        item.currency === next.currency
      ),
  );
  return [next, ...withoutSameMonth].sort(compareSnapshots).slice(0, MAX_SNAPSHOTS);
}

export function removeSnapshot(
  snapshots: MonthSnapshot[],
  id: string,
): MonthSnapshot[] {
  return snapshots.filter((item) => item.id !== id);
}

export function formatMonthLabel(year: number, month: number, locale: Locale): string {
  const tag = locale === "sr" ? "sr-Latn-RS" : "en-GB";
  return new Intl.DateTimeFormat(tag, { month: "long", year: "numeric" }).format(
    new Date(year, month - 1, 1),
  );
}
