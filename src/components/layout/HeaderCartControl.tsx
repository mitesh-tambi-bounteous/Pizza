import { SITE_INFO } from "../../config/siteInfo";
import { CartButton } from "./CartButton";

export function HeaderCartControl() {
  return (
    <div className="flex items-center gap-6">
      <p className="font-body text-md text-white">
        {SITE_INFO.eta.label} <span className="text-category-classic-green">{SITE_INFO.eta.value}</span>
      </p>
      <CartButton />
    </div>
  );
}
