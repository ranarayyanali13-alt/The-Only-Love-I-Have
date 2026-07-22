import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        serif: [
          'Georgia',
          'Times New Roman',
          'serif',
        ],
      },

      animation: {
        'slow-pulse':
          'slowPulse 4s ease-in-out infinite',
      },

      keyframes: {
        slowPulse: {
          '0%, 100%': {
            opacity: '0.45',
          },

          '50%': {
            opacity: '1',
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;