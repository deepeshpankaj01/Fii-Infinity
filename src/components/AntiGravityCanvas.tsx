import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  size: number;
  alpha: number;
  type: 'ember' | 'droplet';
}

export const AntiGravityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 130;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(Math.random() * 1.8 + 0.6), // Negative vy = floating UPWARD against gravity!
        vx: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2.8 + 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        type: Math.random() < 0.65 ? 'ember' : 'droplet',
      });
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy; // Floats upwards
        p.x += p.vx + Math.sin(p.y * 0.015) * 0.4; // Gentle zero-gravity wobble

        // Reset to bottom if it floats out at top
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
          p.vy = -(Math.random() * 1.8 + 0.6);
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === 'ember') {
          // Glowing Golden Ember
          ctx.fillStyle = '#D4AF37';
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Translucent Water Droplet floating upward
          ctx.fillStyle = 'rgba(0, 245, 255, 0.75)';
          ctx.shadowColor = '#00F5FF';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          // Slight teardrop inverted
          ctx.arc(p.x, p.y, p.size * 0.85, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
};
