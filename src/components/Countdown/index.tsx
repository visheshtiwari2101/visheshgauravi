import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/config/config";
import { Diya, Marigold, Mandala, MarigoldGarland, Bell } from "@/components/DecorativeElements";
import CharacterScene from "@/components/CharacterScene";
import AddToCalendar from "@/components/AddToCalender";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

const target = new Date(weddingConfig.weddingDateISO).getTime();

function diff(): Parts {
  const ms = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export default function Countdown() {
  const reduce = useReducedMotion();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff());
    const id = setInterval(() => setParts(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells: { label: string; value: number | null }[] = [
    { label: "Days", value: parts?.days ?? null },
    { label: "Hours", value: parts?.hours ?? null },
    { label: "Minutes", value: parts?.minutes ?? null },
    { label: "Seconds", value: parts?.seconds ?? null },
  ];

  return (
    <section id="countdown" className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="ink-frame relative overflow-hidden bg-wedding-surface px-2 py-8 sm:px-10 sm:py-10">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 festive-band" />
          <Mandala className="pointer-events-none absolute -left-16 top-1/2 h-56 w-56 -translate-y-1/2 text-turquoise/15" />
          <Marigold
            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 text-marigold/50"
            aria-hidden="true"
          />
          <MarigoldGarland
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-2 h-6 w-72 -translate-x-1/2 text-marigold/70"
          />

          <div className="grid grid-cols-[minmax(0,0.55fr)_minmax(0,3fr)_minmax(0,0.55fr)] items-center gap-1 sm:gap-4 md:items-end md:grid-cols-[auto_1fr_auto] md:gap-6">
            <div className="flex justify-center">
              <CharacterScene
                type="countdownVishesh"
                className="h-28 w-auto max-w-full object-contain drop-shadow-[0_16px_24px_rgba(74,55,40,0.16)] sm:h-44 md:h-64"
              />
            </div>

            <div className="min-w-0">
              <p className="eyebrow text-center">Counting down to</p>
              <h2 className="mt-2 text-center font-display text-2xl text-wedding-primary sm:text-3xl">
                {weddingConfig.weddingDay}
              </h2>
              <ul className="mt-6 grid grid-cols-4 gap-1 sm:gap-4" aria-live="off">
                {cells.map((c, i) => (
                  <li key={c.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="rounded-2xl border border-wedding-border bg-gradient-to-b from-marigold/15 to-wedding-background px-0.5 py-2.5 text-center sm:px-3 sm:py-4"
                    >
                      <span className="block font-display text-xl tabular-nums text-wedding-primary sm:text-4xl">
                        {c.value === null ? "--" : String(c.value).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block text-[0.5rem] uppercase tracking-[0.1em] sm:tracking-[0.18em] text-wedding-text/65 sm:text-xs">
                        {c.label}
                      </span>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <p className="script-note mt-4 text-center">
                Save the date, we have plans for you
              </p>
              <AddToCalendar />
              <div className="mt-3 flex items-center justify-center gap-3 text-wedding-primary">
                <motion.span
                  aria-hidden="true"
                  animate={reduce ? {} : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Diya className="h-8 w-8" />
                </motion.span>
                <motion.span
                  aria-hidden="true"
                  className="text-rani"
                  animate={reduce ? {} : { rotate: [-12, 12, -12] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bell className="h-7 w-7" />
                </motion.span>
              </div>
            </div>

            <div className="flex justify-center">
              <CharacterScene
                type="countdownGauravi"
                className="h-28 w-auto max-w-full object-contain drop-shadow-[0_16px_24px_rgba(74,55,40,0.16)] sm:h-44 md:h-64"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
