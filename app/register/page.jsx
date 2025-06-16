'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState('')

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setError('')

        if (form.password !== form.confirmPassword) {
            setError('كلمة المرور وتأكيدها غير متطابقين')
            return
        }

        if (!form.username || !form.email || !form.password || !form.confirmPassword) {
            setError('يرجى ملء جميع الحقول المطلوبة')
            return
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await res.json()

            if (res.ok) {
                alert('تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.')
                router.push('/')
            } else {
                setError(data.error || 'حدث خطأ أثناء التسجيل')
            }
        } catch (err) {
            setError('حدث خطأ في الاتصال بالخادم')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center text-primary">تسجيل حساب جديد</h1>

                {error && <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>}

                <label className="block mb-2 font-semibold" htmlFor="username">اسم المستخدم</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
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

                <label className="block mb-2 font-semibold" htmlFor="phone">رقم الهاتف</label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    // اجعلها required إذا أردت رقم الهاتف إجباري
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
                    className="w-full bg-primary text-black py-2 rounded hover:bg-primary-dark transition"
                >
                    تسجيل الحساب
                </button>
            </form>
        </div>
    )
}
