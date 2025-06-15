'use client'
import React from 'react'


import { useState } from 'react'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const [products] = useState([
    {
      id: 1,
      name: 'كرتون مياه صغير',
      description: '12 عبوة × 330 مل',
      price: 15,
      image: 'https://via.placeholder.com/300x200?text=مياه+صغيرة',
    },
    {
      id: 2,
      name: 'كرتون مياه متوسط',
      description: '12 عبوة × 600 مل',
      price: 20,
      image: 'https://via.placeholder.com/300x200?text=مياه+متوسطة',
    },
    {
      id: 3,
      name: 'كرتون مياه كبير',
      description: '6 عبوات × 1.5 لتر',
      price: 25,
      image: 'https://via.placeholder.com/300x200?text=مياه+كبيرة',
    },
  ])

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">المنتجات المتوفرة</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
