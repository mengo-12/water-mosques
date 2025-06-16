// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { cookies } from 'next/headers'

// export async function POST(request) {
//     try {
//         // جلب userId من الكوكيز
//         const cookieStore = cookies()
//         const userId = parseInt(cookieStore.get('userId')?.value)

//         if (!userId) {
//             return NextResponse.json({ error: 'لم يتم العثور على رقم المستخدم في الكوكيز' }, { status: 400 })
//         }

//         const body = await request.json()
//         const { mosqueName, locationLat, locationLng, totalPrice, items } = body

//         if (!mosqueName || !locationLat || !locationLng || !totalPrice || !items || !Array.isArray(items)) {
//             return NextResponse.json({ error: 'بيانات الطلب غير مكتملة' }, { status: 400 })
//         }

//         // إنشاء الطلب في قاعدة البيانات
//         const order = await prisma.order.create({
//             data: {
//                 userId,
//                 mosqueName,
//                 locationLat,
//                 locationLng,
//                 totalPrice,
//                 items: {
//                     create: items.map(item => ({
//                         productId: item.productId,
//                         quantity: item.quantity,
//                     })),
//                 },
//             },
//             include: {
//                 items: true,
//             },
//         })

//         return NextResponse.json({ message: 'تم إنشاء الطلب بنجاح', order })
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ error: 'حدث خطأ أثناء إنشاء الطلب' }, { status: 500 })
//     }
// }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

// ✅ دالة GET لجلب الطلبات إلى صفحة المندوب
export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: {
                    not: 'تم التوصيل', // فقط الطلبات غير المكتملة
                },
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(orders)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'فشل في جلب الطلبات' }, { status: 500 })
    }
}

// ✅ دالة POST لإنشاء طلب جديد
export async function POST(request) {
    try {
        const cookieStore = cookies()
        const userId = parseInt(cookieStore.get('userId')?.value)

        if (!userId) {
            return NextResponse.json({ error: 'لم يتم العثور على رقم المستخدم في الكوكيز' }, { status: 400 })
        }

        const body = await request.json()
        const { mosqueName, locationLat, locationLng, totalPrice, items } = body

        if (!mosqueName || !locationLat || !locationLng || !totalPrice || !items || !Array.isArray(items)) {
            return NextResponse.json({ error: 'بيانات الطلب غير مكتملة' }, { status: 400 })
        }

        const order = await prisma.order.create({
            data: {
                userId,
                mosqueName,
                locationLat,
                locationLng,
                totalPrice,
                status: 'جديد',
                orderItems: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json({ message: 'تم إنشاء الطلب بنجاح', order })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'حدث خطأ أثناء إنشاء الطلب' }, { status: 500 })
    }
}
