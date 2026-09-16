import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ganpatiArt, weddingConfig } from "@/config/config";
import startScreenAsset from "@/assets/characters/start-screen.png";

const startArt = startScreenAsset;
import { MehendiLine } from "@/components/DecorativeElements";
import WeddingBackground from "@/components/WeddingBackground";

export default function StartScreen({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion();
  const [celebrating, setCelebrating] = useState(false);

  const handleEnter = () => {
    if (celebrating) return;
    // start music on the same user gesture
    onEnter();
    setCelebrating(true);
  };

  return (
    <motion.div
      key="start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[80] flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-wedding-background px-5 py-8 text-center"
    >
      <WeddingBackground welcome />

      <motion.img
        src={ganpatiArt}
        alt=""
        aria-hidden="true"
        className="h-14 w-auto sm:h-16"
        animate={reduce ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src={startArt}
        alt={`Illustration of ${weddingConfig.groomName} winking and waving beside ${weddingConfig.brideName}, welcoming you`}
        draggable={false}
        initial={{ opacity: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.96 }}
        animate={
          reduce
            ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
            : celebrating
              ? { opacity: 1, y: -10, scale: 1.06, rotate: 0 }
              : {
                  opacity: 1,
                  y: [0, -6, 0, -3, 0],
                  scale: 1,
                  rotate: [0, -1.4, 0, 1.4, 0],
                }
        }
        transition={
          celebrating
            ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            : {
                opacity: { duration: 0.7, delay: 0.1 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
              }
        }
        className="mt-4 max-h-[42svh] w-[min(82vw,420px)] object-contain drop-shadow-[0_14px_28px_rgba(74,55,40,0.16)]"
      />

      <motion.h1
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-5 font-display text-3xl text-wedding-primary sm:text-5xl"
      >
        {weddingConfig.brideName}
        <span className="mx-2 text-wedding-secondary">&</span>
        {weddingConfig.groomName}
      </motion.h1>

      <MehendiLine className="mt-2 h-3 w-44 text-wedding-accent sm:w-64" />

      <motion.button
        type="button"
        onClick={handleEnter}
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileTap={{ scale: 0.97 }}
        className="mt-7 inline-flex max-w-[92vw] items-center justify-center gap-2 rounded-full bg-wedding-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03] sm:text-base"
      >
        Gaurgeous Things Await
      </motion.button>

      <p className="script-note mt-3 text-sm">{weddingConfig.hashtag}</p>
    </motion.div>
  );
}
