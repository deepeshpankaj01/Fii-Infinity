import React, { useState } from 'react';
import { FloatingCard } from './FloatingCard';
import { PortalData } from '../types';
import { soundEngine } from '../services/audio';
import { CloudLightning, Trees, Flame, Maximize2, X, Shield, Cpu, Gauge, Eye, ChevronRight } from 'lucide-react';

export const Scene2FloatingBento: React.FC = () => {
  const [selectedPortal, setSelectedPortal] = useState<PortalData | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'NATURE' | 'HYPERCAR'>('ALL');

  const portals: PortalData[] = [
    {
      id: 'atmosphere',
      tag: 'PORTAL 01 // ATMOSPHERE',
      title: 'Volumetric Cumulonimbus',
      subtitle: 'Golden Lightning at 40,000 Feet',
      altitude: '12,192 m',
      coordinates: '34.0522° N, 118.2437° W',
      image: '/assets/portal_atmosphere.jpg',
      accentColor: '#D4AF37',
      description:
        'Towering stratospheric storm cells supercharged with electrostatic potential. Photorealistic volumetric vapor masses pierced by pure gold lightning arcs at high-altitude twilight.',
      specs: [
        { label: 'CHARGE FLUX', value: '1.21 GW' },
        { label: 'ALTITUDE', value: '40,000 FT' },
        { label: 'VAPOR DENSITY', value: '4.8 g/m³' },
        { label: 'PRESSURE', value: '188 hPa' },
      ],
    },
    {
      id: 'terra',
      tag: 'PORTAL 02 // TERRA',
      title: 'Bioluminescent Sanctuary',
      subtitle: 'Volcanic Cascades at Twilight',
      altitude: '1,420 m',
      coordinates: '63.5321° N, 19.5112° W',
      image: '/assets/portal_terra.jpg',
      accentColor: '#00F5FF',
      description:
        'Virgin glacial waterfall cascading through deep Icelandic volcanic basalt. Twilight luminescence fuels glowing cyan spores and ancient mossy overhangs in absolute stillness.',
      specs: [
        { label: 'WATER FLOW', value: '280 m³/s' },
        { label: 'MINERAL PURITY', value: '99.98%' },
        { label: 'BIOLUMINESCENCE', value: '480 nm' },
        { label: 'SUBSTRATE', value: 'Basalt Glass' },
      ],
    },
    {
      id: 'machine',
      tag: 'PORTAL 03 // MACHINE',
      title: 'Active Aero Carbon Wing',
      subtitle: 'Crimson Laser Optics in Alpine Rain',
      altitude: '0 m (Ground Zero)',
      coordinates: 'FII Valkyrie Assembly',
      image: '/assets/portal_machine.jpg',
      accentColor: '#FF2A55',
      description:
        'Extreme macro optic capture of the bespoke active rear wing. Liquid rain droplets bead effortlessly across the exposed matte forged carbon fiber weave under pulse-width crimson lasers.',
      specs: [
        { label: 'WEAVE PITCH', value: '3K Twill' },
        { label: 'TAIL LASER', value: '635 nm Laser' },
        { label: 'SURFACE ANGLE', value: '0° - 38° Dynamic' },
        { label: 'RAIN REPELLENCE', value: 'Hydrophobic 112°' },
      ],
    },
  ];

  const handlePortalClick = (portal: PortalData) => {
    soundEngine.playChime(720, 'sine', 0.35);
    setSelectedPortal(portal);
  };

  return (
    <section
      id="bento-orbit"
      className="relative min-h-screen w-full px-4 py-28 preserve-3d overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#050608] via-[#080d1a]/50 to-[#050608]" />
      
      {/* Subtle Aurora Wave in Background */}
      <div className="pointer-events-none absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-[#00F5FF]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 h-[600px] w-[600px] rounded-full bg-[#D4AF37]/10 blur-[150px]" />

      {/* Section Header */}
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00F5FF]/30 bg-[#050608]/80 px-4 py-1.5 backdrop-blur-xl">
          <Eye size={12} className="text-[#00F5FF]" />
          <span className="font-mono text-[10px] tracking-widest text-[#00F5FF] uppercase">
            SCENE 02 // ZERO-GRAVITY SPATIAL CANVAS
          </span>
        </div>

        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          THE <span className="chrome-text">BENTO ORBIT</span>
        </h2>
        
        <p className="mx-auto mt-3 max-w-2xl font-mono text-xs text-[#94A3B8] sm:text-sm">
          Levitating glass capsules hovering in mid-air with real depth and dynamic shadows.
          Touch or hover to bring any capsule forward in Z-space.
        </p>
      </div>

      {/* Main 3D Spatial Grid / Floating Bento Showcase */}
      <div className="relative z-10 mx-auto mt-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* ================= PORTAL 01: ATMOSPHERE ================= */}
          <FloatingCard
            floatVariant={1}
            depth={16}
            className="group cursor-pointer"
            onClick={() => handlePortalClick(portals[0])}
          >
            <div className="glass-panel relative flex flex-col overflow-hidden rounded-3xl p-4 transition-all duration-500 group-hover:border-[#D4AF37]/60">
              
              {/* Vertical Capsule Frame */}
              <div className="relative aspect-[9/14] w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src={portals[0].image}
                  alt={portals[0].title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Holographic HUD Badge on Image */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                  <CloudLightning size={12} className="text-[#D4AF37]" />
                  <span className="font-mono text-[9px] font-semibold tracking-wider text-[#D4AF37]">
                    PORTAL 01 // ATMOSPHERE
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/70 backdrop-blur-md transition-colors group-hover:text-white">
                  <Maximize2 size={13} />
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#D4AF37]">
                    STRATOSPHERE 40,000 FT
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {portals[0].title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-[#CBD5E1]/80">
                    {portals[0].subtitle}
                  </p>
                </div>
              </div>

              {/* Capsule Footer Telemetry */}
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 font-mono text-[10px]">
                <div>
                  <span className="text-[#64748B]">ENERGY DENSITY</span>
                  <p className="font-bold text-white">1.21 GIGA-WATT</p>
                </div>
                <div className="text-right">
                  <span className="text-[#64748B]">LIGHTNING TEMP</span>
                  <p className="font-bold text-[#D4AF37]">30,000 K</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* ================= PORTAL 02: TERRA ================= */}
          <FloatingCard
            floatVariant={2}
            depth={16}
            className="group cursor-pointer"
            onClick={() => handlePortalClick(portals[1])}
          >
            <div className="glass-panel relative flex flex-col overflow-hidden rounded-3xl p-4 transition-all duration-500 group-hover:border-[#00F5FF]/60">
              
              <div className="relative aspect-[9/14] w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src={portals[1].image}
                  alt={portals[1].title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                  <Trees size={12} className="text-[#00F5FF]" />
                  <span className="font-mono text-[9px] font-semibold tracking-wider text-[#00F5FF]">
                    PORTAL 02 // TERRA
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/70 backdrop-blur-md transition-colors group-hover:text-white">
                  <Maximize2 size={13} />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#00F5FF]">
                    ICELANDIC VOLCANIC CASCADES
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {portals[1].title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-[#CBD5E1]/80">
                    {portals[1].subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 font-mono text-[10px]">
                <div>
                  <span className="text-[#64748B]">FLOW RATE</span>
                  <p className="font-bold text-white">280 m³/sec</p>
                </div>
                <div className="text-right">
                  <span className="text-[#64748B]">BIOLUMINESCENCE</span>
                  <p className="font-bold text-[#00F5FF]">CYAN-480nm</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* ================= PORTAL 03: MACHINE ================= */}
          <FloatingCard
            floatVariant={3}
            depth={16}
            className="group cursor-pointer"
            onClick={() => handlePortalClick(portals[2])}
          >
            <div className="glass-panel relative flex flex-col overflow-hidden rounded-3xl p-4 transition-all duration-500 group-hover:border-[#FF2A55]/60">
              
              <div className="relative aspect-[9/14] w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src={portals[2].image}
                  alt={portals[2].title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                  <Flame size={12} className="text-[#FF2A55]" />
                  <span className="font-mono text-[9px] font-semibold tracking-wider text-[#FF2A55]">
                    PORTAL 03 // MACHINE
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/70 backdrop-blur-md transition-colors group-hover:text-white">
                  <Maximize2 size={13} />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#FF2A55]">
                    BESPOKE AERODYNAMICS
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {portals[2].title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-[#CBD5E1]/80">
                    {portals[2].subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 font-mono text-[10px]">
                <div>
                  <span className="text-[#64748B]">CARBON WEAVE</span>
                  <p className="font-bold text-white">FORGED 3K TWILL</p>
                </div>
                <div className="text-right">
                  <span className="text-[#64748B]">OPTIC TAIL</span>
                  <p className="font-bold text-[#FF2A55]">CRIMSON 635nm</p>
                </div>
              </div>
            </div>
          </FloatingCard>

        </div>

        {/* Auxiliary Bento Cards: Engineering & Metallurgy */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          
          <FloatingCard floatVariant={1} depth={12}>
            <div className="glass-panel h-full rounded-2xl p-6 border-l-4 border-l-[#D4AF37]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4AF37]">
                  METALLURGY ARCHITECTURE
                </span>
                <Shield size={16} className="text-[#D4AF37]" />
              </div>
              <h4 className="mt-2 font-display text-xl font-bold text-white">
                Liquid Titanium & Forged Carbon
              </h4>
              <p className="mt-2 font-mono text-xs text-[#94A3B8] leading-relaxed">
                Atomic bonding of titanium aeronautical alloys with compressed multidirectional carbon fiber flakes yields 340% structural stiffness over conventional hypercars.
              </p>
              <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[#CBD5E1]">
                <span>TORSIONAL RIGIDITY</span>
                <span className="font-bold text-white">72,000 Nm/deg</span>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard floatVariant={2} depth={12}>
            <div className="glass-panel h-full rounded-2xl p-6 border-l-4 border-l-[#00F5FF]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#00F5FF]">
                  ZERO-G LEVITATION FLUX
                </span>
                <Cpu size={16} className="text-[#00F5FF]" />
              </div>
              <h4 className="mt-2 font-display text-xl font-bold text-white">
                Electromagnetic Quantum Coils
              </h4>
              <p className="mt-2 font-mono text-xs text-[#94A3B8] leading-relaxed">
                Adaptive magnetic levitation dampers counteract inertial G-forces up to 3.8G in lateral transitions, creating seamless floating stability on any terrain.
              </p>
              <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[#CBD5E1]">
                <span>RESPONSE LATENCY</span>
                <span className="font-bold text-[#00F5FF]">0.42 Milliseconds</span>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard floatVariant={3} depth={12}>
            <div className="glass-panel h-full rounded-2xl p-6 border-l-4 border-l-[#CBD5E1]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#CBD5E1]">
                  VALKYRIE POWERTRAIN
                </span>
                <Gauge size={16} className="text-[#CBD5E1]" />
              </div>
              <h4 className="mt-2 font-display text-xl font-bold text-white">
                Quad-Flux 1,850 BHP Hybrid
              </h4>
              <p className="mt-2 font-mono text-xs text-[#94A3B8] leading-relaxed">
                Naturally aspirated 6.5L V12 paired with dual axial-flux electric motors spinning at 24,000 RPM for instant zero-lag spatial torque vectoring.
              </p>
              <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[#CBD5E1]">
                <span>0 - 100 KM/H</span>
                <span className="font-bold text-white">1.94 Seconds</span>
              </div>
            </div>
          </FloatingCard>

        </div>
      </div>

      {/* Interactive Modal Inspection for Portal Capsules */}
      {selectedPortal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-2xl">
          <div className="glass-panel relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            
            <button
              onClick={() => {
                soundEngine.playChime(440, 'sine', 0.2);
                setSelectedPortal(null);
              }}
              onMouseEnter={() => soundEngine.playHoverGlass()}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Image Preview */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
                <img
                  src={selectedPortal.image}
                  alt={selectedPortal.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] text-white backdrop-blur-md">
                  {selectedPortal.coordinates}
                </div>
              </div>

              {/* Data & Telemetry */}
              <div className="flex flex-col justify-between">
                <div>
                  <span
                    className="font-mono text-xs font-bold tracking-widest uppercase"
                    style={{ color: selectedPortal.accentColor }}
                  >
                    {selectedPortal.tag}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                    {selectedPortal.title}
                  </h3>
                  <p className="font-mono text-xs text-[#94A3B8]">
                    {selectedPortal.subtitle}
                  </p>

                  <p className="mt-4 font-mono text-xs leading-relaxed text-[#CBD5E1]">
                    {selectedPortal.description}
                  </p>

                  {/* Telemetry Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {selectedPortal.specs.map(spec => (
                      <div
                        key={spec.label}
                        className="rounded-xl border border-white/10 bg-white/5 p-3"
                      >
                        <span className="font-mono text-[9px] text-[#64748B]">
                          {spec.label}
                        </span>
                        <p className="font-display text-sm font-bold text-white">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
                  <span className="text-[#64748B]">RENDER FIDELITY: 8K CINEMATIC</span>
                  <button
                    onClick={() => {
                      soundEngine.playChime(880, 'sine', 0.25);
                      setSelectedPortal(null);
                    }}
                    className="rounded-full bg-white px-5 py-2 font-display text-xs font-bold text-black transition-transform hover:scale-105"
                  >
                    CLOSE PORTAL
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
