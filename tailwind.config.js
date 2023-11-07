/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        foldOut: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "100%": { transform: "scaleY(1)", transformOrigin: "top" },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4A454B",

          secondary: "#111",

          accent: "#1c1917",

          neutral: "#1c1917",

          "base-100": "#EFEFEF",

          info: "#5170e1",

          success: "#2cd8c4",

          warning: "#d5a60b",

          error: "#dc2626",
        },

        black: {
          primary: "#e3e3e3",

          secondary: "#424242",

          accent: "#0e1111",

          neutral: "#202020",

          "base-100": "#202020",

          info: "#5699e1",

          success: "#1fc76a",

          warning: "#f5c20a",

          error: "#f64171",
        },
      },
    ],
  },
};
