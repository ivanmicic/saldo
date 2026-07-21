"use client";

import { BudgetWorkspace } from "@/components/BudgetWorkspace";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MonthlyOverview } from "@/components/MonthlyOverview";
import { SavingsAdvice } from "@/components/SavingsAdvice";
import { useApp } from "@/context/AppContext";
import { useEffect } from "react";

function DocumentMeta() {
  const { dict } = useApp();

  useEffect(() => {
    document.title = dict.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", dict.meta.description);
    }
  }, [dict.meta.title, dict.meta.description]);

  return null;
}

export function HomePage() {
  return (
    <>
      <DocumentMeta />
      <Header />
      <main className="flex-1">
        <Hero />
        <BudgetWorkspace />
        <SavingsAdvice />
        <MonthlyOverview />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
