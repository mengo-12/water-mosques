'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    // محاكاة حالة تسجيل الدخول - غيّرها حسب حالتك الفعلية
    const [user, setUser] = useState({
        name: 'أحمد المندوب',
        role: 'courier', // أو admin
    })

    const links = [
        { href: '/', label: 'الرئيسية' },
        { href: '/products', label: 'المنتجات' },
        { href: '/orders', label: 'الطلبات' },
    ]

    const handleLogout = () => {
        setUser(null)
        // هنا ضع الكود الحقيقي لتسجيل الخروج
        console.log('تم تسجيل الخروج')
    }

    return (
        <nav className="bg-white border-b shadow-sm py-4 px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="text-xl font-bold text-blue-700">توصيل المياه</div>

                <ul className="flex items-center gap-4">
                    {links.map(link => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`px-3 py-1 rounded ${pathname === link.href
                                        ? 'text-white bg-blue-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    {!user ? (
                        <li>
                            <Link
                                href="/login"
                                className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                تسجيل الدخول
                            </Link>
                        </li>
                    ) : (
                        <li className="relative group">
                            <button className="px-3 py-1 rounded bg-gray-100 text-gray-800 hover:bg-gray-200">
                                {user.name}
                            </button>
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block z-10 text-right">
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    الملف الشخصي
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-right px-4 py-2 hover:bg-gray-100"
                                >
                                    تسجيل الخروج
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}
