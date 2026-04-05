export interface Surah {
  id: number;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  revelation_place: string;
  bismillah_pre: boolean;
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface Ayah {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  page_number: number;
  juz_number: number;
  hizb_number: number;
  rub_number: number;
}

export interface Reciter {
  id: string;
  name: string;
}

export const RECITERS: Reciter[] = [
  { id: 'Husary_128kbps', name: 'محمود خليل الحصري' },
  { id: 'Alafasy_128kbps', name: 'مشاري العفاسي' },
  { id: 'Abdul_Basit_Murattal_192kbps', name: 'عبدالباسط - مرتل' },
  { id: 'Abdul_Basit_Mujawwad_128kbps', name: 'عبدالباسط - مجود' },
  { id: 'ahmed_ibn_ali_al_ajamy_128kbps', name: 'أحمد العجمي' },
  { id: 'Abu_Bakr_Ash-Shaatree_128kbps', name: 'أبو بكر الشاطري' },
  { id: 'Minshawy_Murattal_128kbps', name: 'المنشاوي - مرتل' },
  { id: 'Minshawy_Mujawwad_192kbps', name: 'المنشاوي - مجود' },
  { id: 'MaherAlMuaiqly128kbps', name: 'ماهر المعيقلي' },
  { id: 'Ghamadi_40kbps', name: 'سعد الغامدي' },
  { id: 'Abdurrahmaan_As-Sudais_192kbps', name: 'عبد الرحمن السديس' },
  { id: 'Saood_ash-Shuraym_128kbps', name: 'سعود الشريم' },
];

export const API_BASE = 'https://api.quran.com/api/v4';
export const AUDIO_BASE = 'https://www.everyayah.com/data';