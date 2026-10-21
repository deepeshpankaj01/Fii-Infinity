import React, { useState, useEffect } from 'react';
import { FloatingCard } from './FloatingCard';
import { Activity, ShieldCheck, Wind, Gauge, Compass, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/audio';

interface Scene1HeroSkyProps {
  onExploreClick: () => void;
}

export const Scene1HeroSky: React.FC<Scene1HeroSkyProps> = ({ onExploreClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [telemetry, setTelemetry] = useState({
    altitude: 12400,
    lux: 142000,
    flux: 1.42,
    syncRate: 99.8,
  });

  // Dynamic live micro-fluctuations in telemetry for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        altitude: 12400 + Math.floor(Math.sin(Date.now() / 1500) * 8),
        lux: 142000 + Math.floor(Math.cos(Date.now() / 2000) * 120),
        flux: +(1.42 + Math.sin(Date.now() / 3000) * 0.03).toFixed(2),
        syncRate: +(99.8 + Math.sin(Date.now() / 2500) * 0.15).toFixed(1),
      }));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-20 preserve-3d"
    >
      {/* Photorealistic Panoramic Golden Hour & Aurora Lake Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero_environment.jpg"
          alt="Golden Hour Icelandic Canyon with Aurora & Mirror Lake"
          className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          style={{
            transform: `scale(1.06) translate3d(${mousePos.x * -18}px, ${mousePos.y * -14}px, 0)`,
          }}
        />
        {/* Cinematic Vignette, Volumetric Fog, and Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050608]/30 to-[#050608]/90" />
        <div className="absolute inset-0 bg-[#00F5FF]/[0.02] mix-blend-color-dodge pointer-events-none" />
      </div>

      {/* Top Floating Telemetry Ticker */}
      <div className="relative z-20 mb-8 flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#050608]/75 px-4 py-1.5 backdrop-blur-xl shadow-lg">
          <span className="h-2 w-2 animate-ping rounded-full bg-[#00F5FF]" />
          <span className="font-mono text-[10px] tracking-widest text-[#00F5FF]">
            STRATOSPHERIC REVEAL
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[10px] tracking-wider text-[#CBD5E1]">
            COORDINATES: 64.1466° N, 21.9426° W
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#050608]/75 px-4 py-1.5 backdrop-blur-xl shadow-lg">
          <Sparkles size={12} className="text-[#D4AF37]" />
          <span className="font-mono text-[10px] tracking-widest text-[#D4AF37]">
            FII-CORE ARCHITECTURE v4.2
          </span>
        </div>
      </div>

      {/* Central 3D Chrome Typography & Apple Vision Pro Spatial Canvas */}
      <div className="relative z-20 flex w-full max-w-7xl flex-col items-center justify-center text-center">
        
        {/* Floating HUD Widget 1: Top Left */}
        <div className="pointer-events-auto absolute -top-8 left-4 hidden lg:block xl:left-8">
          <FloatingCard floatVariant={1} depth={15} className="w-64">
            <div className="glass-panel rounded-2xl p-4 text-left border-l-2 border-l-[#00F5FF]/80">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8]">
                  SPATIAL ALTITUDE
                </span>
                <Compass size={14} className="text-[#00F5FF]" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  {telemetry.altitude.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-[#00F5FF]">METERS</span>
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-[#CBD5E1]">
                <span>PRESSURE: 18.2 kPa</span>
                <span className="text-[#00F5FF]">IONIZED</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#00F5FF] to-[#D4AF37] transition-all duration-300"
                  style={{ width: `${(telemetry.altitude / 13000) * 100}%` }}
                />
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Floating HUD Widget 2: Top Right */}
        <div className="pointer-events-auto absolute -top-8 right-4 hidden lg:block xl:right-8">
          <FloatingCard floatVariant={2} depth={15} className="w-64">
            <div className="glass-panel rounded-2xl p-4 text-left border-r-2 border-r-[#D4AF37]/80">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8]">
                  ATMOSPHERE STATUS
                </span>
                <Wind size={14} className="text-[#D4AF37]" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold tracking-tight text-[#F8FAFC]">
                  AURORA FLUX
                </span>
                <span className="font-mono text-xs text-[#D4AF37]">98.4%</span>
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-[#CBD5E1]">
                <span>RAY-TRACED LUX</span>
                <span className="text-[#D4AF37]">{telemetry.lux.toLocaleString()} lm</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[94%] bg-gradient-to-r from-[#D4AF37] to-white" />
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Floating HUD Widget 3: Bottom Left */}
        <div className="pointer-events-auto absolute -bottom-10 left-6 hidden lg:block xl:left-12">
          <FloatingCard floatVariant={3} depth={15} className="w-64">
            <div className="glass-panel-gold rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#D4AF37]">
                  PROPULSION
                </span>
                <Activity size={14} className="text-[#D4AF37]" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  FII-CORE
                </span>
                <span className="font-mono text-xs text-[#00F5FF]">v16 HYBRID</span>
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-[#CBD5E1]">
                <span>MAGNETIC FLUX: {telemetry.flux} T</span>
                <span className="text-emerald-400">NOMINAL</span>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Floating HUD Widget 4: Bottom Right */}
        <div className="pointer-events-auto absolute -bottom-10 right-6 hidden lg:block xl:right-12">
          <FloatingCard floatVariant={1} depth={15} className="w-64">
            <div className="glass-panel-cyan rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#00F5FF]">
                  GRAVITATIONAL BIAS
                </span>
                <Gauge size={14} className="text-[#00F5FF]" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  0.14 G
                </span>
                <span className="font-mono text-xs text-[#00F5FF]">LEVITATION</span>
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-[#CBD5E1]">
                <span>ZERO-G BUFFER</span>
                <span className="text-[#00F5FF]">{telemetry.syncRate}% SYNCED</span>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Centerpiece: Massive 3D Chrome & Gold Typography "FII.X" */}
        <div
          className="relative my-8 select-none transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -14}deg) rotateY(${mousePos.x * 16}deg) translateZ(40px)`,
          }}
        >
          {/* Ambient Ray-Traced Radial Glow Behind Logo */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] transition-all duration-300"
            style={{
              width: '480px',
              height: '320px',
              background: `radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, rgba(0, 245, 255, 0.25) 50%, transparent 75%)`,
              transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 30}px, 0)`,
            }}
          />

          <h1 className="relative font-display text-7xl font-extrabold tracking-tighter sm:text-8xl md:text-9xl lg:text-[11rem] leading-none">
            {/* Base Chrome & Gold Lettering */}
            <span className="chrome-text inline-block tracking-tight">
              FII.X
            </span>

            {/* Dynamic Sweep Glare Overlay Tracking Cursor */}
            <span
              className="pointer-events-none absolute inset-0 inline-block font-display text-transparent"
              style={{
                backgroundImage: `radial-gradient(circle 350px at ${((mousePos.x + 1) / 2) * 100}% ${((mousePos.y + 1) / 2) * 100}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mixBlendMode: 'overlay',
              }}
            >
              FII.X
            </span>
          </h1>

          {/* Subtitle & Vision Statement */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-[#E2E8F0] sm:text-sm md:text-base">
              THE BESPOKE HYPERCAR SANCTUARY
            </p>
            <p className="max-w-xl font-mono text-[11px] leading-relaxed text-[#94A3B8] sm:text-xs">
              Multimillion-dollar bespoke hypercars, untouched cinematic Icelandic nature, dramatic skies, and zero-gravity spatial technology.
            </p>
          </div>
        </div>

        {/* Interactive Dive Button */}
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={() => {
              soundEngine.playChime(784, 'sine', 0.4);
              onExploreClick();
            }}
            onMouseEnter={() => soundEngine.playHoverGlass()}
            className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-[#D4AF37]/50 bg-[#050608]/80 px-8 py-4 backdrop-blur-2xl transition-all duration-300 hover:border-[#00F5FF] hover:shadow-[0_0_35px_rgba(0,245,255,0.4)]"
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            
            <span className="font-display text-xs font-bold tracking-[0.2em] text-[#F8FAFC] group-hover:text-[#00F5FF]">
              DESCEND THROUGH THE CLOUDS
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#00F5FF] p-[1px] transition-transform duration-300 group-hover:translate-y-1">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#050608]">
                <ArrowDown size={14} className="text-[#00F5FF]" />
              </div>
            </div>
          </button>

          <span className="mt-3 font-mono text-[9px] uppercase tracking-widest text-[#64748B]">
            SCROLL OR CLICK TO DIVE INTO THE ZERO-G ORBIT
          </span>
        </div>
      </div>
    </section>
  );
};
