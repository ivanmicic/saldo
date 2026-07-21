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
  createExpense,
  createIncome,
  type BudgetState,
  type BudgetTotals,
  type ExpenseCategory,
  type ExpenseItem,
  type LineItem,
  type Locale,
  type Theme,
} from "@/lib/types";

const LOCALE_KEY = "saldo-locale";
const THEME_KEY = "saldo-theme";

interface AppContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  toggleTheme: () => void;
  dict: Dictionary;
  budget: BudgetState;
  totals: BudgetTotals;
  addIncome: () => void;
  addExpense: () => void;
  updateIncome: (id: string, patch: Partial<LineItem>) => void;
  updateExpense: (id: string, patch: Partial<ExpenseItem>) => void;
  removeIncome: (id: string) => void;
  removeExpense: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function initialBudget(): BudgetState {
  // Stable IDs — random IDs here cause server/client hydration mismatches
  return {
    incomes: [{ id: "income-1", label: "", amount: 0 }],
    expenses: [
      { id: "expense-1", label: "", amount: 0, category: "housing" },
      { id: "expense-2", label: "", amount: 0, category: "food" },
    ],
  };
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

export function AppProvider({ children }: { children: ReactNode }) {
  const storedTheme = usePreferredTheme();
  const storedLocale = usePreferredLocale();
  const [themeOverride, setThemeOverride] = useState<Theme | null>(null);
  const [localeOverride, setLocaleOverride] = useState<Locale | null>(null);
  const [budget, setBudget] = useState<BudgetState>(initialBudget);

  const theme = themeOverride ?? storedTheme;
  const locale = localeOverride ?? storedLocale;

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

  const toggleTheme = useCallback(() => {
    const next: Theme = (themeOverride ?? readTheme()) === "light" ? "dark" : "light";
    window.localStorage.setItem(THEME_KEY, next);
    setThemeOverride(next);
    emitPreferenceChange();
  }, [themeOverride]);

  const addIncome = useCallback(() => {
    setBudget((prev) => ({
      ...prev,
      incomes: [...prev.incomes, createIncome()],
    }));
  }, []);

  const addExpense = useCallback(() => {
    setBudget((prev) => ({
      ...prev,
      expenses: [...prev.expenses, createExpense({ category: "other" as ExpenseCategory })],
    }));
  }, []);

  const updateIncome = useCallback((id: string, patch: Partial<LineItem>) => {
    setBudget((prev) => ({
      ...prev,
      incomes: prev.incomes.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }, []);

  const updateExpense = useCallback((id: string, patch: Partial<ExpenseItem>) => {
    setBudget((prev) => ({
      ...prev,
      expenses: prev.expenses.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }, []);

  const removeIncome = useCallback((id: string) => {
    setBudget((prev) => ({
      ...prev,
      incomes: prev.incomes.length <= 1 ? prev.incomes : prev.incomes.filter((i) => i.id !== id),
    }));
  }, []);

  const removeExpense = useCallback((id: string) => {
    setBudget((prev) => ({
      ...prev,
      expenses:
        prev.expenses.length <= 1 ? prev.expenses : prev.expenses.filter((i) => i.id !== id),
    }));
  }, []);

  const totals = useMemo(() => calculateTotals(budget), [budget]);
  const dict = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      theme,
      toggleTheme,
      dict,
      budget,
      totals,
      addIncome,
      addExpense,
      updateIncome,
      updateExpense,
      removeIncome,
      removeExpense,
    }),
    [
      locale,
      setLocale,
      theme,
      toggleTheme,
      dict,
      budget,
      totals,
      addIncome,
      addExpense,
      updateIncome,
      updateExpense,
      removeIncome,
      removeExpense,
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
