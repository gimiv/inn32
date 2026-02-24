/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary
                navy: '#1C3A5E',
                cream: '#F8F6F1',
                // Secondary
                'mountain-blue': '#3580B0',
                'sky-blue': '#6AAED0',
                'sign-green': '#4A8854',
                // Tertiary
                'warm-gold': '#C4AF78',
                'deep-wave': '#2D6E9E',
                charcoal: '#1A1A1A',
                // Utility
                'gray-brand': '#6B6B6B',
                'light-gray': '#E8E5DF',
                primary: '#1C3A5E', // Mapped to Navy for backward compat
                secondary: '#F8F6F1', // Mapped to Cream for backward compat
            },
            fontFamily: {
                display: ['"DM Serif Display"', 'Georgia', '"Times New Roman"', 'serif'],
                sans: ['"Outfit"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
                'body-serif': ['"Lora"', 'Georgia', '"Times New Roman"', 'serif'],
            },
            fontSize: {
                'page-title': ['clamp(2.625rem, 5vw, 3.5rem)', { lineHeight: '1.2' }],
                'section-heading': ['clamp(1.75rem, 3.5vw, 2rem)', { lineHeight: '1.3' }],
                'subheading': ['clamp(1.125rem, 2.5vw, 1.5rem)', { lineHeight: '1.4' }],
            },
            spacing: {
                'xs': '0.25rem',
                'sm': '0.5rem',
                'md': '1rem',
                'lg': '1.5rem',
                'xl': '2rem',
                '2xl': '3rem',
                '3xl': '4rem',
                '4xl': '5rem',
            },
            borderRadius: {
                'brand-sm': '4px',
                'brand-md': '8px',
                'brand-lg': '12px',
                'brand-xl': '16px',
            },
            boxShadow: {
                'brand-sm': '0 1px 3px rgba(0, 0, 0, 0.06)',
                'brand-md': '0 2px 10px rgba(0, 0, 0, 0.06)',
                'brand-lg': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'brand-xl': '0 8px 40px rgba(0, 0, 0, 0.12)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
