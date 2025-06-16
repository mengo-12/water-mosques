import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET() {
    try {
        // الحصول على userId من الكوكيز
        const cookieStore = await cookies()  // هنا أضفنا await
        const userId = parseInt(cookieStore.get('userId')?.value)

        if (!userId) {
            return NextResponse.json({ error: 'لم يتم العثور على رقم المستخدم في الكوكيز' }, { status: 400 })
        }

        // جلب السلة مع المنتجات
        const cart = await prisma.cart.findFirst({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        if (!cart) {
            return NextResponse.json({ items: [] }) // سلة فارغة
        }

        return NextResponse.json(cart)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'حدث خطأ أثناء جلب السلة' }, { status: 500 })
    }
}
