"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface ParticleMorphCanvasProps {
  imageSrc: string;
  title: string;
  accentColor?: string;
  className?: string;
  aspectRatio?: number;
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
}: ParticleMorphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // Animation state refs
  const morphValue = useRef(0); // 0 = Globe, 1 = Image
  const targetMorph = useRef(0);
  const globeAngle = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  // Sample image and construct particle systems
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      if (!active) return;
      const offscreen = document.createElement("canvas");
      const ctx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Sample density
      const sampleCols = 70;
      const imgAspect = img.naturalWidth / img.naturalHeight;
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
      setIsLoaded(true);
    };

    return () => {
      active = false;
    };
  }, [imageSrc]);

  // Main render loop
  useEffect(() => {
    if (!isLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (timeNow: number) => {
      const dt = Math.min((timeNow - lastTime) / 1000, 0.1);
      lastTime = timeNow;

      // Smooth spring interpolation toward target morph (0 = globe, 1 = image)
      const diff = targetMorph.current - morphValue.current;
      morphValue.current += diff * Math.min(dt * 8, 0.3);

      // Rotate globe when in globe state
      globeAngle.current += dt * 0.5 * (1 - morphValue.current);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * 0.32;
      const imgWidth = Math.min(width * 0.82, height * 0.82 * (16 / 10));
      const imgHeight = imgWidth / (16 / 10);

      const cosYaw = Math.cos(globeAngle.current);
      const sinYaw = Math.sin(globeAngle.current);
      const m = morphValue.current;

      const particles = particlesRef.current;
      const count = particles.length;

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // 1. Globe state position with subtle organic turbulence
        const turb = Math.sin(timeNow * 0.002 * p.speed + p.phase) * 0.04;
        const spunX = (p.sphereX * cosYaw + p.sphereZ * sinYaw) * (1 + turb);
        const spunY = p.sphereY * (1 + turb);
        const spunZ = -p.sphereX * sinYaw + p.sphereZ * cosYaw;

        const sphereScreenX = centerX + spunX * globeRadius;
        const sphereScreenY = centerY + spunY * globeRadius;

        // 2. Image state position
        const imgScreenX = centerX + (p.imgX * imgWidth) / 2;
        const imgScreenY = centerY + (p.imgY * imgHeight) / 2;

        // Interpolated position
        const posX = sphereScreenX * (1 - m) + imgScreenX * m;
        const posY = sphereScreenY * (1 - m) + imgScreenY * m;

        // Depth perspective & alpha
        const depthAlpha = (1 - m) * ((spunZ + 1.2) / 2.4) + m * 1.0;
        const finalAlpha = Math.max(0.1, Math.min(1, p.a * depthAlpha));

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${finalAlpha})`;
        const curSize = p.size * (0.8 + 0.3 * (1 - m));
        ctx.fillRect(posX - curSize / 2, posY - curSize / 2, curSize, curSize);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isLoaded]);

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

  const handlePointerDown = useCallback(() => {
    setIsPressed(true);
    targetMorph.current = 1; // Morph to Image
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsPressed(false);
    targetMorph.current = 0; // Morph back to Globe
  }, []);

  return (
    <div
      className={`relative w-full h-full select-none cursor-pointer overflow-hidden ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="button"
      tabIndex={0}
      aria-label={`${title} - Hold to form photograph, release to form particle globe`}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          targetMorph.current = targetMorph.current === 0 ? 1 : 0;
          setIsPressed(targetMorph.current === 1);
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
              ? "● Holding: Assembled Image"
              : "Hold anywhere to assemble image"}
          </span>
        </div>
      </div>
    </div>
  );
}
