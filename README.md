# Vishesh & Gauravi's Cinematic Wedding

CREATE FROM SCRATCH — VISHESH & GAURAVI WEDDING WEBSITE

Create a premium, cinematic, mobile-first wedding invitation website for Vishesh & Gauravi.

The website must feel like a modern Indian wedding brought to life through the couple's illustrated monogram characters.

This is NOT a generic luxury wedding template.

The attached wedding monogram is the master visual identity of the entire website.

The attached monogram and its characters should influence the colors, illustrations, decorations, animations, backgrounds, typography, interactions and overall personality of the website.

The final experience should feel:

Indian + festive + Bollywood-inspired + cute + witty + humorous + premium + handcrafted + cinematic

Avoid anything overly traditional, cluttered, cheesy or generic.

1. VERY IMPORTANT — USE THE ATTACHED MONOGRAM AS THE MASTER REFERENCE

The attached monogram/logo is the primary design reference.

Before designing the website, analyze the monogram and identify:

Color palette

Typography style

Illustration style

Character design

Line-art style

Shapes

Borders

Decorative motifs

Floral elements

Patterns

Overall mood

Build the website's visual design system around these characteristics.

The website should look cohesive even when the monogram itself is not visible.

DO NOT

Do not create a generic luxury Indian wedding website.

Do not blindly use ivory/beige/gold.

Do not introduce unrelated colors.

Do not use random stock wedding illustrations.

Do not use generic AI bride/groom characters.

Do not redesign the supplied characters.

Do not turn them into 3D/Pixar/anime characters.

Do not use cheesy Bollywood dialogues.

Do not overuse gold.

Do not make the website cluttered.

2. COUPLE CHARACTERS ARE THE PROTAGONISTS

The characters from the attached monogram are the official Vishesh & Gauravi characters.

They should appear throughout the website.

Use them in:

Hero

Countdown

Wedding functions

Haldi

Mehendi

Sangeet

Baraat

Reception

Wedding/Phere

Venue

RSVP

Footer

Decorative moments

Loading/transition moments where appropriate

The characters should NOT be static decorative images.

They should feel like they are participating in the wedding.

3. CHARACTER CONSISTENCY — STRICT RULE

Whenever the characters appear:

Preserve:

Facial features

Face proportions

Hairstyles

Body proportions

Illustration style

Line quality

Color treatment

Overall personality

Do not create a different version of Vishesh or Gauravi.

Do not replace them with photorealistic people.

Do not change the illustration style.

If additional poses are required, create them in the exact same 2D hand-drawn style as the supplied characters.

The original character assets should always be treated as the visual source of truth.

4. VISUAL STYLE

The website should combine:

Modern Indian Wedding

Use subtle:

Marigold flowers

Floral motifs

Rangoli-inspired patterns

Mehendi-inspired line patterns

Indian ornamental borders

Small diyas where appropriate

Festive textile-inspired patterns

Hand-drawn decorative elements

Wedding stationery-inspired details

Bollywood Energy

Express Bollywood primarily through:

Character movement

Composition

Cinematic transitions

Dance

Playfulness

Dramatic entrances

Humor

Energy

Do NOT rely on Bollywood quotes or clichés.

Do NOT use:

"Picture abhi baaki hai"

Generic movie-ticket designs

Film reels everywhere

Random Bollywood posters

Excessive stars

Cheesy movie dialogues

The website should feel Bollywood-inspired without announcing that fact through text.

5. COLOR PALETTE

Do NOT use the typical ivory/beige luxury wedding palette as the dominant theme.

Instead derive a festive Indian wedding palette from the attached monogram.

The palette should feel:

Warm

Festive

Vibrant

Elegant

Use a balance of:

Rich festive colors

Soft neutral backgrounds

Monogram-derived accents

Do not make every section brightly colored.

Create CSS/design tokens:

--wedding-primary
--wedding-secondary
--wedding-accent
--wedding-background
--wedding-surface
--wedding-text
--wedding-border


All decorative elements should use this palette.

6. CONFIGURATION

Create one central configuration file:

src/config/config.ts

All wedding-specific content must be driven by this configuration.

Do not hardcode wedding information inside components.

Use:

