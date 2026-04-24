import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo = ({ className = "", showTagline = false }: LogoProps) => (
  <Link to="/" className={`inline-flex flex-col items-center group ${className}`} aria-label="Magizhchi Moments home">
    <span className="font-serif text-2xl md:text-3xl tracking-[0.18em] text-gradient-gold leading-none">
      MAGIZHCHI
    </span>
    <span className="font-serif text-[10px] md:text-xs tracking-[0.5em] text-primary/80 mt-1">
      M O M E N T S
    </span>
    {showTagline && (
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground mt-2 uppercase">
        Luxury Event Atelier
      </span>
    )}
  </Link>
);

export default Logo;