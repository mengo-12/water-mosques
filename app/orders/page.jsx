'use client'
import React, { useState } from 'react'

export default function OrderPage() {
    const [mosqueName, setMosqueName] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [items, setItems] = useState([{ productId: '', quantity: 1 }])

    // هنا مفترض يكون userId مأخوذ من تسجيل الدخول أو Context
    const userId = 1

    const handleAddItem = () => {
        setItems([...items, { productId: '', quantity: 1 }])
    }

    const handleItemChange = (index, field, value) => {
        const newItems = [...items]
        newItems[index][field] = value
        setItems(newItems)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // حساب السعر الاجمالي بشكل مبدئي أو يمكن تجهيزه من API
        // هنا نعطي مثال سعر ثابت (في العادة يجب حسابه من المنتجات)
        const totalPrice = items.reduce((sum, item) => sum + 10 * item.quantity, 0)

        const orderData = {
            userId,
            mosqueName,
            locationLat: parseFloat(lat),
            locationLng: parseFloat(lng),
            totalPrice,
            items: items.map(item => ({
                productId: parseInt(item.productId),
                quantity: parseInt(item.quantity),
            })),
        }

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            })

            const data = await res.json()
            if (res.ok) {
                alert('تم إنشاء الطلب بنجاح')
                // تفريغ الحقول أو إعادة التوجيه
            } else {
                alert(data.error || 'حدث خطأ')
            }
        } catch (err) {
            alert('خطأ في الاتصال بالخادم')
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
            <h2 className="text-xl font-bold mb-4">إنشاء طلب جديد</h2>

            <label className="block">
                اسم المسجد
                <input
                    type="text"
                    value={mosqueName}
                    onChange={e => setMosqueName(e.target.value)}
                    required
                    className="border p-2 rounded w-full"
                />
            </label>

            <label className="block">
                خط العرض (Latitude)
                <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    required
                    className="border p-2 rounded w-full"
                />
            </label>

            <label className="block">
                خط الطول (Longitude)
                <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    required
                    className="border p-2 rounded w-full"
                />
            </label>

            <div>
                <h3 className="font-semibold mb-2">المنتجات</h3>
                {items.map((item, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                        <input
                            type="number"
                            placeholder="معرف المنتج"
                            value={item.productId}
                            onChange={e => handleItemChange(idx, 'productId', e.target.value)}
                            required
                            className="border p-2 rounded w-1/2"
                        />
                        <input
                            type="number"
                            min="1"
                            placeholder="الكمية"
                            value={item.quantity}
                            onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                            required
                            className="border p-2 rounded w-1/2"
                        />
                    </div>
                ))}

                <button type="button" onClick={handleAddItem} className="text-blue-600 hover:underline">
                    إضافة منتج
                </button>
            </div>

            <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition">
                إرسال الطلب
            </button>
        </form>
    )
}