'use client';

import Link from 'next/link';

const REPENTANCE_STEPS = [
  {
    step: 1,
    title: 'الإقلاع عن الذنب فوراً',
    desc: 'أول خطوة في التوبة هي التوقف عن المعصية حالاً، فلا توبة مع الاستمرار في الذنب. قال تعالى: ﴿وَتُوبُوا إِلَى اللَّهِ جَمِيعًا أَيُّهَا الْمُؤْمِنُونَ لَعَلَّكُمْ تُفْلِحُونَ﴾ [النور: 31]',
  },
  {
    step: 2,
    title: 'الندم على ما فات',
    desc: 'أن يحزن المذنب على ما ارتكبه من معصية، والندم هو ركن التوبة الأعظم. قال النبي ﷺ: «النَّدَمُ تَوْبَةٌ» (رواه ابن ماجه وأحمد وصححه الألباني)',
  },
  {
    step: 3,
    title: 'العزم على عدم العودة',
    desc: 'أن يعزم بصدق وإخلاص ألا يعود إلى هذا الذنب أبداً، وأن يكون هذا العزم جازماً من قلبه. قال تعالى: ﴿فَأَمَّا مَن تَابَ وَآمَنَ وَعَمِلَ عَمَلًا صَالِحًا فَعَسَىٰ أَن يَكُونَ مِنَ الْمُهْتَدِينَ﴾ [القصص: 67]',
  },
  {
    step: 4,
    title: 'رد المظالم إن كانت',
    desc: 'إذا كان الذنب يتعلق بحق آدمي - مثل مال أو عرض أو ظلم - فيجب رد الحق إلى صاحبه أو الاستحلال منه. قال النبي ﷺ: «مَنْ كَانَتْ لَهُ مَظْلَمَةٌ لِأَخِيهِ مِنْ عِرْضِهِ أَوْ شَيْءٍ فَلْيَتَحَلَّلْهُ مِنْهُ الْيَوْمَ» (متفق عليه)',
  },
  {
    step: 5,
    title: 'الإكثار من الحسنات',
    desc: 'بعد التوبة يُستحب الإكثار من الأعمال الصالحة التي تمحو السيئات. قال تعالى: ﴿إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ﴾ [هود: 114]',
  },
];

const QURAN_VERSES = [
  {
    verse: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
    source: 'سورة الزمر: 53',
  },
  {
    verse: 'وَمَن يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَّحِيمًا',
    source: 'سورة النساء: 110',
  },
  {
    verse: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
    source: 'سورة البقرة: 222',
  },
  {
    verse: 'وَهُوَ الَّذِي يَقْبَلُ التَّوْبَةَ عَنْ عِبَادِهِ وَيَعْفُو عَنِ السَّيِّئَاتِ وَيَعْلَمُ مَا تَفْعَلُونَ',
    source: 'سورة الشورى: 25',
  },
];

const HADITH_LIST = [
  {
    text: 'مَنْ قَالَ: سُبْحَانَ اللهِ وَبِحَمْدِهِ، فِي يَوْمٍ مِائَةَ مَرَّةٍ، حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ',
    source: 'متفق عليه: رواه البخاري (6405) ومسلم (2691)',
    grade: 'صحيح',
  },
  {
    text: 'كُلُّ ابْنِ آدَمَ خَطَّاءٌ وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ',
    source: 'رواه الترمذي (2499) وابن ماجه (4251)',
    grade: 'صحيح',
  },
  {
    text: 'لَلَّهُ أَشَدُّ فَرَحًا بِتَوْبَةِ عَبْدِهِ حِينَ يَتُوبُ إِلَيْهِ مِنْ أَحَدِكُمْ كَانَ عَلَى رَاحِلَتِهِ بِأَرْضِ فَلَاةٍ فَانْفَلَتَتْ مِنْهُ',
    source: 'متفق عليه: رواه البخاري (6308) ومسلم (2747)',
    grade: 'صحيح',
  },
  {
    text: 'إِنَّ الْعَبْدَ إِذَا أَخْطَأَ خَطِيئَةً نُكِتَتْ فِي قَلْبِهِ نُكْتَةٌ سَوْدَاءُ، فَإِذَا هُوَ نَزَعَ وَاسْتَغْفَرَ وَتَابَ سُقِلَ قَلْبُهُ، وَإِنْ عَادَ زِيدَ فِيهَا',
    source: 'رواه الترمذي (3334) وابن ماجه (4244)',
    grade: 'حسن',
  },
  {
    text: 'يَا أَيُّهَا النَّاسُ تُوبُوا إِلَى اللهِ فَإِنِّي أَتُوبُ فِي الْيَوْمِ إِلَيْهِ مِائَةَ مَرَّةٍ',
    source: 'رواه مسلم (2702)',
    grade: 'صحيح',
  },
];

