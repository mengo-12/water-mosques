export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">خدمة توصيل المياه للمساجد</h1>
          <p className="text-lg mb-6">
            وفر على نفسك الوقت والجهد، وادعم بيوت الله بخدمة سريعة وآمنة لتوصيل عبوات المياه.
          </p>
          <a
            href="/order"
            className="inline-block bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            اطلب الآن
          </a>
        </div>
      </section>

      {/* المميزات */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">لماذا تختارنا؟</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">توصيل سريع</h3>
            <p>نوصلكم خلال أقل من 24 ساعة داخل المدينة.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">خدمة موثوقة</h3>
            <p>نستخدم مندوبين محترفين ومتابعة مباشرة للحالة.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">دعم المساجد</h3>
            <p>نقدّم خصومات خاصة لتزويد المساجد بالمياه.</p>
          </div>
        </div>
      </section>

      {/* دعوة للتسجيل */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">هل أنت مستعد للانضمام؟</h2>
        <p className="mb-6">سجّل الآن كمندوب أو عميل وابدأ في دعم مشروعنا الخيري.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/register?type=client"
            className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 transition"
          >
            تسجيل كعميل
          </a>
          <a
            href="/register?type=delivery"
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            تسجيل كمندوب
          </a>
        </div>
      </section>

      {/* زر واتساب ثابت */}
      <a
        href="https://wa.me/966500000000" // استبدل الرقم هنا برقم واتساب مشروعك
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition"
        aria-label="تواصل معنا عبر واتساب"
      >
        {/* أيقونة واتساب SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path d="M20.52 3.48a11.78 11.78 0 00-16.66 0 11.88 11.88 0 00-3.08 8.47c0 2.1.55 4.15 1.6 5.96L2 22l4.21-1.37a11.78 11.78 0 007.85 2.91c6.52 0 11.81-5.29 11.81-11.8a11.71 11.71 0 00-3.35-8.26zm-4.66 14.27a9.33 9.33 0 01-5.26-1.57l-.38-.27-3.13.9.83-3.05-.25-.36a9.24 9.24 0 01-1.45-5.15 9.33 9.33 0 1110.41 8.44zM16.75 14c-.23 0-1.3-.63-1.5-.7s-.34-.1-.49.1-.56.7-.68.85-.25.15-.47.05a7.8 7.8 0 01-2.3-1.42 8.75 8.75 0 01-1.62-2c-.17-.3.17-.44.43-1.46.05-.15 0-.27-.02-.37-.05-.13-.5-1.22-.68-1.67s-.34-.37-.47-.38-.33-.01-.5-.01a.72.72 0 00-.52.25 2.13 2.13 0 00-.68.92 3.14 3.14 0 001.32 3.9 11.08 11.08 0 005.33 3.45 3.25 3.25 0 002.53-.67 2.43 2.43 0 00.77-1.7c0-.3-.23-.45-.5-.45z" />
        </svg>
      </a>
    </main>
  )
}