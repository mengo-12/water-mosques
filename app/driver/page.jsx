'use client'
import React from 'react'


import { useState } from 'react'

const initialOrders = [
    {
        id: 201,
        mosqueName: 'مسجد الفاروق',
        orderDate: '2025-06-14',
        status: 'قيد التوصيل',
        totalPrice: 55,
        location: { lat: 24.7136, lng: 46.6753 },
        items: [
            { id: 1, name: 'كرتون مياه صغير', quantity: 2, price: 15 },
            { id: 3, name: 'كرتون مياه كبير', quantity: 1, price: 25 },
        ],
        deliveryImage: null,
    },
]

export default function DeliveryPage() {
    const [orders, setOrders] = useState(initialOrders)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        // لتحويل الصورة إلى رابط مؤقت للعرض (يمكن تعديلها لاحقاً للرفع إلى السيرفر)
        const imageUrl = URL.createObjectURL(file)

        setUploading(true)
        setTimeout(() => {
            setOrders(orders.map(order =>
                order.id === selectedOrder.id ? { ...order, deliveryImage: imageUrl } : order
            ))
            setUploading(false)
            alert('تم رفع صورة التوصيل بنجاح')
        }, 1000)
    }

    return (
        <section className="max-w-4xl mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">صفحة المندوب</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* قائمة الطلبات */}
                <div className="md:w-1/3 bg-white rounded shadow p-4 max-h-[600px] overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">الطلبات المكلفة</h2>
                    <ul>
                        {orders.map(order => (
                            <li
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                                className={`cursor-pointer p-2 rounded mb-2 ${selectedOrder?.id === order.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                                    }`}
                            >
                                <div className="flex justify-between">
                                    <span>#{order.id}</span>
                                    <span>{order.status}</span>
                                </div>
                                <div>{order.mosqueName}</div>
                                <div className="text-sm text-gray-500">{order.orderDate}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* تفاصيل الطلب */}
                <div className="md:w-2/3 bg-white rounded shadow p-6">
                    {!selectedOrder ? (
                        <p className="text-center text-gray-500">اختر طلبًا لعرض التفاصيل</p>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-4">تفاصيل الطلب #{selectedOrder.id}</h2>
                            <p><strong>اسم المسجد:</strong> {selectedOrder.mosqueName}</p>
                            <p><strong>تاريخ الطلب:</strong> {selectedOrder.orderDate}</p>
                            <p><strong>الحالة الحالية:</strong> {selectedOrder.status}</p>

                            <h3 className="font-semibold mt-4 mb-2">المنتجات:</h3>
                            <ul className="mb-4">
                                {selectedOrder.items.map(item => (
                                    <li key={item.id} className="flex justify-between py-1 border-b">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>{item.price * item.quantity} ريال</span>
                                    </li>
                                ))}
                            </ul>

                            {/* تحديث الحالة */}
                            <div className="mb-4 space-x-2">
                                <button
                                    onClick={() => handleStatusChange(selectedOrder.id, 'في الطريق')}
                                    className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 transition"
                                >
                                    في الطريق
                                </button>
                                <button
                                    onClick={() => handleStatusChange(selectedOrder.id, 'تم التوصيل')}
                                    className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition"
                                >
                                    تم التوصيل
                                </button>
                            </div>

                            {/* رفع صورة التوصيل */}
                            <div>
                                <label className="block mb-2 font-semibold">رفع صورة التوصيل:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="border rounded px-3 py-1"
                                />
                                {selectedOrder.deliveryImage && (
                                    <img
                                        src={selectedOrder.deliveryImage}
                                        alt="صورة التوصيل"
                                        className="mt-4 rounded shadow max-w-full h-auto"
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

