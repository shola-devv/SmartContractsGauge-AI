import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neumorphic Design System Colors
        surface: '#E4EBF5',
        surfaceLight: '#FFFFFF',
        surfaceShadow: '#c8d0e7',
        surfaceDark: '#9baacf',
        
        primary: '#6d5dfc',
        primaryLight: '#8abdff',
        primaryDark: '#5b0eeb',
        
        // Keep sky colors for accent
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      boxShadow: {
        // Neumorphic Shadows
        neu: '0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem #ffffff',
        neuInset: 'inset 0.2rem 0.2rem 0.5rem #c8d0e7, inset -0.2rem -0.2rem 0.5rem #ffffff',
        
        // Dark mode neumorphic shadows
        neuDark: '0.3rem 0.3rem 0.6rem #0a0e1a, -0.2rem -0.2rem 0.5rem #1e293b',
        neuInsetDark: 'inset 0.2rem 0.2rem 0.5rem #0a0e1a, inset -0.2rem -0.2rem 0.5rem #1e293b',
      },
      borderRadius: {
        // Neumorphic Border Radius
        neu: '1rem',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
export default config