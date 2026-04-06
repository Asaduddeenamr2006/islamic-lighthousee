'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const WUDU_STEPS = [
  {
    step: 1,
    title: 'النية',
    desc: 'ينوي الوضوء بقلبه رفع الحدث للتقرب إلى الله تعالى',
  },
  {
    step: 2,
    title: 'التسمية',
    desc: 'يقول بسم الله في بداية الوضوء',
  },
  {
    step: 3,
    title: 'غسل الكفين',
    desc: 'يغسل كفيه ثلاث مرات قبل البدء',
  },
  {
    step: 4,
    title: 'المضمضة',
    desc: 'يتمضمض ثلاث مرات بإدخال الماء في فمه ثم إخراجه',
  },
  {
    step: 5,
    title: 'الاستنشاق والاستنثار',
    desc: 'يستنشق الماء بأنفه ثم يستنثره ثلاث مرات',
  },
  {
    step: 6,
    title: 'غسل الوجه',
    desc: 'يغسل وجهه ثلاث مرات من منبت الشعر إلى أسفل الذقن ومن الأذن إلى الأذن',
  },
  {
    step: 7,
    title: 'غسل اليدين',
    desc: 'يغسل يديه إلى المرفقين ثلاث مرات، يبدأ باليمنى ثم اليسرى',
  },
  {
    step: 8,
    title: 'مسح الرأس',
    desc: 'يمسح رأسه مرة واحدة بيديه المبللتين من مقدمة الرأس إلى مؤخرته ثم يعود',
  },
  {
    step: 9,
    title: 'مسح الأذنين',
    desc: 'يمسح أذنيه مرة واحدة بالسبابتين من الداخل والإبهامين من الخارج',
  },
  {
    step: 10,
    title: 'غسل القدمين',
    desc: 'يغسل قدميه إلى الكعبين ثلاث مرات، يبدأ باليمنى ثم اليسرى',
  },
];

const PRAYER_STEPS = [
  {
    step: 1,
    title: 'النية وتكبيرة الإحرام',
    desc: 'ينوي الصلاة ثم يرفع يديه حذو أذنيه ويقول الله أكبر',
  },
  {
    step: 2,
    title: 'القيام والقراءة',
    desc: 'يضع يده اليمنى على اليسرى ويقرأ الفاتحة ثم ما تيسر من القرآن',
  },
  {
    step: 3,
    title: 'الركوع',
    desc: 'يركع ويقول سبحان ربي العظيم ثلاثاً مع وضع اليدين على الركبتين',
  },
  {
    step: 4,
    title: 'الرفع من الركوع',
    desc: 'يرفع رأسه ويقول سمع الله لمن حمده ربنا ولك الحمد',
  },
  {
    step: 5,
    title: 'السجود',
    desc: 'يسجد على سبع أعضاء: الجبهة والأنف واليدان والركبتان وأطراف القدمين',
  },
  {
    step: 6,
    title: 'الجلوس بين السجدتين',
    desc: 'يجلس ويقول رب اغفر لي ثم يسجد السجدة الثانية',
  },
  {
    step: 7,
    title: 'التشهد والتسليم',
    desc: 'يجلس للتشهد الأخير ويقرأه ثم يسلم عن يمينه وعن يساره',
  },
];

const MADHHAB_NOTES = [
  { name: 'الحنفي', note: 'يضع اليدين تحت السرة، ولا يرفع اليدين عند الركوع والرفع منه' },
  { name: 'المالكي', note: 'يرسل يديه ولا يضعهما، ويسلم مرة واحدة عن اليمين' },
  { name: 'الشافعي', note: 'يضع اليدين على الصدر، ويرفع اليدين عند كل تكبيرة' },
  { name: 'الحنبلي', note: 'يضع اليدين تحت السرة أو فوقها، ويشير بالسبابة في التشهد' },
];

const ADVICE_TIPS = [
  { title: 'تقوي الله في السر والعلن', desc: 'داء القلب بالعمل الصالح في السر أقرب للقبول من العلانية' },
  { title: 'قراءة آية الكرسي دبر كل صلاة', desc: 'قال النبي ﷺ: "مَن قرأ آيةَ الكرسي في دُبُرِ كلِّ صلاةٍ مكتوبةٍ لم يمنعْهُ من دخولِ الجنةِ إلا الموت" (رواه النسائي) - آية الكرسي تحفظ العبد من كل شر' },
  { title: 'التبسم في وجه أخيك', desc: 'التبسم في وجه أخيك صدقة، ونشر السعادة بين المسلمين من أهم القربات' },
  { title: 'الصلاة على النبي ﷺ', desc: 'من صلى على النبي صلى الله عليه وسلم مرة واحدة صلى الله عليه عشراً' },
  { title: 'قراءة المعوذات قبل النوم', desc: 'قراءة المعوذات قبل النوم تحفظ من كل شرور الليل' },
  { title: 'الذكر بعد الصلوات', desc: 'أذكار الصباح والمساء تحفظ العبد بإذن الله من كل مكروه' },
  { title: 'صلة الرحم', desc: 'صلة الرحم تزيد في العمر وتوسع في الرزق وتفرج للكروب' },
  { title: 'الاستغفار', desc: 'من أكثر من الاستغفار فتحت له أبواب الرحمات ونو园的 الخير' },
];

