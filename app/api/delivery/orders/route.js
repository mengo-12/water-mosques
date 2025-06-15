import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const orders = await prisma.order.findMany({
        where: {
            status: {
                not: 'تم التوصيل',
            },
        },
        include: {
            items: true,
        },
    })

    return NextResponse.json(orders)
}