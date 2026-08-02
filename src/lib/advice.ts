import { formatMoney } from "./format";
import type { BudgetTotals, Currency, ExpenseCategory, Locale } from "./types";
import type { Dictionary } from "./i18n/types";

export interface AdviceTip {
  id: string;
  title: string;
  body: string;
  reason?: string;
}

interface ScoredTip extends AdviceTip {
  score: number;
}

interface AdviceInput {
  totals: BudgetTotals;
  expenseCount: number;
  locale: Locale;
  currency: Currency;
  dict: Dictionary;
}

function categoryShare(totals: BudgetTotals, category: ExpenseCategory): number {
  if (totals.expenseTotal <= 0) return 0;
  return totals.expensesByCategory[category] / totals.expenseTotal;
}

function pct(share: number): string {
  return String(Math.round(share * 100));
}

function fill(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, value),
    template,
  );
}

export function getSavingsAdvice({
  totals,
  expenseCount,
  locale,
  currency,
  dict,
}: AdviceInput): AdviceTip[] {
  const { saldo, incomeTotal, expenseTotal } = totals;
  const a = dict.advice;
  const scored: ScoredTip[] = [];

  if (incomeTotal === 0 && expenseTotal === 0) {
    return [
      { id: "start-income", title: a.emptyIncomeTitle, body: a.emptyIncomeBody },
      { id: "start-expense", title: a.emptyExpenseTitle, body: a.emptyExpenseBody },
      { id: "start-saldo", title: a.emptySaldoTitle, body: a.emptySaldoBody },
    ];
  }

  const expenseRatio = incomeTotal > 0 ? expenseTotal / incomeTotal : 0;
  const foodShare = categoryShare(totals, "food");
  const entertainmentShare = categoryShare(totals, "entertainment");
  const fixedShare = categoryShare(totals, "housing") + categoryShare(totals, "bills");

  if (saldo < 0) {
    scored.push({
      id: "overspend",
      title: a.negativeTitle,
      body: a.negativeBody,
      reason: a.reasonNegative,
      score: 100,
    });
  } else if (saldo === 0 && incomeTotal > 0) {
    scored.push({
      id: "near-zero",
      title: a.nearZeroTitle,
      body: a.nearZeroBody,
      reason: a.reasonNearZero,
      score: 55,
    });
  } else if (saldo > 0 && incomeTotal > 0) {
    // Positive saldo alone is not enough — only suggest saving when there is real room
    if (expenseRatio <= 0.75) {
      const saveAmount = Math.round(saldo * 0.2);
      scored.push({
        id: "save-first",
        title: a.positiveTitle,
        body: fill(a.positiveBody, {
          amount: formatMoney(saveAmount, locale),
          currency,
        }),
        reason: fill(a.reasonPositive, {
          amount: formatMoney(saldo, locale),
          currency,
        }),
        score: 60,
      });
    } else if (expenseRatio <= 0.9) {
      scored.push({
        id: "reserve",
        title: a.reserveTitle,
        body: a.reserveBody,
        reason: fill(a.reasonReserve, { percent: pct(expenseRatio) }),
        score: 65,
      });
    }
    // expenseRatio > 0.9 → no optimistic savings tip; near-overspend rule handles it
  }

  if (saldo >= 0 && incomeTotal > 0 && expenseRatio > 0.9) {
    scored.push({
      id: "near-overspend",
      title: a.nearOverspendTitle,
      body: a.nearOverspendBody,
      reason: fill(a.reasonNearOverspend, { percent: pct(expenseRatio) }),
      score: 95,
    });
  } else if (saldo >= 0 && incomeTotal > 0 && expenseRatio > 0.8) {
    scored.push({
      id: "high-spend",
      title: a.highSpendTitle,
      body: a.highSpendBody,
      reason: fill(a.reasonHighSpend, { percent: pct(expenseRatio) }),
      score: 90,
    });
  }

  if (fixedShare >= 0.55) {
    scored.push({
      id: "fixed",
      title: a.fixedTitle,
      body: a.fixedBody,
      reason: fill(a.reasonFixed, { percent: pct(fixedShare) }),
      score: 80,
    });
  }

  if (foodShare >= 0.3) {
    scored.push({
      id: "food",
      title: a.foodTitle,
      body: a.foodBody,
      reason: fill(a.reasonFood, { percent: pct(foodShare) }),
      score: 70,
    });
  }

  if (entertainmentShare >= 0.15) {
    scored.push({
      id: "entertainment",
      title: a.entertainmentTitle,
      body: a.entertainmentBody,
      reason: fill(a.reasonEntertainment, { percent: pct(entertainmentShare) }),
      score: 50,
    });
  }

  if (expenseCount >= 5) {
    scored.push({
      id: "impulse",
      title: a.impulseTitle,
      body: a.impulseBody,
      reason: fill(a.reasonImpulse, { count: String(expenseCount) }),
      score: 45,
    });
  }

  // Low-score fallbacks fill gaps when fewer than 3 signal-based tips apply
  const fallbacks: ScoredTip[] = [
    { id: "review-flex", title: a.flexTitle, body: a.flexBody, score: 20 },
    { id: "weekly-check", title: a.weeklyTitle, body: a.weeklyBody, score: 15 },
    { id: "one-cut", title: a.oneCutTitle, body: a.oneCutBody, score: 10 },
  ];

  for (const tip of fallbacks) {
    if (!scored.some((t) => t.id === tip.id)) {
      scored.push(tip);
    }
  }

  const seen = new Set<string>();
  return scored
    .sort((aTip, bTip) => bTip.score - aTip.score)
    .filter((tip) => {
      if (seen.has(tip.id)) return false;
      seen.add(tip.id);
      return true;
    })
    .slice(0, 3)
    .map(({ id, title, body, reason }) => ({ id, title, body, reason }));
}
