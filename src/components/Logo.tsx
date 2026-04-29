import { Link } from "react-router-dom";
import logoMark from "@/assets/logo-mark.png";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo = ({ className = "", showTagline = false }: LogoProps) => (
  <Link to="/" className={`inline-flex flex-col items-center group ${className}`} aria-label="Magizhchi Moments home">
    <img
      src={logoMark}
      alt=""
      aria-hidden="true"
      className="h-12 md:h-14 w-auto mb-2 transition-transform duration-500 group-hover:scale-105"
    />
    <span className="font-serif text-base md:text-lg tracking-[0.25em] uppercase text-primary">
      Magizhchi Moments
    </span>
    {showTagline && (
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground mt-2 uppercase">
        Luxury Event Atelier
      </span>
    )}
  </Link>
);

export default Logo;