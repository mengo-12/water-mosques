'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'الرئيسية' },
        { href: '/about', label: 'من نحن' },
        { href: '/products', label: 'المنتجات' },
        { href: '/cart', label: 'السلة' },
        { href: '/contact', label: 'اتصل بنا' },
    ]

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* شعار الموقع أو اسمك */}
                    <Link href="/" className="text-xl font-bold text-primary">
                        توصيل مياه المساجد
                    </Link>

                    <div className="flex space-x-6">
                        {navItems.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === href
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-primary hover:text-white transition'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}
