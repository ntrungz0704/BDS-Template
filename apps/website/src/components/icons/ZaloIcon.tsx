import React from 'react';

interface ZaloIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: 'solid' | 'glyph';
}

export default function ZaloIcon({ className = 'w-5 h-5', variant = 'solid', ...props }: ZaloIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {variant === 'solid' && (
        <path
          d="M24 4C12.954 4 4 12.518 4 23.024C4 28.534 6.47 33.486 10.494 36.942L8.528 43.522C8.326 44.198 9.052 44.764 9.65 44.348L16.956 39.284C21.534 40.204 23.988 40.204 23.988 40.204C35.034 40.204 44 31.686 44 21.18C44 10.674 35.046 4 24 4Z"
          fill="#0068FF"
        />
      )}
      <text
        x="24"
        y="25.5"
        textAnchor="middle"
        dominantBaseline="central"
        fill={variant === 'glyph' ? '#0068FF' : '#FFFFFF'}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="13.5"
        letterSpacing="0.2px"
      >
        Zalo
      </text>
    </svg>
  );
}
