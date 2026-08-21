import { Link } from "react-router-dom";
import { SITE_INFO } from "../../config/siteInfo";
import { LogoMark } from "./LogoMark";
import { SiteWordmark } from "./SiteWordmark";
import { NavLinks } from "./NavLinks";
import { HeaderCartControl } from "./HeaderCartControl";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between bg-ink px-10 py-4">
      <Link to="/" className="flex items-center gap-3">
        <LogoMark letter={SITE_INFO.brand.letter} size="header" />
        <SiteWordmark text={SITE_INFO.brand.name} size="header" />
      </Link>
      <NavLinks items={SITE_INFO.nav} />
      <HeaderCartControl />
    </header>
  );
}
