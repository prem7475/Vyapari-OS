import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F17',
        panel: '#0F1626',
        panel2: '#0B1220',
        border: 'rgba(255,255,255,0.10)',
        text: 'rgba(255,255,255,0.92)',
        muted: 'rgba(255,255,255,0.70)',
        subtle: 'rgba(255,255,255,0.50)',
        brand: '#2F7CF6',
        brand2: '#6EE7FF'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.35)',
        card: '0 1px 0 rgba(255,255,255,0.06), 0 12px 36px rgba(0,0,0,0.45)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;

