# Saldo — plan i dnevnik izmena

Kućni budžet: prihodi, rashodi, saldo i praktični saveti za štednju.  
Stack: Next.js (App Router) · TypeScript · Tailwind · lokalni React state · SR/EN i18n · light/dark.

---

## Status MVP

| Oblast | Stanje |
|--------|--------|
| Hero + brand + logo | Urađeno |
| Budget workspace (prihodi / rashodi / saldo) | Urađeno |
| Score-based savings advice + reason | Urađeno |
| Monthly overview (snapshot) | Urađeno |
| i18n SR/EN + theme toggle | Urađeno |
| Responsive + sticky saldo (mobile) | Urađeno |
| Hydration fix (stabilni ID-jevi) | Urađeno |
| Persistencija budžeta (`localStorage`) | Urađeno |
| Lean meta / favicon polish | Urađeno |
| Mesečni snapshot istorija (lokalno) | Urađeno |
| Bank sync / login / AI | Van MVP — kasnije |

---

## Dnevnik izmena

### 2026-07-21 — Prvi MVP dan

**Šta je napravljeno**
- Bootstrap Next.js aplikacije “Saldo” (minimalistički, ozbiljan ton).
- Dizajn sistem: boje (income / expense / saldo), Fraunces + Source Sans 3, light/dark.
- Inline SVG logo (dve zone + centralni saldo).
- Sekcije: Hero → BudgetWorkspace → SavingsAdvice → MonthlyOverview → HowItWorks → Footer.
- i18n sloj (`sr.ts` / `en.ts` / `types.ts`), default SR.
- Budžet logika: više redova, kategorije, live totals, sticky saldo.
- Savings advice: rule engine sa score-om, top 3, `reason` objašnjenje.
- Realističnija logika štednje: nema “odvoji odmah” kad je `expenseRatio > 0.9`; rezerva za zategnut budžet.
- Primarna advice kartica istaknuta (“Najvažnije sada”).
- Hero preview preko `samplePreview` objekta.
- Hydration fix: stabilni početni ID-jevi; deterministički `formatMoney`.
- Potvrđeno: “1 Issue” badge je Next.js **dev overlay**, nije deo app koda.

**Fajlovi (glavni)**
- `src/components/*` — UI
- `src/context/AppContext.tsx` — state, i18n, tema
- `src/lib/advice.ts`, `budget.ts`, `format.ts`, `types.ts`
- `src/lib/i18n/*`
- `src/app/globals.css`, `layout.tsx`, `page.tsx`

---

### 2026-08-02 — Lean optimizacija (meta + favicon + clean build)

- Šta: Metadata/OG/theme-color, minimalni favicon set (`ico` + 16/32 png), uklonjen nekorišćeni `formatSignedMoney`, uklonjen `app/icon.svg` da nema duplog icon inject-a; dependency audit bez brisanja paketa.
- Zašto: Pragmatična priprema za deljenje linka i čist production build, bez novih feature-a i bez novih dependency-ja.
- Fajlovi: `src/app/layout.tsx`, `src/lib/i18n/sr.ts`, `src/lib/i18n/en.ts`, `src/lib/format.ts`, `public/favicon*`, `plan.md`

### 2026-08-02 — Pre-deploy polish + localStorage

- Šta: Persistencija budžeta u `localStorage` (hydrate-safe load posle mount-a, sanitize payload-a), “Obriši unose”, jasniji trust copy (nema naloga / lokalno čuvanje).
- Zašto: Refresh ne sme da briše rad korisnika pre deploy-a; transparentnost oko lokalnih podataka.
- Fajlovi: `src/lib/persistence.ts`, `src/context/AppContext.tsx`, `src/components/BudgetWorkspace.tsx`, `src/lib/i18n/*`, `plan.md`

### 2026-08-02 — Valuta RSD / EUR

- Šta: Izbor valute RSD|EUR u headeru, persistencija u `localStorage`, prikaz u Amount/Hero/advice.
- Zašto: App ima EN i treba podršku za euro pored dinara, bez konverzije iznosa.
- Fajlovi: `src/lib/types.ts`, `src/context/AppContext.tsx`, `src/components/Header.tsx`, `Amount.tsx`, `Hero.tsx`, `SavingsAdvice.tsx`, `src/lib/advice.ts`, `src/lib/i18n/*`

### 2026-08-02 — Mesečni snapshot istorija

- Šta: Ručno/poluautomatsko čuvanje mesečnog snapshot-a (totals) u `localStorage`, lista + overwrite istog meseca, max 24.
- Zašto: Kontinuirana upotreba zahteva uvid u ranije mesece, bez naloga/servera.
- Fajlovi: `src/lib/history.ts`, `src/lib/types.ts`, `src/context/AppContext.tsx`, `src/components/MonthHistory.tsx`, `HomePage.tsx`, `Amount.tsx`, `src/lib/i18n/*`, `plan.md`

### 2026-08-02 — Pre-deploy smoke

- Šta: Mobile smoke (390×844), čist lint/build, `main` padding zbog sticky saldo bara; commit pre deploy-a.
- Zašto: Potvrda da unos, valuta, istorija i persistencija rade na uskom ekranu.
- Fajlovi: `src/components/HomePage.tsx`, `src/components/Footer.tsx`, `plan.md`

### Buduće korekcije

> Dodaj novi unos ispod za svaku sesiju izmene.

#### Šablon

```
### YYYY-MM-DD — kratak naslov
- Šta: …
- Zašto: …
- Fajlovi: …
```

#### Backlog (ideje, ne obavezno)

- [x] Persistencija budžeta u `localStorage`
- [x] Prava mesečna istorija (više meseci)
- [ ] Jača advice pravila / pragovi po domaćinstvu
- [ ] Deploy na Vercel + custom domen
- [x] Favicon / OG meta za deljenje
- [ ] Jednostavni smoke testovi za `getSavingsAdvice` i totals

---

## Kako pokrenuti

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production (bez Next “Issue” overlay-a)
```

---

## Pravila rada na projektu

1. Ne širiti scope van dogovorenog MVP-a bez potrebe.
2. Svi novi UI tekstovi idu kroz i18n (`sr` + `en` + `types`).
3. Svaku značajnu izmenu zabeležiti u ovom fajlu (dnevnik).
4. Commit poruke: kratko “zašto”, ne lista fajlova.
