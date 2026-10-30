/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a0f1d',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        brand: {
          dark: '#0f172a',
          navy: '#1e1b4b',
          deepPurple: '#3b0764',
          purple: '#6366f1',
          violet: '#7c3aed',
          lightPurple: '#8b5cf6',
          lavender: '#ede9fe',
          accent: '#ec4899',
        }
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'primary-gradient': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        'subtle-purple': 'linear-gradient(to bottom right, #f8fafc, #f5f3ff)',
      }
    },
  },
  plugins: [],
}
