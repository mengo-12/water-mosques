import React from 'react'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req) {
    try {
        const { mosqueName, email, password } = await req.json()

        // تحقق من البيانات
        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'البيانات غير مكتملة' }), { status: 400 })
        }

        // تحقق من وجود المستخدم مسبقًا
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'البريد الإلكتروني مستخدم مسبقاً' }), { status: 400 })
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10)

        // إنشاء المستخدم
        const user = await prisma.user.create({
            data: {
                mosqueName,
                email,
                password: hashedPassword,
                role: 'CLIENT',
            },
        })

        return new Response(JSON.stringify({ message: 'تم التسجيل بنجاح', userId: user.id }), { status: 201 })

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'حدث خطأ أثناء التسجيل' }), { status: 500 })
    }
}
