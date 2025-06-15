export default function Home() {
  return (
    <section className="text-center space-y-8">
      <h1 className="text-3xl md:text-5xl font-bold text-primary mt-8">
        خدمة توصيل مياه للمساجد
      </h1>

      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        اطلب كراتين المياه لمسجدك بكل سهولة وحدد الموقع على الخريطة وادفع إلكترونيًا – نوصلها لك في أسرع وقت.
      </p>

      <a
        href="/products"
        className="inline-block bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-primary-dark transition"
      >
        اطلب الآن
      </a>

      <div className="mt-10">
        <img
          src="https://images.unsplash.com/photo-1603785221144-0314d7ffb6a0"
          alt="ماء للمساجد"
          className="rounded-2xl mx-auto max-w-3xl shadow-lg"
        />
      </div>
    </section>
  )
}