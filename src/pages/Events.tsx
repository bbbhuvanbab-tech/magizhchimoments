import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Flower2,
  HeartHandshake,
  Lightbulb,
  Music2,
  Sparkles,
  UtensilsCrossed,
  Users,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { fetchPortfolioImages } from "@/data/portfolio";
import type { PortfolioImage } from "@/data/portfolio";

const eventTypes = [
  ["01", "Weddings", "Complete wedding planning, coordination and celebration management from ceremony to reception."],
  ["02", "Engagements", "Beautifully coordinated engagement and betrothal celebrations designed around both families."],
  ["03", "Receptions", "Elegant reception experiences with entertainment, hospitality, production and seamless event-day coordination."],
  ["04", "Birthdays", "Personalised birthday celebrations for children, adults and milestone occasions."],
  ["05", "Baby Showers", "Warm and thoughtful celebrations combining traditional elements, styling, hospitality and entertainment."],
  ["06", "Housewarming & Gruhapravesam", "Traditional and contemporary housewarming celebrations planned with care for every ritual and guest."],
  ["07", "Corporate Events", "Professional events, launches, gatherings and celebrations coordinated with precision."],
  ["08", "Traditional & Cultural Events", "Meaningful celebrations rooted in tradition, ceremony, music and cultural details."],
  ["09", "Private Celebrations", "Intimate family celebrations and special occasions planned around your people, preferences and personality."],
];

const ecosystem = [
  { icon: HeartHandshake, title: "Event Planning", text: "Complete planning, timelines, coordination and execution" },
  { icon: Flower2, title: "Decoration", text: "Stage, floral, mandapam, entrance and venue styling" },
  { icon: Camera, title: "Photography", text: "Candid, traditional, cinematic, drone and event coverage" },
  { icon: UtensilsCrossed, title: "Catering", text: "Traditional meals, banana-leaf service, buffet, live counters and hospitality" },
  { icon: Music2, title: "Music & Entertainment", text: "Nadaswaram, Thavil, Chenda Melam, DJ, live music and emcee" },
  { icon: Sparkles, title: "Special Experiences", text: "Couple entries, fog entry, flower shower, cold sparks and themed experiences" },
  { icon: WandSparkles, title: "Traditional Services", text: "Purohithar, rituals, seer arrangements, garlands and ceremonial coordination" },
  { icon: Users, title: "Bridal & Groom", text: "Makeup, hairstyling, saree draping, grooming and mehendi" },
  { icon: Lightbulb, title: "Lighting & Production", text: "Stage lighting, LED walls, sound, projectors and technical production" },
  { icon: HeartHandshake, title: "Guest Hospitality", text: "Welcome arrangements, guest coordination, transport and event-day assistance" },
];

interface EventDetailProps {
  eyebrow: string;
  title: string;
  description: string;
  services: string[];
  images?: PortfolioImage[];
  category?: string;
  index: number;
}

