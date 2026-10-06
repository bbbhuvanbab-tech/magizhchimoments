import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brush,
  CalendarCheck,
  Camera,
  CircleDot,
  Disc3,
  Drama,
  Flame,
  Flower2,
  Lightbulb,
  Music2,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { fetchPortfolioImages } from "@/data/portfolio";
import type { PortfolioImage } from "@/data/portfolio";

const services = [
  {
    icon: CalendarCheck,
    title: "Event Planning & Coordination",
    description: "Every detail, timeline and team thoughtfully managed from start to finish.",
  },
  {
    icon: Flower2,
    title: "Decoration & Floral Design",
    description: "Refined settings and floral stories created around your celebration.",
  },
  {
    icon: Camera,
    title: "Photography & Videography",
    description: "Timeless imagery and films that preserve every meaningful moment.",
  },
  {
    icon: UtensilsCrossed,
    title: "Catering & Hospitality",
    description: "Considered menus and gracious service for a memorable guest experience.",
  },
  {
    icon: PartyPopper,
    title: "Special Entries & Effects",
    description: "Striking entrances and elegant effects, produced with precision.",
  },
  {
    icon: Music2,
    title: "Nadaswaram & Thavil",
    description: "Soulful traditional music to honour the spirit of every ceremony.",
  },
  {
    icon: CircleDot,
    title: "Chenda Melam",
    description: "A powerful ceremonial ensemble that brings energy and grandeur.",
  },
  {
    icon: Disc3,
    title: "DJ, Sound & Entertainment",
    description: "Curated music, artists and sound for celebrations that come alive.",
  },
  {
    icon: Flame,
    title: "Purohithar & Ritual Services",
    description: "Trusted guidance for meaningful traditions and sacred ceremonies.",
  },
  {
    icon: Brush,
    title: "Bridal Makeup & Styling",
    description: "Polished bridal beauty and styling, tailored to your personal vision.",
  },
  {
    icon: Drama,
    title: "Garlands & Traditional Arrangements",
    description: "Fresh garlands and ceremonial details arranged with exceptional care.",
  },
  {
    icon: Lightbulb,
    title: "Lighting & LED Production",
    description: "Layered lighting and seamless production that transform every setting.",
  },
];

const eventTypes = [
  "Weddings",
  "Engagements",
  "Receptions",
  "Birthdays",
  "Baby Showers",
  "Housewarming & Gruhapravesam",
  "Corporate Events",
  "Traditional & Cultural Events",
  "Private Celebrations",
];

const processSteps = [
  ["01", "Discover", "We begin with your occasion, priorities, traditions and the feeling you want guests to remember."],
  ["02", "Plan", "Every service, supplier, schedule and responsibility is brought into one considered plan."],
  ["03", "Create", "Design, hospitality, entertainment and cultural details are shaped into one complete experience."],
  ["04", "Execute", "Our team coordinates the celebration on site so you can be fully present for every moment."],
];

const reasons = [
  ["Complete coordination", "One team aligning every service, timeline and moving part."],
  ["Trusted services", "A considered network of specialists managed with care and accountability."],
  ["Personalised planning", "Every decision is shaped around your people, priorities and traditions."],
  ["Event-day management", "Calm, attentive coordination from preparation through the final farewell."],
];

