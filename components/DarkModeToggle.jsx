'use client'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('darkMode')
        if (stored === 'true') {
            setDarkMode(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleDarkMode = () => {
        const newMode = !darkMode
        setDarkMode(newMode)
        localStorage.setItem('darkMode', newMode.toString())
        if (newMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded text-sm bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
            {darkMode ? '☀️ نهاري' : '🌙 ليلي'}
        </button>
    )
}