const EventDetail = ({ eyebrow, title, description, services, images = [], category, index }: EventDetailProps) => (
  <section className={`border-t border-border/50 py-24 md:py-32 ${index % 2 === 1 ? "bg-card/25" : ""}`}>
    <div className="container mx-auto px-6">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">— {eyebrow} —</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-gradient-gold md:text-6xl">{title}</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">{description}</p>
          <Button asChild variant="outline" className="mt-9 h-11 rounded-none border-primary/60 bg-transparent px-6 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/contact">Plan Your Event <ArrowRight /></Link>
          </Button>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">What We Can Coordinate</p>
          <ul className="grid sm:grid-cols-2">
            {services.map((service) => (
              <li key={service} className="flex items-center gap-4 border-b border-border/50 py-3.5 pr-5 text-sm text-foreground/85">
                <span className="h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {images.length > 0 && (
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {images.slice(0, 3).map((image, imageIndex) => (
            <Link key={image.url} to={`/portfolio?category=${encodeURIComponent(category ?? eyebrow)}`} className="group relative aspect-[4/3] overflow-hidden border border-border/50">
              <img src={image.url} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.3em] text-primary">0{imageIndex + 1}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>
);

const Events = () => {
  const [portfolio, setPortfolio] = useState<Awaited<ReturnType<typeof fetchPortfolioImages>> | null>(null);

  useEffect(() => {
    fetchPortfolioImages().then(setPortfolio);
  }, []);

  const details: Omit<EventDetailProps, "index">[] = [
    {
      eyebrow: "Weddings",
      title: "Vows Beneath Gilded Skies",
      description: "End-to-end wedding experiences shaped through thoughtful planning, trusted coordination, tradition, hospitality and beautifully executed details.",
      services: ["Wedding Planning", "Wedding Coordination", "Venue Coordination", "Stage & Mandapam Decoration", "Floral Styling", "Photography & Videography", "Catering & Hospitality", "Nadaswaram & Thavil", "Chenda Melam", "DJ & Entertainment", "Special Couple Entries", "Purohithar & Ritual Coordination", "Bridal Makeup & Styling", "Guest Management", "Lighting & LED Production"],
      images: portfolio?.weddings,
      category: "Wedding",
    },
    {
      eyebrow: "Engagements",
      title: "The Promise, Beautifully Set",
      description: "Intimate engagement celebrations planned with thoughtful rituals, welcoming hospitality, beautiful styling and seamless coordination.",
      services: ["Engagement Planning", "Ring Ceremony Coordination", "Decoration", "Photography", "Catering", "Couple Entry", "Nadaswaram", "DJ / Music", "Guest Hospitality", "Event Coordination"],
      images: portfolio?.engagements,
      category: "engagement",
    },
    {
      eyebrow: "Receptions",
      title: "An Evening Worth Remembering",
      description: "Elegant reception celebrations where entertainment, dining, photography, production and guest experience come together seamlessly.",
      services: ["Reception Planning", "Stage & Venue Styling", "Photography & Videography", "Catering", "DJ", "Live Music", "Chenda Melam", "Special Entry", "LED & Lighting", "Emcee / Anchor", "Guest Hospitality"],
      images: portfolio?.weddings.slice(3, 6),
      category: "Wedding",
    },
    {
      eyebrow: "Birthdays",
      title: "Milestones, Reimagined",
      description: "Personalised birthday experiences planned around personality, theme, entertainment, food and memorable moments.",
      services: ["Theme Planning", "Decoration", "Photography", "Catering", "Cake Coordination", "DJ & Music", "Entertainment", "Special Effects", "Guest Management"],
      images: portfolio?.birthdays,
      category: "birthday",
    },
    {
      eyebrow: "Baby Showers",
      title: "A Tender Welcome",
      description: "Seemantham and modern baby shower celebrations — warmly planned, beautifully hosted and styled with care for a family's new beginning.",
      services: ["Baby Shower Planning", "Seemantham Coordination", "Traditional Services", "Theme Decoration", "Photography", "Catering", "Welcome Arrangements", "Guest Hospitality"],
      images: portfolio?.babyShowers,
      category: "baby shower",
    },
    {
      eyebrow: "Housewarming",
      title: "A Beautiful Beginning",
      description: "Thoughtfully coordinated Gruhapravesam and housewarming celebrations that honour tradition while making every guest feel welcome.",
      services: ["Gruhapravesam Coordination", "Purohithar", "Pooja Requirements", "Traditional Decoration", "Floral Arrangements", "Nadaswaram", "Catering", "Photography", "Guest Hospitality"],
    },
    {
      eyebrow: "Corporate",
      title: "Professional Events. Thoughtfully Delivered.",
      description: "From corporate gatherings and launches to team celebrations and formal occasions, we coordinate every detail with clarity and professionalism.",
      services: ["Corporate Event Planning", "Venue Coordination", "Stage & Branding", "Photography & Videography", "Catering", "Sound & Lighting", "LED Screens", "Emcee", "Entertainment", "Guest Management", "Event-Day Coordination"],
    },
    {
      eyebrow: "Tradition & Culture",
      title: "Celebrations Rooted in Tradition",
      description: "Meaningful ceremonies shaped with respect for every custom, sound and shared family tradition.",
      services: ["Traditional Ceremonies", "Purohithar Coordination", "Nadaswaram", "Thavil", "Chenda Melam", "Traditional Decoration", "Catering", "Floral & Garland Services", "Guest Hospitality", "Ritual Coordination"],
    },
    {
      eyebrow: "Private Celebrations",
      title: "Made Around Your Moment",
      description: "Personal occasions designed around the people, details and feeling that make your celebration entirely your own.",
      services: ["Family Celebrations", "Milestone Events", "Anniversaries", "Surprise Celebrations", "Private Parties", "Cultural Gatherings", "Intimate Celebrations"],
    },
  ];

  return (
    <div>
      <section className="border-b border-border/50 bg-gradient-dark pb-24 pt-40 md:pb-28 md:pt-48">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-primary">— Events —</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-tight text-gradient-gold sm:text-6xl md:text-7xl">Every Occasion, Fully Realised</h1>
          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-foreground/75 md:text-lg">From intimate family celebrations to grand weddings and corporate occasions, we plan, coordinate and execute every detail to create a celebration that feels effortless from beginning to end.</p>
          <Button asChild className="mt-9 h-12 rounded-none px-8 text-xs uppercase tracking-[0.3em] hover-gold-glow">
            <Link to="/contact">Plan Your Event <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeader title="Celebrations We Plan" subtitle="Every celebration has its own rhythm, traditions and personality. We bring the right planning, people and services together for each occasion." />
          <div className="grid border-l border-t border-border/60 md:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map(([number, title, description]) => (
              <article key={number} className="group min-h-[260px] border-b border-r border-border/60 p-7 transition-smooth hover:bg-card/60 md:p-9">
                <div className="flex items-center gap-4 text-primary"><span className="text-xs tracking-[0.25em]">{number}</span><span className="h-px w-10 bg-primary/40" /></div>
                <h2 className="mt-10 font-serif text-3xl leading-tight text-foreground">{title}</h2>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-card/30 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeader eyebrow="One Team" title="One Celebration. Every Detail Coordinated." subtitle="Your celebration should not feel like a collection of separate vendors. Magizhchi Moments brings planning, creative direction, trusted partners and event-day coordination together under one experienced team." />
          <div className="grid gap-x-12 md:grid-cols-2 lg:grid-cols-5">
            {ecosystem.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border-b border-border/60 py-7">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.4} aria-hidden="true" />
                <h3 className="mt-5 text-xs uppercase tracking-[0.2em] text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {details.map((detail, index) => <EventDetail key={detail.eyebrow} {...detail} index={index} />)}

      <section className="bg-gradient-dark py-28 md:py-36">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-primary">— Let's Begin —</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight text-gradient-gold md:text-6xl">Your Event Deserves Complete Attention.</h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground">Tell us what you're celebrating, what matters most to you, and the kind of experience you envision. We'll help bring every detail together.</p>
          <Button asChild className="mt-10 h-12 rounded-none px-9 text-xs uppercase tracking-[0.3em] hover-gold-glow">
            <Link to="/contact">Plan Your Event <ArrowRight /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;