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
import CategoryGallery from "@/components/CategoryGallery";
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
  "Birthdays",
  "Baby Showers",
  "Corporate Events",
  "Private Celebrations",
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
      <section id="events" className="scroll-mt-24 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeader
              eyebrow="Events"
              title="Every Occasion, Fully Realised"
              subtitle="Intimate or expansive, traditional or contemporary — each event is planned as a complete experience, not simply a beautiful setting."
              align="left"
            />
            <div className="grid grid-cols-2 border-t border-border/60 sm:grid-cols-3">
              {eventTypes.map((event) => (
                <div key={event} className="border-b border-border/60 py-5 pr-4 font-serif text-lg text-foreground">
                  {event}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WEDDINGS */}
      <section className="pb-24 md:pb-32 container mx-auto px-6">
        <SectionHeader
          eyebrow="Weddings"
          title="Vows Beneath Gilded Skies"
          subtitle="End-to-end wedding experiences shaped through thoughtful planning, trusted coordination, heritage, artistry and serene hospitality."
        />
        <CategoryGallery images={weddings.slice(0, 4)} category="Wedding" />
        <div className="text-center mt-14">
          <Link to="/portfolio" className="inline-flex items-center gap-3 text-primary text-xs tracking-[0.3em] uppercase border-b border-primary/40 pb-1 hover:border-primary transition-smooth">
            Explore Wedding <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ENGAGEMENT */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <SectionHeader
          eyebrow="Engagement"
          title="The Promise, Beautifully Set"
          subtitle="Intimate engagement celebrations planned with thoughtful rituals, welcoming hospitality and quiet elegance."
        />
        <CategoryGallery images={engagements.slice(0, 3)} category="engagement" />
        <div className="text-center mt-14">
  <Link to="/portfolio?category=engagement" className="inline-flex items-center gap-3 text-primary text-xs tracking-[0.3em] uppercase border-b border-primary/40 pb-1 hover:border-primary transition-smooth">
    Explore Engagement <ArrowRight size={14} />
  </Link>
</div>
      </section>

      <div className="gold-divider" />

      {/* BABY SHOWER */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <SectionHeader
          eyebrow="Baby Shower"
          title="A Tender Welcome"
          subtitle="Seemantham rituals and modern showers — warmly planned, beautifully hosted and styled with care for a family's new beginning."
        />
        <CategoryGallery images={babyShowers.slice(0, 3)} category="baby shower" />
        <div className="text-center mt-14">
  <Link to="/portfolio?category=baby%20shower" className="inline-flex items-center gap-3 text-primary text-xs tracking-[0.3em] uppercase border-b border-primary/40 pb-1 hover:border-primary transition-smooth">
    Explore Baby Shower <ArrowRight size={14} />
  </Link>
</div>
      </section>

      <div className="gold-divider" />

      {/* BIRTHDAY */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <SectionHeader
          eyebrow="Birthday"
          title="Milestones, Reimagined"
          subtitle="Sophisticated birthday experiences planned from guest welcome to the final toast, with personality, polish and a hint of theatre."
        />
        <CategoryGallery images={birthdays.slice(0, 2)} category="birthday" />
        <div className="text-center mt-14">
  <Link to="/portfolio?category=birthday" className="inline-flex items-center gap-3 text-primary text-xs tracking-[0.3em] uppercase border-b border-primary/40 pb-1 hover:border-primary transition-smooth">
    Explore Birthday <ArrowRight size={14} />
  </Link>
</div>
      </section>

      {/* CTA */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 50%, hsl(43 56% 52% / 0.25), transparent 60%)" }} />
        <div className="relative container mx-auto text-center px-6">
          <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">— Let's Begin —</p>
          <h2 className="font-serif text-4xl md:text-6xl text-gradient-gold max-w-3xl mx-auto leading-tight">
            Your Event Deserves Complete Attention.
          </h2>
          <p className="text-muted-foreground mt-8 max-w-xl mx-auto leading-relaxed">
            We accept a limited number of celebrations each season, allowing our team to plan and manage every detail with care.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-gradient-gold text-primary-foreground text-xs tracking-[0.3em] uppercase hover-gold-glow transition-smooth"
          >
            Plan Your Event <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
