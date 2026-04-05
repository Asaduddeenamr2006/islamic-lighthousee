'use client';

import { useState } from 'react';
import Link from 'next/link';

type Category = 'morning' | 'evening' | 'protection' | 'prophets' | 'sunnah';

interface Dhikr {
  text: string;
  count?: number;
  source?: string;
}

interface CategoryData {
  id: Category;
  title: string;
  icon: string;
  items: Dhikr[];
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'morning',
    title: 'أذكار الصباح',
    icon: '🌅',
    items: [
      { text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', count: 1, source: 'رواه أبو داود' },
      { text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ', count: 1, source: 'رواه الترمذي' },
      { text: 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لاَ إِلَـهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ', count: 4, source: 'رواه أبو داود' },
      { text: 'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ', count: 1, source: 'رواه أبو داود' },
      { text: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ', count: 100, source: 'رواه مسلم' },
      { text: 'لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', count: 10, source: 'متفق عليه' },
      { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي', count: 1, source: 'رواه ابن ماجه' },
      { text: 'بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', count: 3, source: 'رواه أبو داود والترمذي' },
    ],
  },
  {
    id: 'evening',
    title: 'أذكار المساء',
    icon: '🌙',
    items: [
      { text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', count: 1, source: 'رواه أبو داود' },
      { text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ', count: 1, source: 'رواه الترمذي' },
      { text: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لاَ إِلَـهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ', count: 4, source: 'رواه أبو داود' },
      { text: 'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ', count: 1, source: 'رواه أبو داود' },
      { text: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', count: 3, source: 'رواه مسلم' },
      { text: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ', count: 100, source: 'رواه مسلم' },
      { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي', count: 1, source: 'رواه ابن ماجه' },
      { text: 'بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', count: 3, source: 'رواه أبو داود والترمذي' },
    ],
  },
  {
    id: 'protection',
    title: 'أذكار التحصين',
    icon: '🛡️',
    items: [
      { text: 'بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', count: 3, source: 'رواه أبو داود والترمذي' },
      { text: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', count: 3, source: 'رواه مسلم' },
      { text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ', count: 1, source: 'رواه أبو داود' },
      { text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ وَمِنْ شَرِّ مَا لَمْ أَعْمَلْ', count: 1, source: 'رواه مسلم' },
      { text: 'حَسْبِيَ اللهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ', count: 7, source: 'رواه أبو داود' },
      { text: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَـهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ', count: 1, source: 'رواه الترمذي' },
      { text: 'قُلْ هُوَ اللهُ أَحَدٌ ۝ اللهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ (ثلاث مرات) والمعوذتين', count: 3, source: 'رواه أبو داود والترمذي' },
    ],
  },
  {
    id: 'prophets',
    title: 'أدعية الأنبياء',
    icon: '🤲',
    items: [
      { text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', source: 'دعاء سيدنا إبراهيم عليه السلام - البقرة: 201' },
      { text: 'رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ يَفْقَهُوا قَوْلِي', source: 'دعاء سيدنا موسى عليه السلام - طه: 25-28' },
      { text: 'رَبِّ إِنِّي أَعُوذُ بِكَ أَنْ أَسْأَلَكَ مَا لَيْسَ لِي بِهِ عِلْمٌ ۖ وَإِلاَّ تَغْفِرْ لِي وَتَرْحَمْنِي أَكُن مِّنَ الْخَاسِرِينَ', source: 'دعاء سيدنا نوح عليه السلام - هود: 47' },
      { text: 'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ', source: 'دعاء سيدنا زكريا عليه السلام - آل عمران: 38' },
      { text: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ', source: 'دعاء سيدنا أيوب عليه السلام - الأنبياء: 83' },
      { text: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ', source: 'دعاء سيدنا يونس عليه السلام - الأنبياء: 87' },
      { text: 'رَبِّ زِدْنِي عِلْمًا', source: 'دعاء النبي ﷺ - طه: 114' },
      { text: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ', source: 'دعاء المؤمنين - آل عمران: 8' },
      { text: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا', source: 'دعاء عباد الرحمن - الفرقان: 74' },
    ],
  },
  {
    id: 'sunnah',
    title: 'سنن النبي ﷺ',
    icon: '☀️',
    items: [
      { text: 'دعاء الاستيقاظ من النوم: الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', source: 'رواه البخاري' },
      { text: 'دعاء دخول الخلاء: اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', source: 'متفق عليه' },
      { text: 'دعاء الخروج من الخلاء: غُفْرَانَكَ', source: 'رواه أبو داود والترمذي' },
      { text: 'دعاء قبل الطعام: بِسْمِ اللهِ، فإن نسي يقول: بِسْمِ اللهِ فِي أَوَّلِهِ وَآخِرِهِ', source: 'رواه أبو داود والترمذي' },
      { text: 'دعاء بعد الطعام: الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ', source: 'رواه أبو داود والترمذي' },
      { text: 'دعاء دخول البيت: بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا', source: 'رواه أبو داود' },
      { text: 'دعاء الخروج من البيت: بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ', source: 'رواه أبو داود والترمذي' },
      { text: 'دعاء السفر: اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ', source: 'رواه مسلم' },
      { text: 'دعاء دخول المسجد: اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', source: 'رواه مسلم' },
      { text: 'دعاء الخروج من المسجد: اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', source: 'رواه مسلم' },
      { text: 'الصلاة على النبي ﷺ: اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ', source: 'متفق عليه' },
    ],
  },
];

export default function DuasPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('morning');
  const [counters, setCounters] = useState<Record<string, number>>({});

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory)!;

  const handleCount = (key: string, max: number) => {
    setCounters(prev => {
      const current = prev[key] || 0;
      if (current >= max) return prev;
      return { ...prev, [key]: current + 1 };
    });
  };

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
        <h1 className="text-white font-semibold text-lg">الأدعية والأذكار</h1>
        <div className="w-9" />
      </header>

      {/* Category Tabs */}
      <div className="sticky top-14 z-20 bg-[#000000]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto p-4 pb-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>{currentCategory.icon}</span>
          <span>{currentCategory.title}</span>
        </h2>

        <div className="space-y-4">
          {currentCategory.items.map((dhikr, index) => {
            const key = `${activeCategory}-${index}`;
            const currentCount = counters[key] || 0;
            const isComplete = dhikr.count ? currentCount >= dhikr.count : false;

            return (
              <div
                key={index}
                className={`p-5 rounded-2xl border transition-all ${
                  isComplete
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
              >
                <p className="text-white/90 text-lg leading-loose text-right mb-3" style={{ fontFamily: 'var(--font-quran)' }}>
                  {dhikr.text}
                </p>

                <div className="flex items-center justify-between">
                  {dhikr.source && (
                    <span className="text-white/30 text-xs">{dhikr.source}</span>
                  )}

                  {dhikr.count && (
                    <button
                      onClick={() => handleCount(key, dhikr.count!)}
                      disabled={isComplete}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        isComplete
                          ? 'bg-green-500/20 text-green-400 cursor-default'
                          : 'bg-white/10 text-white/70 hover:bg-white/15 active:scale-95'
                      }`}
                    >
                      {isComplete ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>تم</span>
                        </>
                      ) : (
                        <>
                          <span className="text-green-400">{currentCount}</span>
                          <span className="text-white/40">/</span>
                          <span className="text-white/50">{dhikr.count}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
