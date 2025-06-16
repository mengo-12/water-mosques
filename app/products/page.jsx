// 'use client'
// import React, { useState, useEffect } from 'react'
// import ProductCard from '@/components/ProductCard'

// export default function ProductsPage() {
//     const [products] = useState([
//         {
//             id: 1,
//             name: 'كرتون مياه صغير',
//             description: '12 عبوة × 330 مل',
//             price: 15,
//             image: '/water-bottle.png',
//         },
//         {
//             id: 2,
//             name: 'كرتون مياه متوسط',
//             description: '12 عبوة × 600 مل',
//             price: 20,
//             image: '/water-bottle-mid.png',
//         },
//         {
//             id: 3,
//             name: 'كرتون مياه كبير',
//             description: '6 عبوات × 1.5 لتر',
//             price: 25,
//             image: '/water-bottle-big.png',
//         },
//     ])

//     // دعم الوضع الليلي (Dark Mode)
//     const [darkMode, setDarkMode] = useState(false)
//     useEffect(() => {
//         const savedMode = localStorage.getItem('darkMode')
//         if (savedMode === 'true') {
//             setDarkMode(true)
//             document.documentElement.classList.add('dark')
//         }
//     }, [])

//     return (
//         <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-12 px-6">
//             <h2 className="text-3xl font-bold text-center mb-10 text-primary">المنتجات المتوفرة</h2>

//             <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//                 {products.map(product => (
//                     <ProductCard key={product.id} product={product} />
//                 ))}
//             </div>
//         </section>
//     )
// }

'use client'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUserId(parsedUser.id)
        }
    }, [])

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} userId={userId} />
            ))}
        </div>
    )
}