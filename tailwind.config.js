/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--color-surface)',
          alt: 'var(--color-surface-alt)',
          hover: 'var(--color-surface-hover)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },
        amber: {
          DEFAULT: '#D97706',
        },
        forge: '#36363E',
        'signal-orange': '#EA580C',
        'warm-gold': '#F59E0B',
        scaffold: '#A1A1AA',
        blueprint: '#FAFAF9',
        concrete: '#F5F5F4',
        night: '#2A2A32',
        critical: '#DC2626',
        success: '#16A34A',
        'task-normal': '#D97706',
        'task-milestone': '#7C3AED',
        'task-float': '#10B981',
        'task-baseline': '#6B7280',
        'task-complete': '#EA580C',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};
