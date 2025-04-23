/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arktype: ['var(--font-arktype)'],
        ceraRoundPro: ['var(--font-ceraroundpro)'],
        nordiquePro: ['var(--font-nordiquepro)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
         sm: '450px',
      },
    },
  },
  plugins: [],
};
