# SCR-STORY-002 — Menu page shell & site identity

## Context / scope check

This is a **greenfield repository** — `git log` shows only `first commit` + one UX-iteration commit, and the tree contains nothing but `readme` (empty), `.env`, and `.arc/designs/*`. There is no `package.json`, no `src/`, no test runner, no routing. This plan therefore includes the minimum scaffolding needed to make the AC tests runnable, and nothing beyond it.

**Stack chosen** (none pre-existed, so picking the smallest conventional stack for a React SPA):
- Vite + React 18 + TypeScript
- React Router v6 (client routing for Home / Menu / Cart)
- Tailwind CSS, theme extended with the exact tokens from the approved design (`.arc/designs/design-context.json`)
- Vitest + @testing-library/react + @testing-library/jest-dom + jsdom for tests

**Explicitly out of scope for this story** (belongs to other content stories under the "Menu Browsing & Catalog" epic, per the story description "so all content stories have a host"):
- `PageHero` (13:24, "Browse Our Oven Menu"), `CategoryFilterRow`/`CategoryFilterPill` (13:27+), `MenuGrid`/`MenuItemCard` (13:39+), `CartSummaryBar` (13:187). None of the ACs mention hero copy, filters, the grid, or the sticky cart-summary bar — only header, footer, and navigability. The Menu page built here is the **shell**: `SiteHeader` + a content placeholder + `SiteFooter`. The `sticky-cart-bar-behavior` open question is therefore not actioned in this story.
- The Home page has **no Figma frame in this design package** (the frame covers only `menu-page`). AC5 requires a "homepage hero link" to exist, so a minimal Home page is built, but its hero is a plain, token-consistent placeholder (headline + CTA), not a pixel-specified design. This is called out explicitly rather than invented as if approved.
- Cart page is a stub (route + placeholder heading) since building the cart page itself is a separate story; it only needs to exist so the nav "Cart" link and AC5's "cart page nav link" resolve to a real route.

Design elements that ARE in scope and built faithfully from `design-context.json`:
- `SiteHeader` (13:5): `LogoMark` (13:7, red badge `#C82D25`, 20px radius, letter "F"), `SiteWordmark` (13:9, Fraunces SemiBold 24px), `NavLinks` (13:10, items Home/Our Menu/Cart, active = brand-red `#C82D25` + 2px underline, inactive = white Geist Medium), `HeaderCartControl`/`CartButton` (13:18/13:20, `rgba(255,255,255,0.10)` fill, 24px radius, badge count) with the ETA span split per the confirmed `header-eta-green-span` decision (static "Estimated delivery:" + green `#2A7043` "30 mins" value span).
- `SiteFooter` (13:199): `FooterBrandColumn` (13:201, logo+wordmark at footer scale + tagline + `SocialIconRow` 13:207), `FooterInfoColumn` x2 (13:217 Kitchen Hours, 13:229 Pizzeria Location — Fraunces SemiBold uppercase heading + rows), `FooterDivider` (13:236, 1px `rgba(255,255,255,0.12)`), `FooterLegalRow` (13:237, copyright + links at `rgba(255,255,255,0.6)`).

All footer copy (hours, address, phone, email, tagline, legal text) is centralized in one static config module so AC3's "exactly as defined in the static config" has a single source of truth.

---

## Task 0 — Project scaffold (infra only, no feature code)

Not itself an AC, but required before any AC test can execute.

**Files created:**
- `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts` (or merged into vite config), `tailwind.config.ts`, `postcss.config.js`, `index.html`
- `src/main.tsx` — mounts `<App />` inside `<BrowserRouter>`
- `src/test/setup.ts` — imports `@testing-library/jest-dom`, configures jsdom cleanup
- `tailwind.config.ts` theme.extend populated from `design-context.json` tokens: colors (`brand-red #C82D25`, `ink #151212`, `cream-bg #FCFAF6`, `surface-card #FFFFFF`, `card-border #EBE7DF`, `muted-text #6B6661`, `category-classic-green #2A7043`, `on-dark-muted-line rgba(255,255,255,.12)`, `on-dark-copyright rgba(255,255,255,.6)`, `header-cart-btn-bg rgba(255,255,255,.10)`), fontFamily (`display: Fraunces`, `body: Geist`), fontSize scale `[12,13,14,15,16,18,20,22,24,48]`, borderRadius (`logo-badge:20`, `filter-pill:8`, `card:16`, `cart-icon-btn:24`, `sticky-cart-bar:16`).

