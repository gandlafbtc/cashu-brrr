/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#5C2EDD",
          secondary: "#D926AA",
          "base-100": "#1d232a",
          neutral: "#2a323c",
          info: "#00b5ff",
          success: "#00a96e",
          warning: "#ffbe00",
          error: "#ff5861",
        },
      },
    ],
  },
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
