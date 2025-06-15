import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(req, { params }) {
    const { id } = params
    const { imageUrl } = await req.json()

    try {
        const updated = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { deliveryImage: imageUrl },
        })

        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: 'فشل رفع الصورة' }, { status: 500 })
    }
}