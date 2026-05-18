/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: '#0d1b3e', light: '#1a2f5e' },
        cream: { DEFAULT: '#faf6ee', dark: '#f0e8d8' },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      keyframes: {
        'bounce-drop': {
          '0%':   { transform: 'translateY(-120px)', opacity: '0' },
          '55%':  { transform: 'translateY(0px)',    opacity: '1' },
          '70%':  { transform: 'translateY(-18px)' },
          '82%':  { transform: 'translateY(0px)' },
          '91%':  { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        'bounce-drop': 'bounce-drop 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
