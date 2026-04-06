# Islamic Lighthouse Knowledge Base

## Project Overview

**Project Name:** Islamic Lighthouse (المنارة الإسلامية)
**Type:** Web Application (Next.js)
**Purpose:** Comprehensive Islamic platform providing Quran reading with audio, hadith collection, duas & adhkar

---

## Tech Stack

| Technology | Version |
|------------|---------|
| Next.js | 16.2.2 |
| React | 19.2.4 |
| Tailwind CSS | 4 |
| TypeScript | 5 |
| Fonts | Cairo, Amiri, Scheherazade_New (Google Fonts) |

### API Integration
- **Quran API:** `https://api.quran.com/api/v4` (verses, chapters, reciters)
- **Audio:** `https://verses.quran.com` (recitation audio files)

---

## Project Structure

```
islamic-lighthousee/
├── app/
│   ├── page.tsx                    # Landing page (wudu, prayer, sunnah, advice)
│   ├── layout.tsx                  # Root layout with fonts
│   ├── globals.css                 # Global styles
│   ├── hadith/
│   │   ├── page.tsx               # Hadith display with explanation
│   │   └── layout.tsx
│   ├── duas/
│   │   └── page.tsx               # Duas & adhkar (prophets, morning, evening, protection)
│   └── quran/
│       ├── page.tsx               # Main Quran reader with audio
│       ├── layout.tsx
│       ├── lib/types.ts           # TypeScript types & constants
│       ├── hooks/useAudio.ts      # Audio functionality
│       ├── globals.css
│       └── components/
│           ├── Sidebar.tsx        # Surah list navigation
│           ├── Header.tsx         # Page header with controls
│           ├── QuranContent.tsx   # Ayah display with pagination
│           ├── AudioPlayer.tsx    # Audio controls & reciter selection
│           ├── TafsirPanel.tsx   # Tafsir display panel
│           └── SettingsPanel.tsx # Font, size, color settings
├── public/
│   ├── bg-mosque.jpg              # Background image
│   ├── lighthouse.png             # App icon
│   └── ...
└── package.json
```

---

## Key Features

### 1. Landing Page (/)
- Welcome message with Islamic greeting
- Feature cards linking to Quran, Hadith, Duas
- Wudu steps (10 steps with descriptions)
- Prayer steps (7 steps)
- Sunnah practices (8 items)
- Spiritual advice (8 tips)

### 2. Quran Reader (/quran)
- Surah navigation sidebar
- Page-by-page viewing
- Audio playback with multiple reciters
- Font family selection (Quran, Amiri, Cairo)
- Font size adjustment
- Color scheme options (green, blue, red, brown, grey, purple)
- Tafsir panel
- Play modes: single ayah, continuous, repeat

### 3. Hadith Page (/hadith)
- Display hadith with Arabic text
- Narrator information
- Source reference
- Detailed explanation with 5 points
- Conclusion

### 4. Duas Page (/duas)
- Four categories:
  - أدعية الأنبياء (Prophet duas from Quran)
  - أذكار الصباح (Morning adhkar)
  - أذكار المساء (Evening adhkar)
  - أذكار التحصين (Protection duas)

---

## Design System

### Color Palette
| Usage | Color |
|-------|-------|
| Primary | Green (#22c55e) |
| Background | Dark (#080a0f, #151820) |
| Text Primary | White |
| Text Secondary | White/50 - White/70 |
| Border | White/5 - White/10 |
| Accents | Amber, Purple, Blue (for sections) |

### Typography
- **Arabic (Quran):** Scheherazade_New
- **Arabic (UI):** Cairo
- **Arabic (Emphasis):** Amiri

### Layout
- RTL direction (Arabic)
- Dark theme throughout
- Glassmorphism effects (backdrop-blur)
- Smooth transitions & hover states

---

## Developer Persona

### Software Architecture
- Expert in scalable system design
- Clean architecture patterns
- Component-based design
- Type-safe code with TypeScript
- Performance optimization (Next.js App Router)

### Full Stack Capabilities
- Frontend: React, Next.js, Tailwind CSS
- API Integration: REST APIs, audio streaming
- State management: React hooks (useState, useEffect, useCallback, useRef)
- TypeScript best practices

### UI/UX Design
- Glassmorphism & dark theme expertise
- Arabic RTL design patterns
- Responsive design (mobile-first)
- Smooth animations & micro-interactions
- Accessibility considerations

### Islamic Knowledge
- Deep understanding of Quran structure
- Hadith classification & sources
- Islamic jurisprudence (Fiqh)
- Duas & adhkar from authentic sources
- Wudu & prayer procedures
- Sunnah practices

---

## Coding Standards

1. **TypeScript:** Strict typing, interfaces for all data structures
2. **React:** Functional components, hooks, proper cleanup in useEffect
3. **Styling:** Tailwind CSS utility classes, consistent spacing
4. **Performance:** Lazy loading, memoization where needed, proper audio cleanup
5. **RTL:** Proper Arabic text handling, correct alignment

---

## Authentication & State

- Currently no authentication required
- Local state management via React hooks
- Audio state managed with useRef for performance

---

## Future Enhancements (Roadmap)

1. More hadith collections
2. Prayer times integration
3. Islamic calendar
4. Progress tracking for Quran reading
5. Bookmarking system
6. Search functionality
7. Tafsir improvements
8. Multi-language support

---

## Important Notes

- All content is in Arabic
- API calls to external Quran.com API
- Audio streaming from verses.quran.com
- Must handle loading states and error gracefully
- Audio playback requires proper cleanup to prevent memory leaks