const SUNNAH = [
  { name: 'السنن الرواتب', desc: 'قبل الفريضة وبعدها ركعتان سنة مؤكدة، وقبل الظهر أربع ركعات' },
  { name: 'صيام الاثنين والخميس', desc: 'صيام يوم الاثنين شكراً لله على نعمه، والخميس للتكفير ذنوب الأسبوع' },
  { name: 'صلاة الوتر', desc: 'صلاة الوتر آخر الليل وهي سنة مؤكدة، وترها من تسع إلى إحدى عشرة ركعة' },
  { name: 'صلاة الضحى', desc: 'صلاة الضحى من بعد شروق الشمس إلى الزوال، أفضلها ثماني ركعات' },
  { name: 'صيام ثلاثة أيام من كل شهر', desc: 'صيام أيام البيض (13، 14، 15) من كل شهر قمرى لها فضل عظيم' },
  { name: 'قراءة آخر آيتين من سورة البقرة', desc: 'من قرأ آيتين من آخر البقرة في الليل كفاه الله شر ما بينه وبين الصبح' },
  { name: 'الإكثار من النوافل', desc: 'النوافل تقرب العبد من ربه وت补 فريضته، ومن عمل عملاً زدناه' },
  { name: 'السلام على الناس', desc: 'بدأ بالسلام سنة وتحية الإسلام، ويبدأ بها الأحدث سناً والأعرف' },
];

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
      id: 'memorization',
      title: 'المحفظ',
      description: 'حفظ القرآن مع تكرار وتعدد القراء',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      href: '/memorization',
      status: 'جديد',
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
      description: 'أدعية الأنبياء، أذكار الصباح والمساء، أذكار التحصين',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      href: '/duas',
      status: 'متاح',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg-mosque.jpg"
          alt="خلفية"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080a0f]/70 via-[#080a0f]/72 to-[#080a0f]" />
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
          <div className="text-center mb-12 sm:mb-16 mt-8 sm:mt-16">
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

          {/* Feature Cards */}
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20">
            {features.map((feature) => (
              <div key={feature.id} className="group">
                {feature.href !== '#' ? (
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
                ) : (
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
                )}
              </div>
            ))}
          </div>

          {/* ==================== SUNNAH SECTION ==================== */}
          <section id="sunnah" className="w-full max-w-7xl mb-16 scroll-mt-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-amber-400 text-sm font-medium">السنن</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                سنن نبوية شريفة
              </h2>
              <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                سنن النبي صلى الله عليه وسلم التي يسن لنا فعلها
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUNNAH.map((sunnah, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/20 transition-colors">
                  <h4 className="text-base font-bold text-amber-400 mb-2">{sunnah.name}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{sunnah.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <a href="#advice" className="flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors">
                <span className="text-sm">المزيد</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </section>

          {/* ==================== ADVICE TIPS SECTION ==================== */}
          <section id="advice" className="w-full max-w-7xl mb-16 scroll-mt-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-purple-400 text-sm font-medium">نصائح للمسلم</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                نصائح روحية مهمة
              </h2>
              <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                نصائح نبوية وشرعية لتقوية الإيمان والخلق
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ADVICE_TIPS.map((tip, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/20 transition-colors">
                  <h4 className="text-base font-bold text-purple-400 mb-2">{tip.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <a href="#wudu" className="flex items-center gap-2 text-white/60 hover:text-purple-400 transition-colors">
                <span className="text-sm">المزيد</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </section>

          {/* ==================== WUDU SECTION ==================== */}
          <section id="wudu" className="w-full max-w-7xl mb-16 scroll-mt-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-blue-400 text-sm font-medium">تعلم العبادات</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                كيفية الوضوء
              </h2>
              <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                تعلم خطوات الوضوء الصحيحة خطوة بخطوة
              </p>
            </div>

            <div className="space-y-3 max-w-3xl mx-auto mb-6">
              {WUDU_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-colors"
                >
                  <span className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.step}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white/90">{step.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 max-w-3xl mx-auto">
              <p className="text-sm text-blue-400/80 leading-relaxed text-center">
                <span className="font-bold">ملاحظة:</span> يجب الترتيب بين الأعضاء والموالاة (عدم الفصل الطويل بين غسل الأعضاء)، ولا يجوز ترك أي عضو بدون غسل
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <a href="#prayer" className="flex items-center gap-2 text-white/60 hover:text-blue-400 transition-colors">
                <span className="text-sm">كيفية الصلاة</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </section>

          {/* ==================== PRAYER SECTION ==================== */}
          <section id="prayer" className="w-full max-w-7xl mb-16 scroll-mt-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-green-400 text-sm font-medium">تعلم العبادات</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                كيفية الصلاة
              </h2>
              <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
                تعلم خطوات الصلاة الصحيحة خطوة بخطوة
              </p>
            </div>

            <div className="space-y-3 max-w-3xl mx-auto">
              {PRAYER_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/20 transition-colors"
                >
                  <span className="w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.step}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white/90">{step.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
