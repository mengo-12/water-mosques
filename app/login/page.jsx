'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        if (username === 'admin' && password === '1234') {
            localStorage.setItem('user', JSON.stringify({ username, role: 'ADMIN' }))
            router.push('/admin')
        } else if (username === 'delivery' && password === '1234') {
            localStorage.setItem('user', JSON.stringify({ username, role: 'DELIVERY' }))
            router.push('/delivery')
        } else {
            setError('بيانات الدخول غير صحيحة')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="text"
                    placeholder="اسم المستخدم"
                    className="w-full px-4 py-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="كلمة المرور"
                    className="w-full px-4 py-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
                >
                    تسجيل الدخول
                </button>
            </form>
        </div>
    )
}
