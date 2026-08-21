import { Link } from "react-router-dom";
import { SITE_INFO } from "../config/siteInfo";

export function HomePage() {
  return (
    <main data-testid="home-page" className="flex flex-col items-center gap-6 px-10 py-24 text-center">
      <h1 className="font-display text-6xl font-bold text-ink">{SITE_INFO.brand.name}</h1>
      <p className="max-w-lg font-body text-lg text-muted-text">{SITE_INFO.brand.tagline}</p>
      <Link
        to="/menu"
        className="rounded-filter-pill bg-brand-red px-6 py-3 font-body font-semibold text-white"
      >
        View Our Menu
      </Link>
    </main>
  );
}
