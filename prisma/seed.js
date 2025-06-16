// prisma/seed.js
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const adminEmail = 'admin@example.com'
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('Admin@123', 10)
        await prisma.user.create({
            data: {
                username: 'admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
            },
        })
        console.log('تم إنشاء حساب المدير بنجاح')
    } else {
        console.log('حساب المدير موجود مسبقاً')
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
