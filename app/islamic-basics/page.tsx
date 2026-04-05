'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'tawheed' | 'wudu' | 'salah' | 'pillars';

const TAWHEED_SECTIONS = [
  {
    title: 'أقسام التوحيد',
    intro: 'التوحيد هو إفراد الله تعالى بما يختص به من الألوهية والربوبية والأسماء والصفات. وهو أساس الإسلام وأصله الذي بُني عليه.',
    types: [
      {
        name: 'توحيد الربوبية',
        desc: 'إفراد الله تعالى بأفعاله كالخلق والرزق والإحياء والإماتة وتدبير الأمور. وهذا النوع أقر به المشركون لكن لم يدخلهم في الإسلام.',
        verse: 'قُلْ مَن يَرْزُقُكُم مِّنَ السَّمَاءِ وَالْأَرْضِ أَمَّن يَمْلِكُ السَّمْعَ وَالْأَبْصَارَ وَمَن يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَيُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَمَن يُدَبِّرُ الْأَمْرَ ۚ فَسَيَقُولُونَ اللَّهُ ۚ فَقُلْ أَفَلَا تَتَّقُونَ',
        source: 'سورة يونس: 31',
      },
      {
        name: 'توحيد الألوهية',
        desc: 'إفراد الله تعالى بالعبادة فلا يُصرف شيء منها لغيره لا لملك مقرب ولا لنبي مرسل. وهذا هو التوحيد الذي دعت إليه الرسل وعليه وقع الجزاء والثواب والعقاب.',
        verse: 'وَمَا أَرْسَلْنَا مِن قَبْلِكَ مِن رَّسُولٍ إِلَّا نُوحِي إِلَيْهِ أَنَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدُونِ',
        source: 'سورة الأنبياء: 25',
      },
      {
        name: 'توحيد الأسماء والصفات',
        desc: 'إثبات ما أثبته الله تعالى لنفسه أو أثبته له رسوله ﷺ من الأسماء والصفات على ما يليق بجلاله من غير تحريف ولا تعطيل ولا تكييف ولا تمثيل.',
        verse: 'لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ',
        source: 'سورة الشورى: 11',
      },
    ],
  },
  {
    title: 'أركان الإسلام الخمسة',
    hadith: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ',
    hadithSource: 'متفق عليه: رواه البخاري (8) ومسلم (16)',
    pillars: [
      { name: 'الشهادتان', desc: 'شهادة أن لا إله إلا الله وأن محمداً رسول الله' },
      { name: 'الصلاة', desc: 'إقامة الصلاة خمس مرات في اليوم والليلة' },
      { name: 'الزكاة', desc: 'إيتاء الزكاة لمن وجبت عليه' },
      { name: 'الصيام', desc: 'صوم شهر رمضان' },
      { name: 'الحج', desc: 'حج البيت لمن استطاع إليه سبيلاً' },
    ],
  },
  {
    title: 'أركان الإيمان',
    hadith: 'أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ',
    hadithSource: 'رواه مسلم (8)',
    items: [
      'الإيمان بالله تعالى',
      'الإيمان بالملائكة',
      'الإيمان بالكتب السماوية',
      'الإيمان بالرسل والأنبياء',
      'الإيمان باليوم الآخر',
      'الإيمان بالقدر خيره وشره',
    ],
  },
];

