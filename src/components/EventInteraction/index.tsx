import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import danceTeachers from "@/assets/characters/dance-teachers.png";
import type { SceneType } from "@/config/config";

const excuses = [
  "Got tangled trying to pleat my dhoti/saree.",
  "Stopped for morning kachori and lost track of space and time.",
  "Stuck in hotel elevator waiting for cousins to finish applying eyeliner.",
  "Went to find the function hall. Somehow reached the breakfast buffet.",
  "One family photo turned into a 47-photo photoshoot.",
  "Tried to grab ‘just one hot puri’ before the pujan and lost track of time at the breakfast buffet.",
  "The room key was with someone who was taking a nap with the door locked from the inside.",
  "Two people tried following a video tutorial to tie one turban and ended up tangled in the cloth.",
  "Asked an uncle for directions to the hall and got stuck listening to a 30-minute story instead.",
  "Someone burned a small hole in their kurta with the iron, and four people spent half an hour trying to cover it with safety pins.",
];
const steps = ["Quick smile with the couple on stage.", "Beeline for the hot paneer and dal makhani counter.", "Camp directly next to the dessert station for second helpings."];
const vows = [
  ["The Streaming Protocol", "I promise never to hit “Next Episode” on Netflix without you, even when you fall asleep four minutes into the recap."],
  ["The Food Tax", "I solemnly swear to order extra French fries every single time, because we both know “I’m not that hungry” is an absolute lie."],
  ["Climate Control Accord", "I vow to negotiate the bedroom AC temperature in good faith, and to only adjust the thermostat when you are deeply asleep."],
  ["The Spider Treaty", "I promise to serve as the designated household rescuer for any multi-legged intruders, regardless of how terrified I am on the inside."],
  ["The Navigational Pact", "I promise to let you drive, but I reserve the constitutional right to aggressively clutch the door handle when you merge onto the highway."],
  ["The Social Battery Bailout", "I vow to recognize the secret “we need to leave this party immediately” eye signal and invent a polite, highly convincing excuse within two minutes."],
  ["The Long Haul", "I promise to love you fiercely through every life milestone, every messy weekday dinner, and every debate over where we put the TV remote."],
];
const analysing = ["Searching for something believable…", "Consulting the family excuse department…", "Making this sound convincing…"];
const button = "min-h-11 rounded-full border border-wedding-primary/25 bg-wedding-surface px-4 py-2 text-sm font-bold text-wedding-primary transition-colors hover:bg-wedding-primary/10";
const next = (length: number, previous: number) => {
  const pick = Math.floor(Math.random() * (length - (previous < 0 ? 0 : 1)));
  return previous >= 0 && pick >= previous ? pick + 1 : pick;
};

