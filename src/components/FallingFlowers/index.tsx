import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  rot: number;
  spin: number;
  color: string;
  kind: 0 | 1;
};

const COLORS = ["#E8A33D", "#F0902B", "#C1462F", "#D6295E", "#E06A9B", "#2E9E9B", "#8FA76B"];

/**
 * Ambient marigold petals drifting down the page.
 * Single canvas element — no per-particle DOM, honours reduced motion,
 * pauses when the tab is hidden and thins out on small screens.
 */
export default function FallingFlowers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let petals: Petal[] = [];
    let raf = 0;
    let running = true;

    const makePetal = (initial: boolean): Petal => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : -20,
      r: 4 + Math.random() * 7,
      speed: 14 + Math.random() * 26,
      drift: 8 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] as string,
      kind: Math.random() > 0.45 ? 1 : 0,
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 10 : width < 1024 ? 16 : 22;
      petals = Array.from({ length: count }, () => makePetal(true));
    };

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.42;
      ctx.beginPath();
      if (p.kind === 1) {
        // single soft petal
        ctx.ellipse(0, 0, p.r * 0.55, p.r, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // tiny marigold bloom
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          const a = (i / 5) * Math.PI * 2;
          ctx.ellipse(
            Math.cos(a) * p.r * 0.5,
            Math.sin(a) * p.r * 0.5,
            p.r * 0.45,
            p.r * 0.6,
            a,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      ctx.restore();
    };

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.y += p.speed * dt;
        p.phase += dt;
        p.x += Math.sin(p.phase) * p.drift * dt;
        p.rot += p.spin * dt;
        if (p.y - p.r > height) Object.assign(p, makePetal(false));
        drawPetal(p);
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  );
}