const WUDU_STEPS = [
  {
    step: 1,
    title: 'النية',
    desc: 'ينوي الوضوء بقلبه رفع الحدث للتقرب إلى الله تعالى، والنية محلها القلب ولا يُشرع التلفظ بها.',
    evidence: 'قال النبي ﷺ: «إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ» (متفق عليه)',
  },
  {
    step: 2,
    title: 'التسمية',
    desc: 'يقول: بسم الله في بداية الوضوء.',
    evidence: 'قال النبي ﷺ: «لَا وُضُوءَ لِمَنْ لَمْ يَذْكُرِ اسْمَ اللَّهِ عَلَيْهِ» (رواه أبو داود والترمذي)',
  },
  {
    step: 3,
    title: 'غسل الكفين ثلاثاً',
    desc: 'يغسل كفيه ثلاث مرات قبل البدء في الوضوء.',
  },
  {
    step: 4,
    title: 'المضمضة',
    desc: 'يأخذ الماء بيده فيديره في فمه ثم يخرجه. يفعل ذلك ثلاث مرات.',
  },
  {
    step: 5,
    title: 'الاستنشاق والاستنثار',
    desc: 'يجذب الماء بأنفه ثم يخرجه (ينثره). يفعل ذلك ثلاث مرات.',
    evidence: 'قال النبي ﷺ: «إِذَا تَوَضَّأْتُمْ فَاجْعَلُوا فِي أَنْفُوكُمْ ثُمَّ اسْتَنْثِرُوا» (رواه أبو داود وابن ماجه)',
  },
  {
    step: 6,
    title: 'غسل الوجه ثلاثاً',
    desc: 'يغسل وجهه ثلاث مرات من منبت الشعر إلى أسفل الذقن طولاً، ومن الأذن إلى الأذن عرضاً.',
  },
  {
    step: 7,
    title: 'غسل اليدين إلى المرفقين ثلاثاً',
    desc: 'يغسل يده اليمنى إلى المرفق ثلاثاً، ثم يده اليسرى إلى المرفق ثلاثاً.',
    evidence: 'قال تعالى: ﴿وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ﴾ [المائدة: 6]',
  },
  {
    step: 8,
    title: 'مسح الرأس مرة واحدة',
    desc: 'يمسح رأسه مرة واحدة بيديه المبللتين من مقدمة الرأس إلى مؤخرته ثم يعود إلى المقدمة.',
  },
  {
    step: 9,
    title: 'مسح الأذنين مرة واحدة',
    desc: 'يمسح أذنيه مرة واحدة بالسبابتين من الداخل والإبهامين من الخارج بماء جديد.',
  },
  {
    step: 10,
    title: 'غسل القدمين إلى الكعبين ثلاثاً',
    desc: 'يغسل قدمه اليمنى إلى الكعب ثلاثاً، ثم قدمه اليسرى إلى الكعب ثلاثاً.',
    evidence: 'قال تعالى: ﴿وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ﴾ [المائدة: 6]',
  },
];

const SALAH_STEPS = [
  {
    step: 1,
    title: 'النية وتكبيرة الإحرام',
    desc: 'يستقبل القبلة وينوي الصلاة بقلبه ثم يرفع يديه حذو أذنيه ويقول: الله أكبر.',
    evidence: 'كان النبي ﷺ إذا قام إلى الصلاة رفع يديه حتى تكونا حذو منكبيه ثم يكبر (متفق عليه)',
  },
  {
    step: 2,
    title: 'وضع اليدين وقراءة الاستفتاح',
    desc: 'يضع يده اليمنى على اليسرى على صدره، ثم يقرأ دعاء الاستفتاح: «سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ».',
    evidence: 'رواه أبو داود والترمذي والنسائي',
  },
  {
    step: 3,
    title: 'التعوذ والبسملة وقراءة الفاتحة',
    desc: 'يتعوذ بالله من الشيطان الرجيم، ثم يقرأ البسملة، ثم يقرأ سورة الفاتحة كاملة وهي ركن من أركان الصلاة لا تصح إلا بها.',
    evidence: 'قال النبي ﷺ: «لَا صَلَاةَ لِمَنْ لَمْ يَقْرَأْ بِفَاتِحَةِ الْكِتَابِ» (متفق عليه)',
  },
  {
    step: 4,
    title: 'قراءة ما تيسر من القرآن',
    desc: 'يقرأ سورة أو آيات بعد الفاتحة في الركعتين الأوليين. وفي الأخريين يقرأ الفاتحة فقط.',
  },
  {
    step: 5,
    title: 'الركوع',
    desc: 'يكبر ثم يركع واضعاً يديه على ركبتيه ممدودتين الأصابع، ويظهر ظهره مستوياً. يقول في ركوعه: «سُبْحَانَ رَبِّيَ الْعَظِيمِ» ثلاث مرات أو أكثر.',
    evidence: 'قال تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا ارْكَعُوا وَاسْجُدُوا﴾ [الحج: 77]',
  },
  {
    step: 6,
    title: 'الرفع من الركوع',
    desc: 'يرفع رأسه ويقول: «سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ»، ثم يقول بعد الاعتدال: «رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ».',
    evidence: 'متفق عليه',
  },
  {
    step: 7,
    title: 'السجود الأول',
    desc: 'يكبر ثم يسجد على سبعة أعضاء: الجبهة والأنف، واليدان، والركبتان، وأطراف القدمين. يقول في سجوده: «سُبْحَانَ رَبِّيَ الْأَعْلَى» ثلاث مرات أو أكثر.',
    evidence: 'قال النبي ﷺ: «أُمِرْتُ أَنْ أَسْجُدَ عَلَى سَبْعَةِ أَعْظُمٍ» (متفق عليه)',
  },
  {
    step: 8,
    title: 'الجلوس بين السجدتين',
    desc: 'يرفع رأسه من السجود ويقول: «اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاجْبُرْنِي، وَارْفَعْنِي، وَارْزُقْنِي، وَاهْدِنِي، وَعَافِنِي، وَاعْفُ عَنِّي».',
    evidence: 'رواه أبو داود والترمذي وابن ماجه',
  },
  {
    step: 9,
    title: 'السجود الثاني',
    desc: 'يكبر ثم يسجد السجدة الثانية مثل الأولى، ثم يكبر ويرفع رأسه للركعة الثانية.',
  },
  {
    step: 10,
    title: 'التشهد الأول والأخير',
    desc: 'في الركعة الثانية يجلس للتشهد الأول. ويقول: «التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ».',
    evidence: 'متفق عليه من حديث ابن مسعود رضي الله عنه',
  },
  {
    step: 11,
    title: 'الصلاة على النبي ﷺ',
    desc: 'بعد التشهد الأخير يصلي على النبي ﷺ: «اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ».',
    evidence: 'متفق عليه',
  },
  {
    step: 12,
    title: 'التسليم',
    desc: 'يلتفت عن يمينه ويقول: «السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ»، ثم يلتفت عن يساره ويقول كذلك.',
    evidence: 'رواه مسلم وأبو داود والترمذي',
  },
];

