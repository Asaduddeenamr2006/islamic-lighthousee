'use client';

import Link from 'next/link';

const HADITH_DATA = {
  title: 'حديث: بُنِيَ الإسلامُ على خمس',
  narrator: 'عبد الله بن عمر رضي الله عنهما',
  source: 'متفق عليه - صحيح البخاري (8) ومسلم (16)',
  arabicText: `عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ رَضِيَ اللَّهُ عَنْهُمَا قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ:

بُنِيَ الإِسْلامُ عَلَى خَمْسٍ:

شَهَادَةِ أَنْ لا إِلَهَ إِلا اللَّهُ وَأَنَّ مُحَمَّداً رَسُولُ اللَّهِ،
وَإِقَامِ الصَّلاةِ،
وَإِيتَاءِ الزَّكَاةِ،
وَحَجِّ الْبَيْتِ،
وَصَوْمِ رَمَضَانَ.`,
  explanation: {
    introduction: `هذا الحديث العظيم يُعدّ من أعظم أحاديث النبي صلى الله عليه وسلم، فقد بيّن فيه أركان الإسلام الخمسة التي يقوم عليها الدين. وقد جاء هذا الحديث جامعاً مانعاً، يوضح الأسس التي بُني عليها هذا الدين العظيم.`,
    points: [
      {
        title: 'شهادة أن لا إله إلا الله وأن محمداً رسول الله',
        desc: 'وهي الركن الأول والأساس الذي يدخل به الإنسان في الإسلام. ومعنى "لا إله إلا الله" أنه لا معبود بحق إلا الله تعالى، ومعنى "محمد رسول الله" أنه يجب طاعته فيما أمر وتصديقه فيما أخبر واجتناب ما نهى عنه. وهي مفتاح الدعوة الإسلامية وأساسها.',
      },
      {
        title: 'إقام الصلاة',
        desc: 'الصلاة هي الركن الثاني من أركان الإسلام، وهي عمود الدين كما جاء في الحديث الشريف. فرض الله على المسلمين خمس صلوات في اليوم والليلة: الفجر والظهر والعصر والمغرب والعشاء. وهي صلة بين العبد وربه، وتُقام في أوقاتها المحددة.',
      },
      {
        title: 'إيتاء الزكاة',
        desc: 'الزكاة هي الركن الثالث، وهي فريضة مالية تجب على كل مسلم بلغ ماله النصاب وحال عليه الحول. مقدارها 2.5% من المال المدخر. والغرض منها تطهير النفس من البخل وإعانة الفقراء والمحتاجين وتكافل المجتمع الإسلامي.',
      },
      {
        title: 'حج البيت',
        desc: 'الحج هو الركن الرابع، وهو فريضة تجب مرة واحدة في العمر على كل مسلم بالغ عاقل مستطيع بدنياً ومالياً. يكون في شهر ذي الحجة ويشمل مناسك متعددة مثل الإحرام والطواف والسعي والوقوف بعرفة. وهو مؤتمر إسلامي عظيم يجتمع فيه المسلمون من كل أنحاء العالم.',
      },
      {
        title: 'صوم رمضان',
        desc: 'الصوم هو الركن الخامس، وهو فريضة تجب على كل مسلم بالغ عاقل قادر في شهر رمضان المبارك. يكون الإمساك عن الطعام والشراب وسائر المفطرات من طلوع الفجر إلى غروب الشمس. والغرض منه تقوى الله وتزكية النفس والشعور بالفقراء.',
      },
    ],
    conclusion: `هذا الحديث يوضح أن الإسلام مبني على أسس واضحة ومحددة، وأن هذه الأركان الخمسة هي الأساس الذي يقوم عليه دين الإسلام. ومن الجدير بالذكر أن هذه الأركان ليست كل ما في الإسلام، بل هي أركانه الأساسية التي لا يقوم الدين بدونها. وهناك فرائض وأحكام أخرى مكملة لهذه الأركان.`,
  },
};

export default function HadithPage() {
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
          الأحاديث النبوية
        </h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Hadith Card */}
          <div className="rounded-2xl border border-white/10 bg-[#1a1d26] overflow-hidden shadow-xl mb-8">
            {/* Card Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-white/5">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1">{HADITH_DATA.title}</h2>
              <p className="text-sm text-white/50">{HADITH_DATA.narrator}</p>
            </div>

            {/* Hadith Text */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div 
                className="text-xl sm:text-2xl lg:text-3xl leading-[2.5rem] sm:leading-[3rem] lg:leading-[3.5rem] text-white/90 text-right whitespace-pre-line"
                style={{ fontFamily: 'var(--font-quran)' }}
              >
                {HADITH_DATA.arabicText}
              </div>
            </div>

            {/* Source */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/5 bg-white/[0.02]">
              <p className="text-xs sm:text-sm text-green-400/80">{HADITH_DATA.source}</p>
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-2xl border border-white/10 bg-[#1a1d26] overflow-hidden shadow-xl">
            {/* Explanation Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-white/5">
              <h2 className="text-lg sm:text-xl font-bold text-white">شرح الحديث</h2>
            </div>

            {/* Introduction */}
            <div className="p-4 sm:p-6 lg:p-8">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
                {HADITH_DATA.explanation.introduction}
              </p>

              {/* Points */}
              <div className="space-y-6">
                {HADITH_DATA.explanation.points.map((point, index) => (
                  <div key={index} className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">{point.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed mr-11">
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="mt-8 p-4 sm:p-5 rounded-xl bg-green-500/5 border border-green-500/10">
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {HADITH_DATA.explanation.conclusion}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
