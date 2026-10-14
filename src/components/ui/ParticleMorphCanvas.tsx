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

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * 0.34;
      const imgWidth = Math.min(width * 0.9, height * 0.9 * (16 / 10));
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

        // Depth perspective and alpha: bright in 3D globe mode, soft subtle particles on photo
        const depthAlpha = globeFactor * ((spunZ + 1.2) / 2.4) + m * 0.22;
        const finalAlpha = Math.max(0.12, Math.min(1, p.a * depthAlpha));

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${finalAlpha})`;
        const curSize = p.size * (0.85 + 0.35 * globeFactor);
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

  const pointerDownTime = useRef<number>(0);
  const wasGlobeOnDown = useRef<boolean>(false);

  // Instant single-touch toggle + hold support
  const handlePointerDown = useCallback(() => {
    pointerDownTime.current = performance.now();
    wasGlobeOnDown.current = targetMorph.current === 0;

    // Trigger immediately on the very first millisecond of touch
    if (wasGlobeOnDown.current) {
      targetMorph.current = 1;
      setIsPressed(false);
    } else {
      targetMorph.current = 0;
      setIsPressed(true);
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    const elapsed = performance.now() - pointerDownTime.current;

    // If quick tap (< 280ms) and was starting from image:
    // keep it in 3D globe mode so the user can enjoy the motion without holding!
    if (elapsed < 280) {
      if (!wasGlobeOnDown.current) {
        targetMorph.current = 0;
        setIsPressed(true);
      }
    } else {
      // Long press release: return to image
      targetMorph.current = 1;
      setIsPressed(false);
    }
  }, []);

  return (
    <div
      className={`relative w-full h-full select-none cursor-pointer overflow-hidden ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="button"
      tabIndex={0}
      aria-label={`${title} - Tap or hold to form particle globe`}
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
        style={{ touchAction: "none" }}
      />

      {/* Interactive Status Pill Hint */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-20">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 backdrop-blur-md border ${
            isPressed
              ? "bg-[#fe1e34]/90 text-white border-white/30 shadow-[0_0_20px_rgba(254,30,52,0.4)] scale-105"
              : "bg-black/75 text-white/80 border-white/15"
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: isPressed ? "#ffffff" : accentColor }}
          />
          <span>
            {isPressed
              ? "● 3D Particle Globe Active · Tap to view image"
              : "Tap or hold to form 3D particle globe"}
          </span>
        </div>
      </div>
    </div>
  );
}
