import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "../../config/siteInfo";

type NavLinksProps = {
  items: NavItem[];
};

export function NavLinks({ items }: NavLinksProps) {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center gap-8" aria-label="Primary">
      {items.map((item) => {
        const isActive = pathname === item.to;
        return (
          <Link
            key={item.id}
            to={item.to}
            aria-current={isActive ? "page" : undefined}
            className={`relative font-body font-medium text-base pb-1 ${
              isActive ? "text-brand-red" : "text-white"
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-brand-red" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
