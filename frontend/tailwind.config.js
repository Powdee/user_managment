// tailwind.config.js
const production = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV

module.exports = {
  future: { // for tailwind 2.0 compat
    purgeLayersByDefault: true, 
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    // for tailwind UI users only
    require('@tailwindcss/ui'),
    require('@tailwindcss/forms'),
  ],
  purge: {
    content: [
      "./src/**/*.svelte",
      // may also want to include base index.html
    ], 
    enabled: production // disable purge in dev
  },
  theme: {
    colors: {
      transparent: 'transparent',
      primary: 'rgb(183, 21, 64)',
      secondary: '#000',
      white: '#FFF',
      'primary-005': 'rgba(183, 21, 64, 0.25)',
    },
    backgroundColor: () => ({
      primary: 'rgb(183, 21, 64)',
      secondary: '#000',
      white: '#FFF',
      'primary-005': 'rgba(183, 21, 64, 0.25)',
    }),
    fontFamily: {
      primary: `Comfortaa, cursive`
    }
  }
};