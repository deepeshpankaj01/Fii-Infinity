import React, { useState } from 'react';
import { AntiGravityCanvas } from './AntiGravityCanvas';
import { FloatingCard } from './FloatingCard';
import { soundEngine } from '../services/audio';
import { Sparkles, Key, Lock, ArrowUpRight, CheckCircle2, X, Compass, Globe } from 'lucide-react';

export const Scene4AntiGravityFooter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allocationStep, setAllocationStep] = useState<'form' | 'success'>('form');
  const [emailInput, setEmailInput] = useState('');
  const [fullName, setFullName] = useState('');

  const handleOpenModal = () => {
    soundEngine.playBassPulse();
    soundEngine.playChime(587.33, 'triangle', 0.4);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    soundEngine.playChime(880, 'sine', 0.5);
    setAllocationStep('success');
  };

  return (
    <footer
      id="ecosystem"
      className="relative min-h-[90vh] w-full flex flex-col justify-between overflow-hidden px-4 pt-32 pb-24 preserve-3d"
    >
      {/* Reversed Gravity Starry Canvas with Upward Floating Water Droplets & Golden Embers */}
      <AntiGravityCanvas />

      {/* Deep Space Radial Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#020305] via-[#050608]/80 to-[#050608]/40" />

      {/* Main Sanctuary Portal Section */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        
        {/* Anti-Gravity Indicator Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#050608]/80 px-5 py-2 backdrop-blur-xl">
          <span className="flex h-2 w-2 animate-bounce rounded-full bg-[#D4AF37]" />
          <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase">
            GRAVITY VECTOR INVERTED // -1.0G ASCENT
          </span>
        </div>

        <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          THE <span className="chrome-text">FII ECOSYSTEM</span>
        </h2>
        
        <p className="mx-auto mt-4 max-w-xl font-mono text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
          Where multimillion-dollar bespoke automotive sculptures converge with untouched cinematic nature and zero-gravity architectural sanctuaries.
        </p>

        {/* Massive Floating Glass Magnetic Button (Liquid Metal Ripple) */}
        <div className="mt-14 flex justify-center">
          <FloatingCard floatVariant={1} depth={18} className="w-full max-w-lg">
            <button
              onClick={handleOpenModal}
              onMouseEnter={() => {
                soundEngine.playHoverGlass();
              }}
              className="liquid-metal-ripple group relative w-full overflow-hidden rounded-full border border-[#D4AF37]/60 bg-gradient-to-b from-[#151a26]/90 via-[#0a0d14]/90 to-[#050608]/90 p-6 sm:p-7 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.25)] transition-all duration-300 hover:border-[#00F5FF] hover:shadow-[0_0_50px_rgba(0,245,255,0.4)]"
            >
              {/* Dynamic Sheen Sweep */}
              <div className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/60 shadow-inner group-hover:border-[#00F5FF]">
                    <Sparkles className="h-6 w-6 text-[#D4AF37] transition-colors group-hover:text-[#00F5FF]" />
                  </div>
                  <div>
                    <span className="font-display text-base font-extrabold tracking-wider text-white sm:text-lg">
                      ENTER THE FII ECOSYSTEM
                    </span>
                    <p className="font-mono text-[10px] text-[#94A3B8]">
                      Request Bespoke Allocation & Sanctuary Key
                    </p>
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-[#00F5FF] group-hover:text-black">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </button>
          </FloatingCard>
        </div>

        {/* Real-time Status Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] text-[#CBD5E1]">
          <div className="flex items-center gap-2">
            <Lock size={13} className="text-[#00F5FF]" />
            <span>QUANTUM ENCRYPTED ACCESS</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <Compass size={13} className="text-[#D4AF37]" />
            <span>SANCTUARY LOCATION: ICELAND HIGH PASS</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <Key size={13} className="text-[#00F5FF]" />
            <span>ANNUAL BUILD ALLOCATION: 12 UNITS</span>
          </div>
        </div>

      </div>

      {/* Bottom Technical Bar & Coordinates */}
      <div className="relative z-10 mx-auto mt-24 w-full max-w-7xl border-t border-white/10 pt-8 font-mono text-xs text-[#64748B]">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold tracking-wider text-white">
              FII-INFINITY
            </span>
            <span>// ZERO-GRAVITY SPATIAL SANCTUARY</span>
          </div>

          <div className="flex items-center gap-6 text-[10px]">
            <span>LAT: 64.9631° N</span>
            <span>LON: 19.0208° W</span>
            <span>ELEVATION: 1,840m</span>
            <span>RAY-TRACED 8K REALISM</span>
          </div>

          <div>
            <span>© 2026 FII HYPERCARS & SPATIAL SANCTUARY. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>

      {/* Interactive Modal Portal for Sanctuary Key Allocation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-2xl">
          <div className="glass-panel relative w-full max-w-lg overflow-hidden rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            
            <button
              onClick={() => {
                soundEngine.playChime(380, 'sine', 0.2);
                setIsModalOpen(false);
                setAllocationStep('form');
              }}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 hover:bg-white/20 hover:text-white"
            >
              <X size={16} />
            </button>

            {allocationStep === 'form' ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-[#D4AF37]" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#D4AF37]">
                    PRIVATE ATELIER APPLICATION
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white">
                  Claim Sanctuary Access
                </h3>
                <p className="font-mono text-xs text-[#94A3B8]">
                  Production of the FII-VALKYRIE is strictly restricted to 12 bespoke chassis globally per solar year. Submit your credentials to request an allocation dossier.
                </p>

                <div className="mt-2 space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-[#CBD5E1] mb-1">LEGAL NAME / ATELIER PATRON</label>
                    <input
                      type="text"
                      required
                      placeholder="Lord Harrison Sterling"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#00F5FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#CBD5E1] mb-1">ENCRYPTED COMM / EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="patron@sanctuary-fii.com"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-white placeholder-white/30 focus:border-[#00F5FF] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHoverGlass()}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] py-3.5 font-display text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  TRANSMIT DOSSIER REQUEST
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">
                  Dossier Transmitted
                </h3>
                <p className="mt-2 font-mono text-xs text-[#CBD5E1] max-w-sm">
                  Your credentials have been securely registered to the quantum registry. An encrypted physical key will be dispatched to your atelier upon board verification.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 rounded-full border border-white/20 bg-white/10 px-6 py-2 font-mono text-xs text-white hover:bg-white/20"
                >
                  RETURN TO SANCTUARY
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </footer>
  );
};
