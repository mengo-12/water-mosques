// 'use client'

// import React, { useState, useEffect, useCallback } from 'react'
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

// const containerStyle = {
//     width: '100%',
//     height: '400px',
// }

// const centerDefault = {
//     lat: 24.7136,
//     lng: 46.6753,
// }

// export default function CheckoutPage() {
//     const [products, setProducts] = useState([])
//     const [cartItems, setCartItems] = useState([])
//     const [marker, setMarker] = useState(null)

//     useEffect(() => {
//         // جلب المنتجات من API
//         fetch('/api/products')
//             .then(res => res.json())
//             .then(data => {
//                 setProducts(data)
//                 // تعيين سلة افتراضية من أول 2 منتجات مثلاً مع quantity = 1
//                 setCartItems(data.slice(0, 2).map(p => ({ ...p, quantity: 1 })))
//             })
//             .catch(console.error)
//     }, [])

//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
//     })

//     const onMapClick = useCallback((event) => {
//         setMarker({
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//         })
//     }, [])

//     const getTotal = () => {
//         return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     }

//     const updateQuantity = (productId, quantity) => {
//         setCartItems(prev =>
//             prev.map(item => 
//                 item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
//             )
//         )
//     }

//     const handleSubmit = async () => {
//         if (!marker) {
//             alert('يرجى تحديد موقع المسجد على الخريطة')
//             return
//         }
//         const user = JSON.parse(localStorage.getItem('user'))
//         if (!user) {
//             alert('يرجى تسجيل الدخول أولاً')
//             return
//         }
//         const orderData = {
//             userId: user.id,
//             mosqueName: 'مسجد بدون اسم مؤقتاً',
//             locationLat: marker.lat,
//             locationLng: marker.lng,
//             totalPrice: getTotal(),
//             items: cartItems.map(item => ({
//                 productId: item.id,
//                 quantity: item.quantity,
//             })),
//         }

//         try {
//             const res = await fetch('/api/orders', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(orderData),
//             })
//             const data = await res.json()
//             if (res.ok) {
//                 alert(`تم الطلب!\nموقع المسجد: (${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)})\nالمبلغ: ${getTotal()} ريال`)
//             } else {
//                 alert(data.error || 'حدث خطأ أثناء إرسال الطلب')
//             }
//         } catch (error) {
//             alert('فشل الاتصال بالخادم')
//             console.error(error)
//         }
//     }

//     if (loadError) return <p>خطأ في تحميل الخريطة</p>
//     if (!isLoaded) return <p>جاري تحميل الخريطة...</p>

//     return (
//         <section className="max-w-4xl mx-auto space-y-6 p-4">
//             <h2 className="text-3xl font-bold text-primary text-center mb-4">صفحة الدفع</h2>
//             <div className="bg-white rounded p-4 shadow">
//                 <h3 className="font-semibold mb-2">ملخص الطلب</h3>
//                 <ul className="mb-4">
//                     {cartItems.map(item => (
//                         <li key={item.id} className="flex justify-between items-center py-1 border-b">
//                             <span>{item.name}</span>
//                             <div className="flex items-center space-x-2">
//                                 <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
//                                 <span>{item.quantity}</span>
//                                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
//                             </div>
//                             <span>{(item.price * item.quantity).toFixed(2)} ريال</span>
//                         </li>
//                     ))}
//                 </ul>

//                 <p className="text-lg font-bold text-right mb-4">الإجمالي: {getTotal().toFixed(2)} ريال</p>

//                 <h3 className="font-semibold mb-2">حدد موقع المسجد</h3>
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={marker || centerDefault}
//                     zoom={12}
//                     onClick={onMapClick}
//                     options={{ fullscreenControl: false }}
//                 >
//                     {marker && <Marker position={marker} />}
//                 </GoogleMap>

//                 <button
//                     onClick={handleSubmit}
//                     className="mt-6 w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition"
//                 >
//                     إتمام الدفع
//                 </button>
//             </div>
//         </section>
//     )
// }

// 'use client'

// import React, { useState, useEffect } from 'react'
// import MosqueLocationLeaflet from '@/components/MosqueLocationLeaflet'

// export default function CheckoutPage() {
//     const [products, setProducts] = useState([])
//     const [cartItems, setCartItems] = useState([])
//     const [marker, setMarker] = useState(null)

//     useEffect(() => {
//         fetch('/api/products')
//             .then(res => res.json())
//             .then(data => {
//                 setProducts(data)
//                 // كمثال نضع أول منتجين في السلة
//                 setCartItems(data.slice(0, 2).map(p => ({ ...p, quantity: 1 })))
//             })
//             .catch(console.error)
//     }, [])

//     const getTotal = () => {
//         return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     }

//     const updateQuantity = (productId, quantity) => {
//         setCartItems(prev =>
//             prev.map(item =>
//                 item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
//             )
//         )
//     }

//     const handleSubmit = async () => {
//         if (!marker) {
//             alert('يرجى تحديد موقع المسجد على الخريطة')
//             return
//         }

//         // في حالة عدم وجود نظام تسجيل دخول استبدل userId بقيمة ثابتة
//         const userId = 1

//         const orderData = {
//             userId,
//             mosqueName: 'مسجد بدون اسم مؤقتاً',
//             locationLat: marker.lat,
//             locationLng: marker.lng,
//             totalPrice: getTotal(),
//             items: cartItems.map(item => ({
//                 productId: item.id,
//                 quantity: item.quantity,
//             })),
//         }

