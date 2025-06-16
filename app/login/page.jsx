// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function LoginPage() {
//     const router = useRouter()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState('')

//     const handleLogin = async (e) => {
//         e.preventDefault()
//         setError('')

//         try {
//             const res = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             })

//             const data = await res.json()

//             if (!res.ok) {
//                 setError(data.error || 'حدث خطأ أثناء تسجيل الدخول')
//                 return
//             }

//             localStorage.setItem('user', JSON.stringify(data.user))

//             if (data.user.role === 'ADMIN') {
//                 router.push('/admin')
//             } else if (data.user.role === 'DELIVERY') {
//                 router.push('/delivery')
//             } else {
//                 router.push('/')
//             }
//         } catch (err) {
//             setError('حدث خطأ في الاتصال بالخادم')
//         }
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//             <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//                 <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">تسجيل الدخول</h2>
//                 {error && <p className="bg-red-100 text-red-700 p-2 rounded text-center mb-4">{error}</p>}

//                 <form onSubmit={handleLogin} className="space-y-5">
//                     <input
//                         type="email"
//                         placeholder="البريد الإلكتروني"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="w-full border border-gray-300 rounded px-4 py-2 text-black"
//                     />
//                     <input
//                         type="password"
//                         placeholder="كلمة المرور"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full border border-gray-300 rounded px-4 py-2 text-black"
//                     />
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
//                     >
//                         تسجيل الدخول
//                     </button>
//                 </form>

//                 <div className="mt-6 text-center">
//                     <p className="text-gray-700">ليس لديك حساب؟</p>
//                     <button
//                         onClick={() => router.push('/register')}
//                         className="mt-2 text-blue-700 hover:underline font-medium"
//                     >
//                         تسجيل حساب جديد
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'حدث خطأ أثناء تسجيل الدخول')
                return
            }

            // حفظ بيانات المستخدم محليًا
            localStorage.setItem('user', JSON.stringify(data.user))

            // ✅ حفظ userId في الكوكيز لمدة 7 أيام
            Cookies.set('userId', data.user.id, { expires: 7 })

            // التوجيه حسب الدور
            if (data.user.role === 'ADMIN') {
                router.push('/admin')
            } else if (data.user.role === 'DELIVERY') {
                router.push('/delivery')
            } else {
                router.push('/')
            }
        } catch (err) {
            setError('حدث خطأ في الاتصال بالخادم')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">تسجيل الدخول</h2>
                {error && <p className="bg-red-100 text-red-700 p-2 rounded text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-5">
                    <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 text-black"
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 text-black"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
                    >
                        تسجيل الدخول
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-700">ليس لديك حساب؟</p>
                    <button
                        onClick={() => router.push('/register')}
                        className="mt-2 text-blue-700 hover:underline font-medium"
                    >
                        تسجيل حساب جديد
                    </button>
                </div>
            </div>
        </div>
    )
}