export default function EventInteraction({ scene, turmeric, onTurmeric, onReact }: {
  scene: SceneType; turmeric: number; onTurmeric: (value: number) => void; onReact: () => void;
}) {
  const reduce = useReducedMotion();
  const [noticed, setNoticed] = useState(false);
  const [excuse, setExcuse] = useState(-1);
  const [teacher, setTeacher] = useState<"uncle" | "aunty" | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(0);
  const [open, setOpen] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pending = useRef(false);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const generateExcuse = () => {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setMessage(Math.floor(Math.random() * analysing.length));
    timers.current = [setTimeout(() => setMessage(n => (n + 1) % analysing.length), 500), setTimeout(() => {
      setExcuse(previous => next(excuses.length, previous));
      setRevision(n => n + 1);
      setBusy(false);
      pending.current = false;
    }, 1050)];
  };
  const [answer, setAnswer] = useState<"index" | "ring" | null>(null);
  const [step, setStep] = useState(0);
  const [round, setRound] = useState(0);
  const [revision, setRevision] = useState(0);
  const swipe = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const transition = { duration: reduce ? 0 : .22 };
  const reveal = { initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 4 }, animate: { opacity: 1, y: 0 }, transition };
  const changeRound = (value: number) => { setRound((value + 7) % 7); setRevision(n => n + 1); };

  return <motion.div className={`function-play-zone text-center text-sm text-wedding-text md:text-left ${noticed ? "is-noticed" : ""}`}
    data-function={scene} viewport={{ once: true, amount: .2 }} onViewportEnter={() => setNoticed(true)}>
    <div className="function-play-label">{({ puja: "TAP & FIND OUT ✨", haldi: "YOUR TURN 👀", engagement: "A LITTLE RING TEST ✨", baraat: "SHAADI SIDE QUEST 👀", reception: "PLAN YOUR PLATE ✨", phere: "TAKE A SPIN ✨" } as Partial<Record<SceneType, string>>)[scene]}</div>
    <span className="function-play-sparkles" aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i></span>
    {scene === "puja" && <>
      <p className="mb-3 leading-relaxed">Just in case you’re late for Ganesh Pujan… we’ve got your excuse covered. 👀</p>
      <button type="button" disabled={busy} className={`${button} w-full`} onClick={generateExcuse}>{excuse < 0 ? "Generate My Excuse" : "Get Me a Better Excuse ↻"}</button>
      <div className="relative mt-2 min-h-28" aria-live="polite" aria-atomic="true" aria-busy={busy}>
        {busy ? <motion.p key={message} {...reveal} className="pt-3 font-script text-lg text-wedding-secondary">{analysing[message]}</motion.p> : excuse >= 0 ? <motion.div key={revision} {...reveal}>
          <Sparkles revision={revision} />
          <p className="font-semibold text-wedding-primary">Why I’m late to receive Bappa's Aashirwad:</p>
          <p className="mt-1 leading-relaxed">{excuses[excuse]}</p>
        </motion.div> : null}
      </div>
    </>}
    {scene === "haldi" && <>
      <p className="function-play-cue">Drag to add Haldi →</p>
      <label htmlFor="turmeric-threat" className="block font-display text-lg text-wedding-primary">Turmeric Threat Level · {turmeric}%</label>
      <input id="turmeric-threat" type="range" min="0" max="100" value={turmeric} onInput={event => onTurmeric(Number(event.currentTarget.value))}
        aria-valuetext={`${turmeric}% — ${turmeric === 0 ? "Spotless" : turmeric === 100 ? "Complete yellow apocalypse courtesy of the friends" : "The turmeric is spreading"}`}
        className="mt-2 h-11 w-full cursor-pointer accent-[#d79b22]" />
      <div className="flex justify-between gap-3 text-xs"><span>0% · Spotless</span><span className="text-right">100% · Yellow apocalypse</span></div>
      <p className="mt-2 min-h-10 font-script text-lg text-wedding-primary">{turmeric === 0 ? "Spotless. For now." : turmeric === 100 ? "Complete yellow apocalypse courtesy of the friends." : turmeric < 50 ? "Just a little haldi. Allegedly." : "The friends have officially taken over."}</p>
    </>}
    {scene === "engagement" && <>
      <p className="font-display text-lg text-wedding-primary">Quick, which finger does the ring go on?</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {(["index", "ring"] as const).map(finger => <button key={finger} type="button" aria-pressed={answer === finger}
          className={`${button} flex flex-col items-center gap-1 rounded-2xl ${answer === finger ? "bg-wedding-accent/20" : ""}`}
          onClick={() => { setAnswer(finger); setOpen(true); setRevision(n => n + 1); onReact(); }}>
          <FingerChoice finger={finger} />Left {finger} finger
        </button>)}
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-wedding-accent/40 bg-wedding-surface p-6 text-center shadow-xl">
            <Dialog.Title className="font-display text-xl text-wedding-primary">{answer === "ring" ? "A perfect match!" : "The relatives have questions…"}</Dialog.Title>
            {answer === "ring" ? <div className="relative h-14"><Sparkles revision={revision} /><span className="text-4xl" aria-hidden="true">💍</span></div> : <motion.div aria-hidden="true" className="my-3 text-4xl" animate={reduce ? {} : { x: [0, -9, 9, -9, 0] }} transition={{ duration: 1.5 }}>👀 👀 👀</motion.div>}
            <Dialog.Description className="my-4 leading-relaxed text-wedding-text">{answer === "ring" ? "Officially locked in—no takebacks. 💍" : "Pandit ji and both moms are staring at you. 👀"}</Dialog.Description>
            <Dialog.Close className={button}>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>}
    {scene === "baraat" && <>
      <p className="leading-relaxed">Learn from the best choreographers before you enter the Baraat dance floor. 🕺</p>
      <div className="mt-3 flex justify-center gap-3">
        {(["uncle", "aunty"] as const).map(person => <button key={person} type="button" aria-pressed={teacher === person} className={`${button} dance-cta ${teacher === person ? "!bg-wedding-accent/20" : ""}`} onClick={() => setTeacher(person)}>{person === "uncle" ? "Uncle Ji" : "Aunty Ji"}</button>)}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {teacher && <motion.div key={teacher} {...reveal} exit={{ opacity: 0 }} className="mt-3 text-center" aria-live="polite">
          <DanceTeacher person={teacher} />
          <p className="mt-2 min-h-10 font-semibold text-wedding-primary">{teacher === "uncle" ? "Lightbulb screwing with hands in the air" : "Subtle shoulder bounce while scanning the buffet"}</p>
        </motion.div>}
      </AnimatePresence>
    </>}
    {scene === "reception" && <>
      <p className="font-display text-lg text-wedding-primary">Buffet Strategy Blueprint</p>
      <div className="relative mt-3 flex justify-between gap-2">
        <div aria-hidden="true" className="absolute left-4 right-4 top-1/2 h-0.5 bg-wedding-border"><motion.div animate={{ scaleX: step / 2 }} transition={transition} className="h-full origin-left bg-wedding-primary" /></div>
        {steps.map((_, i) => <button key={i} type="button" aria-pressed={step === i} onClick={() => setStep(i)} className={`${button} relative ${step === i ? "!bg-wedding-primary !text-primary-foreground" : ""}`}>Step {i + 1}</button>)}
      </div>
      <div aria-live="polite" className="mt-3 min-h-16"><motion.p key={step} {...reveal} className="leading-relaxed">{steps[step]}</motion.p></div>
    </>}
    {scene === "phere" && <>
      <p className="function-play-cue">Tap a round ✨</p>
      <p className="font-display text-lg text-wedding-primary">The Seven Rounds Vow Tracker</p>
      <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <div className="relative h-44 w-44 shrink-0 touch-pan-y select-none" aria-label="Choose a wedding round"
          onPointerDown={event => { swipe.current = event.clientX; suppressClick.current = false; }}
          onPointerCancel={() => { swipe.current = null; }}
          onPointerUp={event => { if (swipe.current !== null && Math.abs(event.clientX - swipe.current) > 30) { changeRound(round + (event.clientX < swipe.current ? 1 : -1)); suppressClick.current = true; } swipe.current = null; }}>
          <div aria-hidden="true" className="absolute inset-5 rounded-full border border-dashed border-wedding-accent" />

          {vows.map((_, i) => { const angle = i * Math.PI * 2 / 7 - Math.PI / 2; return <button key={i} type="button" aria-label={`Round ${i + 1}`} aria-pressed={round === i}
            onClick={() => { if (!suppressClick.current) changeRound(i); suppressClick.current = false; }}
            style={{ left: `calc(50% + ${Math.cos(angle) * 65}px)`, top: `calc(50% + ${Math.sin(angle) * 65}px)` }}
            className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-wedding-border font-bold ${round === i ? "bg-wedding-primary text-primary-foreground" : "bg-wedding-surface text-wedding-primary"}`}>{i + 1}</button>; })}
        </div>
        <div aria-live="polite" className="min-h-32 flex-1 text-center sm:text-left"><motion.div key={round} {...reveal}><p className="mb-1 font-bold text-wedding-primary">Round {round + 1} — {vows[round]![0]}</p><p className="leading-relaxed">{vows[round]![1]}</p></motion.div></div>
      </div>
    </>}
  </motion.div>;
}

function FingerChoice({ finger }: { finger: "index" | "ring" }) {
  return <svg viewBox="0 0 80 64" className="h-12 w-16" aria-hidden="true">
    <path d="M21 38V18a5 5 0 0 1 10 0v12V10a5 5 0 0 1 10 0v20V14a5 5 0 0 1 10 0v18V23a5 5 0 0 1 10 0v24Q59 61 39 61Q25 61 17 48L8 37q-4-8 4-9Z" fill="var(--wedding-accent)" fillOpacity=".15" stroke="var(--wedding-primary)" strokeWidth="1.5" />
    <rect x={finger === "index" ? 20 : 40} y="24" width="12" height="5" rx="2" fill="var(--wedding-accent)" />
    <path d={`M${finger === "index" ? 26 : 46} 19l3 4-3 4-3-4Z`} fill="var(--wedding-secondary)" />
  </svg>;
}

function Sparkles({ revision }: { revision: number }) {
  const reduce = useReducedMotion();
  return <span key={revision} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {!reduce && Array.from({ length: 12 }, (_, i) => <motion.span key={i} className="absolute left-1/2 top-1/2 text-wedding-accent" initial={{ opacity: 1, x: 0, y: 0, scale: .5 }} animate={{ opacity: 0, x: Math.cos(i * Math.PI / 6) * 110, y: Math.sin(i * Math.PI / 6) * 55, rotate: i * 45, scale: 1 }} transition={{ duration: .9 }}>✦</motion.span>)}
  </span>;
}
function DanceTeacher({ person }: { person: "uncle" | "aunty" }) {
  const uncle = person === "uncle";
  // Independent sprite layers move the wrist and head, not just the whole picture.
  return <svg viewBox={uncle ? "0 0 680 1280" : "700 0 580 1280"} role="img" aria-label={uncle ? "Uncle Ji rotating his raised hand to the dhol beat" : "Aunty Ji bouncing her shoulders and looking for the buffet"} className={`dance-teacher dance-${person} mx-auto h-44 w-32 overflow-visible`}>
    <defs>
      <clipPath id={`dance-body-${person}`}><path d={uncle ? "M0 215H190V0H680V1280H0Z" : "M700 360H1105V0H1280V1280H700Z"} /></clipPath>
      <clipPath id={`dance-detail-${person}`}><path d={uncle ? "M0 0H190V215H0Z" : "M700 0H1105V360H700Z"} /></clipPath>
    </defs>
    <g className="dance-body">
      <image href={danceTeachers} width="1280" height="1280" clipPath={`url(#dance-body-${person})`} />
      <g className="dance-detail"><image href={danceTeachers} width="1280" height="1280" clipPath={`url(#dance-detail-${person})`} /></g>
    </g>
  </svg>;
}
