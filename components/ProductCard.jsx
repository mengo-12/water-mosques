// 'use client'
// import React from 'react'


// import { useState } from 'react'

// export default function ProductCard({ product }) {
//     const [quantity, setQuantity] = useState(1)

//     const addToCart = () => {
//         alert(`تمت إضافة ${quantity} من ${product.name} إلى السلة`)
//         // لاحقاً: نربط مع localStorage أو Context
//     }

//     return (
//         <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center space-y-4">
//             <img src={product.image} alt={product.name} className="rounded-lg w-full h-40 object-cover" />
//             <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
//             <p className="text-gray-500">{product.description}</p>
//             <p className="text-lg font-semibold text-primary">{product.price} ريال</p>

//             <div className="flex items-center gap-2">
//                 <label>الكمية:</label>
//                 <input
//                     type="number"
//                     min="1"
//                     value={quantity}
//                     onChange={e => setQuantity(parseInt(e.target.value))}
//                     className="w-16 text-center border rounded px-2 py-1"
//                 />
//             </div>

//             <button
//                 onClick={addToCart}
//                 className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
//             >
//                 أضف إلى السلة
//             </button>
//         </div>
//     )
// }

'use client'
import React from 'react'

export default function ProductCard({ product, userId }) {
    const { id, name, description, price, image } = product

    const handleAddToCart = async () => {
        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,         // تأكد أنه يتم تمريره من الأعلى
                    productId: id,
                    quantity: 1,
                }),
            })

            if (res.ok) {
                alert(`تم إضافة ${name} إلى السلة!`)
            } else {
                const data = await res.json()
                alert(data.error || 'حدث خطأ أثناء إضافة المنتج')
            }
        } catch (err) {
            console.error(err)
            alert('فشل الاتصال بالخادم')
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
            <img
                src={image}
                alt={name}
                className="w-full h-48 object-contain p-4"
                loading="lazy"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-gray-700 dark:text-gray-300 flex-grow">{description}</p>
                <p className="mt-4 font-bold text-lg text-blue-700 dark:text-blue-400">
                    {price} ريال
                </p>
                <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                    aria-label={`أضف ${name} إلى السلة`}
                >
                    أضف إلى السلة
                </button>
            </div>
        </div>
    )
}