import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1E8",
        gold: "#D4AF37",
        "dark-gold": "#B8941F",
        "bright-gold": "#FFD700",
        "deep-black": "#0A0A0A",
        charcoal: "#1A1A1A",
        "dark-slate": "#151515",
        "text-cream": "#F5F1E8",
        "text-muted": "#A8A8A8",
        "accent-green": "#2D5F3F",
        "accent-teal": "#1B4D3E",
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "Arial", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 32px rgba(0,0,0,0.5)",
        "card-hover": "0 32px 80px rgba(0,0,0,0.7)",
        "gold-glow": "0 0 60px rgba(212,175,55,0.25)",
        "button-hover": "0 16px 48px rgba(212,175,55,0.3)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
