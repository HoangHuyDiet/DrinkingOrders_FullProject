/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          600: '#8c6b5d',
          800: '#4a3b36',
          900: '#2b211e',
        },
        gold: {
          500: '#c6a87c',
          600: '#b08d55',
        }
      },
      // --- SỬA ĐOẠN NÀY ---
      fontFamily: {
        serif: ['"Lora"', 'serif'],       // Đổi Playfair thành Lora
        sans: ['"Montserrat"', 'sans-serif'], // Đổi Manrope thành Montserrat
      }
      // --------------------
    },
  },
  plugins: [],
}