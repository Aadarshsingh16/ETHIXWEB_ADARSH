"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface ParticleMorphCanvasProps {
  imageSrc: string;
  title: string;
  accentColor?: string;
  className?: string;
  aspectRatio?: number;
  isActive?: boolean;
}

interface Particle {
  imgX: number;
  imgY: number;
  sphereX: number;
  sphereY: number;
  sphereZ: number;
  r: number;
  g: number;
  b: number;
  a: number;
  phase: number;
  speed: number;
  size: number;
}

export function ParticleMorphCanvas({
  imageSrc,
  title,
  accentColor = "#fe1e34",
  className = "",
  isActive = true,
}: ParticleMorphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // Animation state refs: Default is 1 (Photograph), Touch/Hold morphs to 0 (3D Particle Globe)
  const morphValue = useRef(1); // 1 = Image, 0 = Globe
  const targetMorph = useRef(1);
  const globeAngle = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const imgElementRef = useRef<HTMLImageElement | null>(null);

  // Sample image and construct particle systems
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      if (!active) return;
      imgElementRef.current = img;

      const offscreen = document.createElement("canvas");
      const ctx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Sample density
      const sampleCols = 70;
      const imgAspect = img.naturalWidth / img.naturalHeight || 16 / 10;
      const sampleRows = Math.round(sampleCols / imgAspect);
      offscreen.width = sampleCols;
      offscreen.height = sampleRows;

      ctx.drawImage(img, 0, 0, sampleCols, sampleRows);
      const imgData = ctx.getImageData(0, 0, sampleCols, sampleRows).data;

      const total = sampleCols * sampleRows;
      const particles: Particle[] = [];
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden ratio spiral

      for (let i = 0; i < total; i++) {
        const col = i % sampleCols;
        const row = Math.floor(i / sampleCols);
        const idx = i * 4;

        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const a = imgData[idx + 3] / 255;

        // Skip completely transparent pixels
        if (a < 0.05) continue;

        // Fibonacci sphere coordinates
        const y = 1 - (i / (total - 1)) * 2; // -1 to 1
        const radius = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = goldenAngle * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        particles.push({
          imgX: (col / sampleCols) * 2 - 1, // Normalized -1 to 1
          imgY: (row / sampleRows) * 2 - 1,
          sphereX: x,
          sphereY: y,
          sphereZ: z,
          r,
          g,
          b,
          a,
          phase: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 0.4,
          size: 1.8 + Math.random() * 0.8,
        });
      }

      particlesRef.current = particles;
      // Start in assembled image state (m = 1)
      morphValue.current = 1;
      targetMorph.current = 1;
      setIsLoaded(true);
    };

    return () => {
      active = false;
    };
  }, [imageSrc]);

  // Main render loop
  useEffect(() => {
    if (!isLoaded || !isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (timeNow: number) => {
      const dt = Math.min((timeNow - lastTime) / 1000, 0.1);
      lastTime = timeNow;

      // Snappy, instant spring interpolation (reaches target in ~180ms)
      const diff = targetMorph.current - morphValue.current;
      morphValue.current += diff * Math.min(dt * 18, 0.65);

      const m = morphValue.current;
      const globeFactor = 1 - m; // 0 when image, 1 when globe

      // Rotate globe when holding (m < 1)
      globeAngle.current += dt * 0.5 * (1 - m * 0.7);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Distinguish mobile vs desktop based on css clientWidth
      const isMobile = canvas.clientWidth > 0 ? canvas.clientWidth < 640 : false;
      const isLarge = canvas.clientWidth >= 1024;

      const centerX = isMobile ? width / 2 : isLarge ? width * 0.62 : width / 2;
      const centerY = isMobile ? height * 0.28 : height / 2;

      const globeRadius = isMobile
        ? Math.min(width * 0.5, height * 0.22)
        : Math.min(width, height) * 0.34;

      const imgWidth = isMobile
        ? Math.min(width * 0.72, height * 0.32 * (16 / 10))
        : Math.min(width * 0.9, height * 0.9 * (16 / 10));
      const imgHeight = imgWidth / (16 / 10);

      const cosYaw = Math.cos(globeAngle.current);
      const sinYaw = Math.sin(globeAngle.current);

      // 1. Draw High-Resolution Image: default visible at m = 1, dissolves when touched/held
      if (m > 0.05 && imgElementRef.current) {
        ctx.save();
        const fadeAlpha = Math.min(1, Math.max(0, (m - 0.05) / 0.85));
        ctx.globalAlpha = fadeAlpha;
        ctx.drawImage(
          imgElementRef.current,
          centerX - imgWidth / 2,
          centerY - imgHeight / 2,
          imgWidth,
          imgHeight
        );
        ctx.restore();
      }

      // 2. Draw 3D Morphed Particles: lifts off image and forms rotating 3D globe on hold
      const particles = particlesRef.current;
      const count = particles.length;

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // 3D Globe state position with organic rotational turbulence
        const turb = Math.sin(timeNow * 0.002 * p.speed + p.phase) * 0.04 * globeFactor;
        const spunX = (p.sphereX * cosYaw + p.sphereZ * sinYaw) * (1 + turb);
        const spunY = p.sphereY * (1 + turb);
        const spunZ = -p.sphereX * sinYaw + p.sphereZ * cosYaw;

        const sphereScreenX = centerX + spunX * globeRadius;
        const sphereScreenY = centerY + spunY * globeRadius;

        // 2D Image grid position
        const imgScreenX = centerX + (p.imgX * imgWidth) / 2;
        const imgScreenY = centerY + (p.imgY * imgHeight) / 2;

        // Interpolated position between Photograph (m = 1) and 3D Globe (m = 0)
        const posX = sphereScreenX * globeFactor + imgScreenX * m;
        const posY = sphereScreenY * globeFactor + imgScreenY * m;

        // Enhanced luminescence & glow: boost brightness and inject luminous base so dark pixels shine
        const brightness = 1 + globeFactor * 2.2;
        const baseGlow = 80 * globeFactor;
        const r = Math.min(255, Math.round(p.r * brightness + baseGlow));
        const g = Math.min(255, Math.round(p.g * brightness + baseGlow * 0.45));
        const b = Math.min(255, Math.round(p.b * brightness + baseGlow * 0.55));

        // High visibility alpha: front particles are crystal clear and brilliant
        const depthAlpha = globeFactor * ((spunZ + 1.2) / 2.0) * 0.95 + 0.35 * globeFactor + m * 0.25;
        const finalAlpha = Math.max(0.35 * globeFactor + 0.1, Math.min(1, depthAlpha));

        const curSize = p.size * (1.1 + 1.1 * globeFactor);

        // Luminous glow halo on prominent front-facing particles
        if (globeFactor > 0.3 && spunZ > 0.2) {
          const haloSize = curSize * 2.2;
          ctx.fillStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 40)}, ${finalAlpha * 0.25})`;
          ctx.fillRect(posX - haloSize / 2, posY - haloSize / 2, haloSize, haloSize);
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
        ctx.fillRect(posX - curSize / 2, posY - curSize / 2, curSize, curSize);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isLoaded, isActive]);

  // Canvas resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(canvas);

    return () => ro.disconnect();
  }, []);

  const pointerDownPos = useRef<{ x: number; y: number; time: number } | null>(null);

  // Desktop hover sensitivity
  const handlePointerEnter = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || e.pointerType === "pen") {
      targetMorph.current = 0;
      setIsPressed(true);
    }
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || e.pointerType === "pen") {
      targetMorph.current = 1;
      setIsPressed(false);
    }
  }, []);

  // Mobile tap and touch handling
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerDownPos.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!pointerDownPos.current) return;
    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);
    const dt = performance.now() - pointerDownPos.current.time;
    pointerDownPos.current = null;

    // Fast, clean tap without dragging/swiping
    if (dx < 14 && dy < 14 && dt < 450) {
      const next = targetMorph.current === 0 ? 1 : 0;
      targetMorph.current = next;
      setIsPressed(next === 0);
    }
  }, []);

  return (
    <div
      className={`relative w-full h-full select-none cursor-pointer overflow-hidden ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="button"
      tabIndex={0}
      aria-label={`${title} - Tap or hover to view 3D particles`}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          const next = targetMorph.current === 1 ? 0 : 1;
          targetMorph.current = next;
          setIsPressed(next === 0);
        }
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}
