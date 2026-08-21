import { SITE_INFO } from "../../config/siteInfo";
import { FooterBrandColumn } from "./FooterBrandColumn";
import { FooterInfoColumn } from "./FooterInfoColumn";
import { FooterDivider } from "./FooterDivider";
import { FooterLegalRow } from "./FooterLegalRow";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-10 bg-ink px-10 py-12">
      <div className="flex justify-between gap-10">
        <FooterBrandColumn />
        <FooterInfoColumn heading="Kitchen Hours">
          <dl className="flex flex-col gap-2 font-body text-md text-on-dark-copyright">
            {SITE_INFO.hours.map((row) => (
              <div key={row.label}>
                <dt className="text-white">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </FooterInfoColumn>
        <FooterInfoColumn heading="Pizzeria Location">
          <div className="flex flex-col gap-2 font-body text-md text-on-dark-copyright">
            <p>{SITE_INFO.location.address}</p>
            <p>{SITE_INFO.location.phoneLabel}</p>
            <p>{SITE_INFO.location.emailLabel}</p>
          </div>
        </FooterInfoColumn>
      </div>
      <FooterDivider />
      <FooterLegalRow />
    </footer>
  );
}
