import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const orders = await prisma.order.findMany()
    return NextResponse.json(orders)
}