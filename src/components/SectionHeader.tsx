interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

const SectionHeader = ({ eyebrow, title, subtitle, align = "center" }: Props) => (
  <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-14 md:mb-20`}>
    {eyebrow && (
      <p className="text-xs tracking-[0.4em] uppercase text-primary mb-5 animate-shimmer">
        — {eyebrow} —
      </p>
    )}
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gradient-gold leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground mt-6 text-base md:text-lg leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;