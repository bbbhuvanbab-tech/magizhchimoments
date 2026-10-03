import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, ClipboardCheck, MapPin, Palette, Sparkles, Users } from "lucide-react";
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
    title: "Event Planning",
    description: "From the first conversation to the final farewell, we shape every detail around your vision, priorities and budget.",
  },
  {
    icon: Palette,
    title: "Creative Direction & Design",
    description: "A cohesive visual story across invitations, décor, florals, lighting, styling and every guest-facing detail.",
  },
  {
    icon: MapPin,
    title: "Venue & Vendor Curation",
    description: "The right setting and trusted creative partners, thoughtfully selected and coordinated as one team.",
  },
  {
    icon: Users,
    title: "Guest Experience",
    description: "Considered hospitality, seamless arrivals and personal touches that make every guest feel beautifully cared for.",
  },
  {
    icon: Sparkles,
    title: "Production & Styling",
    description: "Precise production, immersive ambience and elevated styling brought together with quiet confidence.",
  },
  {
    icon: ClipboardCheck,
    title: "On-Day Management",
    description: "Timelines, teams and transitions managed discreetly, so you can be fully present for your celebration.",
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
            Extraordinary Events,<br />Seamlessly Managed.
          </h1>
          <p className="text-base mt-8 max-w-xl leading-relaxed animate-fade-up opacity-0 md:text-xl text-secondary-foreground" style={{ animationDelay: "0.7s" }}>
            From the first idea to the final guest farewell, we plan, design and manage meaningful celebrations with intention, precision and quiet luxury.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: "1s" }}>
            <Button asChild className="h-12 rounded-none px-8 text-xs tracking-[0.3em] uppercase hover-gold-glow">
              <Link to="/contact">Plan Your Event</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-none border-primary/60 bg-transparent px-8 text-xs tracking-[0.3em] uppercase text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/portfolio">View Our Work</Link>
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
            eyebrow="What We Do"
            title="Every Detail, Considered"
            subtitle="A complete planning and management service for celebrations that feel effortless, personal and unmistakably yours."
          />
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="border-t border-border/60 pt-7">
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="font-serif text-2xl text-foreground">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
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
