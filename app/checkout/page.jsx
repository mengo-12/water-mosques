'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '400px',
}

const centerDefault = {
    lat: 24.7136,
    lng: 46.6753,
}

export default function CheckoutPage() {
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [marker, setMarker] = useState(null)

    useEffect(() => {
        // جلب المنتجات من API
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                // تعيين سلة افتراضية من أول 2 منتجات مثلاً مع quantity = 1
                setCartItems(data.slice(0, 2).map(p => ({ ...p, quantity: 1 })))
            })
            .catch(console.error)
    }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
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

    const updateQuantity = (productId, quantity) => {
        setCartItems(prev =>
            prev.map(item => 
                item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        )
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
            mosqueName: 'مسجد بدون اسم مؤقتاً',
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            })
            const data = await res.json()
            if (res.ok) {
                alert(`تم الطلب!\nموقع المسجد: (${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)})\nالمبلغ: ${getTotal()} ريال`)
            } else {
                alert(data.error || 'حدث خطأ أثناء إرسال الطلب')
            }
        } catch (error) {
            alert('فشل الاتصال بالخادم')
            console.error(error)
        }
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
                        <li key={item.id} className="flex justify-between items-center py-1 border-b">
                            <span>{item.name}</span>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <span>{(item.price * item.quantity).toFixed(2)} ريال</span>
                        </li>
                    ))}
                </ul>

                <p className="text-lg font-bold text-right mb-4">الإجمالي: {getTotal().toFixed(2)} ريال</p>

                <h3 className="font-semibold mb-2">حدد موقع المسجد</h3>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={marker || centerDefault}
                    zoom={12}
                    onClick={onMapClick}
                    options={{ fullscreenControl: false }}
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
}