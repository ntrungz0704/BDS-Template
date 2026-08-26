import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    const baseStyle = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
    const variants = {
      primary: 'bg-[#C5A572] text-white hover:bg-[#B8941F]',
      secondary: 'bg-[#1A1A2E] text-white hover:bg-[#16213E]',
      outline: 'border border-[#C5A572] text-[#C5A572] hover:bg-[#F8F6F3]',
      ghost: 'text-[#1A1A2E] hover:bg-[#F8F6F3]',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export * from './components/ProjectCard';
export * from './components/BlogCard';
export * from './components/ContactForm';
