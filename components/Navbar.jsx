'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, LogIn, LogOut, User } from 'lucide-react'
import DarkModeToggle from '@/components/DarkModeToggle'



export default function Navbar() {
    const pathname = usePathname()

    // تمثيل المستخدم المسجل (يمكنك ربطه لاحقًا مع Auth)
    const [user, setUser] = useState({
        name: 'أحمد',
        role: 'client', // 'admin' | 'courier' | 'client' | null
    })

    const handleLogout = () => {
        setUser(null)
        console.log('تم تسجيل الخروج')
    }

    // روابط عامة (للكل)
    const navLinks = [
        { href: '/', label: 'الرئيسية' },
        { href: '/products', label: 'المنتجات' },
    ]

    // روابط خاصة حسب الدور
    if (user?.role === 'admin') {
        navLinks.push({ href: '/dashboard', label: 'البيانات' })
    }

    if (user?.role === 'courier') {
        navLinks.push({ href: '/orders', label: 'الطلبات' })
    }

    return (
        <nav className="bg-blue-900 text-white py-4 px-6 sticky top-0 z-50 shadow">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* شعار الموقع */}
                <div className="text-xl font-bold">توصيل المياه</div>

                {/* روابط التنقل */}
                <ul className="flex gap-6 text-lg">
                    {navLinks.map(link => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`px-3 py-1 rounded ${pathname === link.href
                                        ? 'bg-white text-blue-900 font-semibold'
                                        : 'hover:bg-blue-800'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* أيقونات الحساب والسلة */}
                <div className="flex items-center gap-4">
                    <Link href="/cart" title="السلة">
                        <ShoppingCart className="w-6 h-6 hover:text-gray-300" />
                    </Link>

                    {!user ? (
                        <Link href="/login" title="تسجيل الدخول">
                            <LogIn className="w-6 h-6 hover:text-gray-300" />
                        </Link>
                    ) : (
                        <>
                            <Link href="/profile" title="الملف الشخصي">
                                <User className="w-6 h-6 hover:text-gray-300" />
                            </Link>
                            <button onClick={handleLogout} title="تسجيل الخروج">
                                <LogOut className="w-6 h-6 hover:text-gray-300" />
                            </button>
                            <DarkModeToggle />
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
