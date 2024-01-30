/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,svelte,js,ts}'],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        {
          light: {
            "primary": "#a991f7",
            "secondary": "#f6d860",
            "accent": "#37cdbe",
            "neutral": "#2b3440",
            "base-100": "#ffffff",
            "base-200": "#f2f2f2",
            "base-content": "#1f2937",
            "accent-content": "#00110e"
          },
        },
        {
          dark: {
            "primary": "#a991f7",
            "secondary": "#f6d860",
            "accent": "#37cdbe",
            "neutral": "#a6adbb",
            "base-100": "#1d232a",
            "base-200": "#2a323c",
          }
        },
      ],
    }
}

