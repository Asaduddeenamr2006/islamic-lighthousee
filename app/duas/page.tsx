'use client';

import { useState } from 'react';
import Link from 'next/link';

const PROPHET_DUAS = [
  {
    name: 'نوح عليه السلام',
    dua: 'رَبِّ إِنِّي أَعُوذُ بِكَ أَنْ أَسْأَلَكَ شَيْئًا لَا أَعْلَمُهُ',
    source: 'سورة نوح: 26',
    meaning: 'إني أعوذ بك أن أسألك شيئاً لا أعلمه'
  },
  {
    name: 'إبراهيم عليه السلام',
    dua: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    source: 'سورة إبراهيم: 40',
    meaning: 'اجعلني مقيم الصلاة ومن ذريتي، ربنا وتقبل دعائي'
  },
  {
    name: 'موسى عليه السلام',
    dua: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
    source: 'سورة طه: 25-28',
    meaning: 'شرح صدري ويسر لي أمرياحل عقدة من لساني يفقهوا قولي'
  },
  {
    name: 'يونس عليه السلام',
    dua: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    source: 'سورة الأنبياء: 87',
    meaning: 'لا إله إلا أنت سبحانك إني كنت من الظالمين'
  },
  {
    name: 'زكريا عليه السلام',
    dua: 'رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنْتَ خَيْرُ الْوَارِثِينَ',
    source: 'سورة الأنبياء: 89',
    meaning: 'لا تتركني وحدك وأنت خير الوارثين'
  },
  {
    name: 'عيسى عليه السلام',
    dua: 'إِنْ تُعَذِّبْهُمْ فَإِنَّهُمْ عِبَادُكَ وَإِنْ تَغْفِرْ لَهُمْ فَإِنَّكَ أَنْتَ الْعَزِيزُ الْحَكِيمُ',
    source: 'سورة المائدة: 118',
    meaning: 'إن تعذبهم فإنهم عبادك وإن تغفر لهم فإنك العزيز الحكيم'
  }
];

const MORNING_DUAS = [
  { text: 'اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت', source: 'صحيح البخاري' },
  { text: 'اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور', source: 'الترمذي' },
  { text: 'أصبحنا على كلمة الله الإيمان، وملة الإسلام، ودين نبيكم محمد ﷺ، وملة إبراهيم حنيفاً مسلماً وما كان من المشركين', source: 'سنن أبي داود' },
  { text: 'اللهم إني أسألك العفو والعافية في الدنيا والآخرة', source: 'ابن ماجه' },
  { text: 'اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً', source: 'سنن ابن ماجه' },
  { text: 'سبحان الله وبحمده عدد خلقه ورضا نفسه وزنة عرشه ومداد كلماته', source: 'مسلم' }
];

const EVENING_DUAS = [
  { text: 'اللهم بك أمسينا، وبك نحيا، وبك نموت، وإليك المصير', source: 'الترمذي' },
  { text: 'اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت', source: 'صحيح البخاري' },
  { text: 'أمسينا على كلمة الله الإيمان، وملة الإسلام، ودين نبيكم محمد ﷺ، وملة إبراهيم حنيفاً مُسْلِماً وما كان من المشركين', source: 'سنن أبي داود' },
  { text: 'اللهم إني أسألك العفو والعافية في الدنيا والآخرة', source: 'ابن ماجه' },
  { text: 'أعوذ بكلمات الله التامات التي لا يجاوزهن بر ولا فاجر من شر ما خلق وذرأ وبرأ', source: 'صحيح مسلم' },
  { text: 'اللهم أصلح لي ديني الذي هو عصمة أمرني، وأصلح لي دنياي التي فيها معاشي، وأصلح لي آخرتي التي فيها معادي', source: 'مسلم' }
];

