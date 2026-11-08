/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#05070D', 900: '#070B14', 800: '#0B1120', 700: '#111A2E', 600: '#1A253D' },
        bone: '#F3F5F9',
        mist: '#8C97AD',
        haze: '#5A6580',
        ice: { DEFAULT: '#8FD3FF', deep: '#3B8DFF' },
      },
      fontFamily: {
        display: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: { label: '0.18em' },
      maxWidth: { shell: '1320px' },
    },
  },
  plugins: [],
};
