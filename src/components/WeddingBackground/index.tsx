import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useId } from "react";

/** Decorative scenery only: fixed behind the page, with no layout or input footprint. */
export default function WeddingBackground({ welcome = false }: { welcome?: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const skyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const gardenY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const foliageY = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const stemY = useTransform(scrollYProgress, [0, 1], [0, -310]);

  return (
    <div className={`wedding-scenery${welcome ? " wedding-scenery--welcome" : ""}`} aria-hidden="true">
      <motion.div className="wedding-scenery__light" style={{ y: reduce ? 0 : skyY }}>
        <div className="wedding-scenery__sun" />
      </motion.div>
      <motion.div className="wedding-scenery__clouds" style={{ y: reduce ? 0 : cloudY }}>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          <g fill="#fff9eb">
            <path opacity=".65" d="M-100 170Q20 146 83 165Q114 119 184 144Q230 102 288 145Q385 139 429 170Q235 192-100 183Z" />
            <path opacity=".5" d="M980 260Q1024 221 1075 240Q1136 194 1199 235Q1249 213 1305 246Q1420 232 1490 273Q1223 289 980 260Z" />
            <path opacity=".4" d="M-80 345Q74 315 192 346Q246 320 325 351Q203 373-80 363Z" />
          </g>
          <path d="M1010 190Q1190 207 1450 182M-20 225Q120 240 290 221" stroke="#fffaf0" strokeWidth="3" opacity=".45" />
        </svg>
      </motion.div>
      <motion.div className="wedding-scenery__garden" style={{ y: reduce ? 0 : gardenY }}>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0 425Q112 330 223 397T430 443Q600 384 770 435T1060 394Q1280 299 1440 365V900H0Z" fill="#b9c9ba" />
          <path d="M0 507Q147 388 323 500T689 500Q865 448 1050 487T1440 448V900H0Z" fill="#97b2a2" opacity=".7" />
          <path d="M0 615Q141 481 299 578T644 595T991 606T1440 534V900H0Z" fill="#829d83" opacity=".5" />
          <path d="M0 561Q240 523 420 571T860 570T1440 508" fill="none" stroke="#fff5da" strokeWidth="24" opacity=".36" />
        </svg>
      </motion.div>
      <div className="wedding-scenery__veil" />
      <motion.div className="wedding-scenery__foliage" style={{ y: reduce ? 0 : stemY }}>
        <Botanical className="wedding-scenery__branch wedding-scenery__branch--left" />
        <Botanical className="wedding-scenery__branch wedding-scenery__branch--right" />
      </motion.div>
      <motion.div className="wedding-scenery__foliage" style={{ y: reduce ? 0 : foliageY }}>
        <Botanical flowersOnly className="wedding-scenery__branch wedding-scenery__branch--left" />
        <Botanical flowersOnly className="wedding-scenery__branch wedding-scenery__branch--right" />
      </motion.div>
    </div>
  );
}

function Botanical({ className, flowersOnly = false }: { className: string; flowersOnly?: boolean }) {
  const id = useId().replace(/:/g, "");
  const leaves = [[65, 776, -65], [77, 719, 35], [84, 646, -70], [130, 661, 20], [190, 627, 40], [76, 553, -95], [89, 474, 35], [132, 403, 20], [183, 336, 5], [123, 318, -75], [76, 260, -80], [125, 191, 45], [185, 128, 15], [110, 145, -65]];
  return (
    <svg className={className} viewBox="0 0 320 960" fill="none">
      <defs>
        <linearGradient id={`${id}-leaf`} x1="-20" y1="-60" x2="25" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e2e7bc" /><stop offset=".4" stopColor="#a6bb89" /><stop offset=".52" stopColor="#7f9d78" /><stop offset="1" stopColor="#526f65" />
        </linearGradient>
        <radialGradient id={`${id}-petal`} cx="35%" cy="22%" r="85%">
          <stop stopColor="#fff3df" /><stop offset=".38" stopColor="#f1c0ae" /><stop offset=".75" stopColor="#d68e83" /><stop offset="1" stopColor="#a85f62" />
        </radialGradient>
        <radialGradient id={`${id}-center`} cx="35%" cy="25%">
          <stop stopColor="#ffecc0" /><stop offset=".55" stopColor="#dca75b" /><stop offset="1" stopColor="#af763e" />
        </radialGradient>
      </defs>
      {!flowersOnly && <g>
      <g stroke="#8a9c79" strokeWidth="2.5" strokeLinecap="round">
        <path d="M-25 950C155 740 42 535 125 325S85 85 12-40M72 720Q156 630 248 605M75 566Q12 501-20 421M91 447Q178 370 220 280M126 316Q51 226 18 146M118 194Q209 109 228 18" />
      </g>
      {leaves.map(([x, y, angle], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}>
        <path d="M0 0C-32-16-28-48 0-75C29-51 29-18 0 0Z" fill={`url(#${id}-leaf)`} />
        <path d="M0-3Q-5-34 0-69" stroke="#edf0cd" strokeWidth="1" opacity=".65" />
      </g>)}
      </g>}
      {flowersOnly && [[217, 595, 1], [193, 263, .7], [48, 860, .85], [52, 62, .65]].map(([x, y, scale], i) => <g key={i} transform={`translate(${x} ${y}) scale(${scale})`}>
        {Array.from({ length: 7 }, (_, p) => <path key={p} transform={`rotate(${p * 360 / 7})`} d="M0 7C-19-1-34-26-23-42C-9-58 12-49 17-34C22-17 10-1 0 7Z" fill={`url(#${id}-petal)`} />)}
        {Array.from({ length: 5 }, (_, p) => <path key={p} transform={`rotate(${p * 72 + 22}) scale(.58)`} d="M0 7C-19-1-34-26-23-42C-9-58 12-49 17-34C22-17 10-1 0 7Z" fill={`url(#${id}-petal)`} />)}
        <circle r="10" fill={`url(#${id}-center)`} />
        {Array.from({ length: 9 }, (_, p) => <circle key={p} cx={Math.cos(p * .7) * 6} cy={Math.sin(p * .7) * 6} r="1.3" fill="#fff1c9" />)}
      </g>)}
    </svg>
  );
}
