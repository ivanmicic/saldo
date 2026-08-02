"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { calculateTotals } from "@/lib/budget";
import { getDictionary, type Dictionary } from "@/lib/i18n";
import {
  buildMonthSnapshot,
  currentYearMonth,
  findSnapshotForMonth,
  formatMonthLabel,
  HISTORY_KEY,
  loadHistory,
  persistHistory,
  removeSnapshot,
  upsertSnapshot,
} from "@/lib/history";
import {
  BUDGET_KEY,
  clearStoredBudget,
  loadBudget,
  saveBudget,
} from "@/lib/persistence";
import {
  createExpense,
  createIncome,
  type BudgetState,
  type BudgetTotals,
  type Currency,
  type ExpenseCategory,
  type ExpenseItem,
  type LineItem,
  type Locale,
  type MonthSnapshot,
  type Theme,
} from "@/lib/types";

const LOCALE_KEY = "saldo-locale";
const THEME_KEY = "saldo-theme";
const CURRENCY_KEY = "saldo-currency";

export type SaveMonthResult = "saved" | "empty" | "cancelled";

interface AppContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  theme: Theme;
  toggleTheme: () => void;
  dict: Dictionary;
  budget: BudgetState;
  totals: BudgetTotals;
  history: MonthSnapshot[];
  saveMonthSnapshot: () => SaveMonthResult;
  deleteMonthSnapshot: (id: string) => void;
  addIncome: () => void;
  addExpense: () => void;
  updateIncome: (id: string, patch: Partial<LineItem>) => void;
  updateExpense: (id: string, patch: Partial<ExpenseItem>) => void;
  removeIncome: (id: string) => void;
  removeExpense: (id: string) => void;
  clearBudget: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function createEmptyBudget(): BudgetState {
  // Stable IDs — random IDs here cause server/client hydration mismatches
  return {
    incomes: [{ id: "income-1", label: "", amount: 0 }],
    expenses: [
      { id: "expense-1", label: "", amount: 0, category: "housing" },
      { id: "expense-2", label: "", amount: 0, category: "food" },
    ],
  };
}

const SERVER_BUDGET = createEmptyBudget();

const budgetListeners = new Set<() => void>();
let clientBudget: BudgetState | null = null;

function emitBudgetChange() {
  budgetListeners.forEach((listener) => listener());
}

