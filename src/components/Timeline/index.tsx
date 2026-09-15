import { weddingConfig } from "@/config/config";
import { SectionHeading } from "@/components/DecorativeElements";
import TimelineEvent from "@/components/TimelineEvent";

export default function Timeline() {
  return (
    <section id="functions" className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="The Functions"
          note="Two days of dhol, diyas and very happy chaos"
        />

        <ol className="mt-10 grid gap-6 sm:gap-8">
          {weddingConfig.timeline.map((e, i) => (
            <TimelineEvent
              key={e.title}
              index={i}
              date={e.date}
              time={e.time}
              title={e.title}
              description={e.description}
              scene={e.characterScene}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
