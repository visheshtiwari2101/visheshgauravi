import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ganpatiArt, weddingConfig } from "@/config/config";
import { FloralCorner, Marigold, MehendiLine } from "@/components/DecorativeElements";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-14 pb-16 text-center"
    >
      <FloralCorner className="pointer-events-none absolute -left-4 top-16 h-28 w-28 text-leaf/60 sm:h-40 sm:w-40" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -right-4 top-16 h-28 w-28 text-blossom/50 sm:h-40 sm:w-40"
      />

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : -14, scale: reduce ? 1 : 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <motion.img
          src={ganpatiArt}
          alt="Hand-drawn illustration of Lord Ganesha blessing the wedding invitation"
          width={512}
          height={512}
          className="h-20 w-auto sm:h-24"
          animate={reduce ? {} : { y: [0, -4, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="script-note mt-1 text-sm sm:text-base">Shubh Vivah</p>
      </motion.div>

      <motion.p {...rise(0.05)} className="mt-5 eyebrow">
        Together with our families
      </motion.p>

      <motion.div
        {...rise(0.15)}
        className="relative mt-4 w-[min(88vw,340px)] sm:w-[380px] md:w-[420px]"
      >
        <img
          src={weddingConfig.logo}
          alt={`${weddingConfig.brideName} and ${weddingConfig.groomName} wedding monogram`}
          className="w-full rounded-[2rem] border border-wedding-border bg-wedding-surface object-contain shadow-[var(--shadow-lift)]"
          width={1024}
          height={1024}
        />
        <motion.span
          aria-hidden="true"
          className="absolute -left-6 top-8 text-haldi"
          animate={reduce ? {} : { y: [0, -10, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Marigold className="h-9 w-9" />
        </motion.span>
        <motion.span
          aria-hidden="true"
          className="absolute -right-5 bottom-16 text-wedding-primary"
          animate={reduce ? {} : { y: [0, 12, 0], rotate: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Marigold className="h-7 w-7" />
        </motion.span>
      </motion.div>

      <motion.h1
        {...rise(0.35)}
        className="mt-7 font-display text-4xl leading-tight text-wedding-primary sm:text-6xl md:text-7xl"
      >
        {weddingConfig.brideName}
        <span className="mx-3 text-wedding-secondary">&</span>
        {weddingConfig.groomName}
      </motion.h1>

      <motion.div {...rise(0.45)} className="mt-3 flex flex-col items-center gap-2">
        <MehendiLine className="h-3 w-52 text-wedding-accent sm:w-72" />
        <p className="font-display text-lg tracking-[0.18em] text-wedding-text sm:text-xl">
          {weddingConfig.weddingDate}
        </p>
        <p className="text-sm text-wedding-text/70">{weddingConfig.venueName}</p>
        <p className="script-note mt-1">{weddingConfig.hashtag}</p>
      </motion.div>

      <motion.a
        {...rise(0.6)}
        href="#countdown"
        className="group mt-10 inline-flex flex-col items-center gap-2 text-wedding-text/70"
      >
        <span className="rounded-full border border-wedding-border bg-wedding-surface px-6 py-2.5 text-sm font-semibold text-wedding-primary transition-colors group-hover:bg-wedding-primary group-hover:text-primary-foreground">
          Come see the plan
        </span>
        <motion.span
          aria-hidden="true"
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
