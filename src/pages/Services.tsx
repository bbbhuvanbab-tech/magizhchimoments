import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brush,
  CalendarCheck,
  Camera,
  Flame,
  Flower2,
  Lightbulb,
  Music2,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

const serviceCategories = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Event Planning & Coordination",
    description: "A single, experienced team bringing every decision, detail and partner into perfect alignment.",
    services: [
      "Complete Event Planning",
      "Wedding Planning",
      "Event Coordination",
      "Vendor Coordination",
      "Timeline & Schedule Management",
      "Guest Management",
      "On-site Event Management",
    ],
  },
  {
    number: "02",
    icon: Flower2,
    title: "Decoration & Floral Design",
    description: "Immersive settings shaped through flowers, form, colour and the character of your occasion.",
    services: [
      "Stage Decoration",
      "Mandapam Decoration",
      "Floral Decoration",
      "Entrance Decoration",
      "Table & Venue Styling",
      "Traditional Decor",
      "Theme Decor",
    ],
  },
  {
    number: "03",
    icon: Camera,
    title: "Photography & Videography",
    description: "Thoughtful documentation that preserves the emotion, energy and beauty of every moment.",
    services: [
      "Candid Photography",
      "Traditional Photography",
      "Cinematic Videography",
      "Wedding Films",
      "Drone Photography",
      "Reels & Social Media Content",
      "Album Creation",
    ],
  },
  {
    number: "04",
    icon: UtensilsCrossed,
    title: "Catering & Hospitality",
    description: "Warm, attentive hospitality and memorable dining experiences for you and every guest.",
    services: [
      "Wedding Catering",
      "Traditional South Indian Meals",
      "Banana Leaf Service",
      "Buffet Service",
      "Live Food Counters",
      "Welcome Drinks",
      "Dessert Counters",
      "Guest Hospitality",
    ],
  },
  {
    number: "05",
    icon: PartyPopper,
    title: "Special Entries & Experiences",
    description: "Beautifully timed entrances and effects that create anticipation without overwhelming the moment.",
    services: [
      "Couple Entry",
      "Bride & Groom Entry",
      "Fog Entry",
      "Flower Shower",
      "Cold Spark Effects",
      "Confetti Effects",
      "Themed Entries",
      "Wedding Cars",
    ],
  },
  {
    number: "06",
    icon: Music2,
    title: "Music & Entertainment",
    description: "Traditional ensembles and contemporary entertainment selected to suit every part of the celebration.",
    services: [
      "Nadaswaram",
      "Thavil",
      "Chenda Melam",
      "DJ",
      "Sound System",
      "Live Bands",
      "Emcee / Anchor",
      "Dance Performances",
    ],
  },
  {
    number: "07",
    icon: Flame,
    title: "Traditional & Ritual Services",
    description: "Ceremonial details and time-honoured customs coordinated with reverence, clarity and care.",
    services: [
      "Purohithar Services",
      "Wedding Ritual Coordination",
      "Seer Arrangement",
      "Thamboolam Arrangement",
      "Traditional Welcome",
      "Garlands",
      "Ceremonial Requirements",
    ],
  },
  {
    number: "08",
    icon: Brush,
    title: "Bridal & Groom Services",
    description: "Personal styling and beauty support designed for confidence, comfort and effortless photographs.",
    services: ["Bridal Makeup", "Hairstyling", "Saree Draping", "Groom Styling", "Mehendi"],
  },
  {
    number: "09",
    icon: Lightbulb,
    title: "Lighting & Event Production",
    description: "A polished technical foundation that transforms the setting and keeps every moment running smoothly.",
    services: [
      "Event Lighting",
      "Stage Lighting",
      "LED Walls",
      "Projectors",
      "Sound Production",
      "Technical Production",
    ],
  },
];

const Services = () => (
  <div>
    <section className="relative flex min-h-[620px] items-center overflow-hidden pt-24 md:min-h-[720px]">
      <img
        src={hero}
        alt="A premium Magizhchi Moments celebration setting"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/80 to-background" />
      <div className="container relative z-10 mx-auto px-6 py-24 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-primary">— Our Services —</p>
        <h1 className="mx-auto max-w-5xl font-serif text-5xl font-semibold leading-tight text-gradient-gold sm:text-6xl md:text-7xl">
          Everything Your Celebration Needs
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-foreground/80 md:text-xl">
          From planning and production to hospitality, entertainment and tradition, Magizhchi Moments brings every element together under one coordinated team.
        </p>
        <Button asChild className="mt-10 h-12 rounded-none px-8 text-xs uppercase tracking-[0.3em] hover-gold-glow">
          <Link to="/contact">Plan Your Event</Link>
        </Button>
      </div>
    </section>

    <section className="border-t border-border/40">
      <div className="container mx-auto px-6">
        {serviceCategories.map(({ number, icon: Icon, title, description, services }, index) => (
          <article
            key={number}
            className="grid gap-10 border-b border-border/60 py-20 md:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="flex items-center gap-5 text-primary">
                <span className="text-xs tracking-[0.3em]">{number}</span>
                <span className="h-px w-12 bg-primary/50" aria-hidden="true" />
                <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
              </div>
              <h2 className="mt-7 max-w-xl font-serif text-4xl leading-tight text-gradient-gold md:text-5xl">{title}</h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground md:text-base">{description}</p>
            </div>
            <ul className={`grid content-center gap-x-10 sm:grid-cols-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              {services.map((service) => (
                <li key={service} className="flex items-center gap-4 border-b border-border/50 py-4 text-sm text-foreground/85 md:text-base">
                  <span className="h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
                  {service}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-gradient-dark py-28 md:py-36">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-primary">— Begin Your Celebration —</p>
        <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-gradient-gold md:text-6xl">
          Planning something special?
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
          Tell us what you're celebrating. We'll help bring every detail together.
        </p>
        <Button asChild className="mt-10 h-12 rounded-none px-9 text-xs uppercase tracking-[0.3em] hover-gold-glow">
          <Link to="/contact">Plan Your Event <ArrowRight /></Link>
        </Button>
      </div>
    </section>
  </div>
);

export default Services;