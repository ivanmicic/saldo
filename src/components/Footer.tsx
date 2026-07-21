"use client";

import { Logo } from "@/components/Logo";
import { useApp } from "@/context/AppContext";

export function Footer() {
  const { dict } = useApp();

  return (
    <footer className="pb-20 lg:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Logo markClassName="h-6 w-6" />
          <p className="mt-3 max-w-md text-sm text-fg-muted">{dict.footer.trust}</p>
        </div>
        <p className="text-sm text-fg-subtle">{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
