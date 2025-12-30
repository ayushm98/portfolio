import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Violet color scheme
        navy: {
          DEFAULT: '#0c0a1d',
          light: '#16132d',
          lightest: '#231f47',
        },
        slate: {
          DEFAULT: '#9896b0',
          light: '#b8b6d1',
          lightest: '#e2e0f6',
        },
        green: {
          DEFAULT: '#a78bfa',
          tint: 'rgba(167, 139, 250, 0.1)',
        },
        accent: {
          DEFAULT: '#f472b6',
          tint: 'rgba(244, 114, 182, 0.1)',
        },
        white: '#f5f3ff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'heading-xl': ['clamp(40px, 8vw, 80px)', { lineHeight: '1.1' }],
        'heading-lg': ['clamp(40px, 8vw, 60px)', { lineHeight: '1.1' }],
        'heading-md': ['clamp(26px, 5vw, 32px)', { lineHeight: '1.1' }],
        'heading-sm': ['clamp(24px, 5vw, 28px)', { lineHeight: '1.1' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
