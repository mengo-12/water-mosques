import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
    const body = await request.json()
    const { email, password } = body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        return NextResponse.json({ error: 'البريد الإلكتروني غير مسجل' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 })
    }

    // مبدئيًا: نرجع بيانات المستخدم (لاحقًا نضيف JWT)
    return NextResponse.json({
        message: 'تم تسجيل الدخول',
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    })
}

