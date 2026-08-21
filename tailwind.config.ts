import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-red": "#C82D25",
        ink: "#151212",
        "cream-bg": "#FCFAF6",
        "surface-card": "#FFFFFF",
        "card-border": "#EBE7DF",
        "muted-text": "#6B6661",
        "category-classic-green": "#2A7043",
        "on-dark-muted-line": "rgba(255,255,255,0.12)",
        "on-dark-copyright": "rgba(255,255,255,0.6)",
        "header-cart-btn-bg": "rgba(255,255,255,0.10)",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Geist", "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "13px",
        base: "14px",
        md: "15px",
        lg: "16px",
        xl: "18px",
        "2xl": "20px",
        "3xl": "22px",
        "4xl": "24px",
        "6xl": "48px",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      borderRadius: {
        "logo-badge": "20px",
        "filter-pill": "8px",
        card: "16px",
        "cart-icon-btn": "24px",
        "sticky-cart-bar": "16px",
      },
    },
  },
  plugins: [],
} satisfies Config;
