'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CartPage() {
    const [cartItems, setCartItems] = useState([])
    const userId = 1 // ← مؤقتاً

    useEffect(() => {
        const fetchCart = async () => {
            const res = await fetch(`/api/cart?userId=${userId}`)
            const data = await res.json()
            setCartItems(data)
        }

        fetchCart()
    }, [])

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    )

    return (
        <section className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">سلة المشتريات</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">السلة فارغة</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex items-center gap-4 border-b pb-4">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-contain"
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold">{item.product.name}</h3>
                                    <p>الكمية: {item.quantity}</p>
                                    <p>السعر: {item.product.price} ريال</p>
                                </div>
                                <p className="font-semibold">
                                    المجموع: {item.product.price * item.quantity} ريال
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-lg font-bold">الإجمالي: {total} ريال</p>
                        <Link
                            href="/checkout"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        >
                            تأكيد الشراء
                        </Link>
                    </div>
                </>
            )}
        </section>
    )
}