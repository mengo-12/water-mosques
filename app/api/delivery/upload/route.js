import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req) {
    const formData = await req.formData()
    const file = formData.get('image')
    const orderId = formData.get('orderId')

    if (!file || !orderId) {
        return NextResponse.json({ error: 'البيانات غير مكتملة' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `${uuidv4()}-${file.name}`
    const filePath = path.join(process.cwd(), 'public/uploads', fileName)

    await writeFile(filePath, buffer)

    const imageUrl = `/uploads/${fileName}`

    await prisma.order.update({
        where: { id: Number(orderId) },
        data: {
            status: 'تم التوصيل',
            deliveryImage: imageUrl,
        },
    })

    return NextResponse.json({ success: true, imageUrl })
}