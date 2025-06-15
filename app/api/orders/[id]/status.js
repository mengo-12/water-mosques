import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(req, { params }) {
    const { id } = params
    const { status } = await req.json()

    try {
        const updated = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status },
        })

        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: 'خطأ في تحديث الحالة' }, { status: 500 })
    }
}