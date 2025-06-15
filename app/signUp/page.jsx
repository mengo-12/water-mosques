'use client'
import React from 'react'


import { useState } from 'react'
import { useRouter } from 'next/navigation'


const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        mosqueName: form.mosqueName,
        email: form.email,
        password: form.password,
    }),
})

const data = await res.json()

if (res.ok) {
    alert('تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.')
    router.push('/login')
} else {
    setError(data.error || 'حدث خطأ أثناء التسجيل')
}


export default function SignupPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        mosqueName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setError('')

        if (form.password !== form.confirmPassword) {
            setError('كلمة المرور وتأكيدها غير متطابقين')
            return
        }

        if (!form.mosqueName || !form.email || !form.password) {
            setError('يرجى ملء جميع الحقول')
            return
        }

        // هنا ترسل البيانات للسيرفر (API) لإنشاء حساب العميل
        // حالياً مجرد محاكاة تسجيل ناجح
        alert('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.')
        router.push('/login')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center text-primary">تسجيل حساب جديد</h1>

                {error && <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>}

                <label className="block mb-2 font-semibold" htmlFor="mosqueName">اسم المسجد</label>
                <input
                    id="mosqueName"
                    name="mosqueName"
                    type="text"
                    value={form.mosqueName}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <label className="block mb-2 font-semibold" htmlFor="email">البريد الإلكتروني</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <label className="block mb-2 font-semibold" htmlFor="password">كلمة المرور</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <label className="block mb-2 font-semibold" htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
                >
                    تسجيل الحساب
                </button>
            </form>
        </div>
    )
}

