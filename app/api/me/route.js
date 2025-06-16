import { NextResponse } from 'next/server'
import { getUserFromReq as auth } from '@/lib/auth' // أو أينما تخزن الجلسة
import { prisma } from '@/lib/prisma'

export async function GET() {
    const session = await auth() // هذا مثال - غيّره حسب جلساتك

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'غير مسجّل الدخول' }, { status: 401 })
    }

    // جلب المستخدم من قاعدة البيانات
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, name: true, email: true },
    })

    if (!user) {
        return NextResponse.json({ error: 'المستخدم غير موجود' }, { status: 404 })
    }

    return NextResponse.json(user)
}