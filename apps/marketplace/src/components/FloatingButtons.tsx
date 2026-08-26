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
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* 1. Official Zalo Button */}
      <a
        href="https://zalo.me/0919006030"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#0068FF] overflow-hidden shadow-lg shadow-blue-600/40 flex items-center justify-center transition-transform hover:scale-110 group p-2"
        title="Chat Zalo CSKH (0919 006 030)"
      >
        <ZaloIcon className="w-full h-full" />
      </a>

      {/* 2. Hotline Call Button */}
      <a
        href="tel:0919006030"
        className="w-12 h-12 rounded-full bg-[#C5A572] hover:bg-[#B8941F] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 relative"
        title="Gọi điện tư vấn"
      >
        <span className="absolute inset-0 rounded-full bg-[#C5A572] animate-ping opacity-75"></span>
        <Phone className="w-5 h-5 fill-current z-10" />
      </a>

      {/* 3. Back to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110"
          title="Lên đầu trang"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