const Index = () => {
  const [weddings, setWeddings] = useState<PortfolioImage[]>([]);
  const [engagements, setEngagements] = useState<PortfolioImage[]>([]);
  const [babyShowers, setBabyShowers] = useState<PortfolioImage[]>([]);
  const [birthdays, setBirthdays] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioImages().then((data) => {
      setWeddings(data.weddings);
      setEngagements(data.engagements);
      setBabyShowers(data.babyShowers);
      setBirthdays(data.birthdays);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null; // Render empty while loading
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <img
          src={hero}
          alt="Magizhchi Moments — luxury wedding mandap"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background" />
        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center px-6 opacity-100 shadow-none border-none border-primary">
          <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-primary mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            — Premium Event Planning & Management —
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-gradient-gold leading-[1.05] max-w-5xl animate-fade-up opacity-0 text-center font-extrabold" style={{ animationDelay: "0.4s" }}>
            Complete Celebrations. Thoughtfully Planned. Beautifully Executed.
          </h1>
          <p className="text-base mt-8 max-w-xl leading-relaxed animate-fade-up opacity-0 md:text-xl text-secondary-foreground" style={{ animationDelay: "0.7s" }}>
            From the first idea to the final farewell, Magizhchi Moments brings together every element of your celebration under one trusted team.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: "1s" }}>
            <Button asChild className="h-12 rounded-none px-8 text-xs tracking-[0.3em] uppercase hover-gold-glow">
              <Link to="/contact">Plan Your Event</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-none border-primary/60 bg-transparent px-8 text-xs tracking-[0.3em] uppercase text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary/60 text-[10px] tracking-[0.4em] uppercase animate-shimmer">
          Scroll
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-24 border-b border-border/40 bg-card/30 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="Our Services"
            title="Everything Your Celebration Needs"
            subtitle="From planning and decor to entertainment, food and traditions — we bring every part of your celebration together."
          />
          <div className="grid gap-px border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="group min-h-[250px] bg-background p-7 transition-smooth hover:bg-secondary/70 md:p-8">
                <div className="mb-10 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center border border-primary/40 text-primary transition-smooth group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-serif text-2xl leading-tight text-foreground">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button asChild variant="outline" className="h-12 rounded-none border-primary/60 bg-transparent px-8 text-xs tracking-[0.25em] uppercase text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/contact">Discuss Your Event <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="scroll-mt-24 border-b border-border/40 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeader
              eyebrow="Events"
              title="Every Occasion, Fully Realised"
              subtitle="Every celebration has its own rhythm, traditions and personality. We bring the right planning, people and services together for each occasion."
              align="left"
            />
            <div>
              <div className="grid border-t border-border/60 sm:grid-cols-2">
                {eventTypes.map((event, index) => (
                  <div key={event} className="flex min-h-20 items-center gap-4 border-b border-border/60 py-5 pr-5">
                    <span className="text-[10px] tracking-[0.2em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-xl leading-tight text-foreground">{event}</span>
                  </div>
                ))}
              </div>
              <Link to="/events" className="mt-8 inline-flex items-center gap-3 border-b border-primary/40 pb-1 text-xs uppercase tracking-[0.25em] text-primary transition-smooth hover:border-primary">
                Explore All Events <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ONE TEAM */}
      <section className="border-b border-border/40 bg-card/25 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary">— One Team —</p>
              <h2 className="mt-6 max-w-xl font-serif text-4xl leading-tight text-gradient-gold md:text-6xl">From Planning to the Final Farewell</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">Instead of managing many separate teams, you have one trusted point of coordination bringing every part of the celebration together.</p>
            </div>
            <div className="grid border-t border-border/60 sm:grid-cols-2">
              {["Planning & Coordination", "Design & Production", "Hospitality & Catering", "Photography & Film", "Music & Entertainment", "Traditions & Rituals"].map((item, index) => (
                <div key={item} className="flex min-h-24 items-center gap-5 border-b border-border/60 py-5 sm:px-5">
                  <span className="text-[10px] tracking-[0.2em] text-primary">0{index + 1}</span>
                  <span className="font-serif text-xl text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-b border-border/40 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeader eyebrow="How We Work" title="Considered at Every Step" />
          <div className="grid border-l border-t border-border/60 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(([number, title, description]) => (
              <article key={number} className="min-h-64 border-b border-r border-border/60 p-7 md:p-8">
                <span className="text-xs tracking-[0.25em] text-primary">{number}</span>
                <h3 className="mt-10 font-serif text-3xl text-foreground">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="border-b border-border/40 bg-card/25 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary">— Portfolio —</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight text-gradient-gold md:text-6xl">Moments We've Brought Together</h2>
            </div>
            <Link to="/portfolio" className="inline-flex w-fit items-center gap-3 border-b border-primary/40 pb-1 text-xs uppercase tracking-[0.25em] text-primary transition-smooth hover:border-primary">
              View Full Portfolio <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-2">
            {[weddings[0], engagements[0], birthdays[0], babyShowers[0], weddings[4], engagements[6]].filter(Boolean).map((image, index) => (
              <Link key={`${image.category}-${image.name}`} to={`/portfolio?category=${encodeURIComponent(image.category)}`} className={`group relative overflow-hidden border border-border/50 ${index === 0 || index === 5 ? "col-span-2 aspect-[4/3] md:col-span-5 md:row-span-2 md:aspect-auto" : "aspect-square md:col-span-2"}`}>
                <img src={image.url} alt={image.alt} loading={index < 2 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MAGIZHCHI MOMENTS */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
        <SectionHeader
            eyebrow="Why Magizhchi Moments"
            title="One Trusted Team. Every Detail Considered."
            subtitle="A celebration should feel effortless to experience, even when it takes exceptional care to create."
          />
          <div className="grid border-l border-t border-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([title, description], index) => (
              <article key={title} className="min-h-52 border-b border-r border-border/60 p-7 md:p-8">
                <span className="text-[10px] tracking-[0.2em] text-primary">0{index + 1}</span>
                <h3 className="mt-8 font-serif text-2xl leading-tight text-foreground">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border/40 py-32 md:py-40">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="relative container mx-auto text-center px-6">
          <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">— Let's Begin —</p>
          <h2 className="font-serif text-4xl md:text-6xl text-gradient-gold max-w-3xl mx-auto leading-tight">
            Your Event Deserves Complete Attention.
          </h2>
          <p className="text-muted-foreground mt-8 max-w-xl mx-auto leading-relaxed">
            We accept a limited number of celebrations each season, allowing our team to plan and manage every detail with care.
          </p>
          <Button asChild className="mt-10 h-12 rounded-none px-9 text-xs uppercase tracking-[0.3em] hover-gold-glow">
            <Link to="/contact">Plan Your Event <ArrowRight size={14} /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
