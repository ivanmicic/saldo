import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "SALDO – Household budget",
    description:
      "Household budget: enter income and expenses, see what remains (saldo), and get practical savings tips.",
  },
  brand: {
    name: "Saldo",
    slogan: "See clearly what stays with you.",
  },
  nav: {
    budget: "Budget",
    advice: "Advice",
    how: "How it works",
    overview: "Overview",
    language: "Language",
    currency: "Currency",
    themeLight: "Light theme",
    themeDark: "Dark theme",
  },
  hero: {
    title: "See clearly what stays with you.",
    subtitle:
      "Enter income and expenses, track your monthly overview, and get practical tips for smarter saving.",
    primaryCta: "Start budgeting",
    secondaryCta: "See how it works",
    previewPositive: "In the positive this month",
  },
  how: {
    title: "Three steps. No clutter.",
    subtitle: "Saldo is built for ordinary households — not finance experts.",
    step1Title: "Enter income",
    step1Body: "Add salary, freelance pay, or other inflows for the month.",
    step2Title: "Enter expenses",
    step2Body: "Sort costs into categories you already understand.",
    step3Title: "See your saldo",
    step3Body: "Instantly see what remains, plus short, useful tips.",
  },
  budget: {
    title: "Your monthly budget",
    subtitle:
      "Enter amounts. Totals and saldo update immediately. Entries are saved on this device.",
    incomeTitle: "Income",
    incomeHint: "Everything coming in this month.",
    expenseTitle: "Expenses",
    expenseHint: "Everything going out — by category.",
    label: "Description",
    amount: "Amount",
    category: "Category",
    addIncome: "Add income",
    addExpense: "Add expense",
    remove: "Remove",
    totalIncome: "Total income",
    totalExpense: "Total expenses",
    emptyIncome: "No income yet. Add your first entry.",
    emptyExpense: "No expenses yet. Add your first entry.",
    clear: "Clear entries",
    clearConfirm: "Clear all budget entries? This cannot be undone.",
  },
  categories: {
    housing: "Housing",
    bills: "Bills",
    food: "Food",
    transport: "Transport",
    kids: "Kids",
    health: "Health",
    entertainment: "Entertainment",
    other: "Other",
  },
  saldo: {
    title: "Saldo",
    remaining: "Remaining",
    positive: "You’re ahead — there is room to save.",
    negative: "You’re behind — spending more than comes in.",
    zero: "Income and expenses are even.",
    incomeLabel: "Income",
    expenseLabel: "Expenses",
    stickyLabel: "Current saldo",
    stickyPositive: "You’re ahead this month.",
    stickyNegative: "You’re spending more than comes in.",
    stickyZero: "Income and expenses are even.",
  },
  advice: {
    title: "Practical savings tips",
    subtitle: "Short and concrete — based on what you entered.",
    emptyIncomeTitle: "Start with income",
    emptyIncomeBody: "Add salary and other inflows. Without that, saldo has no meaning.",
    emptyExpenseTitle: "Add expenses",
    emptyExpenseBody: "Include housing, bills, and food — usually the largest items.",
    emptySaldoTitle: "Saldo appears on its own",
    emptySaldoBody: "Once both sides are in, you immediately see what remains.",
    positiveTitle: "Set some aside first",
    positiveBody:
      "Suggestion: move about {amount} {currency} into savings as soon as income arrives — before the rest of spending.",
    reserveTitle: "Keep a reserve",
    reserveBody:
      "The budget is tight. Don’t spend the leftover right away — keep it as a buffer until month-end.",
    negativeTitle: "Review flexible items",
    negativeBody:
      "Saldo is negative. Trim food, entertainment, and small purchases first — not fixed obligations.",
    nearZeroTitle: "Saldo is tight",
    nearZeroBody:
      "Little or nothing remains. Review categories you can adjust this month.",
    highSpendTitle: "Expenses take most of income",
    highSpendBody:
      "Little room left to maneuver. Review flexible categories before the month turns negative.",
    nearOverspendTitle: "Close to the edge",
    nearOverspendBody:
      "Very little room to save. Pause non-essential spending for the rest of the month.",
    foodTitle: "Food takes a large share",
    foodBody:
      "Try a weekly grocery limit and plan 2–3 meals ahead. That often cuts impulse buys in store.",
    entertainmentTitle: "Entertainment is rising",
    entertainmentBody:
      "Set a fixed monthly amount for going out and subscriptions. Anything over waits until next month.",
    impulseTitle: "Many small line items",
    impulseBody:
      "Track small purchases for 7 days. You often see where money disappears without a big reason.",
    fixedTitle: "Fixed costs dominate",
    fixedBody:
      "Housing and bills are high. Check plans, subscriptions, and whether something can be shared or changed.",
    flexTitle: "One flexible category",
    flexBody:
      "Pick one category (e.g. food or entertainment) and reduce it by 10% this month.",
    weeklyTitle: "A short weekly check",
    weeklyBody:
      "Look at saldo once a week. Five minutes is enough to catch drift early.",
    oneCutTitle: "Cut one item",
    oneCutBody:
      "Remove or postpone one non-essential item this month. Small cuts add up.",
    primaryLabel: "Most important now",
    reasonNegative: "Your saldo is negative — you’re spending more than comes in.",
    reasonPositive: "You have {amount} {currency} left — there is room to save.",
    reasonReserve: "Expenses are {percent}% of income — keep the leftover, don’t spend it.",
    reasonNearZero: "Saldo is near zero — little room for error.",
    reasonHighSpend: "Expenses make up {percent}% of income.",
    reasonNearOverspend: "Expenses are {percent}% of income — very little room to save.",
    reasonFixed: "Housing and bills make up {percent}% of expenses.",
    reasonFood: "Food makes up {percent}% of your expenses this month.",
    reasonEntertainment: "Entertainment makes up {percent}% of expenses.",
    reasonImpulse: "You have {count} active expense items — small ones add up.",
  },
  overview: {
    title: "Monthly overview",
    subtitle: "This month’s snapshot — income, expenses, and where most money goes.",
    thisMonth: "This month",
    note: "This overview updates live. Entries stay saved on this device.",
    income: "Income",
    expenses: "Expenses",
    saldo: "Saldo",
    topCategory: "Largest category: {category} ({percent}% of expenses)",
    topCategoryEmpty: "Add expenses to see the largest category.",
    saldoPositive: "Saldo is positive — there is room to save.",
    saldoNegative: "Saldo is negative — expenses exceed income.",
    saldoZero: "Saldo is zero — income and expenses are even.",
  },
  history: {
    title: "Month history",
    subtitle:
      "Save the current budget as a snapshot of this calendar month. History stays local on this device.",
    save: "Save this month",
    saveHint: "Semi-automatic: saves the current calendar month. Saving again replaces that month.",
    saved: "Month saved.",
    empty: "No saved months yet.",
    emptyBudget: "Enter at least one income or expense before saving.",
    saveOverwriteConfirm:
      "A snapshot for {month} already exists. Replace it with the current numbers?",
    delete: "Remove",
    deleteConfirm: "Remove saved month {month}?",
    topCategory: "Largest category: {category}",
  },
  footer: {
    trust:
      "No accounts and no bank connection. Your budget is stored locally in this browser — it stays after you refresh.",
    rights: "Saldo — household budgeting, clear and calm.",
  },
};
