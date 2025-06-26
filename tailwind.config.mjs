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
        raleway: ['var(--font-raleway)'],
      },
      colors: {
        primary: "#DB6E27",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #1B1B1B 0%, #3D3D3D 50%, #1B1B1B 100%)',
      },
      screens: {
         sm: '450px',
      },

      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
