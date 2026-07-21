import type { ExpenseCategory } from "../types";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    slogan: string;
  };
  nav: {
    budget: string;
    advice: string;
    how: string;
    overview: string;
    language: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    previewPositive: string;
  };
  how: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
  };
  budget: {
    title: string;
    subtitle: string;
    incomeTitle: string;
    incomeHint: string;
    expenseTitle: string;
    expenseHint: string;
    label: string;
    amount: string;
    category: string;
    addIncome: string;
    addExpense: string;
    remove: string;
    totalIncome: string;
    totalExpense: string;
    emptyIncome: string;
    emptyExpense: string;
    currency: string;
  };
  categories: Record<ExpenseCategory, string>;
  saldo: {
    title: string;
    remaining: string;
    positive: string;
    negative: string;
    zero: string;
    incomeLabel: string;
    expenseLabel: string;
    stickyLabel: string;
    stickyPositive: string;
    stickyNegative: string;
    stickyZero: string;
  };
  advice: {
    title: string;
    subtitle: string;
    emptyIncomeTitle: string;
    emptyIncomeBody: string;
    emptyExpenseTitle: string;
    emptyExpenseBody: string;
    emptySaldoTitle: string;
    emptySaldoBody: string;
    positiveTitle: string;
    positiveBody: string;
    reserveTitle: string;
    reserveBody: string;
    negativeTitle: string;
    negativeBody: string;
    nearZeroTitle: string;
    nearZeroBody: string;
    highSpendTitle: string;
    highSpendBody: string;
    nearOverspendTitle: string;
    nearOverspendBody: string;
    foodTitle: string;
    foodBody: string;
    entertainmentTitle: string;
    entertainmentBody: string;
    impulseTitle: string;
    impulseBody: string;
    fixedTitle: string;
    fixedBody: string;
    flexTitle: string;
    flexBody: string;
    weeklyTitle: string;
    weeklyBody: string;
    oneCutTitle: string;
    oneCutBody: string;
    primaryLabel: string;
    reasonNegative: string;
    reasonPositive: string;
    reasonReserve: string;
    reasonNearZero: string;
    reasonHighSpend: string;
    reasonNearOverspend: string;
    reasonFixed: string;
    reasonFood: string;
    reasonEntertainment: string;
    reasonImpulse: string;
  };
  overview: {
    title: string;
    subtitle: string;
    thisMonth: string;
    note: string;
    income: string;
    expenses: string;
    saldo: string;
    topCategory: string;
    topCategoryEmpty: string;
    saldoPositive: string;
    saldoNegative: string;
    saldoZero: string;
  };
  footer: {
    trust: string;
    rights: string;
  };
}
