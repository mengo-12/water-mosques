import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const body = await req.json()
    const { id, status, deliveryImage } = body

    const updated = await prisma.order.update({
        where: { id },
        data: {
            status,
            deliveryImage,
        },
    })

    return NextResponse.json(updated)
}