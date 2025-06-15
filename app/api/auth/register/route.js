import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
    const body = await request.json()
    const { email, password, role } = body

    if (!email || !password) {
        return NextResponse.json({ error: 'يجب إدخال البريد وكلمة المرور' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        return NextResponse.json({ error: 'البريد مستخدم مسبقاً' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: role || 'CLIENT',
        },
    })

    return NextResponse.json({ message: 'تم التسجيل بنجاح', user: { email: user.email, role: user.role } })
}