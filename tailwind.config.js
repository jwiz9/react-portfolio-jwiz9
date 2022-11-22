/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#9FDAEA',
          secondary: '#febb52',
          tertiary: '#3F3D48',
          quaternary: '#f8fef0',
        },
        height: {
          screen2: "50vh",
          screen3: "calc(100vh / 3)",
          screen4: "calc(100vh / 4)",
          screen5: "calc(100vh / 5)",
        },
      },
    },
    plugins: [],
  }