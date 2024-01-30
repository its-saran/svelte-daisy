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
            "primary": "#4a00ff",
            "secondary": "#f6d860",
            "accent": "#37cdbe",
            "neutral": "#2b3440",
            "base-100": "#ffffff",
            "base-200": "#f2f2f2",
            "base-300": "#a1a1aa",
            "base-content": "#1f2937",
            "accent-content": "#edf0f0"
          },
        },
        {
          dark: {
            "primary": "#7480ff",
            "secondary": "#f6d860",
            "accent": "#37cdbe",
            "neutral": "#a6adbb",
            "base-100": "#1d232a",
            "base-200": "#2a323c",
            "base-300": "#2a323c",
          }
        },
      ],
    }
}

