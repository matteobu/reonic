module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg':
          "url('/Users/matteobucciol/Documents/bucciol/2024/reonic/public/parkingLot.jpg')",
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'], // Custom default font
      },
      colors: {
        chargePointBarChart: '#F8FAFC',
        sideBar: '#E2E8F0',
      },
    },
  },
  plugins: [],
};
