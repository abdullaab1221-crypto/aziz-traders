"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 24;

function frameSrc(i: number): string {
  return `/products/aurum-360/frame-${String(i + 1).padStart(2, "0")}.svg`;
}

export default function Viewer360({ enabled }: { enabled: boolean }) {
  const [frame, setFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const lastX = useRef(0);
  const touchX = useRef(0);

  useEffect(() => {
    const img = new Image();
    img.src = frameSrc(0);
    if (img.complete) setLoaded(true);
    img.onload = () => setLoaded(true);
  }, []);

  const step = useCallback((delta: number) => {
    setFrame((f) => (f + delta + TOTAL_FRAMES) % TOTAL_FRAMES);
  }, []);

  if (!enabled) return null;

  return (
    <div className="rounded-2xl border border-royal/10 overflow-hidden bg-marble select-none">
      <div className="flex items-center justify-between px-5 py-3 border-b border-royal/10">
        <span className="text-[11px] tracking-[0.2em] uppercase text-gold">360° View</span>
        <span className="text-[11px] text-slate">Drag or swipe to rotate</span>
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label="360 degree product rotation"
        aria-valuemin={1}
        aria-valuemax={TOTAL_FRAMES}
        aria-valuenow={frame + 1}
        className="relative touch-pan-y cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        onMouseDown={(e) => {
          setDragging(true);
          lastX.current = e.clientX;
        }}
        onMouseMove={(e) => {
          if (!dragging) return;
          const dx = e.clientX - lastX.current;
          if (Math.abs(dx) >= 14) {
            step(dx > 0 ? -1 : 1);
            lastX.current = e.clientX;
          }
        }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchMove={(e) => {
          const dx = e.touches[0].clientX - touchX.current;
          if (Math.abs(dx) >= 18) {
            step(dx > 0 ? -1 : 1);
            touchX.current = e.touches[0].clientX;
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
      >
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center text-xs tracking-[0.2em] uppercase text-slate">
            Loading viewer…
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc(frame)}
          alt={`Product angle ${frame + 1} of ${TOTAL_FRAMES}`}
          width={800}
          height={800}
          draggable={false}
          className="w-full aspect-square object-cover pointer-events-none"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <button
            aria-label="Rotate left"
            onClick={() => step(-1)}
            className="h-9 w-9 rounded-full bg-midnight/85 text-champagne grid place-items-center hover:bg-midnight transition-colors"
          >
            ‹
          </button>
          <span className="bg-midnight/85 text-champagne text-[10px] tracking-[0.16em] px-3 py-2 rounded-full">
            {frame + 1} / {TOTAL_FRAMES}
          </span>
          <button
            aria-label="Rotate right"
            onClick={() => step(1)}
            className="h-9 w-9 rounded-full bg-midnight/85 text-champagne grid place-items-center hover:bg-midnight transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-royal/10 flex gap-1.5 justify-center">
        {Array.from({ length: TOTAL_FRAMES }).map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${i === frame ? "w-5 bg-gold" : "w-2 bg-royal/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
