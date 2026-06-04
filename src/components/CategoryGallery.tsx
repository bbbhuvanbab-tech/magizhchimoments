import { Link } from "react-router-dom";

interface Item {
  src: string;
  alt: string;
}
interface Props {
  images: Item[];
  category: string;
  variant?: "grid" | "split" | "feature";
}

const CategoryGallery = ({ images, category, variant = "grid" }: Props) => {
  if (variant === "feature" && images[0]) {
    return (
      <div className="group relative overflow-hidden border border-border/40">
        <img
          src={images[0].src}
          alt={images[0].alt}
          loading="lazy"
          className="w-full h-[60vh] md:h-[75vh] object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth bg-primary/5" />
      </div>
    );
  }

  const cols =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${cols} gap-6 md:gap-8`}>
      {images.map((img, i) => (
        <Link
          key={i}
          to="/portfolio"
          className="group relative overflow-hidden border border-border/40 aspect-[4/5] block hover-gold-glow transition-smooth"
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-smooth duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/20 group-hover:from-background/70 transition-smooth" />
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-smooth">
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-2">{category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGallery;