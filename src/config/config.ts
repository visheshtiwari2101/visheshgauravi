import monogramAsset from "@/assets/monogram/monogram.png";
import coupleAsset from "@/assets/characters/couple.png";
import rokaAsset from "@/assets/characters/roka.png";
import pujaAsset from "@/assets/characters/puja.png";
import haldiAsset from "@/assets/characters/haldi.png";
import mehendiAsset from "@/assets/characters/mehendi.png";
import baraatAsset from "@/assets/characters/baraat.png";
import receptionAsset from "@/assets/characters/reception.png";
import phereAsset from "@/assets/characters/phere.png";
import venueAsset from "@/assets/characters/venue.png";
import rsvpAsset from "@/assets/characters/rsvp.png";
import countdownVisheshAsset from "@/assets/characters/countdown-vishesh.png";
import countdownGauraviAsset from "@/assets/characters/countdown-gauravi.png";
import finaleArt from "@/assets/characters/finale.png";
import ganpatiAsset from "@/assets/illustrations/ganpati.png";

export type SceneType =
  | "roka"
  | "puja"
  | "haldi"
  | "mehendi"
  | "baraat"
  | "reception"
  | "phere"
  | "venue"
  | "rsvp"
  | "countdownVishesh"
  | "countdownGauravi"
  | "finale";

export const sceneArt: Record<SceneType, string> = {
  roka: rokaAsset,
  puja: pujaAsset,
  haldi: haldiAsset,
  mehendi: mehendiAsset,
  baraat: baraatAsset,
  reception: receptionAsset,
  phere: phereAsset,
  venue: venueAsset,
  rsvp: rsvpAsset,
  countdownVishesh: countdownVisheshAsset,
  countdownGauravi: countdownGauraviAsset,
  finale: finaleArt,
};

export const ganpatiArt = ganpatiAsset;

export const sceneAlt: Record<SceneType, string> = {
  roka: "Illustration of Vishesh placing a ring on Gauravi's finger at the Roka",
  puja: "Illustration of Vishesh and Gauravi seated with folded hands at the Ganesh Pujan",
  haldi: "Illustration of Vishesh and Gauravi in yellow outfits laughing during the Haldi",
  mehendi: "Illustration of Gauravi showing her henna-covered palms to a delighted Vishesh",
  baraat: "Illustration of Vishesh and Gauravi dancing together with marigold garlands during the Baraat",
  reception: "Illustration of Vishesh and Gauravi greeting guests at the Reception",
  phere: "Illustration of Vishesh and Gauravi holding hands at the wedding Phere",
  venue: "Illustration of Vishesh and Gauravi pointing towards a marigold-covered location pin",
  rsvp: "Illustration of Vishesh and Gauravi holding hands and waving hello",
  countdownVishesh: "Illustration of Vishesh waving towards the wedding countdown",
  countdownGauravi: "Illustration of Gauravi smiling towards the wedding countdown",
  finale: "Illustration of Vishesh and Gauravi waving goodbye and showering marigold petals",
};

export const weddingConfig = {
  brideName: "Gauravi",
  groomName: "Vishesh",

  weddingDate: "7th - 8th December 2026",
  weddingDay: "8 December 2026",
  weddingTime: "10:00 AM - 07:00 PM",
  weddingDateISO: "2026-12-08T10:00:00+05:30",

  venueName: "Maya's Resort Jhansi",
  venueAddress:
    "Infront Of Jhansi Empire, Nahar Road, Near Guru Harikishan Degree College, Jhansi, Uttar Pradesh 284003",

  googleMapsUrl: "https://share.google/U5eGO9JiaPXbJT9pW",

  hashtag: "#VishfullyYoursGaurgeous",

  logo: monogramAsset,

  characters: {
    vishesh: coupleAsset,
    gauravi: coupleAsset,
    couple: coupleAsset,
  },

  heroImage: coupleAsset,
  heroVideo: "",

  backgroundMusic: "https://www.youtube.com/watch?v=vWqHgh_LBH8",
  backgroundMusicId: "vWqHgh_LBH8",

  timeline: [
    {
      date: "7 December 2026",
      time: "9:00 AM",
      title: "Roka",
      description: "Where it all becomes official — one ring, two families, zero doubts.",
      image: "",
      characterScene: "roka" as SceneType,
    },
    {
      date: "7 December 2026",
      time: "11:00 AM",
      title: "Ganesh Pujan & Mandap Pujan",
      description: "First invitation goes to Bappa. Everything else follows.",
      image: "",
      characterScene: "puja" as SceneType,
    },
    {
      date: "7 December 2026",
      time: "2:00 PM",
      title: "Haldi",
      description: "Turmeric everywhere. Glow guaranteed, dignity optional.",
      image: "",
      characterScene: "haldi" as SceneType,
    },
    {
      date: "7 December 2026",
      time: "6:00 PM",
      title: "Mehendi",
      description: "Hidden initials, henna spirals and one very impressed groom.",
      image: "",
      characterScene: "mehendi" as SceneType,
    },
    {
      date: "8 December 2026",
      time: "9:00 AM",
      title: "Baraat",
      description: "Dhol, marigolds and two people who will not stop dancing.",
      image: "",
      characterScene: "baraat" as SceneType,
    },
    {
      date: "8 December 2026",
      time: "11:00 AM",
      title: "Reception & Lunch",
      description: "Hugs, photos and second helpings. Mostly second helpings.",
      image: "",
      characterScene: "reception" as SceneType,
    },
    {
      date: "8 December 2026",
      time: "2:00 PM",
      title: "Wedding & Phere",
      description: "Seven rounds, one promise, a lifetime of takeaways.",
      image: "",
      characterScene: "phere" as SceneType,
    },
  ],

  rsvp: {
    enabled: true,
    submitUrl:
      import.meta.env["VITE_RSVP_ENDPOINT"] ??
      "https://script.google.com/macros/s/AKfycbyQFgbJ710h6e7ehfVbtPKtZ_6AkPcxGbwhCg0g7GcxEjJwXI-82F7JFONFooMBYlCU/exec",
    whatsappNumber: "",
  },


  socialLinks: {
    instagram: ["instagram.com/visheshtiwari_", "instagram.com/gauravi___"],
  },
};