const PROTECTION_DUAS = [
  { 
    text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', 
    source: 'صحيح مسلم',
    benefit: 'التحصن من كل شرور اليوم'
  },
  { 
    text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ قُلْ هُوَ اللَّهُ أَحَدٌ - الْمَعَاذَتَانِ', 
    source: 'سورة الإخلاص والمعوذات',
    benefit: 'الحفظ من كل مكروه'
  },
  { 
    text: 'اللهم أحرسني بعينك التي لا تنام، واحفظني بيمينك التي لا تخطأ، واكفني بجنبك الذي لا يكل، وأرضني بما قسمت لي', 
    source: 'البيهقي',
    benefit: 'الحفظ وال-protection'
  },
  { 
    text: 'أَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُوذُ', 
    source: 'أحمد',
    benefit: 'الاستعاذة من كل شر'
  },
  { 
    text: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ', 
    source: 'سورة التوبة - جزء من الآية 129',
    benefit: 'الاكتفاء بالله وكفاية كل شيء'
  },
  { 
    text: 'اللهم بك نتقي وبك نحصن وبك نؤمن', 
    source: 'الدارمي',
    benefit: 'التوكل والتحصين'
  }
];

type Category = 'prophets' | 'morning' | 'evening' | 'protection';

export default function DuasPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('prophets');

  const categories = [
    { id: 'prophets', label: 'أدعية الأنبياء', icon: '🕌' },
    { id: 'morning', label: 'أذكار الصباح', icon: '🌅' },
    { id: 'evening', label: 'أذكار المساء', icon: '🌙' },
    { id: 'protection', label: 'أذكار التحصين', icon: '🛡️' },
  ];

  const getCurrentData = () => {
    switch (activeCategory) {
      case 'prophets': return PROPHET_DUAS;
      case 'morning': return MORNING_DUAS;
      case 'evening': return EVENING_DUAS;
      case 'protection': return PROTECTION_DUAS;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#151820]">
      {/* Header */}
      <header className="h-14 bg-[#1a1d26]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-3 sm:px-4 sticky top-0 z-30">
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </div>
        <h1 className="text-white font-semibold text-base sm:text-lg truncate flex-1 text-center px-2">
          الأدعية والأذكار
        </h1>
        <div className="w-10" />
      </header>

      {/* Categories */}
      <div className="p-3 sm:p-4 border-b border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="p-4 sm:p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {activeCategory === 'prophets' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">أدعية الأنبياء</h2>
                <p className="text-white/50 text-sm">من القرآن الكريم</p>
              </div>
              {PROPHET_DUAS.map((dua, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-400 font-bold">{dua.name}</span>
                  </div>
                  <p className="text-lg text-white font-semibold text-center mb-3 leading-relaxed">{dua.dua}</p>
                  <p className="text-sm text-white/50 text-center mb-2">{dua.meaning}</p>
                  <p className="text-xs text-green-400/60 text-center">{dua.source}</p>
                </div>
              ))}
            </>
          )}

          {activeCategory === 'morning' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">أذكار الصباح</h2>
                <p className="text-white/50 text-sm">حصن المؤمن في بداية اليوم</p>
              </div>
              {MORNING_DUAS.map((dua, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white text-center leading-relaxed mb-3">{dua.text}</p>
                  <p className="text-xs text-green-400/60 text-center">{dua.source}</p>
                </div>
              ))}
            </>
          )}

          {activeCategory === 'evening' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">أذكار المساء</h2>
                <p className="text-white/50 text-sm">حصن المؤمن في نهاية اليوم</p>
              </div>
              {EVENING_DUAS.map((dua, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white text-center leading-relaxed mb-3">{dua.text}</p>
                  <p className="text-xs text-green-400/60 text-center">{dua.source}</p>
                </div>
              ))}
            </>
          )}

          {activeCategory === 'protection' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">أذكار التحصين</h2>
                <p className="text-white/50 text-sm">الحفظ والأمان من كل شر</p>
              </div>
              {PROTECTION_DUAS.map((dua, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white text-center leading-relaxed mb-3">{dua.text}</p>
                  <p className="text-xs text-purple-400/60 text-center mb-2">{dua.benefit}</p>
                  <p className="text-xs text-green-400/60 text-center">{dua.source}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
