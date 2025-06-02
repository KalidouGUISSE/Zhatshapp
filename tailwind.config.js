/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./h.html",
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors:{
        dark: '#161717',
        agauche : '#1D1F1F',
        card1 : '#F0EFE6',
        card2 : '#F9F7F3',
        card3 : '#EFE7D9',
        hard : '#EDE8D9',
      },
    },
  },
  plugins: [],
}