export const weddingConfig = {
  brideName: "Gauravi",
  groomName: "Vishesh",

  weddingDate: "7th - 8th December 2026",

  weddingDay: "8 December 2026",

  weddingTime: "10:00 AM - 07:00 PM",

  venueName: "Maya's Resort Jhansi",

  venueAddress:
    "Infront Of Jhansi Empire, Nahar Road, Near Guru Harikishan Degree College, Jhansi, Uttar Pradesh 284003",

  googleMapsUrl: "https://share.google/U5eGO9JiaPXbJT9pW",

  hashtag: "#VishfullyYoursGaurgeous",

  logo: "",

  characters: {
    vishesh: "",
    gauravi: "",
    couple: ""
  },

  heroImage: "",

  heroVideo: "",

  backgroundMusic:
    "https://www.youtube.com/watch?v=vWqHgh_LBH8",

  timeline: [
    {
      date: "7 December 2026",
      time: "9:00 AM",
      title: "Roka",
      description: "",
      image: "",
      characterScene: "roka"
    },
    {
      date: "7 December 2026",
      time: "11:00 AM",
      title: "Ganesh Pujan & Mandap Pujan",
      description: "",
      image: "",
      characterScene: "puja"
    },
    {
      date: "7 December 2026",
      time: "2:00 PM",
      title: "Haldi",
      description: "",
      image: "",
      characterScene: "haldi"
    },
    {
      date: "7 December 2026",
      time: "6:00 PM",
      title: "Mehendi",
      description: "",
      image: "",
      characterScene: "mehendi"
    },
    {
      date: "7 December 2026",
      time: "8:00 PM",
      title: "Sangeet",
      description: "",
      image: "",
      characterScene: "sangeet"
    },
    {
      date: "8 December 2026",
      time: "9:00 AM",
      title: "Baraat",
      description: "",
      image: "",
      characterScene: "baraat"
    },
    {
      date: "8 December 2026",
      time: "11:00 AM",
      title: "Reception & Lunch",
      description: "",
      image: "",
      characterScene: "reception"
    },
    {
      date: "8 December 2026",
      time: "2:00 PM",
      title: "Wedding & Phere",
      description: "",
      image: "",
      characterScene: "phere"
    }
  ],

  rsvp: {
    enabled: true,
    submitUrl: "",
    whatsappNumber: ""
  },

  socialLinks: {
    instagram: [
      "instagram.com/visheshtiwari_",
      "instagram.com/gauravi___"
    ]
  }
};


7. PAGE STRUCTURE

Create a single-page website with:

Hero

Countdown

Wedding Functions

Venue

RSVP

Footer

Do NOT create:

Our Story section

Curtain-opening animation

Long text-heavy sections

The website should communicate primarily through visuals and animation.

8. HERO SECTION

Create a full-screen cinematic hero.

Include:

Vishesh & Gauravi characters

Monogram

Couple names

Wedding date

Minimal supporting text

Scroll/explore CTA

The hero should feel like the opening shot of a stylish Indian wedding celebration.

Use the supplied characters rather than generating a generic bride and groom.

Possible animation sequence:

Decorative elements gently appear

Characters enter

Monogram appears

Names fade in

Small character interaction

Scroll indicator appears

Keep it elegant and playful.

9. COUNTDOWN

Create a countdown to:

8 December 2026

Display:

Days

Hours

Minutes

Seconds

The countdown should use monogram-inspired shapes and colors.

Characters should interact with it.

Examples:

Characters sitting beside it

Characters holding decorative elements

Characters peeking around it

Make it feel illustrated rather than like a generic website timer.

10. WEDDING FUNCTIONS

Create a beautiful interactive timeline for:

Roka

Ganesh Pujan & Mandap Pujan

Haldi

Mehendi

Sangeet

Baraat

Reception & Lunch

Wedding & Phere

Each event should feel like a different scene.

Use the couple characters in every major function where appropriate.

11. CHARACTER ANIMATION FOR FUNCTIONS

This is a key feature.

Characters should move according to the event.

HALDI

Vishesh and Gauravi should:

Wear yellow outfits

Look toward each other

Playfully interact

Have subtle hand/head movements

React to Haldi

The mood should be playful and cute.

MEHENDI

Show:

Gauravi showing Mehendi

Vishesh looking at it

Playful reaction

Characters sitting/standing together

Use subtle Mehendi-inspired decoration.

SANGEET

This should be the most energetic scene.

Characters should:

Dance

Move rhythmically

Perform playful Bollywood-inspired dance movements

React to each other

Make this scene witty and humorous.

It should feel alive.

BARAAT

Characters should communicate celebration.

Use:

Dancing

Celebratory movement

Festive flowers

Playful expressions

Energetic movement

RECEPTION & LUNCH

