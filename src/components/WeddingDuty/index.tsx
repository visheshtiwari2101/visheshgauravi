import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dutyVishesh from "@/assets/characters/duty-vishesh.png";
import dutyGauravi from "@/assets/characters/duty-gauravi.png";
import { SectionHeading, Sprig, MarigoldGarland } from "@/components/DecorativeElements";

const roles = [
  ["Head of Joota Chupai Negotiations", "Groom ke jootay chori karna aur maximum demand pe adey rehna. Zero discounts allowed!"],
  ["Chief Chaat Quality Assurance Officer", "Har 15 minute mein pani puri aur tikki counter inspect karna taaki crispy standard down na ho."],
  ["Baraat Ka Unofficial Choreographer", "Har uncle aur dost ko zabardasti kheench ke dhol ke aage 'naagin dance' karwana."],
  ["Safety Pin Emergency Dispatcher", "Dupatta khisla ya saree loose hui nahi ki bina maange bag se pin nikaal ke haazir ho jaana."],
  ["Designated Rishta Scouting Officer", "Khane ki plate haath mein leke discreetly single logo ka background check karna."],
  ["Groom’s Sunglasses Bodyguard", "9:00 AM Baraat entry ke time dulhe ka Ray-Ban sambhaalna taaki photo mein tashan bani rahe."],
  ["Chief Jalebi-Rabdi Hoarder", "Live dessert counter pe line lagne se pehle hot jalebis ki do extra plates reserve karna."],
  ["Aunty-Approved Smile Ambassador", "Har rishtedaar ko namaste bolna aur “Haanji bas agla number mera hi hai” bold smile ke saath kehna."],
  ["Dulhan Ka Personal Water & Straw Hydrator", "Heavy lehenga aur mehendi ke beech bride ko bina lipstick kharab kiye paani pilana."],
  ["Baraat Horn & Whistle Hype-Man", "Jab dhol thoda slow ho, tab loud seeting aur whistles maar ke crowd ka tempo maintain rakhna."],
  ["Mandap Emotion & Tissue Manager", "Phere ke time mummy-papa aur bestie ke aankh mein pehla aansu aate hi tissue packet offer karna."],
  ["Selfie Angle Perfectionist", "Har photo mein golden-hour lighting ensure karna aur double chins ko legally ban karna."],
  ["Halwai Whisperer", "Kitchen ke piche jaake pata lagana ki hot snacks aur paneer pakore ka agla batch kab bahar aa raha hai."],
  ["Lifelong Seating Enforcer", "Stage ke front-row sofas ko sirf senior dadi-nanis ke liye guard karna, no random kids allowed."],
  ["DJ Ka Self-Proclaimed Creative Director", "DJ waale bhaiya ke kaan mein jaake continuously bolna: “Bhaiya, ab beat drop karo!”"],
  ["Gossip Verification Unit", "Stage ke side mein khade hoke verify karna ki dulhan aur dulhe ki entry pe kisne kya comment kiya."],
  ["Late-Night Chai Logistics Head", "Functions ke baad midnight wali tapri chai arrange karna sabhi thake huye cousins ke liye."],
  ["Dulhe Ka Pocket-Money Protector", "Shagun ke lifaafe safe rakhna aur dulhe ke saare paiso ko bridesmaids se bachana."],
  ["Lawn Navigation Guide", "Lost guests ko parking se sidha buffet counter tak direct shortcut batana."],
  ["Chief Vibe-Checker & Hype Captain", "Ensure karna ki dono din kisi ke chehre par thakaan na dikhe—sirf full-on Jhansi energy chale!"],
] as const;

const analysisLines = [
  "Analysing your shaadi skills… 👀", "Checking your dance-to-food ratio…",
  "Reviewing your ability to handle Indian relatives…", "Calculating your baraat stamina… 🕺",
  "Checking how trustworthy you look around jalebis…", "Consulting Vishesh & Gauravi…",
];
const assignments = [
  { who: "vishesh", copy: "Vishesh has personally trusted you with…" },
  { who: "vishesh", copy: "Vishesh thinks you're weirdly qualified for this…" },
  { who: "gauravi", copy: "Gauravi looked at your skillset and decided…" },
  { who: "gauravi", copy: "After serious consideration, Gauravi has assigned you…" },
  { who: "both", copy: "Vishesh & Gauravi unanimously decided you're the one for this…" },
  { who: "both", copy: "Vishesh & Gauravi held a very serious meeting. Your name came up…" },
] as const;
const missions = [
  "Your highly important mission:", "Your official responsibility:", "What we're trusting you with:",
  "Your shaadi assignment:", "Mission, should you accept it:", "Your extremely serious duty:",
  "Ab asli zimmedari suno:", "No pressure, but…", "Your contribution to this wedding:",
  "The job nobody else was brave enough to take:",
];

