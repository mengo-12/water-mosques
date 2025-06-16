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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">تسجيل الدخول</h2>

                {error && (
                    <p className="bg-red-100 text-red-700 p-2 rounded text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded transition duration-200"
                    >
                        تسجيل الدخول
                    </button>
                </form>

                {/* زر تسجيل حساب جديد */}
                <div className="mt-6 text-center">
                    <p className="text-gray-700">ليس لديك حساب؟</p>
                    <button
                        onClick={() => router.push('/register')}
                        className="mt-2 inline-block text-blue-700 hover:underline font-medium"
                    >
                        تسجيل حساب جديد
                    </button>
                </div>
            </div>
        </div>
    )
}
