// app/api/auth/signup/route.js
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const { username, email, phone, password } = await request.json()

        // تحقق من وجود الحقول المطلوبة
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: 'يرجى ملء جميع الحقول المطلوبة' },
                { status: 400 }
            )
        }

        // تحقق هل المستخدم موجود مسبقًا (البريد أو اسم المستخدم)
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'البريد الإلكتروني أو اسم المستخدم مسجل مسبقاً' },
                { status: 409 }
            )
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10)

        // إنشاء المستخدم مع دور "user" بشكل افتراضي
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                phone: phone || null,
                password: hashedPassword,
                role: 'user', // افترض أن لديك حقل role في جدول المستخدمين
            },
        })

        return NextResponse.json(
            { message: 'تم إنشاء الحساب بنجاح', userId: newUser.id },
            { status: 201 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'حدث خطأ أثناء إنشاء الحساب' },
            { status: 500 }
        )
    }
}
