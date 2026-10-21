/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030406',
          900: '#050608',
          800: '#0a0d14',
          700: '#111520',
        },
        silver: {
          100: '#F8FAFC',
          300: '#CBD5E1',
          400: '#94A3B8',
          liquid: '#E2E8F0',
        },
        gold: {
          champagne: '#D4AF37',
          light: '#F5E6A3',
          dark: '#9A7B1C',
        },
        cyan: {
          electric: '#00F5FF',
          glow: 'rgba(0, 245, 255, 0.4)',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Syncopate"', '"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-glow': '0 0 25px rgba(0, 245, 255, 0.25), inset 0 0 15px rgba(255, 255, 255, 0.1)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatRev 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
