'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'  // تأكد أنك تستخدم Next.js 13 مع App Router

export default function CartPage() {
    const router = useRouter()
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) return

        const user = JSON.parse(storedUser)

        fetch(`/api/cart?userId=${user.id}`)
            .then(res => res.json())
            .then(data => {
                setCartItems(data.items || [])
            })
            .catch(err => {
                console.error('خطأ في تحميل السلة:', err)
            })
    }, [])

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    )

    const handleCheckout = () => {
        // هنا يمكنك تخزين بيانات السلة أو أي إعدادات قبل الذهاب للصفحة التالية إذا تريد

        router.push('/checkout')  // توجيه لصفحة تحديد الموقع / الدفع
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">سلة المشتريات</h1>
            {cartItems.length === 0 ? (
                <p>السلة فارغة</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex justify-between border-b pb-2">
                                <span>{item.product.name} × {item.quantity}</span>
                                <span>{item.product.price * item.quantity} ريال</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 font-bold text-lg">الإجمالي: {total} ريال</p>

                    <button
                        onClick={handleCheckout}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded transition"
                        aria-label="اتمام الطلب والانتقال لصفحة تحديد الموقع"
                    >
                        إتمام الطلب
                    </button>
                </>
            )}
        </div>
    )
}
