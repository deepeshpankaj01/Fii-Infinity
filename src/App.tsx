import React, { useState, useEffect } from 'react';
import { ThreeSkyCanvas } from './components/ThreeSkyCanvas';
import { CustomCursor } from './components/CustomCursor';
import { NavigationDock } from './components/NavigationDock';
import { Scene1HeroSky } from './components/Scene1HeroSky';
import { Scene2FloatingBento } from './components/Scene2FloatingBento';
import { Scene3AeroConfigurator } from './components/Scene3AeroConfigurator';
import { Scene4AntiGravityFooter } from './components/Scene4AntiGravityFooter';
import { soundEngine } from './services/audio';

export function App() {
  const [activeScene, setActiveScene] = useState<number>(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Monitor scroll position to update activeScene in Navigation Dock
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      if (scrollY < height * 0.7) {
        setActiveScene(1);
      } else if (scrollY < height * 1.8) {
        setActiveScene(2);
      } else if (scrollY < height * 2.8) {
        setActiveScene(3);
      } else {
        setActiveScene(4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectScene = (sceneIndex: number) => {
    setActiveScene(sceneIndex);
    const height = window.innerHeight;

    if (sceneIndex === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sceneIndex === 2) {
      const el = document.getElementById('bento-orbit');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sceneIndex === 3) {
      const el = document.getElementById('valkyrie-config');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sceneIndex === 4) {
      const el = document.getElementById('ecosystem');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAudio = () => {
    const nextState = soundEngine.toggleMute();
    setIsAudioPlaying(nextState);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-[#E2E8F0]">
      {/* Interactive Dual-Ring Magnetic Cursor with Stardust Particles */}
      <CustomCursor />

      {/* Volumetric Sky, Clouds & Ray-Traced Studio Light Sweeps */}
      <ThreeSkyCanvas />

      {/* Floating Frosted Glass Navigation Dock */}
      <NavigationDock
        activeScene={activeScene}
        onSelectScene={handleSelectScene}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 w-full">
        {/* Scene 1: Sky Entry & 3D Metallic Logo Reveal */}
        <Scene1HeroSky onExploreClick={() => handleSelectScene(2)} />

        {/* Scene 2: The Zero-Gravity Floating Showcase (Interactive Bento Orbit) */}
        <Scene2FloatingBento />

        {/* Scene 3: The Hypercar Aerodynamic Configurator */}
        <Scene3AeroConfigurator />

        {/* Scene 4: The Anti-Gravity Footer & Portal */}
        <Scene4AntiGravityFooter />
      </main>
    </div>
  );
}

export default App;
