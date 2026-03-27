import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 ${
        hover ? 'hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