function subscribeBudget(onStoreChange: () => void) {
  budgetListeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === BUDGET_KEY) {
      clientBudget = null;
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    budgetListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getClientBudget(): BudgetState {
  if (clientBudget === null) {
    clientBudget = loadBudget() ?? createEmptyBudget();
  }
  return clientBudget;
}

function getServerBudget(): BudgetState {
  return SERVER_BUDGET;
}

function writeBudget(next: BudgetState) {
  clientBudget = next;
  saveBudget(next);
  emitBudgetChange();
}

function useBudgetStore(): BudgetState {
  return useSyncExternalStore(subscribeBudget, getClientBudget, getServerBudget);
}

const historyListeners = new Set<() => void>();
let clientHistory: MonthSnapshot[] | null = null;

function emitHistoryChange() {
  historyListeners.forEach((listener) => listener());
}

function subscribeHistory(onStoreChange: () => void) {
  historyListeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === HISTORY_KEY) {
      clientHistory = null;
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    historyListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getClientHistory(): MonthSnapshot[] {
  if (clientHistory === null) {
    clientHistory = loadHistory();
  }
  return clientHistory;
}

const SERVER_HISTORY: MonthSnapshot[] = [];

function getServerHistory(): MonthSnapshot[] {
  return SERVER_HISTORY;
}

function writeHistory(next: MonthSnapshot[]) {
  clientHistory = next;
  persistHistory(next);
  emitHistoryChange();
}

function useHistoryStore(): MonthSnapshot[] {
  return useSyncExternalStore(subscribeHistory, getClientHistory, getServerHistory);
}

function readTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readLocale(): Locale {
  const stored = window.localStorage.getItem(LOCALE_KEY);
  if (stored === "sr" || stored === "en") return stored;
  return "sr";
}

function readCurrency(): Currency {
  const stored = window.localStorage.getItem(CURRENCY_KEY);
  if (stored === "RSD" || stored === "EUR") return stored;
  return "RSD";
}

const preferenceListeners = new Set<() => void>();

function emitPreferenceChange() {
  preferenceListeners.forEach((listener) => listener());
}

function subscribePreferences(onStoreChange: () => void) {
  preferenceListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    preferenceListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function usePreferredTheme(): Theme {
  return useSyncExternalStore(subscribePreferences, readTheme, () => "light" as Theme);
}

function usePreferredLocale(): Locale {
  return useSyncExternalStore(subscribePreferences, readLocale, () => "sr" as Locale);
}

function usePreferredCurrency(): Currency {
  return useSyncExternalStore(subscribePreferences, readCurrency, () => "RSD" as Currency);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const storedTheme = usePreferredTheme();
  const storedLocale = usePreferredLocale();
  const storedCurrency = usePreferredCurrency();
  const [themeOverride, setThemeOverride] = useState<Theme | null>(null);
  const [localeOverride, setLocaleOverride] = useState<Locale | null>(null);
  const [currencyOverride, setCurrencyOverride] = useState<Currency | null>(null);
  const budget = useBudgetStore();
  const history = useHistoryStore();

  const theme = themeOverride ?? storedTheme;
  const locale = localeOverride ?? storedLocale;
  const currency = currencyOverride ?? storedCurrency;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale === "sr" ? "sr" : "en";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(LOCALE_KEY, next);
    setLocaleOverride(next);
    emitPreferenceChange();
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    window.localStorage.setItem(CURRENCY_KEY, next);
    setCurrencyOverride(next);
    emitPreferenceChange();
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = (themeOverride ?? readTheme()) === "light" ? "dark" : "light";
    window.localStorage.setItem(THEME_KEY, next);
    setThemeOverride(next);
    emitPreferenceChange();
  }, [themeOverride]);

  const addIncome = useCallback(() => {
    const current = getClientBudget();
    writeBudget({
      ...current,
      incomes: [...current.incomes, createIncome()],
    });
  }, []);

  const addExpense = useCallback(() => {
    const current = getClientBudget();
    writeBudget({
      ...current,
      expenses: [...current.expenses, createExpense({ category: "other" as ExpenseCategory })],
    });
  }, []);

  const updateIncome = useCallback((id: string, patch: Partial<LineItem>) => {
    const current = getClientBudget();
    writeBudget({
      ...current,
      incomes: current.incomes.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    });
  }, []);

  const updateExpense = useCallback((id: string, patch: Partial<ExpenseItem>) => {
    const current = getClientBudget();
    writeBudget({
      ...current,
      expenses: current.expenses.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    });
  }, []);

  const removeIncome = useCallback((id: string) => {
    const current = getClientBudget();
    writeBudget({
      ...current,
      incomes:
        current.incomes.length <= 1
          ? current.incomes
          : current.incomes.filter((item) => item.id !== id),
    });
  }, []);

  const removeExpense = useCallback((id: string) => {
    const current = getClientBudget();
    writeBudget({
      ...current,
      expenses:
        current.expenses.length <= 1
          ? current.expenses
          : current.expenses.filter((item) => item.id !== id),
    });
  }, []);

  const clearBudget = useCallback(() => {
    clearStoredBudget();
    writeBudget(createEmptyBudget());
  }, []);

  const totals = useMemo(() => calculateTotals(budget), [budget]);
  const dict = useMemo(() => getDictionary(locale), [locale]);

  const saveMonthSnapshot = useCallback((): SaveMonthResult => {
    const currentTotals = calculateTotals(getClientBudget());
    if (currentTotals.incomeTotal <= 0 && currentTotals.expenseTotal <= 0) {
      return "empty";
    }

    const { year, month } = currentYearMonth();
    const existing = findSnapshotForMonth(getClientHistory(), year, month, currency);
    if (existing) {
      const confirmed = window.confirm(
        dict.history.saveOverwriteConfirm.replace(
          "{month}",
          formatMonthLabel(year, month, locale),
        ),
      );
      if (!confirmed) return "cancelled";
    }

    const snapshot = buildMonthSnapshot(currentTotals, currency, year, month);
    writeHistory(upsertSnapshot(getClientHistory(), snapshot));
    return "saved";
  }, [currency, dict.history.saveOverwriteConfirm, locale]);

  const deleteMonthSnapshot = useCallback((id: string) => {
    writeHistory(removeSnapshot(getClientHistory(), id));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      currency,
      setCurrency,
      theme,
      toggleTheme,
      dict,
      budget,
      totals,
      history,
      saveMonthSnapshot,
      deleteMonthSnapshot,
      addIncome,
      addExpense,
      updateIncome,
      updateExpense,
      removeIncome,
      removeExpense,
      clearBudget,
    }),
    [
      locale,
      setLocale,
      currency,
      setCurrency,
      theme,
      toggleTheme,
      dict,
      budget,
      totals,
      history,
      saveMonthSnapshot,
      deleteMonthSnapshot,
      addIncome,
      addExpense,
      updateIncome,
      updateExpense,
      removeIncome,
      removeExpense,
      clearBudget,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}
