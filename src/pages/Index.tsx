import { Link } from "react-router-dom";
import { ArrowRight, Brush, CalendarCheck, Camera, CircleDot, Disc3, Flame, Flower2, Lightbulb, Music2, PartyPopper, Users, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { fetchPortfolioImages } from "@/data/portfolio";
import type { PortfolioImage } from "@/data/portfolio";

const services = [
  { icon: CalendarCheck, title: "Event Planning & Coordination", description: "Concept development, timelines, vendor coordination and event-day execution." },
  { icon: Flower2, title: "Decoration & Floral Design", description: "Stage, mandapam, entrance, floral styling and venue transformation." },
  { icon: Camera, title: "Photography & Videography", description: "Candid, traditional, cinematic and event coverage." },
  { icon: UtensilsCrossed, title: "Catering & Hospitality", description: "Menu planning, food service, guest care and hospitality coordination." },
  { icon: Disc3, title: "Music & Entertainment", description: "DJ, live music, emcee and entertainment experiences." },
  { icon: Music2, title: "Nadaswaram & Thavil", description: "Traditional Mangala Vaathyam for ceremonies and celebrations." },
  { icon: CircleDot, title: "Chenda Melam", description: "Energetic traditional percussion performances and grand welcomes." },
  { icon: PartyPopper, title: "Special Entries & Experiences", description: "Couple entries, flower showers, fog effects, cold sparks and other experiences." },
  { icon: Flame, title: "Traditional & Ritual Services", description: "Purohithar coordination, rituals, seer arrangements and ceremonial requirements." },
  { icon: Brush, title: "Bridal & Groom Services", description: "Makeup, hairstyling, saree draping, grooming and mehendi." },
  { icon: Lightbulb, title: "Lighting & Event Production", description: "Sound, lighting, LED walls, projectors and technical production." },
  { icon: Users, title: "Guest Management", description: "Welcome arrangements, coordination, transport and event-day assistance." },
];

const eventTypes = [
  ["Weddings", "Meaningful traditions and a celebration shaped around your story."],
  ["Engagements", "An intimate beginning, thoughtfully brought together."],
  ["Receptions", "A warm welcome and an evening shared with your people."],
  ["Birthdays", "Personal celebrations for life's memorable milestones."],
  ["Baby Showers & Seemantham", "Family, blessings and traditions for a beautiful new chapter."],
  ["Housewarming & Gruhapravesam", "A new home welcomed with care and meaningful rituals."],
  ["Corporate Events", "Purposeful occasions with considered guest experiences."],
  ["Traditional & Cultural Events", "Celebrations that honour heritage and bring people together."],
  ["Private Celebrations", "Gatherings created around your occasion and personality."],
];

const pillars = [
  ["01", "Plan", "Understand the occasion, priorities, people and vision."],
  ["02", "Coordinate", "Bring together the right services, partners and timelines."],
  ["03", "Execute", "Manage the details on the day so everything comes together seamlessly."],
];

const principles = [
  ["Personal", "Every celebration begins with understanding what matters to you."],
  ["Coordinated", "One team bringing together the details, people and services behind your event."],
  ["Attentive", "From the first conversation to the final guest farewell, every detail matters."],
  ["Timeless", "Beautiful celebrations designed to feel meaningful long after the event ends."],
];

const EditorialHeading = ({ eyebrow, title, subtitle, left = false }: { eyebrow: string; title: string; subtitle?: string; left?: boolean }) => (
  <div className={`mb-10 max-w-3xl md:mb-14 ${left ? "" : "mx-auto text-center"}`}>
    <p className="mb-5 text-xs uppercase text-primary">— {eyebrow} —</p>
    <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">{title}</h2>
    {subtitle && <p className="mt-6 text-base leading-7 text-muted-foreground md:text-lg">{subtitle}</p>}
  </div>
);

const EditorialLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="inline-flex max-w-full items-center gap-3 border-b border-primary/40 pb-2 text-xs uppercase text-primary transition-colors hover:border-primary">
    {children}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
  </Link>
);

