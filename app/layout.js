// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'توصيل مياه للمساجد',
  description: 'خدمة توصيل كراتين مياه للمساجد',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-800 font-sans">
        <Navbar />
        <main className="min-h-screen container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
