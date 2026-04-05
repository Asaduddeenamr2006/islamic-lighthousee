'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showSalahMsg, setShowSalahMsg] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSalahMsg(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      id: 'quran',
      title: 'القرآن الكريم',
      description: 'تلاوة واستماع مع مجموعة من أشهر القراء',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: '/quran',
      status: 'متاح',
    },
    {
      id: 'hadith',
      title: 'الأحاديث النبوية',
      description: 'مجموعة من الأحاديث الصحيحة مع الشرح',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      href: '/hadith',
      status: 'متاح',
    },
    {
      id: 'dua',
      title: 'الأدعية والأذكار',
      description: 'أذكار الصباح والمساء والتحصين وأدعية الأنبياء والسنن النبوية',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      href: '/duas',
      status: 'متاح',
    },
    {
      id: 'repentance',
      title: 'كيفية التوبة',
      description: 'خطوات التوبة الصحيحة وفضل الاستغفار وسعة رحمة الله',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      href: '/repentance',
      status: 'متاح',
    },
    {
      id: 'quran-lights',
      title: 'أنوار القرآن',
      description: 'برنامج يساعد في معرفة مستوى حفظك ومراجعة حفظك برسم بياني هندسي',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: 'https://quran-lights.web.app/',
      status: 'متاح',
      external: true,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/sky.jpg"
          alt="خلفية"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/40 to-[#000000]/40" />
      </div>

      {/* Salah Notification Toast */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-1000 ${
          showSalahMsg ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-5 py-3 rounded-2xl bg-green-600/90 backdrop-blur-md border border-green-500/30 shadow-lg shadow-green-500/20 flex items-center gap-3">
          <svg className="w-5 h-5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z" />
          </svg>
          <p className="text-sm text-white font-medium">صَلِّ على سيدنا محمد ﷺ</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">المنارة الإسلامية</span>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-12">
          {/* Welcome Text */}
          <div className="text-center mb-8 sm:mb-10 mt-8 sm:mt-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm">مرحباً بك</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              مرحباً بكم في
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                منصة المنارة الإسلامية
              </span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              منصة إسلامية شاملة تهدف لتسهيل الوصول إلى القرآن الكريم والأحاديث النبوية والأدعية
            </p>
          </div>

          {/* Quran Verse - Sada Allah */}
          <div className="w-full max-w-3xl mb-12 sm:mb-16">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-5">
                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z" />
                </svg>
                <span className="text-green-400 text-xs font-medium">آية من كتاب الله</span>
              </div>

              <p className="text-white text-xl sm:text-2xl leading-loose sm:leading-loose mb-4" style={{ fontFamily: 'var(--font-quran)' }}>
                ﴿وَٱللَّهُ يُرِيدُ أَن يَتُوبَ عَلَيْكُمْ وَيُرِيدُ ٱلَّذِينَ يَتَّبِعُونَ ٱلشَّهَوَٰتِ أَن تَمِيلُوا۟ مَيْلًا عَظِيمًا ۝ يُرِيدُ ٱللَّهُ أَن يُخَفِّفَ عَنكُمْ ۚ وَخُلِقَ ٱلْإِنسَٰنُ ضَعِيفًا﴾
              </p>

              <p className="text-green-400/60 text-sm">
                سورة النساء: ٢٧-٢٨
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20">
            {features.map((feature) => (
              <div key={feature.id} className="group">
                {feature.href === '#' ? (
                  <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm opacity-60">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-white/30">
                        {feature.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/30 border border-white/10">
                        {feature.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white/40 mb-2">{feature.title}</h3>
                    <p className="text-white/30 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ) : feature.external ? (
                  <a
                    href={feature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                        {feature.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                        {feature.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                  </a>
                ) : (
                  <Link
                    href={feature.href}
                    className="block h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                        {feature.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                        {feature.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-white/30 text-sm">
              منصة المنارة الإسلامية © {new Date().getFullYear()}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