export default function IslamicBasicsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('tawheed');

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'tawheed', label: 'التوحيد والعقيدة', icon: '☝️' },
    { id: 'wudu', label: 'كيفية الوضوء', icon: '💧' },
    { id: 'salah', label: 'كيفية الصلاة', icon: '🕌' },
    { id: 'pillars', label: 'أركان الإسلام والإيمان', icon: '🏛️' },
  ];

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
        <h1 className="text-white font-semibold text-lg">أساسيات الإسلام</h1>
        <div className="w-9" />
      </header>

      {/* Tabs */}
      <div className="sticky top-14 z-20 bg-[#000000]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 pb-12">

        {/* ===== Tawheed Tab ===== */}
        {activeTab === 'tawheed' && (
          <div className="space-y-10 mt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">التوحيد والعقيدة</h2>
              <p className="text-white/50 text-base max-w-2xl mx-auto">
                التوحيد هو أساس الإسلام وأعظم ما دعَت إليه الرسل
              </p>
            </div>

            {TAWHEED_SECTIONS[0]!.types!.map((type, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/15 transition-colors">
                <h3 className="text-xl font-bold text-green-400 mb-3">{type.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{type.desc}</p>
                <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                  <p className="text-white/90 text-base leading-loose text-center" style={{ fontFamily: 'var(--font-quran)' }}>
                    ﴿{type.verse}﴾
                  </p>
                  <p className="text-green-400/50 text-xs text-center mt-2">{type.source}</p>
                </div>
              </div>
            ))}

            {/* Pillars of Islam */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">{TAWHEED_SECTIONS[1]!.title}</h3>
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 mb-5">
                <p className="text-white text-base leading-loose text-center" style={{ fontFamily: 'var(--font-quran)' }}>
                  «{TAWHEED_SECTIONS[1]!.hadith}»
                </p>
                <p className="text-green-400/50 text-xs text-center mt-2">{TAWHEED_SECTIONS[1]!.hadithSource}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TAWHEED_SECTIONS[1]!.pillars!.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-sm font-bold text-green-400 mb-1">{i + 1}. {p.name}</h4>
                    <p className="text-xs text-white/50">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillars of Iman */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">{TAWHEED_SECTIONS[2]!.title}</h3>
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 mb-5">
                <p className="text-white text-base leading-loose text-center" style={{ fontFamily: 'var(--font-quran)' }}>
                  «{TAWHEED_SECTIONS[2]!.hadith}»
                </p>
                <p className="text-blue-400/50 text-xs text-center mt-2">{TAWHEED_SECTIONS[2]!.hadithSource}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TAWHEED_SECTIONS[2]!.items!.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-sm font-bold text-blue-400">{i + 1}. {item}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Nullifiers of Tawheed */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/15">
              <h3 className="text-xl font-bold text-white mb-4 text-center">نواقض التوحيد</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4 text-center">
                بيّن سماحة الشيخ عبد العزيز بن باز رحمه الله في فتاويه ومحاضراته أن نواقض التوحيد هي الأمور التي تُخرج الإنسان من الإسلام، وهي مستمدة من كتاب الله وسنة رسوله ﷺ:
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: 'الشرك بالله في العبادة',
                    desc: 'صرف شيء من أنواع العبادة لغير الله كالدعاء والاستغاثة والنذر والذبح لغير الله. قال تعالى: ﴿وَلَقَدْ أُوحِيَ إِلَيْكَ وَإِلَى الَّذِينَ مِن قَبْلِكَ لَئِنْ أَشْرَكْتَ لَيَحْبَطَنَّ عَمَلُكَ وَلَتَكُونَنَّ مِنَ الْخَاسِرِينَ﴾ [الزمر: 65]',
                  },
                  {
                    title: 'جعل الوسائط بين الله والخلق',
                    desc: 'جعل وسائط بينك وبين الله تدعوهم وتسألهم الشفاعة وتتوكل عليهم. قال تعالى: ﴿وَيَعْبُدُونَ مِن دُونِ اللَّهِ مَا لَا يَضُرُّهُمْ وَلَا يَنفَعُهُمْ وَيَقُولُونَ هَٰؤُلَاءِ شُفَعَاؤُنَا عِندَ اللَّهِ﴾ [يونس: 18]',
                  },
                  {
                    title: 'اعتقاد أن غير هدي النبي ﷺ أكمل',
                    desc: 'من اعتقد أن غير هدي النبي ﷺ أكمل من هديه أو أن حكم غيره أحسن من حكمه - كالذي يفضل حكم الطواغيت على حكمه - فهو كافر. قال تعالى: ﴿فَلَا وَرَبِّكَ لَا يُؤْمِنُونَ حَتَّىٰ يُحَكِّمُوكَ فِيمَا شَجَرَ بَيْنَهُمْ﴾ [النساء: 65]',
                  },
                  {
                    title: 'بغض شيء مما جاء به النبي ﷺ',
                    desc: 'من أبغض شيئاً مما جاء به الرسول ﷺ ولو عمل به كفر. قال تعالى: ﴿ذَٰلِكَ بِأَنَّهُمْ كَرِهُوا مَا أَنزَلَ اللَّهُ فَأَحْبَطَ أَعْمَالَهُمْ﴾ [محمد: 9]',
                  },
                  {
                    title: 'الاستهزاء بشيء من الدين',
                    desc: 'من استهزأ بشيء من دين الرسول ﷺ أو ثوابه أو عقابه كفر. قال تعالى: ﴿قُلْ أَبِاللَّهِ وَآيَاتِهِ وَرَسُولِهِ كُنتُمْ تَسْتَهْزِئُونَ ۝ لَا تَعْتَذِرُوا قَدْ كَفَرْتُم بَعْدَ إِيمَانِكُمْ﴾ [التوبة: 65-66]',
                  },
                  {
                    title: 'السحر',
                    desc: 'ومن السحر صرف الجن. فمن فعله أو رضي به كفر. قال تعالى: ﴿وَمَا يُعَلِّمَانِ مِنْ أَحَدٍ حَتَّىٰ يَقُولَا إِنَّمَا نَحْنُ فِتْنَةٌ فَلَا تَكْفُرْ﴾ [البقرة: 102]',
                  },
                  {
                    title: 'مظاهرة المشركين ومعاونتهم على المسلمين',
                    desc: 'قال تعالى: ﴿وَمَن يَتَوَلَّهُم مِّنكُمْ فَإِنَّهُ مِنْهُمْ ۚ إِنَّ اللَّهَ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ﴾ [المائدة: 51]',
                  },
                  {
                    title: 'اعتقاد الخروج عن شريعة محمد ﷺ',
                    desc: 'اعتقاد أن بعض الناس يسعه الخروج عن شريعة محمد ﷺ كما وسع الخضر الخروج عن شريعة موسى عليهما السلام. قال تعالى: ﴿وَمَن يَبْتَغِ غَيْرَ الْإِسْلَامِ دِينًا فَلَن يُقْبَلَ مِنْهُ وَهُوَ فِي الْآخِرَةِ مِنَ الْخَاسِرِينَ﴾ [آل عمران: 85]',
                  },
                  {
                    title: 'الإعراض عن دين الله',
                    desc: 'الإعراض عن دين الله لا يتعلمه ولا يعمل به. قال تعالى: ﴿وَالَّذِينَ كَفَرُوا عَمَّا أُنذِرُوا مُعْرِضُونَ﴾ [الأحقاف: 3]',
                  },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/5">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed mr-9">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs text-center mt-4">
                المصدر: فتاوى ومقالات متنوعة - سماحة الشيخ عبد العزيز بن باز رحمه الله
              </p>
            </div>
          </div>
        )}

        {/* ===== Wudu Tab ===== */}
        {activeTab === 'wudu' && (
          <div className="space-y-8 mt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">كيفية الوضوء</h2>
              <p className="text-white/50 text-base max-w-2xl mx-auto">
                خطوات الوضوء الصحيحة خطوة بخطوة كما علمنا النبي ﷺ
              </p>
            </div>

            {/* Video */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-white/70 text-sm">فيديو توضيحي - كيفية الوضوء</span>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/4H2hJfSjJiI"
                  title="كيفية الوضوء"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {WUDU_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/15 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {step.step}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed mb-2">{step.desc}</p>
                      {step.evidence && (
                        <p className="text-xs text-green-400/60">{step.evidence}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/15">
              <p className="text-sm text-blue-400/80 leading-relaxed text-center">
                <span className="font-bold">ملاحظة:</span> يجب الترتيب بين الأعضاء والموالاة (عدم الفصل الطويل بين غسل الأعضاء)، ولا يجوز ترك أي عضو بدون غسل
              </p>
            </div>

            {/* Nawaqid al-Wudu */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/15">
              <h3 className="text-lg font-bold text-white mb-4 text-center">مبطلات الوضوء</h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'الخارج من السبيلين',
                    desc: 'البول والغائط والريح (الحدث الأصغر والأكبر) - قال تعالى: ﴿أَوْ جَاءَ أَحَدٌ مِّنكُم مِّنَ الْغَائِطِ﴾ [المائدة: 6]',
                  },
                  {
                    title: 'خروج الريح',
                    desc: 'من أحدث في صلاته أو كان على وضوء فخرجت منه ريح وجب عليه تجديد الوضوء - قال النبي ﷺ: «لَا تُقْبَلُ صَلَاةُ مَنْ أَحْدَثَ حَتَّى يَتَوَضَّأَ» (متفق عليه)',
                  },
                  {
                    title: 'زوال العقل',
                    desc: 'بنوم عميق أو إغماء أو سكر أو جنون أو تخدير - لأن النائم لا يشعر بما يخرج منه',
                  },
                  {
                    title: 'مس الفرج باليد بدون حائل',
                    desc: 'قال النبي ﷺ: «مَنْ مَسَّ فَرْجَهُ فَلْيَتَوَضَّأْ» (رواه أحمد وأبو داود)',
                  },
                  {
                    title: 'أكل لحم الإبل',
                    desc: 'قال النبي ﷺ: «تَوَضَّئُوا مِنْ لُحُومِ الْإِبِلِ» (رواه مسلم)',
                  },
                  {
                    title: 'مس المرأة بشهوة بدون حائل',
                    desc: 'عند بعض العلماء - قال تعالى: ﴿أَوْ لَامَسْتُمُ النِّسَاءَ﴾ [المائدة: 6]',
                  },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/5">
                    <div className="flex items-start gap-3 mb-1">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mr-9">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== Salah Tab ===== */}
        {activeTab === 'salah' && (
          <div className="space-y-8 mt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">كيفية الصلاة</h2>
              <p className="text-white/50 text-base max-w-2xl mx-auto">
                خطوات الصلاة الصحيحة كما صلاها النبي ﷺ
              </p>
            </div>

            {/* Video */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-white/70 text-sm">فيديو توضيحي - كيفية الصلاة</span>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/EkSLz4CJfjQ"
                  title="كيفية الصلاة"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {SALAH_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/15 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {step.step}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed mb-2">{step.desc}</p>
                      {step.evidence && (
                        <p className="text-xs text-green-400/60">{step.evidence}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Conditions of Salah */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 text-center">شروط الصلاة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'الإسلام',
                  'العقل',
                  'التمييز',
                  'دخول الوقت',
                  'الطهارة من الحدث',
                  'الطهارة من النجاسة',
                  'ستر العورة',
                  'استقبال القبلة',
                  'النية',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Obligations vs Pillars */}
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/15">
              <h3 className="text-lg font-bold text-white mb-4 text-center">واجبات الصلاة (غير الأركان)</h3>
              <div className="space-y-2">
                {[
                  'جميع التكبيرات غير تكبيرة الإحرام',
                  'قول: سمع الله لمن حمده (للإمام والمنفرد)',
                  'قول: ربنا ولك الحمد',
                  'قول: سبحان ربي العظيم في الركوع',
                  'قول: سبحان ربي الأعلى في السجود',
                  'قول: رب اغفر لي بين السجدتين',
                  'التشهد الأول',
                  'الجلوس للتشهد الأول',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/60">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 text-center mt-4">
                من ترك واجباً من هذه الواجبات سهواً سجد للسهو قبل السلام
              </p>
            </div>

            {/* مبطلات الصلاة */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/15">
              <h3 className="text-lg font-bold text-white mb-4 text-center">مبطلات الصلاة</h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'الحدث أثناء الصلاة',
                    desc: 'إذا أحدث المصلي في صلاته بطلت صلاته ولا تصح - قال النبي ﷺ: «لَا تُقْبَلُ صَلَاةُ مَنْ أَحْدَثَ حَتَّى يَتَوَضَّأَ» (متفق عليه)',
                  },
                  {
                    title: 'الكلام العمد في غير مصلحة الصلاة',
                    desc: 'من تعمّد الكلام في صلاته بطلت صلاته إلا إذا كان جاهلاً أو ناسياً. قال النبي ﷺ: «إِنَّ هَذِهِ الصَّلَاةَ لَا يَصْلُحُ فِيهَا شَيْءٌ مِنْ كَلَامِ النَّاسِ» (رواه مسلم)',
                  },
                  {
                    title: 'الضحك في الصلاة',
                    desc: 'الضحك يبطل الصلاة بالإجماع، وأما التبسم فلا يبطلها.',
                  },
                  {
                    title: 'الأكل والشرب عمدًا في الصلاة',
                    desc: 'من أكل أو شرب عمدًا في صلاته بطلت صلاته. وأما من نسي فأكل أو شرب فلا شيء عليه.',
                  },
                  {
                    title: 'كثرة الحركة من غير حاجة',
                    desc: 'إذا كثرت حركات المصلي من غير ضرورة بطلت صلاته. قال النبي ﷺ: «إِنَّ فِي الصَّلَاةِ شُغْلًا» (متفق عليه)',
                  },
                  {
                    title: 'تعمد كشف العورة',
                    desc: 'من كشف عورته عمدًا في صلاته ولم يسترها بطلت صلاته.',
                  },
                  {
                    title: 'تعمد الانحراف عن القبلة',
                    desc: 'من انحرف عن القبلة بكل بدنه في صلاته عمدًا بطلت صلاته.',
                  },
                  {
                    title: 'تعمد زيادة ركن أو ترك ركن',
                    desc: 'من زاد ركناً أو ترك ركناً عمدًا بطلت صلاته.',
                  },
                  {
                    title: 'تعمد تقديم الإمام أو المسابقة',
                    desc: 'من سبق إمامه عمدًا بطلت صلاته. قال النبي ﷺ: «أَمَا يَخْشَى الَّذِي يَرْفَعُ رَأْسَهُ قَبْلَ الإِمَامِ أَنْ يُحَوِّلَ اللَّهُ رَأْسَهُ رَأْسَ حِمَارٍ» (متفق عليه)',
                  },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/5">
                    <div className="flex items-start gap-3 mb-1">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mr-9">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== Pillars Tab ===== */}
        {activeTab === 'pillars' && (
          <div className="space-y-10 mt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">أركان الإسلام والإيمان</h2>
              <p className="text-white/50 text-base max-w-2xl mx-auto">
                الأسس التي يقوم عليها دين الإسلام
              </p>
            </div>

            {/* Pillars of Islam */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">أركان الإسلام الخمسة</h3>
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 mb-5">
                <p className="text-white text-base leading-loose text-center" style={{ fontFamily: 'var(--font-quran)' }}>
                  «بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ»
                </p>
                <p className="text-green-400/50 text-xs text-center mt-2">متفق عليه: رواه البخاري (8) ومسلم (16)</p>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'الشهادتان', desc: 'شهادة أن لا إله إلا الله وأن محمداً رسول الله - وهي أعظم الأركان وأهمها', icon: '☝️' },
                  { name: 'الصلاة', desc: 'خمس صلوات في اليوم والليلة - عمود الدين وثاني أركان الإسلام', icon: '🕌' },
                  { name: 'الزكاة', desc: 'إخراج جزء من المال للمستحقين - تطهير للنفس والمال', icon: '💰' },
                  { name: 'الصيام', desc: 'الإمساك عن المفطرات من الفجر إلى المغرب في شهر رمضان', icon: '🌙' },
                  { name: 'الحج', desc: 'قصد البيت الحرام لأداء المناسك - لمن استطاع إليه سبيلاً', icon: '🕋' },
                ].map((pillar, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-2xl">{pillar.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-green-400 mb-1">{i + 1}. {pillar.name}</h4>
                      <p className="text-xs text-white/50">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillars of Iman */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">أركان الإيمان الستة</h3>
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 mb-5">
                <p className="text-white text-base leading-loose text-center" style={{ fontFamily: 'var(--font-quran)' }}>
                  «أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ»
                </p>
                <p className="text-blue-400/50 text-xs text-center mt-2">رواه مسلم (8) - حديث جبريل المشهور</p>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'الإيمان بالله', desc: 'الإيمان بوجوده ووحدانيته وربوبيته وألوهيته وأسمائه وصفاته' },
                  { name: 'الإيمان بالملائكة', desc: 'الإيمان بوجودهم وبما عُلم من أسمائهم وصفاتهم وأعمالهم' },
                  { name: 'الإيمان بالكتب', desc: 'الإيمان بجميع الكتب السماوية: القرآن والتوراة والإنجيل والزبور وصحف إبراهيم وموسى' },
                  { name: 'الإيمان بالرسل', desc: 'الإيمان بجميع الأنبياء والرسل من آدم إلى محمد ﷺ' },
                  { name: 'الإيمان باليوم الآخر', desc: 'الإيمان بالبعث والحساب والجنة والنار وكل ما أخبر به الله ورسوله' },
                  { name: 'الإيمان بالقدر', desc: 'الإيمان بأن كل خير وشر هو بقضاء الله وقدره علمه ومشيئته وخلقه' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-blue-400 mb-1">{item.name}</h4>
                      <p className="text-xs text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ihsan */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">الإحسان</h3>
              <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                <p className="text-white text-base leading-loose text-center" style={{ fontFamily: 'var(--font-quran)' }}>
                  «أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ»
                </p>
                <p className="text-purple-400/50 text-xs text-center mt-2">رواه مسلم (8) - حديث جبريل</p>
              </div>
              <p className="text-white/50 text-sm text-center mt-4 leading-relaxed">
                الإحسان هو أعلى مراتب الدين، وهو أن يعبد المسلم الله كأنه يراه بعينه، فإن لم يستطع فليعلم أن الله يراه
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
