import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        'slide-in': "slide-in 0.3s linear",
        'slide-out': "slide-out 0.3s linear"
      },
      keyframes: {
        'slide-in': {
          'from': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          'to': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-out': {
          'from': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          'to': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      colors: {
        jade: {
          "50": "#effef7",
          "100": "#dafeef",
          "200": "#b8fadd",
          "300": "#81f4c3",
          "400": "#43e5a0",
          "500": "#1acd81",
          "600": "#0fa968",
          "700": "#108554",
          "800": "#126945",
          "900": "#11563a",
          "950": "#03301f",
        },
        MAIN: "var(--MAIN-COLOR)",
        WHITE: "var(--MAIN-WHITE)",
        DARK_MAIN_BACKGROUND: "var(--DARK-MAIN-BACKGROUND)",
        DARK_SECONDARY_BACKGROUND: "var(--DARK-SECONDARY-BACKGROUND)",
        DARK: "var(--DARK)",
        MAIN_VIOLET: "var(--MAIN-VIOLET)",
        RYZADUST: "var(--RYZADUST)",
      },
      boxShadow: {
        linked: "3px 3px 2px 1px #0DCECD",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;