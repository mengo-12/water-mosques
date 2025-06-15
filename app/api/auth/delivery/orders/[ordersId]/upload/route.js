import { prisma } from '@/lib/prisma'

export async function POST(request, { params }) {
    const { orderId } = params

    try {
        const formData = await request.formData()
        const file = formData.get('image')
        if (!file) return new Response('الصورة مفقودة', { status: 400 })

        // في تطبيق حقيقي: ارفع الصورة لمخزن خارجي (Cloudinary, S3, ...).
        // هنا نستخدم url وهمي (رابط ثابت فقط للتمثيل)

        const imageUrl = `https://via.placeholder.com/300x200?text=توصيل+${orderId}`

        // تحديث الطلب
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: {
                deliveryImage: imageUrl,
                status: 'تم التوصيل',
            },
        })

        return new Response(JSON.stringify(updatedOrder), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response('خطأ في رفع الصورة', { status: 500 })
    }
}