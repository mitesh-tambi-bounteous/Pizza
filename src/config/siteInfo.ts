export type NavItem = {
  id: string;
  label: string;
  to: string;
};

export const SITE_INFO = {
  brand: {
    letter: "F",
    name: "Forno Rosso",
    tagline:
      "Artisanal wood-fired sourdough pizzas crafted with 48-hour fermented dough and imported San Marzano ingredients. Delivered fresh and piping hot.",
  },
  nav: [
    { id: "home", label: "Home", to: "/" },
    { id: "menu", label: "Our Menu", to: "/menu" },
    { id: "cart", label: "Cart", to: "/cart" },
  ] satisfies NavItem[],
  eta: {
    label: "Estimated delivery:",
    value: "30 mins",
  },
  hours: [
    { label: "Monday - Thursday", value: "12:00 PM - 10:00 PM" },
    { label: "Friday - Saturday", value: "12:00 PM - 11:30 PM" },
    { label: "Sunday", value: "1:00 PM - 9:30 PM" },
  ],
  location: {
    address: "842 Rione Monti, Sourdough Avenue, Suite 100",
    phoneLabel: "Delivery: (555) 392-7677",
    emailLabel: "Email: ciao@fornorosso.pizza",
  },
  social: ["instagram", "facebook", "twitter"] as const,
  legal: {
    copyright: "© 2026 Forno Rosso Pizzeria. All rights reserved.",
    links: [
      { id: "privacy-policy", label: "Privacy Policy" },
      { id: "delivery-terms", label: "Delivery Terms" },
    ],
  },
};