const Index = () => {
  const [selectedImages, setSelectedImages] = useState<PortfolioImage[]>([]);
  useEffect(() => {
    fetchPortfolioImages().then((data) => {
      // Existing family moments and wider environments; never substitute invented photography.
      setSelectedImages([data.birthdays[0], data.engagements[3], data.weddings[3], data.birthdays[1], data.babyShowers[0], data.weddings[5]].filter((image): image is PortfolioImage => Boolean(image)));
    });
  }, []);

  return (
    <div className="tracking-normal">
      {/* HERO */}
      <section className="relative isolate flex min-h-[600px] items-center overflow-hidden pb-16 pt-32 md:min-h-[620px] md:pb-20 md:pt-36">
        <img src={hero} alt="An existing Magizhchi Moments celebration setting in Chennai" className="absolute inset-0 -z-20 h-full w-full object-cover" width={1920} height={1080} fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-background/80" />
        <div className="container mx-auto flex flex-col items-center px-6 text-center">
          <p className="mb-6 text-xs uppercase text-primary motion-safe:animate-fade-in md:text-sm">— Magizhchi Moments —</p>
          <h1 className="max-w-5xl font-serif text-4xl font-semibold leading-[1.05] text-primary motion-safe:animate-fade-up sm:text-5xl md:text-7xl">
            Complete Celebrations.<br />Beautifully Orchestrated.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-secondary-foreground md:text-lg">From the first idea to the final farewell, we bring together planning, design, trusted services and seamless coordination to create celebrations that feel effortless.</p>
          <p className="mt-5 text-xs leading-6 text-primary md:text-sm">Complete Event Planning &amp; Management<br />Luxury Wedding &amp; Event Planning in Chennai</p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button asChild className="h-12 rounded-none px-7 text-xs uppercase hover-gold-glow"><Link to="/contact">Plan Your Event <ArrowRight aria-hidden="true" /></Link></Button>
            <Button asChild variant="outline" className="h-12 rounded-none border-primary/60 bg-transparent px-7 text-xs uppercase text-primary hover:bg-primary hover:text-primary-foreground"><Link to="/events">View Our Events <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="border-b border-border/40 py-16 md:py-24">
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-2 lg:gap-20">
          <EditorialHeading eyebrow="More Than a Celebration" title="One Team. Every Important Detail." left />
          <div className="max-w-xl lg:pt-9">
            <p className="text-base leading-8 text-secondary-foreground md:text-lg">Magizhchi Moments brings together the planning, creative direction, trusted partners and event-day coordination needed to bring your celebration together beautifully.</p>
            <p className="mt-5 text-base leading-8 text-muted-foreground">Whether it is a wedding, engagement, reception, birthday, baby shower, housewarming or corporate occasion, we help manage the details behind the moments you remember.</p>
            <div className="mt-8"><EditorialLink to="/about">Discover Our Approach</EditorialLink></div>
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section id="events" className="scroll-mt-28 border-b border-border/40 py-16 md:scroll-mt-32 md:py-24">
        <div className="container mx-auto px-6">
          <EditorialHeading eyebrow="Occasions" title="Celebrations We Bring to Life" subtitle="Every occasion has its own character. We shape the planning, people and details around the way you want your celebration to feel." />
          <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map(([title, description], index) => (
              <article key={title} className="flex gap-4 border-t border-border/60 py-6">
                <span className="pt-1 text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <div><h3 className="font-serif text-2xl leading-tight text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center"><EditorialLink to="/events">Explore All Events</EditorialLink></div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="services" className="scroll-mt-28 border-b border-border/40 bg-card/30 py-16 md:scroll-mt-32 md:py-24">
        <div className="container mx-auto px-6">
          <EditorialHeading eyebrow="Complete Event Services" title="Everything Your Celebration Needs" subtitle="From creative planning to the final guest departure, we coordinate the people, services and details that make an event complete." />
          <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, description }) => (
              <article key={title} className="flex gap-4 border-t border-border/60 py-6">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.4} aria-hidden="true" />
                <div><h3 className="font-serif text-2xl leading-tight text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center"><EditorialLink to="/services">Explore All Services</EditorialLink></div>
        </div>
      </section>

      {/* ONE COMPLETE EXPERIENCE */}
      <section className="border-b border-border/40 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <EditorialHeading eyebrow="One Complete Experience" title="You Enjoy the Moment. We Manage the Details." subtitle="Your celebration should not feel like a collection of separate vendors. We coordinate the moving parts behind the scenes so your family can be present for the moments that matter." />
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {pillars.map(([number, title, description]) => (
              <article key={number} className="border-t border-primary/40 pt-6">
                <span className="text-xs text-primary">{number}</span><h3 className="mt-5 font-serif text-3xl text-foreground">{title}</h3><p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED PORTFOLIO */}
      <section className="border-b border-border/40 bg-card/25 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <EditorialHeading eyebrow="Selected Moments" title="Celebrations We've Brought to Life" subtitle="A glimpse into the celebrations, spaces and details we've helped bring together." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedImages.map((image) => (
              <Link key={`${image.category}-${image.name}`} to={`/portfolio?category=${encodeURIComponent(image.category)}`} className="group block overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden"><img src={image.url} alt={image.alt} loading="lazy" decoding="async" width={800} height={600} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" /></div>
                <span className="mt-3 flex items-center justify-between text-xs capitalize text-muted-foreground">{image.category}<ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center"><EditorialLink to="/portfolio">View Full Portfolio</EditorialLink></div>
        </div>
      </section>

      {/* THE MAGIZHCHI APPROACH */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <EditorialHeading eyebrow="The Magizhchi Approach" title="Thoughtful Planning. Beautiful Execution." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(([title, description]) => (
              <article key={title} className="border-t border-border/60 pt-6"><h3 className="font-serif text-2xl text-foreground">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL INVITATION */}
      <section className="border-t border-border/40 bg-card/30 py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <EditorialHeading eyebrow="Let's Begin" title="Your Celebration. Our Complete Attention." subtitle="Tell us what you're celebrating, what matters most to you and the experience you envision. We'll help bring every detail together." />
          <div className="flex flex-col items-center gap-7">
            <Button asChild className="h-12 w-full rounded-none px-9 text-xs uppercase hover-gold-glow sm:w-auto"><Link to="/contact">Plan Your Event <ArrowRight aria-hidden="true" /></Link></Button>
            <EditorialLink to="/events">View Our Events</EditorialLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
