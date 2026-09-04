import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const FacebookIcon = ({ className = 'w-4 h-4', ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7A10.02 10.02 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
  </svg>
);

export const TiktokIcon = ({ className = 'w-4 h-4', ...props }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M16.656 1.029c1.637-.025 3.262-.012 4.886-.025.054 2.031.878 3.859 2.189 5.213 1.411 1.271 3.247 2.095 5.299 2.237v5.036a12.05 12.05 0 0 1-7.276-2.375c-.012 3.649.012 7.298-.025 10.934-.103 1.853-.719 3.543-1.687 4.923-1.652 2.366-4.328 3.919-7.385 4.011a9.31 9.31 0 0 1-5.099-1.296C5.05 28.178 3.32 25.596 3 22.552a23.7 23.7 0 0 1-.012-1.862c.49-4.779 4.494-8.476 9.361-8.476.547 0 1.083.047 1.548.128.025 1.849-.05 3.699-.05 5.548a4.22 4.22 0 0 0-1.42-.242 4.3 4.3 0 0 0-4.054 2.891 4.63 4.63 0 0 0-.175 2.012c.332 2.046 2.086 3.59 4.382 3.586a4.31 4.31 0 0 0 3.452-2.012c.267-.372.45-.822.512-1.325.125-2.237.075-4.461.087-6.698.012-5.036-.012-10.06.025-15.083Z" />
  </svg>
);

export const YoutubeIcon = ({ className = 'w-4 h-4', ...props }: IconProps) => (
  <svg viewBox="0 0 48 34" fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M47.52 7.334s-.47-3.331-1.908-4.798C43.786.61 41.74.601 40.803.489 34.086 0 24 0 24 0S13.914 0 7.197.489C6.258.601 4.213.61 2.386 2.536.948 4.003.48 7.334.48 7.334S0 11.247 0 15.158v3.668c0 3.912.48 7.824.48 7.824s.468 3.33 1.906 4.797c1.827 1.926 4.226 1.866 5.294 2.067C11.52 33.885 24 34 24 34s10.086-.015 16.803-.505c.937-.113 2.983-.122 4.809-2.048 1.438-1.467 1.908-4.797 1.908-4.797S48 22.738 48 18.826v-3.668c0-3.911-.48-7.824-.48-7.824ZM19.044 23.27V9.688l12.968 6.814-12.968 6.768Z" />
  </svg>
);

export const InstagramIcon = ({ className = 'w-4 h-4', ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

export const LinkedinIcon = ({ className = 'w-4 h-4', ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
    <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5ZM8 19H5V8h3v11ZM6.5 6.732A1.757 1.757 0 1 1 6.5 3.2a1.757 1.757 0 0 1 0 3.532ZM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19Z" />
  </svg>
);

export const ZaloIcon = ({ className = 'w-4 h-4', ...props }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true" {...props}>
    <path d="M24 4C12.954 4 4 12.518 4 23.024c0 5.51 2.47 10.462 6.494 13.918l-1.966 6.58c-.202.676.524 1.242 1.122.826l7.306-5.064a27.33 27.33 0 0 0 7.032.92C35.034 40.204 44 31.686 44 21.18 44 10.674 35.046 4 24 4Z" fill="#0068FF" />
    <text
      x="24"
      y="25.5"
      textAnchor="middle"
      dominantBaseline="central"
      fill="#FFFFFF"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
      fontWeight="900"
      fontSize="13.5"
      letterSpacing="0.2px"
    >
      Zalo
    </text>
  </svg>
);
