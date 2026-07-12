import React from 'react';

interface PlaceholderImageProps {
  title: string;
  category?: string;
  aspectRatio?: string;
  className?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  title,
  category = "foundation",
  aspectRatio = "aspect-video",
  className = "",
}) => {
  // Select gradients based on category for rich aesthetics
  const getGradient = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'housing':
        return { from: '#16382c', via: '#065f46', to: '#111827' };
      case 'education':
        return { from: '#065f46', via: '#10b981', to: '#022c22' };
      case 'healthcare':
        return { from: '#0f172a', via: '#1e3a2f', to: '#065f46' };
      case 'food':
      case 'nutrition':
        return { from: '#1e293b', via: '#16382c', to: '#0f766e' };
      case 'recreation':
      case 'joy':
        return { from: '#10b981', via: '#0f766e', to: '#16382c' };
      case 'training':
      case 'livelihood':
        return { from: '#1e3a2f', via: '#0f766e', to: '#111827' };
      default:
        return { from: '#16382c', via: '#10b981', to: '#111827' };
    }
  };

  const { from, via, to } = getGradient(category);

  return (
    <div className={`relative overflow-hidden w-full h-full rounded-2xl ${aspectRatio} ${className} group`}>
      <svg
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`grad-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="50%" stopColor={via} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          
          {/* Subtle noise/pattern filter for premium look */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            <circle cx="40" cy="0" r="1" fill="rgba(255, 255, 255, 0.1)" />
          </pattern>
        </defs>

        {/* Background Gradient */}
        <rect width="100%" height="100%" fill={`url(#grad-${title.replace(/\s+/g, '-')})`} />

        {/* Technical Grid Overlay */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Abstract shapes representing hope/nature */}
        <circle cx="700" cy="100" r="250" fill="rgba(16, 185, 129, 0.08)" filter="blur(40px)" />
        <path d="M-100,450 C200,300 350,550 900,400 L900,500 L-100,500 Z" fill="rgba(255, 255, 255, 0.04)" />
        <path d="M-50,480 C300,400 450,490 850,450 L850,500 L-50,500 Z" fill="rgba(16, 185, 129, 0.05)" />

        {/* Elegant Minimal Watermark */}
        <text
          x="40"
          y="60"
          fill="rgba(255, 255, 255, 0.25)"
          fontSize="12"
          fontWeight="bold"
          letterSpacing="4"
          fontFamily="system-ui, sans-serif"
        >
          PRATHEEKSHA FOUNDATION
        </text>

        {/* Category Badge */}
        <rect x="40" y="415" width="100" height="24" rx="12" fill="rgba(255, 255, 255, 0.12)" />
        <text
          x="90"
          y="431"
          fill="#f3f4f6"
          fontSize="10"
          fontWeight="600"
          letterSpacing="1.5"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          {category.toUpperCase()}
        </text>
      </svg>

      {/* Modern Overlay Content (Glassmorphism inspired) */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <h3 className="font-heading text-xl md:text-2xl text-white font-medium mb-1 drop-shadow-sm tracking-wide">
          {title}
        </h3>
        <p className="text-white/70 text-xs md:text-sm max-w-[85%] font-body font-light line-clamp-2">
          Transforming lives and upholding dignity in Wayanad.
        </p>
      </div>
    </div>
  );
};
