import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import SectionHeader from "@/components/SectionHeader";
import CategoryGallery from "@/components/CategoryGallery";
import { weddings, engagements, babyShowers, birthdays } from "@/data/portfolio";

const Index = () => {
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center px-6 opacity-100 shadow-none border-none border-primary">
          <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-primary mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            — Luxury Event Atelier —
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-gradient-gold leading-[1.05] max-w-5xl animate-fade-up opacity-0 text-center font-extrabold lg:text-7xl" style={{ animationDelay: "0.4s" }}>
            Crafted Celebrations,&nbsp;{"\n"}Quietly Unforgettable.
          </h1>
          <p className="text-base md:text-lg text-foreground/80 mt-8 max-w-xl leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.7s" }}>
            From sacred mandaps to intimate soirées — every Magizhchi moment is designed with intention, restraint, and reverence.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: "1s" }}>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-gradient-gold text-primary-foreground text-xs tracking-[0.3em] uppercase hover-gold-glow transition-smooth"
            >
              View Portfolio
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-primary/60 text-primary text-xs tracking-[0.3em] uppercase hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              Begin Your Story
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary/60 text-[10px] tracking-[0.4em] uppercase animate-shimmer">
          Scroll
        </div>
      </section>

      {/* WEDDINGS */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <SectionHeader
          eyebrow="Weddings"
          title="Vows Beneath Gilded Skies"
          subtitle="Sacred ceremonies and reception experiences designed for couples who value heritage, artistry and serenity."
        />
        <CategoryGallery images={weddings.slice(0, 3)} category="Weddings" />
        <div className="text-center mt-14">
          <Link to="/portfolio" className="inline-flex items-center gap-3 text-primary text-xs tracking-[0.3em] uppercase border-b border-primary/40 pb-1 hover:border-primary transition-smooth">
            Explore Weddings <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ENGAGEMENT */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <SectionHeader
          eyebrow="Engagement"
          title="The Promise, Beautifully Set"
          subtitle="Intimate engagement ceremonies framed in floral artistry, candlelight and quiet elegance."
        />
        <CategoryGallery images={engagements.slice(0, 3)} category="Engagement" />
      </section>

      <div className="gold-divider" />

      {/* BABY SHOWER */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <SectionHeader
          eyebrow="Baby Shower"
          title="A Tender Welcome"
          subtitle="Seemantham rituals and modern showers — soft, sentimental and styled with care for the moments that begin a family."
        />
        <CategoryGallery images={babyShowers.slice(0, 3)} category="Baby Shower" />
      </section>

      <div className="gold-divider" />

      {/* BIRTHDAY */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <SectionHeader
          eyebrow="Birthday"
          title="Milestones, Reimagined"
          subtitle="Sophisticated birthday soirées designed with restraint, drama and a hint of midnight gold."
        />
        <CategoryGallery images={birthdays.slice(0, 1)} category="Birthday" variant="feature" />
      </section>

      {/* CTA */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 50%, hsl(43 56% 52% / 0.25), transparent 60%)" }} />
        <div className="relative container mx-auto text-center px-6">
          <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">— Let's Begin —</p>
          <h2 className="font-serif text-4xl md:text-6xl text-gradient-gold max-w-3xl mx-auto leading-tight">
            Your Story Deserves Its Own Atelier.
          </h2>
          <p className="text-muted-foreground mt-8 max-w-xl mx-auto leading-relaxed">
            We accept a limited number of bespoke celebrations each season. Begin a conversation with our team to design yours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-gradient-gold text-primary-foreground text-xs tracking-[0.3em] uppercase hover-gold-glow transition-smooth"
          >
            Enquire Now <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
