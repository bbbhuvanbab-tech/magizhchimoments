import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

interface EventDetailProps {
  eyebrow: string;
  title: string;
  description: string;
  images?: PortfolioImage[];
  category?: string;
  index: number;
  linkLabel?: string;
}

const EventDetail = ({ eyebrow, title, description, images = [], category, index, linkLabel }: EventDetailProps) => (
  <section id={eyebrow.toLowerCase().replace(/ & | /g, "-")} className={`scroll-mt-28 border-t border-border/50 py-24 md:scroll-mt-32 md:py-32 ${index % 2 === 1 ? "bg-card/25" : ""}`}>
    <div className="container mx-auto px-6">
      <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">— {eyebrow} —</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-gradient-gold md:text-6xl">{title}</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">{description}</p>
          {linkLabel && (
            <Link to="/contact" className="mt-9 inline-flex items-center gap-3 border-b border-primary/40 pb-1 text-xs uppercase tracking-[0.25em] text-primary transition-smooth hover:border-primary">
              {linkLabel} <ArrowRight size={14} />
            </Link>
          )}
      </div>
      {images.length > 0 && (
        <div className={`mt-16 grid gap-4 ${images.length > 2 ? "md:grid-cols-[1.6fr_1fr] md:grid-rows-2" : "md:grid-cols-2"}`}>
          {images.slice(0, 3).map((image, imageIndex) => (
            <Link
              key={image.url}
              to={`/portfolio?category=${encodeURIComponent(category ?? eyebrow)}`}
              className={`group relative overflow-hidden border border-border/50 ${images.length > 2 && imageIndex === 0 ? "aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-[4/3] md:aspect-auto"}`}
            >
              <img src={image.url} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
              <span className="absolute bottom-4 left-5 border border-primary/40 bg-background/80 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-primary">0{imageIndex + 1}</span>
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
      description: "From intimate family ceremonies to grand wedding celebrations, every moment is thoughtfully planned around tradition, people and the way you want your day to feel.",
      images: portfolio?.weddings,
      category: "Wedding",
      linkLabel: "Explore Weddings",
    },
    {
      eyebrow: "Engagements",
      title: "The Promise, Beautifully Set",
      description: "An engagement is the beginning of a beautiful chapter. We create celebrations that feel personal, welcoming and meaningful to both families.",
      images: portfolio?.engagements,
      category: "engagement",
    },
    {
      eyebrow: "Receptions",
      title: "An Evening Worth Remembering",
      description: "Elegant evenings designed around the couple, their guests and the moments they want to remember long after the celebration ends.",
      images: portfolio?.weddings.slice(3, 6),
      category: "Wedding",
    },
    {
      eyebrow: "Birthdays",
      title: "Milestones, Reimagined",
      description: "From children's celebrations to milestone birthdays, we create memorable occasions shaped around personality, theme, family and unforgettable moments.",
      images: portfolio?.birthdays,
      category: "birthday",
    },
    {
      eyebrow: "Baby Showers",
      title: "A Tender Welcome",
      description: "Seemantham rituals and modern baby showers, thoughtfully planned around family traditions, warm hospitality and the joy of welcoming a new beginning.",
      images: portfolio?.babyShowers,
      category: "baby shower",
    },
    {
      eyebrow: "Housewarming",
      title: "A Beautiful Beginning",
      description: "Meaningful housewarming celebrations that honour tradition while creating a warm and memorable experience for family and guests.",
    },
    {
      eyebrow: "Corporate",
      title: "Professional Events. Thoughtfully Delivered.",
      description: "From formal gatherings and launches to team celebrations and special occasions, we create well-organised experiences that reflect the purpose of every event.",
    },
    {
      eyebrow: "Tradition & Culture",
      title: "Celebrations Rooted in Tradition",
      description: "From meaningful family ceremonies to cultural gatherings, we create celebrations that respect tradition while bringing every generation together.",
    },
    {
      eyebrow: "Private Celebrations",
      title: "Made Around Your Moment",
      description: "Intimate celebrations designed around the people, stories and details that make your occasion uniquely yours.",
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

      {details.map((detail, index) => <EventDetail key={detail.eyebrow} {...detail} index={index} />)}

      <section className="border-y border-border/50 bg-card/25 py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-primary">— One Complete Experience —</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight text-gradient-gold md:text-6xl">Every Celebration, Thoughtfully Coordinated.</h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground">Whatever the occasion, our team brings together the planning, creative direction, trusted event partners and coordination needed to make the celebration feel effortless.</p>
          <Button asChild variant="outline" className="mt-10 h-12 rounded-none border-primary/60 bg-transparent px-8 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/services">Explore Our Services <ArrowRight /></Link>
          </Button>
        </div>
      </section>

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