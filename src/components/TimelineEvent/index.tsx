import { motion } from "framer-motion";
import type { SceneType } from "@/config/config";
import CharacterScene from "@/components/CharacterScene";
import { MehendiLine, Sprig, MarigoldGarland } from "@/components/DecorativeElements";

export type TimelineEventProps = {
  index: number;
  date: string;
  time: string;
  title: string;
  description: string;
  scene: SceneType;
};

/** Each ceremony gets its own tint so the scenes feel different but related. */
const tint: Record<SceneType, string> = {
  roka: "from-rani/16 to-transparent",
  puja: "from-wedding-accent/18 to-transparent",
  haldi: "from-haldi/28 to-transparent",
  mehendi: "from-leaf/22 to-transparent",
  baraat: "from-marigold/28 to-transparent",
  reception: "from-wedding-secondary/18 to-transparent",
  phere: "from-wedding-primary/18 to-transparent",
  venue: "from-wedding-secondary/18 to-transparent",
  rsvp: "from-rani/18 to-transparent",
  countdownVishesh: "from-wedding-secondary/18 to-transparent",
  countdownGauravi: "from-rani/18 to-transparent",
  finale: "from-marigold/22 to-transparent",
};

export default function TimelineEvent({
  index,
  date,
  time,
  title,
  description,
  scene,
}: TimelineEventProps) {
  const flipped = index % 2 === 1;

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className={`paper-card relative overflow-hidden bg-gradient-to-br ${tint[scene]} p-5 sm:p-7`}
      >
        <div
          className={`flex flex-col items-center gap-5 sm:gap-8 ${
            flipped ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="relative flex w-full justify-center md:w-2/5">
            <CharacterScene
              type={scene}
              className="h-44 w-auto drop-shadow-[0_16px_24px_rgba(74,55,40,0.18)] sm:h-56 md:h-64"
            />
          </div>

          <div className={`w-full md:w-3/5 ${flipped ? "md:text-right" : ""}`}>
            <div
              className={`flex flex-wrap items-center gap-2 ${
                flipped ? "md:justify-end" : ""
              } justify-center md:justify-start`}
            >
              <span className="rounded-full bg-wedding-primary px-3 py-1 text-xs font-bold tracking-wide text-primary-foreground">
                {time}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-wedding-text/60">
                {date}
              </span>
            </div>
            <h3 className="mt-3 text-center font-display text-2xl text-wedding-primary sm:text-3xl md:text-left md:text-inherit">
              <span className={flipped ? "md:float-right" : ""}>{title}</span>
            </h3>
            <div className="clear-both" />
            <MehendiLine
              className={`mx-auto mt-2 h-3 w-40 text-wedding-accent md:mx-0 ${
                flipped ? "md:ml-auto" : ""
              }`}
            />
            <p className="mt-3 text-center text-sm leading-relaxed text-wedding-text/80 sm:text-base md:text-left">
              <span className={flipped ? "md:block md:text-right" : ""}>{description}</span>
            </p>
          </div>
        </div>

        <MarigoldGarland
          aria-hidden="true"
          className="pointer-events-none absolute -top-1 left-1/2 h-6 w-56 -translate-x-1/2 text-marigold/70"
        />

        <Sprig
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-3 h-4 w-24 text-leaf/50 ${
            flipped ? "left-4" : "right-4"
          }`}
        />
      </div>
    </motion.li>
  );
}
