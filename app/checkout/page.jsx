'use client'
import React from 'react'


import { useState, useCallback } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '400px',
}

const centerDefault = {
    lat: 24.7136, // الرياض تقريبا
    lng: 46.6753,
}

export default function CheckoutPage() {
    // بيانات مؤقتة للسلة (يفترض أن تأتي من Context أو LocalStorage)
    const cartItems = [
        { id: 1, name: 'كرتون مياه صغير', quantity: 2, price: 15 },
        { id: 2, name: 'كرتون مياه كبير', quantity: 1, price: 25 },
    ]

    const [marker, setMarker] = useState(null)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // استبدلها بمفتاحك
    })

    const onMapClick = useCallback((event) => {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    }, [])

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    const handleSubmit = async () => {
        if (!marker) {
            alert('يرجى تحديد موقع المسجد على الخريطة')
            return
        }

        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            alert('يرجى تسجيل الدخول أولاً')
            return
        }

        const orderData = {
            userId: user.id,
            mosqueName: 'مسجد بدون اسم مؤقتاً', // يمكنك لاحقًا جعله حقل إدخال
            locationLat: marker.lat,
            locationLng: marker.lng,
            totalPrice: getTotal(),
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        }

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })

            const data = await res.json()

            if (res.ok) {
                alert('تم إرسال الطلب بنجاح!')
                // يمكنك إعادة توجيه المستخدم أو تفريغ السلة
            } else {
                alert(data.error || 'حدث خطأ أثناء إرسال الطلب')
            }
        } catch (error) {
            alert('فشل الاتصال بالخادم')
            console.error(error)
        }
    }

    // هنا يمكنك ارسال بيانات الطلب إلى السيرفر أو بوابة الدفع
    alert(`تم الطلب!\nموقع المسجد: (${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)})\nالمبلغ: ${getTotal()} ريال`)
}

if (loadError) return <p>خطأ في تحميل الخريطة</p>
if (!isLoaded) return <p>جاري تحميل الخريطة...</p>

return (
    <section className="max-w-4xl mx-auto space-y-6 p-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">صفحة الدفع</h2>

        <div className="bg-white rounded p-4 shadow">
            <h3 className="font-semibold mb-2">ملخص الطلب</h3>
            <ul className="mb-4">
                {cartItems.map(item => (
                    <li key={item.id} className="flex justify-between py-1 border-b">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{item.price * item.quantity} ريال</span>
                    </li>
                ))}
            </ul>

            <p className="text-lg font-bold text-right mb-4">الإجمالي: {getTotal()} ريال</p>

            <h3 className="font-semibold mb-2">حدد موقع المسجد</h3>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={marker || centerDefault}
                zoom={12}
                onClick={onMapClick}
                options={{
                    fullscreenControl: false,
                }}
            >
                {marker && <Marker position={marker} />}
            </GoogleMap>

            <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition"
            >
                إتمام الدفع
            </button>
        </div>
    </section>
)


