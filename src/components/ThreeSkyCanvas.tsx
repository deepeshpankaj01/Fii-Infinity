import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSkyCanvasProps {
  intensity?: number;
  environmentMode?: 'sunset' | 'aurora' | 'storm';
}

export const ThreeSkyCanvas: React.FC<ThreeSkyCanvasProps> = ({
  environmentMode = 'sunset',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.0006);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Starfield / Celestial Dust
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 2200;
      starPositions[i + 1] = (Math.random() - 0.5) * 1600;
      starPositions[i + 2] = (Math.random() - 0.5) * 1200;
      starScales[i / 3] = Math.random() * 2.5 + 0.5;
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('scale', new THREE.BufferAttribute(starScales, 1));

    // Custom shader material for soft glowing celestial particles
    const starMaterial = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 3,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starsGeo, starMaterial);
    scene.add(starField);

    // Volumetric cloud layer simulation (soft translucent billboard planes)
    const cloudGeo = new THREE.PlaneGeometry(600, 400);
    
    // Create soft radial texture for volumetric puff
    const createCloudTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, 'rgba(255, 235, 205, 0.45)');
      gradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.18)');
      gradient.addColorStop(0.8, 'rgba(6, 18, 26, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(canvas);
    };

    const cloudTexture = createCloudTexture();
    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const cloudGroup = new THREE.Group();
    const clouds: THREE.Mesh[] = [];

    for (let i = 0; i < 28; i++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        (Math.random() - 0.5) * 1600,
        (Math.random() - 0.5) * 900 - 150,
        (Math.random() - 0.5) * 600 - 200
      );
      cloud.rotation.z = Math.random() * Math.PI * 2;
      cloud.scale.setScalar(Math.random() * 1.8 + 0.8);
      clouds.push(cloud);
      cloudGroup.add(cloud);
    }
    scene.add(cloudGroup);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    dirLight.position.set(200, 300, 400);
    scene.add(dirLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f5ff, 1.8);
    cyanRimLight.position.set(-300, -100, 200);
    scene.add(cyanRimLight);

    // Mouse movement
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Inertial mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Studio light sweep across typography & scene
      dirLight.position.x = 200 + mouseRef.current.x * 350;
      dirLight.position.y = 300 + mouseRef.current.y * 250;
      cyanRimLight.position.x = -300 - mouseRef.current.x * 200;

      // Subtle zero-G camera orbit
      camera.position.x = mouseRef.current.x * 45;
      camera.position.y = mouseRef.current.y * 35 + Math.sin(elapsed * 0.5) * 12;
      camera.lookAt(0, 0, 0);

      // Cloud drift
      clouds.forEach((c, idx) => {
        c.position.x += 0.25 + (idx % 3) * 0.08;
        c.position.y += Math.sin(elapsed * 0.4 + idx) * 0.15;
        if (c.position.x > 1100) {
          c.position.x = -1100;
        }
      });

      // Starfield gentle rotation
      starField.rotation.y = elapsed * 0.015;
      starField.rotation.x = mouseRef.current.y * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeo.dispose();
      cloudGeo.dispose();
      cloudTexture.dispose();
    };
  }, [environmentMode]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.9 }}
    />
  );
};
