/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "**/*.html",
    "**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'customGray' : 'rgb(250, 250, 250)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide') 
  ],
}
