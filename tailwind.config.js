module.exports = {
  content: ["public/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'oswald': ["Oswald", 'sans-serif'],
        'body': ['Lato', 'sans-serif'],
      },
      colors: {
        secondary: "#e1ad00"
      },
      textColor: {
        secondary: "#e1ad00"
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
