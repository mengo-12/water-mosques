import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const mosques = await prisma.mosque.findMany({
            select: {
                id: true,
                name: true,
                latitude: true,
                longitude: true,
            },
        })

        return NextResponse.json(mosques)
    } catch (error) {
        console.error('حدث خطأ عند جلب المساجد:', error)
        return NextResponse.json({ error: 'فشل في جلب بيانات المساجد' }, { status: 500 })
    }
}