'use client'
import React from 'react'


import { useState } from 'react'

export default function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(1)

    const addToCart = () => {
        alert(`تمت إضافة ${quantity} من ${product.name} إلى السلة`)
        // لاحقاً: نربط مع localStorage أو Context
    }

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center space-y-4">
            <img src={product.image} alt={product.name} className="rounded-lg w-full h-40 object-cover" />
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-lg font-semibold text-primary">{product.price} ريال</p>

            <div className="flex items-center gap-2">
                <label>الكمية:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value))}
                    className="w-16 text-center border rounded px-2 py-1"
                />
            </div>

            <button
                onClick={addToCart}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            >
                أضف إلى السلة
            </button>
        </div>
    )
}
