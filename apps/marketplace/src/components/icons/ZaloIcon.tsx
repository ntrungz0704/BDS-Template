import React from 'react';

interface ZaloIconProps {
  className?: string;
  variant?: 'solid' | 'glyph';
}

export default function ZaloIcon({ className = 'w-5 h-5', variant = 'glyph' }: ZaloIconProps) {
  return (
    <img
      src="/icons/zalo.png"
      alt="Zalo"
      className={`${className} object-contain select-none inline-block`}
      loading="lazy"
      draggable={false}
    />
  );
}
