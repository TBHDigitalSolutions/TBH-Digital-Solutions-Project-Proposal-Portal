/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      // Screen Sizes
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      // Colors
      colors: {
        'soft-black': '#060512',
        'off-white': '#F4F6F7',
        'primary-blue': '#00509E',
        'logo-blue': '#0EAFFB',
        'accent-blue': '#0077C8',
        'deep-navy': '#0E1730',
        'dark-charcoal': '#1B1B1F',
        'light-grey': '#D7DBDD',
        'darker-grey': '#4A4A4A',
        'hover-blue': '#5AC8FA',
        'hover-primary-blue': '#003F7D',
        'bg-light': '#F7F9FB',
        'bg-dark': '#060512',
        'card-bg-light': '#FFFFFF',
        'text-dark': '#2D2D2D',
        'text-light': '#F4F6F7',
      },

      // Font Families
      fontFamily: {
        newsreader: ['Newsreader', 'serif'],
        aldrich: ['Aldrich', 'sans-serif'],
        sovjet: ['"Sovjet Box"', 'sans-serif'],
      },

      // Font Sizes
      fontSize: {
        h1: ['2.5rem', { lineHeight: '1.2', fontWeight: 'bold' }],
        h2: ['2rem', { lineHeight: '1.4', fontWeight: '600' }],
        h3: ['1.5rem', { lineHeight: '1.5', fontWeight: '500' }],
        'lg:h1': ['3.75rem', { lineHeight: '1.2', fontWeight: 'bold' }],
        'lg:h2': ['2.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'lg:h3': ['1.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.8' }],
        'lg:body': ['1.125rem', { lineHeight: '1.8' }],
        secondary: ['0.875rem', { lineHeight: '1.4', fontWeight: '300' }],
      },

      // Shadows
      boxShadow: {
        'light-card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'dark-card': '0 4px 12px rgba(14, 175, 251, 0.25)',
        'hover-card': '0 6px 18px rgba(14, 175, 251, 0.35)',
        'custom-header': '0px 4px 12px rgba(14, 175, 251, 0.25)',
        'custom-section': '0 4px 12px rgba(14, 175, 251, 0.25)',
        'custom-section-hover': '0 6px 18px rgba(14, 175, 251, 0.35)',
      },

      // Spacing
      spacing: {
        128: '32rem',
        'p-sm': '1rem',
        'p-md': '1.5rem',
        'p-lg': '2rem',
        'p-xl': '2.5rem',
      },

      // Border Radius
      borderRadius: {
        'rounded-md': '8px',
        'rounded-lg': '10px',
        'rounded-full': '9999px',
        'custom': '10px',
      },

      // Padding
      padding: {
        'header': '2rem',
      },
    },
  },

  // Plugins
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