No test is written for the scaffold itself (it's config, not behavior); the first real failing test is AC1's, below, and it will fail to even compile/run until this scaffold exists — that failure is what proves the scaffold is needed, not a substitute for one.

---

## AC1 — Header contains logo/name, nav links (Home, Our Menu, Cart), and cart badge

**Failing test first:** `src/components/layout/__tests__/SiteHeader.test.tsx`
- Renders `<SiteHeader />` inside `MemoryRouter` (initial entry `/menu`).
- Asserts: an element with the logo letter "F" is present (`LogoMark`); text "Forno Rosso" is present (`SiteWordmark`); three nav links with accessible names "Home", "Our Menu", "Cart" are present with `href="/"`, `href="/menu"`, `href="/cart"` respectively; a cart button is present containing a numeric badge.

**Minimal code to pass:**
- `src/components/layout/LogoMark.tsx` — red rounded-square badge (`bg-brand-red`, `rounded-[20px]`), single serif letter, `variant` prop (`badge`), used at header/footer scale via a `size` prop.
- `src/components/layout/SiteWordmark.tsx` — `Forno Rosso` in `font-display` (Fraunces), `size` prop controlling 24px (header) vs 22px (footer).
- `src/components/layout/NavLinks.tsx` — maps over `SITE_INFO.nav` (added in AC3's config, pulled forward here since header needs it), renders `react-router` `<Link>`s, active item styled `text-brand-red` + underline via `useLocation().pathname`.
- `src/components/layout/CartButton.tsx` — circular button (`bg-header-cart-btn-bg`, `rounded-[24px]`), inline SVG cart glyph, numeric badge showing `count` prop.
- `src/components/layout/HeaderCartControl.tsx` — composes the ETA text + `CartButton`.
- `src/components/layout/SiteHeader.tsx` — composes `LogoMark` + `SiteWordmark` + `NavLinks` + `HeaderCartControl`.

**Files:** the six components above, created new.

---

## AC2 — Cart badge displays the current number of items in the cart session

**Failing test first:**
- `src/state/__tests__/CartContext.test.tsx` — a component using `useCart()` reports `count: 0` when no prior session state exists; after the provider is seeded with 3 stored line items (via `localStorage` key `forno-rosso-cart` pre-populated in the test), a fresh mount reports `count: 3`.
- `src/components/layout/__tests__/CartButton.test.tsx` (extends AC1's file) — wrapping `<SiteHeader />` in `<CartProvider>` seeded with 3 items renders a badge with text `3`.

**Minimal code to pass:**
- `src/state/CartContext.tsx` — `CartProvider` + `useCart()` hook. Reads an items array from `localStorage["forno-rosso-cart"]` on mount (defaults to `[]`), exposes `{ count }` derived as `items.length`. No add/remove mutation is implemented here — populating the cart is the responsibility of the "add to cart" content story; this story only needs to *read and display* whatever count exists in the session.
- Wrap `<App />` in `<CartProvider>` in `src/main.tsx`.
- `CartButton` (from AC1) takes `count` from `useCart()` instead of a hardcoded prop.

**Files:** `src/state/CartContext.tsx` (new), `src/main.tsx` (modified), `src/components/layout/CartButton.tsx` (modified).

---

## AC3 — Footer displays kitchen hours, location, and contact details exactly per static config

**Failing test first:** `src/components/layout/__tests__/SiteFooter.test.tsx`
- Renders `<SiteFooter />`.
- Asserts exact text nodes matching `SITE_INFO`: heading "Kitchen Hours" with rows "Monday - Thursday" / "12:00 PM - 10:00 PM", "Friday - Saturday" / "12:00 PM - 11:30 PM", "Sunday" / "1:00 PM - 9:30 PM"; heading "Pizzeria Location" with address "842 Rione Monti, Sourdough Avenue, Suite 100", "Delivery: (555) 392-7677", "Email: ciao@fornorosso.pizza"; copyright "© 2026 Forno Rosso Pizzeria. All rights reserved." and legal links "Privacy Policy", "Delivery Terms".
- A second test imports `SITE_INFO` directly and asserts the rendered strings equal `SITE_INFO.hours[...]`/`SITE_INFO.location.*`/`SITE_INFO.legal.*` (not just hardcoded duplicate strings), proving the component reads from config rather than embedding its own copy.

**Minimal code to pass:**
- `src/config/siteInfo.ts` — single static config object: `brand.tagline`, `hours[]` (label/value rows above), `location.{address,phoneLabel,emailLabel}`, `social` (`["instagram","facebook","twitter"]`), `legal.{copyright,links}`, `nav` (`[{label,to}]` used by AC1's `NavLinks`), `eta` (`"30 mins"`).
- `src/components/layout/FooterInfoColumn.tsx` — generic heading + rows/body-slot component, reused for both Kitchen Hours (rows) and Pizzeria Location (address/phone/email body).
- `src/components/layout/FooterBrandColumn.tsx` — `LogoMark`(footer scale) + `SiteWordmark`(22px) + tagline + `SocialIconRow`.
- `src/components/layout/SocialIconRow.tsx` — three circular translucent icon buttons, inline SVG glyphs for instagram/facebook/twitter (no bitmap assets exist for these per the design notes).
- `src/components/layout/FooterDivider.tsx` — 1px hairline, `on-dark-muted-line` color.
- `src/components/layout/FooterLegalRow.tsx` — copyright + two legal links, `on-dark-copyright` color.
- `src/components/layout/SiteFooter.tsx` — composes the above, reading all copy from `SITE_INFO`.

**Files:** `src/config/siteInfo.ts` (new), the six footer components (new).

---

## AC4 — 'Our Menu' nav link navigates to this page; Home and Cart links present and point to their destinations

**Failing test first:** `src/App.test.tsx` (integration, `MemoryRouter`/`createMemoryRouter` via the real `App`)
- Starting at `/`, click the "Our Menu" nav link → the Menu page shell renders (assert a `MenuPage`-only marker, e.g. a `<main data-testid="menu-page">`), and the "Our Menu" link now carries the active styling (`text-brand-red` class / underline element present).
- Assert "Home" link has `href="/"` and "Cart" link has `href="/cart"` regardless of current route (present even though `/cart` is a stub).

**Minimal code to pass:**
- `src/App.tsx` — `react-router` route table: `/` → `HomePage`, `/menu` → `MenuPage`, `/cart` → `CartPage`, all nested under a shared `Layout` route (`SiteHeader` + `<Outlet/>` + `SiteFooter`).
- `src/components/layout/Layout.tsx` — the header/footer host described in the story summary ("so all content stories have a host").
- `src/pages/MenuPage.tsx` — shell only: a `<main data-testid="menu-page">` placeholder (`Menu content coming soon` or similar), to be filled in by future content stories per this story's explicit scope boundary above.
- `src/pages/CartPage.tsx` — stub `<main data-testid="cart-page">Your cart</main>`.
- `NavLinks` active-state logic already built in AC1 is exercised here through real routing rather than a fixed `activeNavItem` prop.

**Files:** `src/App.tsx`, `src/components/layout/Layout.tsx`, `src/pages/MenuPage.tsx`, `src/pages/CartPage.tsx` (all new).

---

## AC5 — Page reachable via the homepage hero link, the 'Our Menu' nav link, and the cart page nav link

**Failing test first:**
- `src/pages/__tests__/HomePage.test.tsx` — renders `<HomePage />` inside `MemoryRouter`; asserts a hero CTA link/button with accessible name (e.g. "View Our Menu") has `href="/menu"`.
- Extends `src/App.test.tsx` (AC4's file): from `/`, click the hero CTA → `menu-page` marker renders. From `/cart`, the header's "Cart" nav link is present and, when clicked from any page, navigates to `cart-page`. From `/menu` itself, the header's "Our Menu" link keeps the user on `menu-page` (no dead link).

**Minimal code to pass:**
- `src/pages/HomePage.tsx` — minimal, token-consistent placeholder hero: `font-display` headline + `font-body` subcopy + a CTA `<Link to="/menu">View Our Menu</Link>` styled as a `brand-red` button. No Figma frame exists for the homepage in this design package, so this is intentionally plain rather than a guessed pixel-accurate design — flagged here for reviewer visibility.
- No further code beyond what AC1–AC4 already built for the nav links; this AC is verified by the integration test exercising the three routes already wired.

**Files:** `src/pages/HomePage.tsx` (new).

---

## Test run order (TDD)

1. Scaffold (Task 0) — no tests, just enough config for Vitest to boot.
2. `SiteHeader.test.tsx` (AC1) → build `LogoMark`, `SiteWordmark`, `NavLinks`, `CartButton`, `HeaderCartControl`, `SiteHeader`.
3. `CartContext.test.tsx` + extend `CartButton.test.tsx` (AC2) → build `CartContext`, wire into `CartButton`.
4. `SiteFooter.test.tsx` (AC3) → build `siteInfo.ts` config + all footer components.
5. `App.test.tsx` (AC4) → build `App`, `Layout`, `MenuPage`, `CartPage` stubs, wire real routing.
6. `HomePage.test.tsx` + extend `App.test.tsx` (AC5) → build `HomePage`.

All test files listed above are written before their corresponding implementation files, per TDD; no production file is created without a preceding failing test that names it.