Use a calmer scene.

Characters can:

Sit together

Smile

Wave

Interact casually

PHERE / WEDDING

Create the most elegant character scene.

Gauravi:

Red bridal saree / traditional red bridal attire

Vishesh:

Traditional sherwani

They should:

Stand/sit together

Look at each other

Hold hands

Have subtle movement

Keep the animation graceful and emotional.

12. HOW TO ANIMATE THE CHARACTERS

Use lightweight 2D animation.

Preferred:

Framer Motion

CSS transforms

Rotation

Translation

Scale

Small looping movements

Avoid heavy video files for simple movements.

Examples:

Sangeet:
small rhythmic body movement + hand movement

Haldi:
head turn + hand movement + subtle reaction

Mehendi:
Gauravi moves hand forward + Vishesh looks toward it

Baraat:
small dancing/bouncing movement

Phere:
gentle sway + subtle head movement


The characters should never appear unnaturally jittery.

Animations should be smooth and polished.

Respect:

prefers-reduced-motion

13. FALLING FLOWERS — GLOBAL AMBIENT EFFECT

Throughout the website, create a subtle continuous animation of tiny flowers/petals falling from the top.

Requirements:

Small flowers/petals

Start from top

Gently fall downward

Slight horizontal drift

Slight rotation

Randomized timing

Randomized size

Low opacity

Low density

Use Indian wedding-inspired flowers, especially marigold/petal-inspired shapes.

The effect should feel like a gentle festive atmosphere.

IMPORTANT:

Do NOT make it look like snow.

Do NOT cover the content.

Do NOT make it distracting.

Do NOT significantly affect performance.

On mobile, reduce the number of particles.

Respect reduced-motion preferences.

14. DECORATIVE SYSTEM

Create reusable decorative components inspired by the monogram.

Examples:

Floral corners

Hand-drawn borders

Rangoli-inspired separators

Small flowers

Mehendi lines

Decorative dots

Indian ornamental patterns

Small diyas

Character illustrations

Use these strategically.

Do not put decorations everywhere.

Whitespace is still important.

15. NAVIGATION

Create a sticky navigation.

Initial state:

Transparent

Blends with hero

After scrolling:

Monogram-inspired background

Blur

Soft shadow

Smooth transition

Navigation:

Home

Functions

Venue

RSVP

Use monogram/logo appropriately.

Mobile:

Hamburger menu

Smooth animation

Touch friendly

16. MUSIC PLAYER

Use:

https://www.youtube.com/watch?v=vWqHgh_LBH8

The music should attempt to autoplay when the website opens.

Important browser behavior:

Attempt audible autoplay.

If the browser blocks audible autoplay, start playback automatically after the earliest user interaction.

Do not show an intrusive music modal.

Provide a persistent floating music control.

User can Play/Pause at any time.

Show playing/paused state.

Remember preference during the session.

Fade audio smoothly.

The music control itself should visually match the monogram.

17. VENUE

Create a visually rich venue section.

Display:

Maya's Resort Jhansi

Address:

Infront Of Jhansi Empire, Nahar Road, Near Guru Harikishan Degree College, Jhansi, Uttar Pradesh 284003

Include:

Open Directions

which opens:

https://share.google/U5eGO9JiaPXbJT9pW

Use:

Monogram-inspired border

Subtle Indian decorations

Couple characters

Do not make it look like a generic location card.

18. RSVP

Do NOT redirect users to Instagram for RSVP.

At the end of the website create a simple CTA:

"Will you celebrate with us?"

Button:

"Let us know"

When clicked, open a beautiful modal.

The modal should include:

Name

Attendance:

Yes, I'll be there

Sorry, I can't make it

Number of guests

Optional message

Submit button

Close button

The modal should visually match the monogram.

Do not navigate away from the website.

If submitUrl is empty, create the frontend form and a graceful success state for now.

After submission show something like:

"Thank you! We can't wait to celebrate with you."

Keep the wording warm and simple.

19. FOOTER

Create a minimal footer.

Include:

Monogram

Couple characters

Vishesh & Gauravi

Wedding date

Hashtag

Avoid unnecessary links.

20. AI ASSET RULE

AI-generated imagery is a fallback.

Priority:

Attached monogram

Attached character assets

Existing couple assets

Existing photographs/videos

New illustrations based on the supplied characters

AI-generated generic imagery only when absolutely necessary

Never generate a completely different Vishesh/Gauravi.

If a new illustration is needed, use the supplied characters as strict visual references.

