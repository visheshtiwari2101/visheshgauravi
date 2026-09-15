import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  spin: number;
  life: number;
  ttl: number;
  color: string;
  kind: 0 | 1 | 2; // 0 bloom, 1 petal, 2 sparkle
};

const FLOWER_COLORS = ["#E8A33D", "#F0902B", "#C1462F", "#D6295E", "#E06A9B", "#2E9E9B"];
const SPARKLE = "#F2C14E";

/**
 * Tiny marigold petals + golden sparkles that trail the scroll gesture.
 * One canvas, capped particle pool, rAF-driven, honours reduced motion.
 */
export default function ScrollTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = () => width < 768;
    const MAX = () => (isMobile() ? 70 : 190);

    let particles: P[] = [];
    let raf = 0;
    let running = false;
    let last = performance.now();
    let lastScrollY = window.scrollY;
    let pointerX = width / 2;
    let pointerY = height / 2;
    let hasPointer = false;
    let accum = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (dir: number) => {
      if (particles.length >= MAX()) return;
      const mob = isMobile();
      const baseX = hasPointer ? pointerX : width / 2;
      const baseY = hasPointer ? pointerY : height * 0.55;
      const kindRoll = Math.random();
      const kind: P["kind"] = kindRoll > 0.62 ? 2 : kindRoll > 0.32 ? 1 : 0;
      const ttl = 0.8 + Math.random() * 1.0;
      particles.push({
        x: baseX + (Math.random() - 0.5) * (mob ? 150 : 280),
        y: baseY + (Math.random() - 0.5) * (mob ? 170 : 300),
        vx: (Math.random() - 0.5) * 26,
        vy: dir * (10 + Math.random() * 26) + (Math.random() - 0.5) * 14,
        r: (kind === 2 ? 1.6 + Math.random() * 1.8 : 3 + Math.random() * 4) * (mob ? 0.9 : 1.2),
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 2.2,
        life: 0,
        ttl,
        color: kind === 2 ? SPARKLE : (FLOWER_COLORS[(Math.random() * FLOWER_COLORS.length) | 0] as string),
        kind,
      });
    };

    const draw = (p: P) => {
      const t = p.life / p.ttl;
      const alpha = (t < 0.18 ? t / 0.18 : 1 - (t - 0.18) / 0.82) * 0.82;
      if (alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      const s = 0.7 + 0.5 * (1 - t);
      if (p.kind === 2) {
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const a = (i / 4) * Math.PI * 2;
          const long = p.r * 2.6 * s;
          const shortR = p.r * 0.5 * s;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * long, Math.sin(a) * long);
          ctx.lineTo(Math.cos(a + 0.5) * shortR, Math.sin(a + 0.5) * shortR);
        }
        ctx.fill();
      } else if (p.kind === 1) {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 0.55 * s, p.r * s, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2;
          ctx.beginPath();
          ctx.ellipse(
            Math.cos(a) * p.r * 0.5 * s,
            Math.sin(a) * p.r * 0.5 * s,
            p.r * 0.42 * s,
            p.r * 0.58 * s,
            a,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      const next: P[] = [];
      for (const p of particles) {
        p.life += dt;
        if (p.life >= p.ttl) continue;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 18 * dt;
        p.vx *= 0.985;
        p.rot += p.spin * dt;
        draw(p);
        next.push(p);
      }
      particles = next;
      if (particles.length === 0) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      lastScrollY = y;
      if (document.hidden) return;
      accum += Math.abs(delta);
      const step = isMobile() ? 34 : 18;
      const dir = delta >= 0 ? -1 : 1;
      while (accum >= step) {
        accum -= step;
        spawn(dir);
      }
      start();
    };

    const onPointer = (e: PointerEvent) => {
      hasPointer = true;
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full select-none"
    />
  );
}
