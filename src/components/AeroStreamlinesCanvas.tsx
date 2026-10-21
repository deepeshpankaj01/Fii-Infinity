import React, { useEffect, useRef } from 'react';

interface AeroStreamlinesCanvasProps {
  active: boolean;
  intensity?: number;
}

interface Streamline {
  x: number;
  y: number;
  startX: number;
  startY: number;
  speed: number;
  length: number;
  thickness: number;
  alpha: number;
  hue: number;
  turbOffset: number;
}

export const AeroStreamlinesCanvas: React.FC<AeroStreamlinesCanvasProps> = ({
  active,
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamlinesRef = useRef<Streamline[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initStreamlines();
    };
    window.addEventListener('resize', handleResize);

    const streamlineCount = 140;

    const initStreamlines = () => {
      const lines: Streamline[] = [];
      for (let i = 0; i < streamlineCount; i++) {
        const startY = height * 0.2 + Math.random() * (height * 0.65);
        lines.push({
          x: Math.random() * width,
          y: startY,
          startX: -100,
          startY: startY,
          speed: (Math.random() * 8 + 14) * intensity,
          length: Math.random() * 120 + 70,
          thickness: Math.random() * 2 + 1,
          alpha: Math.random() * 0.7 + 0.3,
          hue: Math.random() < 0.2 ? 45 : 185, // Gold vs Cyan accents
          turbOffset: Math.random() * 100,
        });
      }
      streamlinesRef.current = lines;
    };

    initStreamlines();

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      if (!active) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Render flowing streamlines
      const lines = streamlinesRef.current;
      for (let i = 0; i < lines.length; i++) {
        const s = lines[i];

        // Move forward across screen
        s.x += s.speed;

        // Aerodynamic deflection around hypercar center
        // Car center is around width * 0.5, height * 0.52
        const carCenterX = width * 0.5;
        const carCenterY = height * 0.52;
        const dx = s.x - carCenterX;
        const dy = s.y - carCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Aero deflection curve
        let deflection = 0;
        if (dist < width * 0.38) {
          const factor = 1 - dist / (width * 0.38);
          // Upper streamlines deflect upward, lower deflect downward
          const dir = s.startY < carCenterY ? -1 : 1;
          deflection = dir * Math.sin((s.x / width) * Math.PI) * 45 * factor;
        }

        const currentY = s.startY + deflection + Math.sin(time + s.turbOffset) * 4;

        if (s.x > width + s.length) {
          s.x = -s.length - Math.random() * 200;
          s.startY = height * 0.2 + Math.random() * (height * 0.65);
          s.speed = (Math.random() * 8 + 14) * intensity;
        }

        // Draw aerodynamic laser stream
        const grad = ctx.createLinearGradient(s.x - s.length, currentY, s.x, currentY);
        if (s.hue === 45) {
          grad.addColorStop(0, 'rgba(212, 175, 55, 0)');
          grad.addColorStop(0.7, `rgba(212, 175, 55, ${s.alpha * 0.4})`);
          grad.addColorStop(1, `rgba(255, 230, 160, ${s.alpha})`);
        } else {
          grad.addColorStop(0, 'rgba(0, 245, 255, 0)');
          grad.addColorStop(0.7, `rgba(0, 245, 255, ${s.alpha * 0.5})`);
          grad.addColorStop(1, `rgba(180, 255, 255, ${s.alpha * 0.95})`);
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.shadowColor = s.hue === 45 ? '#D4AF37' : '#00F5FF';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(s.x - s.length, currentY);
        // Add subtle spline curve for realism
        ctx.quadraticCurveTo(
          s.x - s.length * 0.5,
          currentY + (s.startY < carCenterY ? -2 : 2),
          s.x,
          currentY
        );
        ctx.stroke();

        // Tip particle
        ctx.fillStyle = s.hue === 45 ? '#FFFFFF' : '#E0FFFF';
        ctx.beginPath();
        ctx.arc(s.x, currentY, s.thickness * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [active, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-700 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};
