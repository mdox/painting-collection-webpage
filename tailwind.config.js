/** @type {import('tailwindcss/colors')} */
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        input: {
          DEFAULT: colors.gray[50],
          focus: colors.blue[50],
          text: colors.gray[900],
          ring: colors.blue[600],
          border: colors.gray[500],
        },
        button: {
          normal: {
            DEFAULT: colors.gray[100],
            hover: colors.gray[200],
            active: colors.gray[300],
            focus: colors.gray[200],
            text: colors.gray[900],
            disabled: {
              DEFAULT: colors.gray[400],
              text: colors.gray[500],
            },
          },
          primary: {
            DEFAULT: colors.blue[500],
            hover: colors.blue[600],
            active: colors.blue[700],
            focus: colors.blue[600],
            text: colors.gray[50],
            disabled: {
              DEFAULT: colors.blue[800],
              text: colors.blue[500],
            },
          },
          danger: {
            DEFAULT: colors.red[500],
            hover: colors.red[600],
            active: colors.red[700],
            focus: colors.red[600],
            text: colors.gray[50],
            disabled: {
              DEFAULT: colors.red[800],
              text: colors.red[500],
            },
          },
          warning: {
            DEFAULT: colors.yellow[400],
            hover: colors.yellow[500],
            active: colors.yellow[600],
            focus: colors.yellow[500],
            text: colors.gray[900],
            disabled: {
              DEFAULT: colors.yellow[700],
              text: colors.gray[800],
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
