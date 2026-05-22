import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";
import Logo from "./Logo";

const Footer = () => (
  <footer className="border-t border-border/40 bg-background pt-20 pb-10">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-12 items-start text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <Logo showTagline />
          <p className="text-sm text-muted-foreground mt-6 max-w-xs leading-relaxed">
            Crafting timeless celebrations with quiet luxury, refined design and effortless storytelling.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-primary mb-5 tracking-wider">Explore</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-smooth">Home</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary transition-smooth">Portfolio</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-smooth">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-primary mb-5 tracking-wider">Connect</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Mail size={14} className="text-primary" /> magizhchimoments22@gmail.com
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Phone size={14} className="text-primary" /> +91 8015479682
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Instagram size={14} className="text-primary" /> @magizhchimoments
            </li>
          </ul>
        </div>
      </div>
      <div className="gold-divider mt-16 mb-6" />
      <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground">
        © {new Date().getFullYear()} Magizhchi Moments — All Rights Reserved
      </p>
    </div>
  </footer>
);

export default Footer;