'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [authorized, setAuthorized] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
            router.push('/login')
            return
        }

        const user = JSON.parse(storedUser)
        if (user.role !== 'ADMIN') {
            router.push('/')
        } else {
            setAuthorized(true)
            fetchOrders()
        }
    }, [])

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders/get')
            const data = await res.json()
            if (res.ok) {
                setOrders(data)
            } else {
                console.error('فشل في جلب الطلبات:', data.error)
            }
        } catch (error) {
            console.error('خطأ في الاتصال بالخادم:', error)
        }
    }

    const changeStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`/api/orders/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus }),
            })

            if (res.ok) {
                setOrders(prev =>
                    prev.map(order =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                )
                if (selectedOrder?.id === orderId) {
                    setSelectedOrder(prev => ({ ...prev, status: newStatus }))
                }
            } else {
                console.error('فشل في تحديث الحالة')
            }
        } catch (err) {
            console.error('خطأ:', err)
        }
    }

    if (!authorized) return null

    return (
        <section className="max-w-5xl mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">لوحة المشرف - الطلبات</h1>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 bg-white rounded shadow p-4 overflow-y-auto max-h-[600px]">
                    <h2 className="text-xl font-semibold mb-4">قائمة الطلبات</h2>
                    <ul>
                        {orders.map(order => (
                            <li
                                key={order.id}
                                className={`cursor-pointer p-2 rounded mb-2 ${selectedOrder?.id === order.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                                    }`}
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="flex justify-between">
                                    <span>#{order.id}</span>
                                    <span>{order.status}</span>
                                </div>
                                <div>{order.mosqueName}</div>
                                <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:w-2/3 bg-white rounded shadow p-6">
                    {!selectedOrder ? (
                        <p className="text-center text-gray-500">اختر طلبًا لعرض التفاصيل</p>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-4">تفاصيل الطلب #{selectedOrder.id}</h2>
                            <p><strong>اسم المسجد:</strong> {selectedOrder.mosqueName}</p>
                            <p><strong>تاريخ الطلب:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                            <p><strong>الحالة الحالية:</strong> {selectedOrder.status}</p>
                            <p className="mb-4"><strong>الموقع:</strong> خط العرض {selectedOrder.lat.toFixed(4)}، خط الطول {selectedOrder.lng.toFixed(4)}</p>

                            <h3 className="font-semibold mb-2">المنتجات:</h3>
                            <ul className="mb-4">
                                {selectedOrder.orderItems.map(item => (
                                    <li key={item.id} className="flex justify-between py-1 border-b">
                                        <span>{item.product.name} × {item.quantity}</span>
                                        <span>{item.product.price * item.quantity} ريال</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="font-bold mb-4">الإجمالي: {selectedOrder.totalPrice} ريال</p>

                            {selectedOrder.deliveryImage ? (
                                <>
                                    <p className="font-semibold mb-2">صورة التوصيل:</p>
                                    <img
                                        src={selectedOrder.deliveryImage}
                                        alt="صورة التوصيل"
                                        className="rounded shadow max-w-full h-auto mb-4"
                                    />
                                </>
                            ) : (
                                <p className="italic text-gray-500 mb-4">لم يتم رفع صورة التوصيل بعد.</p>
                            )}

                            <div className="space-x-2">
                                <button
                                    onClick={() => changeStatus(selectedOrder.id, 'قيد التوصيل')}
                                    className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 transition"
                                >
                                    قيد التوصيل
                                </button>
                                <button
                                    onClick={() => changeStatus(selectedOrder.id, 'تم التوصيل')}
                                    className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition"
                                >
                                    تم التوصيل
                                </button>
                                <button
                                    onClick={() => changeStatus(selectedOrder.id, 'ملغي')}
                                    className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition"
                                >
                                    ملغي
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}