//         try {
//             const res = await fetch('/api/orders', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(orderData),
//             })

//             const data = await res.json()
//             if (res.ok) {
//                 alert(
//                     `تم الطلب!\nموقع المسجد: (${marker.lat.toFixed(
//                         4
//                     )}, ${marker.lng.toFixed(4)})\nالمبلغ: ${getTotal()} ريال`
//                 )
//             } else {
//                 alert(data.error || 'حدث خطأ أثناء إرسال الطلب')
//             }
//         } catch (error) {
//             alert('فشل الاتصال بالخادم')
//             console.error(error)
//         }
//     }

//     return (
//         <section className="max-w-4xl mx-auto space-y-6 p-4">
//             <h2 className="text-3xl font-bold text-primary text-center mb-4">صفحة الدفع</h2>

//             <div className="bg-white rounded p-4 shadow">
//                 <h3 className="font-semibold mb-2">ملخص الطلب</h3>
//                 <ul className="mb-4">
//                     {cartItems.map(item => (
//                         <li
//                             key={item.id}
//                             className="flex justify-between items-center py-1 border-b"
//                         >
//                             <span>{item.name}</span>
//                             <div className="flex items-center space-x-2">
//                                 <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
//                                     -
//                                 </button>
//                                 <span>{item.quantity}</span>
//                                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
//                                     +
//                                 </button>
//                             </div>
//                             <span>{(item.price * item.quantity).toFixed(2)} ريال</span>
//                         </li>
//                     ))}
//                 </ul>

//                 <p className="text-lg font-bold text-right mb-4">
//                     الإجمالي: {getTotal().toFixed(2)} ريال
//                 </p>

//                 <h3 className="font-semibold mb-2">حدد موقع المسجد</h3>
//                 <MosqueLocationLeaflet onSelect={pos => setMarker({ lat: pos.lat, lng: pos.lng })} />

//                 <button
//                     onClick={handleSubmit}
//                     className="mt-6 w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition"
//                 >
//                     إتمام الدفع
//                 </button>
//             </div>
//         </section>
//     )
// }


'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Cookies from 'js-cookie'

// استيراد مكون الخريطة بشكل ديناميكي لتعطيل SSR
const MosqueLocationLeaflet = dynamic(() => import('@/components/MosqueLocationLeaflet'), {
    ssr: false,
})

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState([])
    const [marker, setMarker] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const storedUserId = Cookies.get('userId')
        if (!storedUserId) return

        setUserId(storedUserId)

        fetch(`/api/cart?userId=${storedUserId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCartItems(data)
                } else if (data && Array.isArray(data.items)) {
                    setCartItems(data.items)
                } else {
                    setCartItems([])
                }
            })
            .catch(err => {
                console.error(err)
                setCartItems([])
            })
    }, [])

    const getTotal = () => {
        if (!Array.isArray(cartItems)) return 0
        return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    }

    const updateQuantity = (productId, quantity) => {
        if (!Array.isArray(cartItems)) return
        setCartItems(prev =>
            prev.map(item =>
                item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        )
    }

    const handleSubmit = async () => {
        if (!marker) {
            alert('يرجى تحديد موقع المسجد على الخريطة')
            return
        }

        if (!userId) {
            alert('المستخدم غير معروف، يرجى تسجيل الدخول أولاً')
            return
        }

        const orderData = {
            userId: parseInt(userId),
            mosqueName: 'مسجد بدون اسم مؤقتاً',
            locationLat: marker.lat,
            locationLng: marker.lng,
            totalPrice: getTotal(),
            items: cartItems.map(item => ({
                productId: item.product.id,
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
                alert(
                    `تم الطلب!\nموقع المسجد: (${marker.lat.toFixed(
                        4
                    )}, ${marker.lng.toFixed(4)})\nالمبلغ: ${getTotal().toFixed(2)} ريال`
                )
                // يمكنك هنا إعادة توجيه المستخدم مثلاً إلى صفحة تأكيد
            } else {
                alert(data.error || 'حدث خطأ أثناء إرسال الطلب')
            }
        } catch (error) {
            alert('فشل الاتصال بالخادم')
            console.error(error)
        }
    }

    return (
        <section className="max-w-4xl mx-auto space-y-6 p-4">
            <h2 className="text-3xl font-bold text-primary text-center mb-4">صفحة الدفع</h2>

            <div className="bg-white rounded p-4 shadow">
                <h3 className="font-semibold mb-2">ملخص الطلب</h3>

                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    <ul className="mb-4">
                        {cartItems.map(item => (
                            <li
                                key={item.product.id}
                                className="flex justify-between items-center py-1 border-b"
                            >
                                <span>{item.product.name}</span>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.product.id, item.quantity - 1)
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.product.id, item.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <span>{(item.product.price * item.quantity).toFixed(2)} ريال</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mb-4 text-center text-gray-500">السلة فارغة</p>
                )}

                <p className="text-lg font-bold text-right mb-4">
                    الإجمالي: {getTotal().toFixed(2)} ريال
                </p>

                <h3 className="font-semibold mb-2">حدد موقع المسجد</h3>
                <MosqueLocationLeaflet
                    onSelect={pos => setMarker({ lat: pos.lat, lng: pos.lng })}
                />

                <button
                    onClick={handleSubmit}
                    className="mt-6 w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition"
                    disabled={!cartItems.length}
                >
                    إتمام الدفع
                </button>
            </div>
        </section>
    )
}


