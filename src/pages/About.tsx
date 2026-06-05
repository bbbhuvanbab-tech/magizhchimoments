import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";
import engagement1 from "@/assets/engagement-1.jpg";
import wedding16 from "@/assets/wedding-16.jpg";

const philosophy = [
  { n: "01", t: "Restraint over excess", d: "We believe luxury whispers. Every flower, candle and detail is chosen with intention — never to fill space, only to elevate it." },
  { n: "02", t: "Heritage with modernity", d: "We honour South Indian rituals while weaving in contemporary design — so your celebration feels rooted yet refreshingly your own." },
  { n: "03", t: "Quiet, attentive service", d: "Our atelier is small by design. You speak with the people designing your day — from first sketch to final candle." },
];

const About = () => (
  <div className="pt-32 md:pt-40 pb-20">
    {/* Brand Story */}
    <section className="container mx-auto px-6">
      <SectionHeader eyebrow="Our Story" title="Where Moments Become Heirlooms" />
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
        <div className="relative aspect-[3/4] overflow-hidden border border-border/40">
          <img src={engagement1} alt="Magizhchi Moments brand story" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/20" />
        </div>
        <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            <span className="text-primary font-serif text-2xl">M</span>agizhchi — a Tamil word for joy that lingers — is the quiet centre of everything we create. We are an event atelier devoted to crafting celebrations that feel less like productions and more like memories already lived.
          </p>
          <p>
            Founded with a love for film stills, slow ceremonies and the soft drama of candlelight, Magizhchi Moments designs weddings, engagements, seemanthams and milestone birthdays for families who want their day to feel both deeply personal and impossibly beautiful.
          </p>
          <p>
            We are storytellers first, planners second.
          </p>
        </div>
      </div>
    </section>

    <div className="gold-divider my-32" />

    {/* Philosophy */}
    <section className="container mx-auto px-6">
      <SectionHeader eyebrow="Philosophy" title="Three Quiet Convictions" />
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {philosophy.map((p) => (
          <div key={p.n} className="border border-border/40 p-10 hover-gold-glow transition-smooth">
            <p className="font-serif text-5xl text-gradient-gold mb-6">{p.n}</p>
            <h3 className="font-serif text-2xl text-foreground mb-4">{p.t}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{p.d}</p>
          </div>
        ))}
      </div>
    </section>

    <div className="gold-divider my-32" />

    {/* What Makes Us Different */}
    <section className="container mx-auto px-6">
      <SectionHeader eyebrow="What Makes Us Different" title="A House, Not a Factory" />
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg text-center">
        <p>
          We accept a deliberately small number of celebrations each year — never more than our hands and hearts can hold. This means every Magizhchi moment receives bespoke design, custom florals, and the unhurried attention it deserves.
        </p>
        <p>
          You will not find us replicating Pinterest boards. Each event begins with a single conversation — about your love story, your family, the colours of your childhood, the songs of your grandmothers — and grows from there.
        </p>
      </div>
    </section>

    <div className="gold-divider my-32" />

    {/* Signature Touch */}
    <section className="container mx-auto px-6">
      <SectionHeader eyebrow="The Signature Touch" title="Details You Will Remember Forever" />
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
        <div className="order-2 md:order-1 space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            Hand-tied jasmine garlands strung the morning of. Brass lamps polished by lamplight. A welcome scent designed in-house. A handwritten note on every place setting.
          </p>
          <p>
            These are the touches no one asks for — and the ones everyone remembers. They are our signature, woven quietly through every Magizhchi moment.
          </p>
          <p className="font-serif text-xl text-primary italic">
            "Luxury, to us, is the feeling that someone cared enough to think of everything."
          </p>
        </div>
        <div className="order-1 md:order-2 relative aspect-[3/4] overflow-hidden border border-border/40">
          <img src=src="https://mwklngfmvalxwjdomtxa.supabase.co/storage/v1/object/public/portfolio-images/Wedding/wedding5.jpg" alt="Signature floral installation" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/20" />
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative mt-32 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="relative container mx-auto text-center px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-gradient-gold max-w-3xl mx-auto leading-tight">
          Let us design something you will remember forever.
        </h2>
        <Link
          to="/contact"
          className="inline-block mt-10 px-10 py-4 bg-gradient-gold text-primary-foreground text-xs tracking-[0.3em] uppercase hover-gold-glow transition-smooth"
        >
          Begin Your Story
        </Link>
      </div>
    </section>
  </div>
);

export default About;