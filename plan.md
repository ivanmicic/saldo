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
| Bank sync / login / AI / istorija po mesecima | Van MVP — kasnije |

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

- [ ] Persistencija budžeta u `localStorage`
- [ ] Prava mesečna istorija (više meseci)
- [ ] Jača advice pravila / pragovi po domaćinstvu
- [ ] Deploy na Vercel + custom domen
- [ ] Favicon / OG meta za deljenje
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
