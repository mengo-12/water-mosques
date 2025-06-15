import { prisma } from '@/lib/prisma' // استيراد اتصال Prisma

export async function GET(request) {
    try {
        // استخرج userId من التوكن أو من الكوكيز في التطبيق الحقيقي
        // هنا للتجربة فقط، نفرض أن userId=1
        const userId = 1

        const orders = await prisma.order.findMany({
            where: { userId },
            orderBy: { orderDate: 'desc' },
        })

        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response('Failed to fetch orders', { status: 500 })
    }
}