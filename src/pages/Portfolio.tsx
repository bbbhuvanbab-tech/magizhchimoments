import { useState, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader";
import { getCategories } from "@/data/portfolio";

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  const filters = ["All", ...categories.map((c) => c.name)];
  const visible = categories.filter((c) => filter === "All" || c.name === filter);

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="Portfolio"
            title="A Collection of Magizhchi Moments"
            subtitle="Glimpses from celebrations we have designed — each one a chapter in someone's story."
          />
          <div className="text-center py-12 text-muted-foreground">Loading portfolio...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Portfolio"
          title="A Collection of Magizhchi Moments"
          subtitle="Glimpses from celebrations we have designed — each one a chapter in someone's story."
        />

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 text-xs tracking-[0.3em] uppercase border transition-smooth ${
                filter === f
                  ? "bg-gradient-gold text-primary-foreground border-primary"
                  : "border-border text-foreground/70 hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-24">
          {visible.map((cat) => (
            <div key={cat.slug}>
              <div className="flex items-end justify-between mb-10">
                <h3 className="font-serif text-3xl md:text-4xl text-gradient-gold">{cat.name}</h3>
                <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  {cat.items.length} {cat.items.length === 1 ? "Story" : "Stories"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {cat.items.map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-[4/5] overflow-hidden border border-border/40 hover-gold-glow transition-smooth"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-smooth duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent group-hover:from-background/70 transition-smooth" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-2">{cat.name}</p>
                      <p className="font-serif text-xl text-foreground">{img.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;