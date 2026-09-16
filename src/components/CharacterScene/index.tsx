import haldiClean from "@/assets/characters/haldi-clean.png";
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import { sceneAlt, sceneArt, type SceneType } from "@/config/config";

export type CharacterSceneProps = {
  type: SceneType;
  className?: string;
  priority?: boolean;
  turmeric?: number;
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
    puja: {
      animate: { scale: [1, 1.016, 1, 1.008, 1], y: [0, -3, 0, -1.5, 0], rotate: [0, 0.5, 0, -0.5, 0] },
      transition: cycle(6),
    },
    haldi: {
      animate: { rotate: [0, -2.6, 0.6, 2.4, 0], x: [0, -4, 0, 4, 0], y: [0, -5, 0, -6, 0] },
      transition: cycle(3.4),
    },
    engagement: {
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
  puja: { y: [24, 0], opacity: [0, 1], scale: [0.96, 1] },
  haldi: { x: [-30, 8, 0], rotate: [-6, 3, 0], opacity: [0, 1, 1] },
  engagement: { x: [30, -8, 0], rotate: [6, -3, 0], opacity: [0, 1, 1] },
  baraat: { y: [40, -12, 0], scale: [0.9, 1.04, 1], opacity: [0, 1, 1] },
  reception: { x: [24, 0], opacity: [0, 1] },
  phere: { y: [22, 0], scale: [0.97, 1], opacity: [0, 1] },
  venue: { y: [26, -6, 0], opacity: [0, 1, 1] },
  rsvp: { scale: [0.9, 1.03, 1], opacity: [0, 1, 1] },
  finale: { y: [30, -8, 0], scale: [0.94, 1.03, 1], opacity: [0, 1, 1] },
  countdownVishesh: { x: [-28, 6, 0], opacity: [0, 1, 1] },
  countdownGauravi: { x: [28, -6, 0], opacity: [0, 1, 1] },
};

export default function CharacterScene({ type, className, priority = false, turmeric }: CharacterSceneProps) {
  const reduce = useReducedMotion();
  const config = motionByScene[type];
  const entrance = entranceByScene[type];

  const img = turmeric !== undefined ? (
    <motion.span className="relative inline-block" style={{ transformOrigin: "50% 92%" }}
      {...(reduce ? {} : { animate: config.animate, transition: config.transition })}>
      <img src={haldiClean} alt="Vishesh in a blue kurta and Gauravi in a red kurta, progressively covered with Haldi" loading={priority ? "eager" : "lazy"} decoding="async" draggable={false} className={className} />
      <svg aria-hidden="true" viewBox="0 0 857 1834" className="pointer-events-none absolute inset-0 h-full w-full" style={{ opacity: turmeric / 100 }}>
        <defs>
          <clipPath id="haldi-clothes">
            <path d="M42 710L64 564L88 557L122 532L152 594L119 626L162 647L203 749L237 744L246 683L219 592L232 528L274 547L323 500L393 524L420 585L414 793L453 1556L362 1580L368 1714L282 1744L274 1578L238 1574L246 1733L158 1732L147 1572L3 1527L58 1137L127 1155L149 1115L123 1047L112 937L36 927Z" />
            <path fillRule="evenodd" d="M399 520L445 427L483 414L492 392L539 417L577 420L629 375L647 407L737 441L800 507L857 731L850 804L803 850L856 1388L783 1420L446 1420L423 1155L413 877L413 679Z M431 756L474 737L507 709L555 714L579 737L612 748L618 790L638 826L641 864L589 884L519 881L473 857L452 826Z" />
          </clipPath>
          <filter id="haldi-yellow" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values=".25 .5 .15 0 .50 .18 .4 .1 0 .36 .02 .04 .01 0 .01 0 0 0 1 0" />
          </filter>
        </defs>
        <image href={haldiClean} width="857" height="1834" preserveAspectRatio="none" clipPath="url(#haldi-clothes)" filter="url(#haldi-yellow)" />
      </svg>
    </motion.span>
  ) : (
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
