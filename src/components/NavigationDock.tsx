import React, { useState } from 'react';
import { Compass, Box, Zap, Sparkles, Volume2, VolumeX, Shield, Radio } from 'lucide-react';
import { soundEngine } from '../services/audio';

interface NavigationDockProps {
  activeScene: number;
  onSelectScene: (index: number) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  activeScene,
  onSelectScene,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const navItems = [
    { label: 'SKY REALM', icon: Compass, scene: 1, sub: 'Alt: 12,400m' },
    { label: 'BENTO ORBIT', icon: Box, scene: 2, sub: 'Zero-G Canvas' },
    { label: 'VALKYRIE', icon: Zap, scene: 3, sub: 'Aero Config' },
    { label: 'ECOSYSTEM', icon: Sparkles, scene: 4, sub: 'Quantum Gate' },
  ];

  return (
    <nav className="fixed bottom-7 left-1/2 z-50 -translate-x-1/2">
      <div className="relative flex items-center gap-1.5 rounded-full border border-white/15 bg-[#050608]/70 px-4 py-2.5 backdrop-blur-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(0,245,255,0.12)]">
        
        {/* Subtle rim glow */}
        <div className="pointer-events-none absolute inset-x-8 -top-px h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/60 to-transparent" />

        {/* Brand Micro Emblem */}
        <div className="mr-2 flex items-center gap-1.5 border-r border-white/10 pr-3">
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#050608]">
              <span className="font-display text-[9px] font-bold tracking-tighter text-[#D4AF37]">F</span>
            </div>
          </div>
          <span className="hidden font-display text-[10px] font-semibold tracking-wider text-[#CBD5E1] sm:inline">
            FII.X
          </span>
        </div>

        {/* Navigation Items with Dock Magnification */}
        <div className="flex items-center gap-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeScene === item.scene;
            const isHovered = hoveredIdx === idx;

            // Dock magnification factor
            let scale = 1;
            if (hoveredIdx !== null) {
              const dist = Math.abs(hoveredIdx - idx);
              if (dist === 0) scale = 1.22;
              else if (dist === 1) scale = 1.08;
            }

            return (
              <button
                key={item.label}
                onClick={() => {
                  soundEngine.playChime(640, 'sine', 0.25);
                  onSelectScene(item.scene);
                }}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  soundEngine.playHoverGlass();
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 14 : 0}px)`,
                  transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className={`group relative flex flex-col items-center justify-center rounded-2xl px-3 py-1.5 transition-colors duration-200 ${
                  isActive
                    ? 'bg-gradient-to-b from-[#00F5FF]/15 to-transparent text-[#00F5FF]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'stroke-[2.2] drop-shadow-[0_0_10px_#00F5FF]'
                      : 'group-hover:stroke-white'
                  }`}
                />
                
                <span className="mt-1 font-mono text-[9px] font-medium tracking-widest uppercase">
                  {item.label}
                </span>

                {/* Glowing micro-indicator under active button */}
                <span
                  className={`mt-0.5 h-1 w-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'scale-100 bg-[#00F5FF] shadow-[0_0_8px_#00F5FF]'
                      : 'scale-0 bg-transparent'
                  }`}
                />

                {/* Hover Tooltip Badge */}
                {isHovered && (
                  <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#050608]/90 px-2 py-0.5 font-mono text-[9px] text-[#CBD5E1] shadow-lg backdrop-blur-md">
                    {item.sub}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-white/10" />

        {/* Spatial Audio Synthesizer Toggle */}
        <button
          onClick={onToggleAudio}
          onMouseEnter={() => soundEngine.playHoverGlass()}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-[9px] transition-all duration-200 ${
            isAudioPlaying
              ? 'border border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
              : 'border border-white/10 bg-white/5 text-[#94A3B8] hover:border-white/20 hover:text-white'
          }`}
          title={isAudioPlaying ? 'Mute Spatial Audio' : 'Unmute Ambient Soundscape'}
        >
          {isAudioPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span className="hidden sm:inline font-mono">
            {isAudioPlaying ? 'AUDIO ACTIVE' : 'MUTED'}
          </span>
          {isAudioPlaying && (
            <span className="flex h-1.5 w-1.5 animate-ping rounded-full bg-[#D4AF37]" />
          )}
        </button>
      </div>
    </nav>
  );
};
