import React, { useState, useEffect } from 'react';
import { Phone, ChevronUp } from 'lucide-react';
import ZaloIcon from './icons/ZaloIcon';

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-center gap-3 sm:gap-3.5 z-50 select-none">
      {/* 1. Official Zalo Button */}
      <a
        href="https://zalo.me/0919006030"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0068FF] shadow-lg shadow-blue-600/40 flex items-center justify-center transition-all hover:scale-110 shrink-0 p-2 border-2 border-white/80"
        title="Chat Zalo CSKH (0919 006 030)"
      >
        <ZaloIcon className="w-full h-full" />
      </a>

      {/* 2. Hotline Call Button */}
      <a
        href="tel:0919006030"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#C5A572] hover:bg-[#B8941F] text-white shadow-lg shadow-amber-900/30 flex items-center justify-center transition-all hover:scale-110 shrink-0 relative border-2 border-white/80"
        title="Gọi điện tư vấn (0919 006 030)"
      >
        <span className="absolute inset-0 rounded-full bg-[#C5A572] animate-ping opacity-50 -z-10"></span>
        <Phone className="w-5 h-5 fill-current" />
      </a>

      {/* 3. Back to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 shrink-0 border border-slate-700/50"
          title="Lên đầu trang"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

