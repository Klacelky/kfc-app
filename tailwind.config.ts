import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            sans: ['var(--font-nunito)', 'sans-serif'],
            display: ['var(--font-rushford)', 'sans-serif'],
        },
        colors: {
            inherit: 'inherit',
            teal: '#83b59a',
            red: '#ad2c40',
            blue: '#1a2943',
            beige: '#fffcd7',
        },
    },
    plugins: [],
};
export default config;
