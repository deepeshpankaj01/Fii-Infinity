import React, { useRef, useState } from 'react';
import { soundEngine } from '../services/audio';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // max tilt angle in degrees
  floatVariant?: 1 | 2 | 3;
  enableGlare?: boolean;
  onClick?: () => void;
  shockwaveOnHover?: boolean;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  depth = 12,
  floatVariant = 1,
  enableGlare = true,
  onClick,
  shockwaveOnHover = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -depth;
    const rotateY = ((x - centerX) / centerX) * depth;

    // Magnetic slight translation pull toward cursor
    const transX = ((x - centerX) / centerX) * 8;
    const transY = ((y - centerY) / centerY) * 8;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 35px) scale3d(1.03, 1.03, 1.03)`
    );

    if (enableGlare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.45,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHoverGlass();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale3d(1, 1, 1)');
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const floatClass =
    floatVariant === 1
      ? 'floating-card-1'
      : floatVariant === 2
      ? 'floating-card-2'
      : 'floating-card-3';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transform || undefined,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.12s ease-out'
          : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className={`relative preserve-3d will-change-transform ${floatClass} ${className} ${
        isHovered && shockwaveOnHover ? 'ring-1 ring-[#00F5FF]/50 shadow-[0_0_40px_rgba(0,245,255,0.25)]' : ''
      }`}
    >
      {/* Glare Light Sheen */}
      {enableGlare && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.22), transparent 80%)`,
            opacity: glarePos.opacity,
          }}
        />
      )}

      {/* Shockwave Glow Effect on Hover */}
      {shockwaveOnHover && isHovered && (
        <div className="pointer-events-none absolute -inset-1 z-0 rounded-2xl bg-gradient-to-r from-[#00F5FF]/20 via-[#D4AF37]/20 to-[#00F5FF]/20 blur-xl opacity-75 animate-pulse" />
      )}

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
