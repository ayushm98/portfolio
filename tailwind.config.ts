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
        // Brittany Chiang color scheme
        navy: {
          DEFAULT: '#0a192f',
          light: '#112240',
          lightest: '#233554',
        },
        slate: {
          DEFAULT: '#8892b0',
          light: '#a8b2d1',
          lightest: '#ccd6f6',
        },
        green: {
          DEFAULT: '#64ffda',
          tint: 'rgba(100, 255, 218, 0.1)',
        },
        white: '#e6f1ff',
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
