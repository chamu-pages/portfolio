/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#34d399",
        "background-light": "#f7f8f6",
        "background-dark": "#182210", // Mapped from White
        "neutral-dark": "#1a1c18", // Kept as Black
        "neutral-muted": "#4a4d46",
        "surface-dark": "#1c2e1f", // Mapped from Gray (complementary dark green)
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
