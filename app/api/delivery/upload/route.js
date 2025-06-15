import { writeFile } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const formData = await req.formData()
    const file = formData.get('image')
    const id = formData.get('id')

    if (!file || !id) {
        return NextResponse.json({ error: 'Missing image or order ID' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}-${file.name}`
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName)

    await writeFile(uploadPath, buffer)

    const imageUrl = `/uploads/${fileName}`

    const updatedOrder = await prisma.order.update({
        where: { id: parseInt(id) },
        data: {
            status: 'تم التوصيل',
            deliveryImage: imageUrl,
        },
    })

    return NextResponse.json(updatedOrder)
}