import React, { useState } from 'react';
import { AeroStreamlinesCanvas } from './AeroStreamlinesCanvas';
import { FloatingCard } from './FloatingCard';
import { EnvironmentMode, FinishOption, Hotspot } from '../types';
import { soundEngine } from '../services/audio';
import { Wind, Sun, CloudRain, Sparkles, Cpu, Eye, Radio, Layers, Activity, ChevronRight } from 'lucide-react';

export const Scene3AeroConfigurator: React.FC = () => {
  const [aeroMode, setAeroMode] = useState<boolean>(true);
  const [envMode, setEnvMode] = useState<EnvironmentMode>('sunset');
  const [xrayMode, setXrayMode] = useState<boolean>(false);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>('titanium');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Environmental visuals mapping
  const envImages: Record<EnvironmentMode, { name: string; bg: string; subtitle: string }> = {
    sunset: {
      name: 'Golden Sunset',
      bg: '/assets/fii_valkyrie_hero.jpg',
      subtitle: 'Photorealistic glass platform above misty alpine waterfall at golden hour',
    },
    aurora: {
      name: 'Midnight Aurora',
      bg: '/assets/valkyrie_aurora.jpg',
      subtitle: 'Bioluminescent emerald & violet auroral ionization over glacial obsidian',
    },
    storm: {
      name: 'Alpine Storm',
      bg: '/assets/valkyrie_storm.jpg',
      subtitle: 'Stratospheric thunderstorm with lightning reflections on titanium chassis',
    },
  };

  const hotspots: Hotspot[] = [
    {
      id: 'aero-wing',
      name: 'Active Aerodynamic Wing',
      x: 74,
      y: 42,
      category: 'AERO',
      title: 'Active Dual-Element Aero Foil',
      detail:
        'Electro-actuated carbon wing automatically modulates between 0° (Low Drag mode) and 38° (Air Brake / High Downforce mode) in 120ms.',
      stat: '1,420 KG',
      statLabel: 'Peak Downforce at 300 km/h',
    },
    {
      id: 'powertrain',
      name: 'Hybrid FII-Core V12',
      x: 48,
      y: 52,
      category: 'POWERTRAIN',
      title: '6.5L Naturally Aspirated + Dual Axial Flux',
      detail:
        'Dry-sump titanium valvetrain spinning to 11,100 RPM, paired with front-axle electric vectoring for instantaneous 1,850 combined horsepower.',
      stat: '1,850 BHP',
      statLabel: 'Peak System Power',
    },
    {
      id: 'suspension',
      name: 'Quantum Pushrod Suspension',
      x: 32,
      y: 62,
      category: 'CHASSIS',
      title: 'Magnetorheological Zero-G Dampers',
      detail:
        'In-wheel electromagnetic levitation coils with real-time terrain scanning dynamically isolate road vibrations and balance cornering loads.',
      stat: '0.42 MS',
      statLabel: 'Response Frequency',
    },
    {
      id: 'monocoque',
      name: 'Forged Carbon Monocoque',
      x: 58,
      y: 38,
      category: 'QUANTUM',
      title: 'Liquid Titanium & Forged Carbon Cell',
      detail:
        'Ultralight tub constructed with single-mold autoclave compression. Weighs only 98 kg while exceeding FIA crash safety standards by 240%.',
      stat: '72,000 NM',
      statLabel: 'Torsional Rigidity',
    },
  ];

  const handleAeroToggle = () => {
    const nextState = !aeroMode;
    setAeroMode(nextState);
    if (nextState) {
      soundEngine.playWindTunnel(1.5);
    } else {
      soundEngine.playChime(350, 'sine', 0.2);
    }
  };

  const handleEnvChange = (mode: EnvironmentMode) => {
    setEnvMode(mode);
    soundEngine.playChime(520, 'sine', 0.3);
  };

  const handleXrayToggle = () => {
    const next = !xrayMode;
    setXrayMode(next);
    soundEngine.playChime(next ? 880 : 440, 'triangle', 0.3);
  };

  return (
    <section
      id="valkyrie-config"
      className="relative min-h-screen w-full px-4 py-24 preserve-3d overflow-hidden"
    >
      {/* Background Ambience & Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#050608] via-[#070b14] to-[#050608]" />

      {/* Section Header */}
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#050608]/80 px-4 py-1.5 backdrop-blur-xl">
          <Sparkles size={12} className="text-[#D4AF37]" />
          <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase">
            SCENE 03 // THE FLAGSHIP HYPERCAR
          </span>
        </div>

        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          FII-VALKYRIE <span className="chrome-text">AERODYNAMICS</span>
        </h2>
        
        <p className="mx-auto mt-2 max-w-2xl font-mono text-xs text-[#94A3B8] sm:text-sm">
          Exposed matte forged carbon fiber, liquid titanium, and glowing champagne-gold aerodynamic blades.
        </p>
      </div>

      {/* Interactive Control Deck (Top Floating Toolbar) */}
      <div className="relative z-30 mx-auto mt-10 max-w-4xl">
        <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-3xl p-3 sm:px-6 shadow-2xl">
          
          {/* Aero Mode Toggle Button */}
          <button
            onClick={handleAeroToggle}
            onMouseEnter={() => soundEngine.playHoverGlass()}
            className={`group relative flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
              aeroMode
                ? 'border border-[#00F5FF] bg-[#00F5FF]/15 text-[#00F5FF] shadow-[0_0_25px_rgba(0,245,255,0.4)]'
                : 'border border-white/10 bg-white/5 text-[#94A3B8] hover:border-white/20 hover:text-white'
            }`}
          >
            <Wind
              size={16}
              className={`transition-transform duration-300 ${aeroMode ? 'animate-pulse text-[#00F5FF]' : ''}`}
            />
            <span>[AERO MODE]</span>
            <span
              className={`h-2 w-2 rounded-full transition-all ${
                aeroMode ? 'bg-[#00F5FF] shadow-[0_0_8px_#00F5FF]' : 'bg-white/20'
              }`}
            />
          </button>

          {/* Environment Shift Switcher */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1">
            <button
              onClick={() => handleEnvChange('sunset')}
              onMouseEnter={() => soundEngine.playHoverGlass()}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] transition-all ${
                envMode === 'sunset'
                  ? 'bg-[#D4AF37]/25 text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Sun size={12} />
              <span>SUNSET</span>
            </button>

            <button
              onClick={() => handleEnvChange('aurora')}
              onMouseEnter={() => soundEngine.playHoverGlass()}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] transition-all ${
                envMode === 'aurora'
                  ? 'bg-[#00F5FF]/25 text-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.3)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Sparkles size={12} />
              <span>AURORA</span>
            </button>

            <button
              onClick={() => handleEnvChange('storm')}
              onMouseEnter={() => soundEngine.playHoverGlass()}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] transition-all ${
                envMode === 'storm'
                  ? 'bg-blue-500/25 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <CloudRain size={12} />
              <span>STORM</span>
            </button>
          </div>

          {/* X-Ray Telemetry Mode Toggle */}
          <button
            onClick={handleXrayToggle}
            onMouseEnter={() => soundEngine.playHoverGlass()}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold tracking-wider transition-all ${
              xrayMode
                ? 'border border-[#FF2A55] bg-[#FF2A55]/15 text-[#FF2A55] shadow-[0_0_20px_rgba(255,42,85,0.4)]'
                : 'border border-white/10 bg-white/5 text-[#94A3B8] hover:border-white/20 hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>[X-RAY TELEMETRY]</span>
          </button>
        </div>
      </div>

      {/* Main Hypercar Showcase Canvas with 3D Depth */}
      <div className="relative z-10 mx-auto mt-8 max-w-7xl">
        <div className="relative aspect-[16/9] w-full min-h-[460px] overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          
          {/* Active Environmental Background Layer */}
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
            <img
              src={envImages[envMode].bg}
              alt={envImages[envMode].name}
              className={`h-full w-full object-cover transition-all duration-1000 ${
                xrayMode ? 'filter invert brightness-75 contrast-125 hue-rotate-180' : ''
              }`}
            />
            {/* Environmental Gradient & Lens Reflections */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </div>

          {/* Wind-Tunnel Aerodynamic Streamlines Canvas Overlay */}
          <AeroStreamlinesCanvas active={aeroMode} intensity={1.2} />

          {/* X-Ray Holographic Grid Overlay */}
          {xrayMode && (
            <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(#00F5FF_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
          )}

          {/* Floating Hotspots for X-Ray Telemetry */}
          {xrayMode && (
            <div className="absolute inset-0 z-30">
              {hotspots.map(h => (
                <div
                  key={h.id}
                  style={{ top: `${h.y}%`, left: `${h.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => {
                      soundEngine.playChime(660, 'sine', 0.2);
                      setActiveHotspot(h);
                    }}
                    onMouseEnter={() => soundEngine.playHoverGlass()}
                    className="group relative flex h-7 w-7 items-center justify-center rounded-full border border-[#00F5FF] bg-black/80 backdrop-blur-md transition-all hover:scale-125 shadow-[0_0_15px_#00F5FF]"
                  >
                    <span className="absolute h-full w-full animate-ping rounded-full bg-[#00F5FF] opacity-40" />
                    <span className="h-2 w-2 rounded-full bg-[#00F5FF]" />
                    
                    {/* Hover Hotspot Tooltip */}
                    <span className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[#00F5FF]/50 bg-black/90 px-2.5 py-1 font-mono text-[10px] text-[#00F5FF] shadow-lg backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                      {h.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Live Telemetry Floating HUD overlay (Top Right) */}
          <div className="pointer-events-none absolute top-6 right-6 z-20 hidden md:block">
            <div className="glass-panel w-72 rounded-2xl p-4 text-left border border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#00F5FF]">
                  AERODYNAMIC TELEMETRY
                </span>
                <span className="font-mono text-[9px] text-[#D4AF37]">
                  {aeroMode ? 'STREAM ACTIVE' : 'LOCKED'}
                </span>
              </div>

              <div className="mt-3 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">DRAG COEFFICIENT:</span>
                  <span className="font-bold text-white">
                    {aeroMode ? 'Cd 0.285' : 'Cd 0.380'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">DOWNFORCE (300 km/h):</span>
                  <span className="font-bold text-[#00F5FF]">1,420 KG</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">WING ANGLE:</span>
                  <span className="font-bold text-white">
                    {aeroMode ? '14° (LOW DRAG)' : '32° (HIGH DF)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">VENTURI VACUUM:</span>
                  <span className="font-bold text-[#D4AF37]">-4.8 kPa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Environmental Info Tag */}
          <div className="pointer-events-none absolute bottom-6 left-6 z-20 flex flex-col items-start">
            <div className="rounded-full border border-white/20 bg-black/70 px-4 py-1.5 backdrop-blur-md">
              <span className="font-mono text-[10px] font-bold tracking-wider text-white">
                CURRENT REALM: {envImages[envMode].name.toUpperCase()}
              </span>
            </div>
            <p className="mt-1 font-mono text-[10px] text-[#CBD5E1]/80 drop-shadow-md">
              {envImages[envMode].subtitle}
            </p>
          </div>

        </div>
      </div>

      {/* Selected Hotspot Detailed Flyout */}
      {activeHotspot && (
        <div className="relative z-40 mx-auto mt-6 max-w-2xl">
          <div className="glass-panel-cyan rounded-2xl p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#00F5FF]">
                  DIAGNOSTIC TELEMETRY // {activeHotspot.category}
                </span>
                <h4 className="font-display text-xl font-bold text-white">
                  {activeHotspot.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="font-mono text-xs text-white/60 hover:text-white"
              >
                [DISMISS]
              </button>
            </div>
            <p className="mt-2 font-mono text-xs text-[#CBD5E1] leading-relaxed">
              {activeHotspot.detail}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-mono text-xs text-[#94A3B8]">
                {activeHotspot.statLabel}
              </span>
              <span className="font-display text-lg font-bold text-[#00F5FF]">
                {activeHotspot.stat}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bespoke Finish Customizer */}
      <div className="relative z-10 mx-auto mt-12 max-w-4xl text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748B]">
          BESPOKE ATELIER // MATTE & METALLIC BESPOKE FINISHES
        </span>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          {[
            { id: 'titanium', name: 'Liquid Titanium', color: 'from-[#CBD5E1] to-[#64748B]' },
            { id: 'carbon', name: 'Forged Matte Carbon', color: 'from-[#1E293B] to-[#0A0D14]' },
            { id: 'gold', name: 'Champagne Gold Leaf', color: 'from-[#D4AF37] to-[#8C6D1F]' },
            { id: 'nebula', name: 'Nebula Electric Cyan', color: 'from-[#00F5FF] to-[#0284C7]' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedFinish(f.id as FinishOption);
                soundEngine.playChime(600, 'sine', 0.2);
              }}
              onMouseEnter={() => soundEngine.playHoverGlass()}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-2 font-mono text-xs transition-all ${
                selectedFinish === f.id
                  ? 'border-[#00F5FF] bg-[#00F5FF]/10 text-white shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                  : 'border-white/10 bg-white/5 text-[#94A3B8] hover:border-white/20 hover:text-white'
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full bg-gradient-to-br ${f.color} shadow-inner`}
              />
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
