type SocialIcon = "instagram" | "facebook" | "twitter";

const ICON_PATHS: Record<SocialIcon, JSX.Element> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1z" />
  ),
  twitter: (
    <path d="M22 5.8a8.3 8.3 0 0 1-2.36.65 4.1 4.1 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.27 5.48 4.1 4.1 0 0 1-1.86-.51 4.1 4.1 0 0 0 3.3 4.06 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.29 1.85c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.3 8.3 0 0 0 22 5.8z" />
  ),
};

export function SocialIconRow({ icons }: { icons: readonly SocialIcon[] }) {
  return (
    <div className="flex items-center gap-3">
      {icons.map((icon) => (
        <a
          key={icon}
          href="#"
          aria-label={icon}
          className="flex h-9 w-9 items-center justify-center rounded-cart-icon-btn bg-header-cart-btn-bg text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true"
          >
            {ICON_PATHS[icon]}
          </svg>
        </a>
      ))}
    </div>
  );
}
