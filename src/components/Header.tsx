"use client";

import { Logo } from "@/components/Logo";
import { useApp } from "@/context/AppContext";

export function Header() {
  const { dict, locale, setLocale, theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="shrink-0 rounded-sm" aria-label={dict.brand.name}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-6 text-sm text-fg-muted md:flex" aria-label="Main">
          <a className="transition-colors hover:text-fg" href="#budget">
            {dict.nav.budget}
          </a>
          <a className="transition-colors hover:text-fg" href="#advice">
            {dict.nav.advice}
          </a>
          <a className="transition-colors hover:text-fg" href="#overview">
            {dict.nav.overview}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="inline-flex rounded-app-sm border border-border bg-bg-elevated p-0.5"
            role="group"
            aria-label={dict.nav.language}
          >
            <button
              type="button"
              onClick={() => setLocale("sr")}
              className={`rounded-[6px] px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                locale === "sr"
                  ? "bg-saldo text-bg-elevated"
                  : "text-fg-muted hover:text-fg"
              }`}
              aria-pressed={locale === "sr"}
            >
              SR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-[6px] px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                locale === "en"
                  ? "bg-saldo text-bg-elevated"
                  : "text-fg-muted hover:text-fg"
              }`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-app-sm border border-border bg-bg-elevated text-fg-muted transition-colors hover:text-fg"
            aria-label={theme === "light" ? dict.nav.themeDark : dict.nav.themeLight}
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 14.3A8.5 8.5 0 0 1 9.7 3 7 7 0 1 0 21 14.3Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
                <path
                  d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
