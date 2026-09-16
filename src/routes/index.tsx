import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import Venue from "@/components/Venue";
import RSVP from "@/components/RSVP";
import TriviaGame from "@/components/TriviaGame";
import WeddingDuty from "@/components/WeddingDuty";
import Footer from "@/components/Footer";
import FallingFlowers from "@/components/FallingFlowers";
import ScrollTrail from "@/components/ScrollTrail";
import StartScreen from "@/components/StartScreen";

import MusicPlayer from "@/components/MusicPlayer";
import WeddingBackground from "@/components/WeddingBackground";
import { weddingConfig } from "@/config/config";


const title = "Vishesh & Gauravi | 8 December 2026";
const description =
  "Vishesh & Gauravi are getting married on 8 December 2026 at Maya's Resort, Jhansi. Functions, venue, directions and RSVP. #VishfullyYoursGaurgeous";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Wedding of Vishesh & Gauravi",
          startDate: "2026-12-07T09:00:00+05:30",
          endDate: "2026-12-08T19:00:00+05:30",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: weddingConfig.venueName,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Nahar Road, Infront Of Jhansi Empire",
              addressLocality: "Jhansi",
              addressRegion: "Uttar Pradesh",
              postalCode: "284003",
              addressCountry: "IN",
            },
          },
          description,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <WeddingBackground />
      <AnimatePresence>
        {!entered && <StartScreen onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <a
        href="#functions"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-wedding-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <FallingFlowers />
      <ScrollTrail />

      <motion.div
        initial={false}
        animate={entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <main>
          <Hero />
          <Countdown />
          <Timeline />
          <Venue />
          <TriviaGame />
          <WeddingDuty />
          <RSVP />
        </main>
        <Footer />
      </motion.div>
      <MusicPlayer autoStart={entered} />
    </>
  );

}
