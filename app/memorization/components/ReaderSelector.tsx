'use client';

import { RECITERS } from '../../quran/lib/types';

interface ReaderSelectorProps {
  selectedReaders: string[];
  onChange: (readers: string[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReaderSelector({
  selectedReaders,
  onChange,
  isOpen,
  onClose,
}: ReaderSelectorProps) {
  const toggleReader = (readerId: string) => {
    if (selectedReaders.includes(readerId)) {
      if (selectedReaders.length > 1) {
        onChange(selectedReaders.filter(id => id !== readerId));
      }
    } else {
      onChange([...selectedReaders, readerId]);
    }
  };

  const selectAll = () => {
    onChange(RECITERS.map(r => r.id));
  };

  const clearAll = () => {
    onChange([RECITERS[0].id]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-[#1a1d26] rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">اختيار القراء</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/70"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 p-4 border-b border-white/5">
          <button
            onClick={selectAll}
            className="flex-1 py-2 px-3 rounded-lg bg-green-500/20 text-green-400 text-sm hover:bg-green-500/30 transition-colors"
          >
            تحديد الكل
          </button>
          <button
            onClick={clearAll}
            className="flex-1 py-2 px-3 rounded-lg bg-white/5 text-white/70 text-sm hover:bg-white/10 transition-colors"
          >
            إلغاء الكل
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {RECITERS.map((reciter) => {
            const isSelected = selectedReaders.includes(reciter.id);
            return (
              <button
                key={reciter.id}
                onClick={() => toggleReader(reciter.id)}
                className={`w-full p-3 rounded-xl flex items-center justify-between mb-2 transition-all ${
                  isSelected 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                }`}
              >
                <span className={`text-sm ${isSelected ? 'text-white' : 'text-white/70'}`}>
                  {reciter.name}
                </span>
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-white/30'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
          >
            تم ({selectedReaders.length} قارئ مختار)
          </button>
        </div>
      </div>
    </div>
  );
}