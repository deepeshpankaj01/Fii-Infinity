import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ringPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Add stardust particle occasionally on movement
      if (Math.random() < 0.6) {
        const colors = ['#00F5FF', '#D4AF37', '#FFFFFF', '#67E8F9'];
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [data-interactive="true"], .interactive-hover');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Canvas resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Render loop for smooth ring lerp & stardust canvas
    let animationFrameId: number;
    const ctx = canvasRef.current?.getContext('2d');

    const animate = () => {
      // Smooth lerp for outer magnetic ring
      const lerpFactor = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Draw stardust particle trail
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.025;

          if (p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Particle Canvas Trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9990]"
      />

      {/* Center Micro Dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full transition-all duration-75 ease-out ${
          isHovered
            ? 'bg-[#00F5FF] shadow-[0_0_12px_#00F5FF]'
            : 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
        } ${isClicking ? 'scale-150' : 'scale-100'}`}
      />

      {/* Dual Magnetic Outer Ring */}
      <div
        ref={cursorRingRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? '-ml-6 -mt-6 h-12 w-12 border-[#00F5FF]/80 bg-[#00F5FF]/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(0,245,255,0.4)]'
            : '-ml-4 -mt-4 h-8 w-8 border-[#CBD5E1]/40 bg-transparent'
        } ${isClicking ? 'scale-75 border-[#D4AF37]' : ''}`}
      >
        {/* Subtle dual-ring crosshair tick marks */}
        <span className="absolute -top-1 left-1/2 -ml-[1px] h-1 w-[2px] bg-white/40" />
        <span className="absolute -bottom-1 left-1/2 -ml-[1px] h-1 w-[2px] bg-white/40" />
        <span className="absolute -left-1 top-1/2 -mt-[1px] h-[2px] w-1 bg-white/40" />
        <span className="absolute -right-1 top-1/2 -mt-[1px] h-[2px] w-1 bg-white/40" />
      </div>
    </>
  );
};
