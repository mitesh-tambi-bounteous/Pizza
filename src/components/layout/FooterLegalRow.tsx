import { SITE_INFO } from "../../config/siteInfo";

export function FooterLegalRow() {
  return (
    <div className="flex items-center justify-between font-body text-md text-on-dark-copyright">
      <p>{SITE_INFO.legal.copyright}</p>
      <div className="flex items-center gap-6">
        {SITE_INFO.legal.links.map((link) => (
          <a key={link.id} href="#">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
