import { SITE_INFO } from "../../config/siteInfo";
import { LogoMark } from "./LogoMark";
import { SiteWordmark } from "./SiteWordmark";
import { SocialIconRow } from "./SocialIconRow";

export function FooterBrandColumn() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <LogoMark letter={SITE_INFO.brand.letter} size="footer" />
        <SiteWordmark text={SITE_INFO.brand.name} size="footer" />
      </div>
      <p className="max-w-xs font-body text-md text-on-dark-copyright">{SITE_INFO.brand.tagline}</p>
      <SocialIconRow icons={SITE_INFO.social} />
    </div>
  );
}
