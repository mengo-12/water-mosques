/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',        // ✅ هذا هو الصحيح
        './components/**/*.{js,ts,jsx,tsx}', // ✅ تأكد أنك تغطي كل الامتدادات
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1D4ED8',
                'primary-dark': '#1E40AF',
                success: '#16A34A',
                danger: '#DC2626',
            },
        },
    },
    plugins: [],
}