export default function RepentancePage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <header className="h-14 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-30">
        <Link
          href="/"
          className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          title="العودة للرئيسية"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <h1 className="text-white font-semibold text-lg">كيفية التوبة</h1>
        <div className="w-9" />
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 pb-12">
        {/* Intro */}
        <section className="mb-12 mt-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm">باب مفتوح</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              التوبة إلى الله
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              التوبة هي الرجوع إلى الله تعالى والإقلاع عن الذنوب والندم على ما فات، وهي واجبة على كل مسلم ومسلمة في كل وقت
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            خطوات التوبة الصحيحة
          </h3>

          <div className="space-y-4">
            {REPENTANCE_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Allah Forgives All Sins */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
              الله يغفر الذنوب جميعاً
            </h3>

            <p className="text-white/70 text-base leading-relaxed mb-6 text-center">
              إن الله تعالى وسع رحمته كل شيء، وأبواب التوبة مفتوحة لا تُغلق حتى تطلع الشمس من مغربها. فلا ييأسنَّ أحد من رحمة الله مهما بلغت ذنوبه، فالله أرحم بعباده من الأم بولدها.
            </p>

            <div className="space-y-4">
              {QURAN_VERSES.map((v, i) => (
                <div key={i} className="p-4 rounded-xl bg-black/30 border border-white/5">
                  <p className="text-white/90 text-lg leading-loose text-center mb-2" style={{ fontFamily: 'var(--font-quran)' }}>
                    ﴿{v.verse}﴾
                  </p>
                  <p className="text-green-400/70 text-xs text-center">{v.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hadith - Main */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">حديث اليوم</h3>
            </div>

            <div className="p-5 rounded-xl bg-black/30 border border-amber-500/10 mb-4">
              <p className="text-white text-lg sm:text-xl leading-loose text-center" style={{ fontFamily: 'var(--font-quran)' }}>
                «مَنْ قَالَ: سُبْحَانَ اللهِ وَبِحَمْدِهِ، فِي يَوْمٍ مِائَةَ مَرَّةٍ، حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ»
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                ✓ صحيح - متفق عليه
              </span>
              <span className="text-white/40 text-xs">
                رواه البخاري (6405) ومسلم (2691)
              </span>
            </div>
          </div>
        </section>

        {/* More Hadiths */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            أحاديث في فضل التوبة والاستغفار
          </h3>

          <div className="space-y-4">
            {HADITH_LIST.map((h, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/15 transition-colors"
              >
                <p className="text-white/90 text-base leading-loose mb-3" style={{ fontFamily: 'var(--font-quran)' }}>
                  «{h.text}»
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-white/40 text-xs">{h.source}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${
                    h.grade === 'صحيح'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {h.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Note */}
        <section className="mb-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-white/70 text-base leading-relaxed mb-4">
              قال ابن القيم رحمه الله: «التوبة واجبة من كل ذنب، فإن كانت المعصية بين العبد وربه فلا تتعلق بحق آدمي، فلها ثلاثة شروط: أن يقلع عن المعصية، وأن يندم على فعلها، وأن يعزم ألا يعود إليها أبداً»
            </p>
            <p className="text-white/30 text-xs">
              المصدر: مدارج السالكين - ابن القيم الجوزية
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
