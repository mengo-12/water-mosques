import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json(products)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'فشل في جلب المنتجات' }, { status: 500 })
    }
}