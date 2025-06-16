// app/api/admin/create-user/route.js
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req) {
    try {
        const { username, email, password, role } = await req.json()

        // تحقق من وجود المستخدم صاحب الطلب وهل هو مدير
        // (مثلاً: تحقق من توكن الجلسة أو من هيدر الطلب)
        // هذه نقطة يجب أن تضيفها حسب نظام المصادقة الذي تستخدمه
        // هنا مثال: استخرج user من الهيدر - هذا فقط مثال بدائي

        // if (!isAdmin(user)) {
        //   return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
        // }

        // تحقق من صحة الدور
        const validRoles = ['ADMIN', 'DELIVERY', 'CLIENT']
        if (!validRoles.includes(role)) {
            return NextResponse.json({ error: 'الدور غير صالح' }, { status: 400 })
        }

        // تحقق إذا البريد مستخدم
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: 'البريد الإلكتروني مستخدم مسبقًا' }, { status: 409 })
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10)

        // إنشاء المستخدم
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword, role },
        })

        return NextResponse.json({ message: 'تم إنشاء المستخدم بنجاح', user: { id: user.id, username, email, role } })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'فشل في إنشاء المستخدم' }, { status: 500 })
    }
}
