import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        MAIN: "var(--MAIN-COLOR)",
        WHITE: "var(--MAIN-WHITE)",
        DARK_MAIN_BACKGROUND: "var(--DARK-MAIN-BACKGROUND)",
        DARK_SECONDARY_BACKGROUND: "var(--DARK-SECONDARY-BACKGROUND)",
        DARK:"var(--DARK)",
        MAIN_VIOLET: "var(--MAIN-VIOLET)",
        RYZADUST: "var(--RYZADUST)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
