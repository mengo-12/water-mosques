'use client'
import React from 'react'

export default function Cart() {
    const [items, setItems] = React.useState([
        {
            id: 1,
            name: 'كرتون مياه صغير',
            price: 15,
            quantity: 2,
            image: 'https://via.placeholder.com/80',
        },
        {
            id: 2,
            name: 'كرتون مياه كبير',
            price: 25,
            quantity: 1,
            image: 'https://via.placeholder.com/80',
        },
    ])

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <section className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-20">
            <h1 className="text-3xl font-bold mb-6 text-primary">السلة</h1>
            {items.length === 0 ? (
                <p>السلة فارغة.</p>
            ) : (
                <>
                    <ul>
                        {items.map(item => (
                            <li key={item.id} className="flex items-center mb-4 border-b pb-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover" />
                                <div className="mr-4 flex-grow">
                                    <h2 className="font-semibold text-lg">{item.name}</h2>
                                    <p>السعر: {item.price} ريال</p>
                                    <p>الكمية: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-lg">{item.price * item.quantity} ريال</p>
                            </li>
                        ))}
                    </ul>
                    <div className="text-right mt-6">
                        <p className="text-xl font-semibold">الإجمالي: {total} ريال</p>
                        <button
                            className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
                            onClick={() => alert('الانتقال لصفحة الدفع')}
                        >
                            إتمام الطلب
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}
