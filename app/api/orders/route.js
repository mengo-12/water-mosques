import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
    const body = await req.json()
    const {
        userId,
        mosqueName,
        locationLat,
        locationLng,
        items,
        totalPrice,
    } = body

    try {
        const newOrder = await prisma.order.create({
            data: {
                userId,
                mosqueName,
                locationLat,
                locationLng,
                totalPrice,
                orderItems: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: { orderItems: true },
        })

        return NextResponse.json(newOrder)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'فشل في إنشاء الطلب' }, { status: 500 })
    }
}