21. NEW CHARACTER ILLUSTRATIONS

If new poses are required, use this visual direction:

"Create a new 2D hand-drawn illustration using the exact Vishesh and Gauravi character designs from the supplied wedding monogram. Preserve their facial features, proportions, hairstyles, line-art quality, clothing style and color language. Create the requested wedding scene while maintaining the exact original illustration identity. Do not use 3D, Pixar, anime or photorealistic rendering."

Use this methodology for:

Haldi

Mehendi

Sangeet

Baraat

Reception

Phere

22. RESPONSIVE DESIGN

The website is mobile-first.

Optimize specifically for phones.

Desktop, tablet and mobile should all have intentional layouts.

Do NOT simply shrink the desktop layout.

On mobile:

Characters must remain clearly visible

Animations must remain smooth

Falling flower density should be reduced

Navigation becomes hamburger

Cards stack naturally

Text remains readable

No horizontal scrolling

23. ACCESSIBILITY

Implement:

Semantic HTML

Keyboard navigation

ARIA labels

Proper heading hierarchy

Alt text

Visible focus states

Accessible contrast

Reduced-motion support

All functionality must remain usable with animations disabled.

24. PERFORMANCE

Optimize for production.

Use:

Lazy-loaded images

Optimized image sizes

Responsive assets

Code splitting where useful

Lightweight animations

Minimal dependencies

No unnecessary large videos

No layout shifts

The falling flower animation must be performance-friendly.

Use a lightweight implementation rather than hundreds of DOM elements.

25. SEO

Implement:

Meta title

Meta description

OpenGraph

Twitter cards

Schema.org Wedding/Event structured data

Sitemap

robots.txt

Suggested title:

Vishesh & Gauravi | 8 December 2026

26. TECH STACK

Use:

React

TypeScript

TailwindCSS

Framer Motion

Use a clean component architecture.

Suggested structure:

src/
  components/
    Navigation/
    Hero/
    Countdown/
    Timeline/
    TimelineEvent/
    Character/
    CharacterScene/
    FallingFlowers/
    DecorativeElements/
    Venue/
    RSVP/
    RSVPModal/
    MusicPlayer/
    Footer/

  config/
    config.ts

  assets/
    monogram/
    characters/
    illustrations/

  styles/


Keep components reusable and maintainable.

27. COMPONENT DESIGN PRINCIPLES

Create reusable components rather than duplicating code.

For example:

CharacterScene

should accept:

type CharacterSceneProps = {
  type:
    | "roka"
    | "puja"
    | "haldi"
    | "mehendi"
    | "sangeet"
    | "baraat"
    | "reception"
    | "phere";
};


Then render the appropriate character treatment.

Similarly:

FallingFlowers

should be a reusable global component.

DecorativeElements

should provide reusable monogram-inspired decorations.

28. IMPORTANT CONTENT RULE

Keep the website concise.

Do not fill sections with unnecessary paragraphs.

Wedding websites should communicate through:

Illustrations + Characters + Animation + Typography + Small amounts of text

rather than long explanations.

29. FINAL VISUAL TEST

Before considering the website finished, ask:

"Does this look like a website specifically created for Vishesh & Gauravi, or does it look like a wedding template?"

If it looks like a template, redesign it.

Ask:

"Do the monogram characters feel like the protagonists of the experience?"

If not, increase their meaningful presence.

Ask:

"Does each wedding function feel visually different while still belonging to the same universe?"

If not, improve the character scenes.

Ask:

"Does the website immediately feel like an Indian wedding?"

If not, strengthen the subtle Indian wedding aesthetics.

Ask:

"Is it festive without becoming cluttered?"

If not, reduce decorative elements.

FINAL EXPERIENCE

The final website should feel like an interactive illustrated wedding invitation.

Not a traditional wedding website.

Not a generic luxury template.

Not a photo gallery.

The experience should communicate:

Vishesh & Gauravi's wedding world.

The monogram defines the identity.

The characters are the protagonists.

The Indian wedding aesthetics create the atmosphere.

The Bollywood influence creates the energy.

The animations give the characters personality.

The falling flowers create the festive ambience.

The music makes the invitation feel alive.

The RSVP happens directly inside the website.

Keep the experience:

Cute. Witty. Humorous. Festive. Indian. Cinematic. Premium.

But above everything:

CONSISTENT.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://visheshgauravi.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0359a166-84bc-4df9-ab0f-6b213b4bae5c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
