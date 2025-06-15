const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // إنشاء منتجات مبدئية
    await prisma.product.createMany({
        data: [
            { name: 'كرتون مياه صغير', price: 15 },
            { name: 'كرتون مياه متوسط', price: 20 },
            { name: 'كرتون مياه كبير', price: 25 },
        ],
    })

    // إنشاء مستخدمين
    await prisma.user.createMany({
        data: [
            {
                email: 'admin@example.com',
                password: 'admin123', // لاحقاً نربطها بالتشفير
                role: 'ADMIN',
            },
            {
                email: 'delivery@example.com',
                password: 'delivery123',
                role: 'DELIVERY',
            },
            {
                email: 'client@example.com',
                password: 'client123',
                role: 'CLIENT',
            },
        ],
    })

    console.log('✅ تمت تهيئة البيانات بنجاح')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })