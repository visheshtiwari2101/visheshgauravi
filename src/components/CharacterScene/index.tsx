import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import { sceneAlt, sceneArt, type SceneType } from "@/config/config";

export type CharacterSceneProps = {
  type: SceneType;
  className?: string;
  priority?: boolean;
};

/** Multi-keyframe loops so each character reads as acting, not floating. */
const cycle = (duration: number): Transition => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut",
  times: [0, 0.25, 0.5, 0.75, 1],
});

/** Per-function idle animation, tuned to how each ceremony feels. */
const motionByScene: Record<SceneType, { animate: TargetAndTransition; transition: Transition }> =

  {
    roka: {
      animate: { rotate: [0, -1.6, 0, 1.2, 0], y: [0, -5, 0, -2, 0], scale: [1, 1.012, 1, 1.006, 1] },
      transition: cycle(5.2),
    },
    puja: {
      animate: { scale: [1, 1.016, 1, 1.008, 1], y: [0, -3, 0, -1.5, 0], rotate: [0, 0.5, 0, -0.5, 0] },
      transition: cycle(6),
    },
    haldi: {
      animate: { rotate: [0, -2.6, 0.6, 2.4, 0], x: [0, -4, 0, 4, 0], y: [0, -5, 0, -6, 0] },
      transition: cycle(3.4),
    },
    mehendi: {
      animate: { rotate: [0, 1.8, 0, -1.2, 0], x: [0, 6, 0, -3, 0], scale: [1, 1.02, 1, 1.005, 1] },
      transition: cycle(4.2),
    },
    baraat: {
      animate: {
        y: [0, -16, -2, -14, 0],
        rotate: [0, 3.5, 0, -3.5, 0],
        scale: [1, 1.03, 1, 1.025, 1],
      },
      transition: cycle(1.4),
    },
    reception: {
      animate: { y: [0, -4, 0, -2, 0], rotate: [0, -1.2, 0, 1.6, 0], scale: [1, 1.01, 1, 1.005, 1] },
      transition: cycle(5),
    },
    phere: {
      animate: { y: [0, -5, 0, -3, 0], rotate: [0, -1, 0, 1, 0], scale: [1, 1.012, 1, 1.006, 1] },
      transition: cycle(6.5),
    },
    venue: {
      animate: { rotate: [0, -1.4, 0, 1.8, 0], y: [0, -4, 0, -6, 0], scale: [1, 1.01, 1, 1.02, 1] },
      transition: cycle(4.6),
    },
    rsvp: {
      animate: { rotate: [0, 1.6, 0, -1.6, 0], y: [0, -5, 0, -5, 0], scale: [1, 1.018, 1, 1.012, 1] },
      transition: cycle(3.6),
    },
    countdownVishesh: {
      animate: { rotate: [0, 2.4, 0, -1.4, 0], y: [0, -7, 0, -3, 0], x: [0, 3, 0, -2, 0] },
      transition: cycle(3),
    },
    countdownGauravi: {
      animate: { rotate: [0, -2.4, 0, 1.4, 0], y: [0, -7, 0, -3, 0], x: [0, -3, 0, 2, 0] },
      transition: cycle(3.4),
    },
    finale: {
      animate: { rotate: [0, 1.4, 0, -1.4, 0], y: [0, -6, 0, -4, 0], scale: [1, 1.02, 1, 1.012, 1] },
      transition: cycle(4),
    },
  };


/** Scroll-in reaction: each scene enters from its own direction with a little character. */
const entranceByScene: Partial<Record<SceneType, TargetAndTransition>> = {
  roka: { x: [-40, 6, 0], opacity: [0, 1, 1] },
  puja: { y: [24, 0], opacity: [0, 1], scale: [0.96, 1] },
  haldi: { x: [-30, 8, 0], rotate: [-6, 3, 0], opacity: [0, 1, 1] },
  mehendi: { x: [30, -8, 0], rotate: [6, -3, 0], opacity: [0, 1, 1] },
  baraat: { y: [40, -12, 0], scale: [0.9, 1.04, 1], opacity: [0, 1, 1] },
  reception: { x: [24, 0], opacity: [0, 1] },
  phere: { y: [22, 0], scale: [0.97, 1], opacity: [0, 1] },
  venue: { y: [26, -6, 0], opacity: [0, 1, 1] },
  rsvp: { scale: [0.9, 1.03, 1], opacity: [0, 1, 1] },
  finale: { y: [30, -8, 0], scale: [0.94, 1.03, 1], opacity: [0, 1, 1] },
  countdownVishesh: { x: [-28, 6, 0], opacity: [0, 1, 1] },
  countdownGauravi: { x: [28, -6, 0], opacity: [0, 1, 1] },
};

export default function CharacterScene({ type, className, priority = false }: CharacterSceneProps) {
  const reduce = useReducedMotion();
  const config = motionByScene[type];
  const entrance = entranceByScene[type];

  const img = (
    <motion.img
      src={sceneArt[type]}
      alt={sceneAlt[type]}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={{ transformOrigin: "50% 92%" }}
      {...(reduce ? {} : { animate: config.animate, transition: config.transition })}
    />
  );

  if (reduce || !entrance) {
    return (
      <motion.div
        className="contents"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        {img}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={entrance}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="will-change-transform"
    >
      {img}
    </motion.div>
  );
}
