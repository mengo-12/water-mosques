// app/api/orders/get/route.js
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        username: true,
                        phone: true,
                    },
                },
            },
        })

        // تجهيز الطلبات مع lat/lng
        const formattedOrders = orders.map(order => ({
            ...order,
            lat: order.locationLat,
            lng: order.locationLng,
        }))

        return NextResponse.json(formattedOrders)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'حدث خطأ في جلب الطلبات' }, { status: 500 })
    }
}
