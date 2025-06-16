import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
                user: true,
            },
        })

        const ordersWithMapUrl = orders.map(order => ({
            ...order,
            deliveryLocationUrl: `https://maps.google.com/?q=${order.locationLat},${order.locationLng}`,
        }))

        return NextResponse.json(ordersWithMapUrl)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}