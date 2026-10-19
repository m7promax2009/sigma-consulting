/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4k': '2560px',
      },
      colors: {
        deepTeal: "#104F5A",
        darkTeal: "#0B343B",
        mutedTeal: "#236B70",
        softSage: "#D9E2DE",
        night: "#071F22",
        gold: "#D5A45B",
        goldLight: "#E8C17F",
      },
      maxWidth: {
        '8xl': '1440px',
        '9xl': '1600px',
        '10xl': '1840px',
        '4k': '2240px',
      },
    },
  },
  plugins: [],
}
