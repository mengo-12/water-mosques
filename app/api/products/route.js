export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const products = await prisma.product.findMany()
            res.status(200).json(products)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'فشل في جلب المنتجات' })
        }
    } else {
        res.status(405).json({ error: 'طريقة غير مدعومة' })
    }
}