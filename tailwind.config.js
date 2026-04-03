export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C9A84C',
          'gold-light': '#E8C97A',
          'gold-dark': '#A07830',
          dark: '#0A0A0F',
          surface: '#111118',
          card: '#16161F',
          border: '#2A2A38',
          muted: '#6B6B80',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #A07830 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0A0A0F 0%, #16161F 100%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(201, 168, 76, 0.15)',
        'gold-sm': '0 0 15px rgba(201, 168, 76, 0.1)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
