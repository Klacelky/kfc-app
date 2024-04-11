import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './utils/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            sans: ['var(--font-nunito)', 'sans-serif'],
            display: ['var(--font-rushford)', 'sans-serif'],
        },
        extend: {
            colors: {
                inherit: 'inherit',
                'kfc-teal': '#83b59a',
                'kfc-red': '#ad2c40',
                'kfc-blue': '#1a2943',
                'kfc-beige': '#fffcd7',
            },
        },
    },
    plugins: [],
};
export default config;
