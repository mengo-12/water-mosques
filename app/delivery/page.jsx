'use client'
import React, { useEffect, useState } from 'react'

export default function DeliveryPage() {
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        fetch('/api/delivery/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])

    const [deliveryFile, setDeliveryFile] = useState(null)

    const handleFileChange = (e) => {
        setDeliveryFile(e.target.files[0])
    }

    const markAsDelivered = async () => {
        if (!deliveryFile) {
            alert('يرجى اختيار صورة التوصيل أولاً')
            return
        }

        const formData = new FormData()
        formData.append('image', deliveryFile)
        formData.append('id', selectedOrder.id)
        formData.append('status', 'تم التوصيل')

        const res = await fetch('/api/delivery/upload', {
            method: 'POST',
            body: formData,
        })

        const updated = await res.json()
        setOrders(orders.map(order => order.id === updated.id ? updated : order))
        setSelectedOrder(updated)
    }

    return (
        <section className="max-w-5xl mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">لوحة المندوب</h1>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 bg-white rounded shadow p-4 overflow-y-auto max-h-[600px]">
                    <h2 className="text-xl font-semibold mb-4">طلبات قيد التوصيل</h2>
                    <ul>
                        {orders.map(order => (
                            <li
                                key={order.id}
                                className={`cursor-pointer p-2 rounded mb-2 ${selectedOrder?.id === order.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="flex justify-between">
                                    <span>#{order.id}</span>
                                    <span>{order.status}</span>
                                </div>
                                <div>{order.mosqueName}</div>
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
                            <p><strong>الحالة:</strong> {selectedOrder.status}</p>
                            <p><strong>الموقع:</strong> {selectedOrder.location.lat.toFixed(4)}, {selectedOrder.location.lng.toFixed(4)}</p>

                            <h3 className="font-semibold mt-4 mb-2">المنتجات:</h3>
                            <ul className="mb-4">
                                {selectedOrder.items.map(item => (
                                    <li key={item.id} className="flex justify-between py-1 border-b">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>{item.price * item.quantity} ريال</span>
                                    </li>
                                ))}
                            </ul>

                            {selectedOrder.status !== 'تم التوصيل' && (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="mb-4 block"
                                    />

                                    <button
                                        onClick={markAsDelivered}
                                        className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700 transition"
                                    >
                                        تم التوصيل ورفع الصورة
                                    </button>
                                </>
                            )}

                            {selectedOrder.deliveryImage && (
                                <div className="mt-4">
                                    <p className="font-semibold mb-2">صورة التوصيل:</p>
                                    <img src={selectedOrder.deliveryImage} alt="صورة التوصيل" className="rounded shadow max-w-full" />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}