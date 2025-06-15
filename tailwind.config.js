/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // مهم حتى تعمل Tailwind داخل App Router
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2563eb',
                'primary-dark': '#1d4ed8',
            },
        },
    },
    plugins: [],
}