export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6 py-25">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700">توصيل مياه المساجد</h1>
        <p className="text-gray-600 mt-2">أفضل خدمة لتوصيل المياه للمساجد في الرياض.</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">منتجاتنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* مثال منتج */}
          <div className="border rounded p-4 shadow-sm hover:shadow-lg transition">
            <img
              src="/water-bottle.png"
              alt="زجاجة مياه 1.5 لتر"
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-3 font-semibold">زجاجة مياه 1.5 لتر</h3>
            <p className="mt-1 text-gray-700">مياه نقية وصحية.</p>
            <p className="mt-2 font-bold text-blue-600">10 ريال</p>
          </div>
          {/* أضف منتجات أخرى هنا */}
        </div>
      </section>
    </main>
  )
}