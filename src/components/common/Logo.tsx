import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  customUrl,
}) => {
  let logoSource = customUrl || '/logo.svg';

  try {
    const { state } = useCMS();
    if (!customUrl && state?.settings?.logoUrl) {
      logoSource = state.settings.logoUrl;
    }
  } catch (e) {
    // CMSContext fallback
  }

  const sizeStyles = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-13 sm:h-16',
    xl: 'h-18 sm:h-22',
  };

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeStyles[size]} aspect-square ${className}`}
        aria-label="Ouzze Logo"
      >
        {/* Monitor Base */}
        <path
          d="M 105 240 L 175 240 C 180 240 185 245 185 250 L 185 255 L 95 255 L 95 250 C 95 245 100 240 105 240 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 85 255 L 195 255" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

        {/* Outer Frame with Cut */}
        <path
          d="M 65 18 L 245 18 A 22 22 0 0 1 267 40 L 267 85 L 172 245 A 12 12 0 0 1 160 252 L 55 252 A 22 22 0 0 1 33 230 L 33 42 A 24 24 0 0 1 65 18 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Screen */}
        <path
          d="M 60 34 L 238 34 A 12 12 0 0 1 250 46 L 250 88 L 165 233 A 8 8 0 0 1 158 238 L 50 238 A 12 12 0 0 1 38 226 L 38 48 A 14 14 0 0 1 60 34 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Red Accent Swoop */}
        <polygon points="175,252 198,208 267,95 267,125 194,252" fill="#FF0000" />
        <polygon points="172,252 188,252 267,128 267,112" fill="#FF0000" opacity="0.95" />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSource}
        alt="Ouzze Locação"
        className={`${sizeStyles[size]} w-auto max-w-full object-contain transition-transform`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

