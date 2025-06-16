import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const userId = parseInt(searchParams.get('userId'))

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    try {
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: true,
            },
        })

        return NextResponse.json(cartItems)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}