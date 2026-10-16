import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        'card-bg': '#111827',
        'accent-blue': '#3B82F6',
        'accent-cyan': '#06B6D4',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
