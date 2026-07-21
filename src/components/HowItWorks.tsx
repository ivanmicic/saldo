"use client";

import { useApp } from "@/context/AppContext";

const steps = [
  { titleKey: "step1Title", bodyKey: "step1Body", tone: "income" },
  { titleKey: "step2Title", bodyKey: "step2Body", tone: "expense" },
  { titleKey: "step3Title", bodyKey: "step3Body", tone: "saldo" },
] as const;

export function HowItWorks() {
  const { dict } = useApp();

  return (
    <section id="how" className="border-b border-border" aria-labelledby="how-title">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id="how-title"
            className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
          >
            {dict.how.title}
          </h2>
          <p className="mt-3 text-fg-muted">{dict.how.subtitle}</p>
        </div>

        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => {
            const title = dict.how[step.titleKey];
            const body = dict.how[step.bodyKey];
            const toneClass =
              step.tone === "income"
                ? "text-income"
                : step.tone === "expense"
                  ? "text-expense"
                  : "text-saldo";

            return (
              <li key={step.titleKey} className="relative">
                <p className={`font-display text-4xl font-semibold tabular-nums ${toneClass}`}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