export default function WeddingDuty() {
  const [selected, setSelected] = useState<number | null>(null);
  const [stage, setStage] = useState<"idle" | "analysis" | "result">("idle");
  const [message, setMessage] = useState("");
  const [assignment, setAssignment] = useState<(typeof assignments)[number]>(assignments[0]);
  const [mission, setMission] = useState(missions[0]!);
  const [reveal, setReveal] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const busy = useRef(false);
  const reduce = useReducedMotion();
  const role = selected === null ? null : roles[selected];
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function chooseRole() {
    if (busy.current) return;
    busy.current = true;
    timers.current.forEach(clearTimeout);
    const pool = [...analysisLines];
    const messages = Array.from({ length: 3 }, () => pool.splice(Math.floor(Math.random() * pool.length), 1)[0]!);
    setStage("analysis");
    setMessage(messages[0]!);
    timers.current = [
      setTimeout(() => setMessage(messages[1]!), 800),
      setTimeout(() => setMessage(messages[2]!), 1600),
      setTimeout(() => {
        const pick = Math.floor(Math.random() * (roles.length - (selected === null ? 0 : 1)));
        setSelected(selected !== null && pick >= selected ? pick + 1 : pick);
        setAssignment(assignments[Math.floor(Math.random() * assignments.length)]!);
        setMission(missions[Math.floor(Math.random() * missions.length)]!);
        setReveal(n => n + 1);
        setStage("result");
        busy.current = false;
      }, 2400),
    ];
  }

  return (
    <section id="wedding-duty" aria-labelledby="wedding-duty-heading" className="relative px-4 py-8 sm:py-16 [&_.eyebrow]:text-[0.6rem] sm:[&_.eyebrow]:text-[0.7rem] [&_h2]:mt-2 [&_h2]:text-2xl sm:[&_h2]:text-4xl [&_h2+div]:mt-2 sm:[&_h2+div]:mt-5">
      <div className="mx-auto max-w-3xl">
        <div id="wedding-duty-heading">
          <SectionHeading eyebrow="A very official appointment" title="Your Wedding Duty Awaits 👀" />
        </div>
        <p className="mt-2 text-center text-sm text-wedding-text/75 sm:mt-3 sm:text-base">
          Every great wedding needs a few highly questionable experts. Your moment has arrived.
        </p>
        <div className="ink-frame relative mt-4 overflow-hidden bg-wedding-surface px-4 py-5 text-center sm:mt-6 sm:px-9 sm:py-8">
          <MarigoldGarland className="pointer-events-none absolute left-1/2 top-1 h-6 w-56 -translate-x-1/2 text-marigold/60" />
          <Sprig className="pointer-events-none absolute bottom-4 left-3 h-5 w-16 text-leaf/40" />
          <Sprig className="pointer-events-none absolute bottom-4 right-3 h-5 w-16 -scale-x-100 text-leaf/40" />
          <div className="mb-1 flex h-24 items-end justify-center gap-8 sm:mb-3 sm:h-36 sm:gap-16">
            {(["vishesh", "gauravi"] as const).map(person => {
              const celebrating = stage === "result" && (assignment.who === person || assignment.who === "both");
              return <motion.img key={`${person}-${reveal}`} src={person === "vishesh" ? dutyVishesh : dutyGauravi} alt={person === "vishesh" ? "Vishesh inspecting wedding duties with a clipboard and pencil" : "Gauravi holding a duty scroll and pointing to your assignment"}
                className="h-full w-20 object-contain sm:w-28" loading="lazy"
                animate={reduce ? {} : celebrating ? { y: [0, -12, 0, -6, 0], rotate: [0, -3, 3, 0] } : stage === "analysis" ? { y: [0, -3, 0], rotate: person === "vishesh" ? [0, 3, 0] : [0, -3, 0] } : { y: [0, -4, 0] }}
                transition={celebrating ? { duration: .8 } : { duration: person === "vishesh" ? 4 : 4.7, repeat: Infinity, ease: "easeInOut" }} />;
            })}
          </div>
          {/* Invisible sizing copies reserve space for every role, including at large text sizes. */}
          <div className="relative grid items-center" style={{ perspective: 900 }}>
            {roles.map(([title, duty]) => <div key={title} aria-hidden="true" className="invisible col-start-1 row-start-1 pb-3 sm:pb-6">
              <DutyCard title={title} duty={duty} assignment={assignments[5].copy} mission={missions[9]!} />
            </div>)}
            <div className="col-start-1 row-start-1 min-w-0 pb-3 sm:pb-6" aria-live="polite" aria-atomic="true" aria-busy={stage === "analysis"}>
              {stage === "result" && role ? <motion.div key={reveal}
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -12, y: 10, scale: .96 }}
                animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                transition={{ duration: reduce ? .1 : .45, ease: [0.22, 1, 0.36, 1] }}>
                <DutyCard title={role[0]} duty={role[1]} assignment={assignment.copy} mission={mission} />
              </motion.div> : stage === "analysis" ? <div role="status">
                <AnimatePresence mode="wait"><motion.p key={message} className="mx-auto max-w-sm font-script text-2xl text-wedding-primary"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .1 }}>{message}</motion.p></AnimatePresence>
                <div aria-hidden="true" className="mt-5 flex justify-center gap-2">
                  {[0, 1, 2].map(i => <motion.span key={i} className="h-2 w-2 rounded-full bg-wedding-accent"
                    animate={reduce ? {} : { y: [0, -5, 0], opacity: [.4, 1, .4] }} transition={{ duration: .7, delay: i * .13, repeat: Infinity }} />)}
                </div>
              </div> : <p className="script-note mx-auto max-w-sm">One click. One very important duty.<br />Absolutely no qualifications required.</p>}
            </div>
            {stage === "result" && !reduce && <div key={`petals-${reveal}`} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 12 }, (_, i) => <motion.span key={i} className="absolute left-1/2 top-1/3 h-2 w-3 rounded-full"
                style={{ background: ["var(--blossom)", "var(--leaf)", "var(--wedding-accent)"][i % 3] }}
                initial={{ x: 0, y: 0, opacity: 0, scale: .5 }}
                animate={{ x: Math.cos(i * Math.PI / 6) * 130, y: [0, -45 + Math.sin(i * Math.PI / 6) * 65, 100], rotate: i * 47, opacity: [0, .75, 0], scale: 1 }}
                transition={{ duration: 1.1, delay: i * .025 }} />)}
            </div>}
          </div>
          <motion.button type="button" onClick={chooseRole} disabled={stage === "analysis"}
            animate={stage === "idle" && !reduce ? { scale: [1, 1.025, 1] } : { scale: 1 }}
            transition={{ duration: 3.5, repeat: stage === "idle" ? Infinity : 0 }}
            className="relative max-w-full overflow-hidden rounded-full bg-wedding-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-lift)] disabled:cursor-wait disabled:opacity-70">
            {stage === "idle" && !reduce && <motion.span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-12 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ x: [-60, 320] }} transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3 }} />}
            {stage === "analysis" ? "Consultation in progress…" : stage === "result" ? "Choose Another Role ↻" : "Know Your Wedding Role"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function DutyCard({ title, duty, assignment, mission }: { title: string; duty: string; assignment: string; mission: string }) {
  return <>
    <p className="mx-auto flex min-h-12 max-w-md items-center justify-center font-script text-lg leading-tight text-wedding-secondary sm:min-h-16 sm:text-xl">{assignment}</p>
    <h3 className="mx-auto mt-1 max-w-lg break-words font-display text-xl leading-tight text-wedding-primary sm:mt-3 sm:text-3xl">{title}</h3>
    <p className="mx-auto mt-2 flex min-h-10 max-w-lg items-end justify-center text-sm font-bold text-wedding-primary sm:mt-3">{mission}</p>
    <p className="mx-auto mt-1 max-w-lg text-sm leading-relaxed text-wedding-text sm:mt-2 sm:text-base">{duty}</p>
  </>;
}
