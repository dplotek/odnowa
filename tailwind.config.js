module.exports = {
  content: ["public/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'oswald': ["Oswald", 'sans-serif'],
        'body': ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
