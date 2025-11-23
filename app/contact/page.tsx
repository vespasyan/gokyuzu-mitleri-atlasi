import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Gökyüzü Mitleri Atlası projesi ile iletişime geçin',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-500 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            İletişim
          </h1>
          <p className="text-xl text-gray-300">
            Bizimle iletişime geçin
          </p>
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-star-400 mb-6">
                İletişim Bilgileri
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-star-400/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-6 h-6 text-star-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">E-posta</h3>
                    <a 
                      href="mailto:ft155655@gmail.com"
                      className="text-star-400 hover:text-star-300 transition-colors"
                    >
                      ft155655@gmail.com
                    </a>
                    <p className="text-gray-400 text-sm mt-1">
                      Proje ile ilgili sorularınız için
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-cosmic-400/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-6 h-6 text-cosmic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m2 17 10 5 10-5" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m2 12 10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Proje Türü</h3>
                    <p className="text-gray-300">Eğitim & Sanat Projesi</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Türk mitolojisi ve çağdaş sanat
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-star-400/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-6 h-6 text-star-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Ekip</h3>
                    <p className="text-gray-300">Öğrenciler & Öğretmen</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Kolektif sanat projesi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h3 className="text-xl font-bold text-star-400 mb-4">
                Katkıda Bulunun
              </h3>
              <p className="text-gray-300 mb-4">
                Bu projeye katkıda bulunmak istiyorsanız aşağıdaki alanlarda bizimle iletişime geçebilirsiniz:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-star-400 rounded-full mr-3"></span>
                  Türk mitolojisi araştırmaları
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-star-400 rounded-full mr-3"></span>
                  Çağdaş sanat yorumları
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-star-400 rounded-full mr-3"></span>
                  Astronomi bilgi paylaşımı
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-star-400 rounded-full mr-3"></span>
                  Teknik geliştirmeler
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-star-400 mb-6">
              Mesaj Gönder
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-dark-300/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-star-400 focus:ring-2 focus:ring-star-400/20 focus:outline-none transition-colors"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-dark-300/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-star-400 focus:ring-2 focus:ring-star-400/20 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Konu
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-dark-300/50 border border-white/20 rounded-lg text-white focus:border-star-400 focus:ring-2 focus:ring-star-400/20 focus:outline-none transition-colors"
                >
                  <option value="">Konu seçiniz</option>
                  <option value="general">Genel sorular</option>
                  <option value="collaboration">İşbirliği teklifi</option>
                  <option value="artwork">Sanat eseri katkısı</option>
                  <option value="research">Araştırma paylaşımı</option>
                  <option value="technical">Teknik destek</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-300/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-star-400 focus:ring-2 focus:ring-star-400/20 focus:outline-none transition-colors resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-star-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity focus:ring-2 focus:ring-star-400/20 focus:outline-none"
              >
                Mesaj Gönder
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>

              <p className="text-gray-400 text-xs text-center">
                Formdan gönderilen mesajlar doğrudan <span className="text-star-400">ft155655@gmail.com</span> adresine iletilir.
              </p>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="bg-cosmic-gradient rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Hızlı Erişim
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-white text-cosmic-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors focus-ring"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Atlası Keşfet
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-ring"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Proje Hakkında
              </Link>
              
              <a
                href="mailto:ft155655@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-star-400 text-white font-semibold rounded-lg hover:bg-star-500 transition-colors focus-ring"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Direkt E-posta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}