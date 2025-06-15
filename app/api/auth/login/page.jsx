'use client'
import React from 'react'


import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json()

        if (res.ok) {
            // حفظ بيانات المستخدم محليًا
            localStorage.setItem('user', JSON.stringify(data.user))

            // توجيه حسب الدور
            if (data.user.role === 'ADMIN') {
                router.push('/admin')
            } else if (data.user.role === 'DELIVERY') {
                router.push('/delivery')
            } else {
                router.push('/client') // أو الصفحة الرئيسية
            }

        } else {
            setError(data.error || 'فشل في تسجيل الدخول')
        }

        // مثال بسيط للتحقق من بيانات الدخول
        if (username === 'admin' && password === 'admin123') {
            // تسجيل دخول المشرف
            // هنا ممكن تخزن التوكن أو حالة الدخول في Context أو LocalStorage
            router.push('/admin')
        } else if (username === 'delivery' && password === 'delivery123') {
            // تسجيل دخول مندوب التوصيل
            router.push('/delivery')
        } else {
            setError('اسم المستخدم أو كلمة المرور غير صحيحة')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md max-w-md w-full"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-primary">تسجيل الدخول</h1>

                {error && (
                    <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
                )}

                <label htmlFor="username" className="block mb-2 font-semibold">
                    اسم المستخدم
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />

                <label htmlFor="password" className="block mb-2 font-semibold">
                    كلمة المرور
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
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
