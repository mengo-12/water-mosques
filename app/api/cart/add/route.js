import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        const body = await request.json()
        const { productId, quantity } = body

        // الحصول على userId من الكوكيز
        const cookieStore = cookies()
        const userId = parseInt(cookieStore.get('userId')?.value)

        if (!userId || !productId || !quantity) {
            return NextResponse.json({ error: 'البيانات غير مكتملة' }, { status: 400 })
        }

        // البحث عن سلة المستخدم أو إنشاء واحدة جديدة
        let cart = await prisma.cart.findFirst({
            where: { userId },
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
            })
        }

        // التحقق من وجود المنتج في السلة
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
            },
        })

        if (existingItem) {
            // تحديث الكمية
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            })
        } else {
            // إضافة عنصر جديد
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    userId,
                    productId,
                    quantity,
                },
            })
        }

        return NextResponse.json({ message: 'تمت الإضافة إلى السلة' })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'فشل في إضافة المنتج إلى السلة' }, { status: 500 })
    }
}