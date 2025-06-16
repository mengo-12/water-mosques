// import prisma from '@/lib/prisma'
// import { NextResponse } from 'next/server'

// export async function GET() {
//     try {
//         const orders = await prisma.order.findMany({
//             include: {
//                 orderItems: true,  // إذا هذا هو اسم العلاقة
//                 user: true,        // إذا تريد تجلب بيانات المستخدم
//             }
//         });
//         return NextResponse.json(orders)
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ error: 'فشل في جلب الطلبات' }, { status: 500 })
//     }
// }

// export async function POST(request) {
//     try {
//         const body = await request.json()
//         // بيانات الطلب هنا مثل: userId, mosqueName, locationLat, locationLng, totalPrice, items

//         const order = await prisma.order.create({
//             data: {
//                 userId: body.userId,
//                 mosqueName: body.mosqueName,
//                 locationLat: body.locationLat,
//                 locationLng: body.locationLng,
//                 totalPrice: body.totalPrice,
//                 status: 'جديد',
//                 items: {
//                     create: body.items.map(item => ({
//                         productId: item.productId,
//                         quantity: item.quantity,
//                     }))
//                 }
//             },
//             include: {
//                 items: true,
//             }
//         })
//         return NextResponse.json(order, { status: 201 })
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ error: 'فشل في إنشاء الطلب' }, { status: 500 })
//     }
// }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
    try {
        const body = await request.json()

        const deliveryUrl = `https://www.google.com/maps?q=${body.locationLat},${body.locationLng}`

        const order = await prisma.order.create({
            data: {
                userId: body.userId,
                mosqueName: body.mosqueName,
                locationLat: body.locationLat,
                locationLng: body.locationLng,
                deliveryLocationUrl: deliveryUrl, // ✅ مهم جداً
                totalPrice: body.totalPrice,
                status: 'جديد',
                orderItems: {
                    create: body.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    }))
                }
            },
            include: {
                orderItems: {
                    include: {
                        product: true, // ✅ ليظهر اسم المنتج عند المندوب
                    }
                },
            }
        })

        return NextResponse.json(order, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'فشل في إنشاء الطلب' }, { status: 500 })
    }
}


