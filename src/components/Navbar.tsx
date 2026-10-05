import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/events", label: "Events" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/40" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 md:py-6">
        <Logo />
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-[10px] xl:text-xs tracking-[0.2em] xl:tracking-[0.25em] uppercase transition-smooth hover:text-primary ${
                    isActive && !l.to.includes("#") ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button asChild className="hidden lg:inline-flex h-11 rounded-none px-5 xl:px-6 text-[10px] xl:text-xs tracking-[0.2em] uppercase hover-gold-glow">
          <Link to="/contact">Plan Your Event</Link>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-primary"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </nav>
      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <ul className="container mx-auto flex flex-col py-6 gap-5">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm tracking-[0.3em] uppercase ${
                      isActive ? "text-primary" : "text-foreground/80"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Button asChild className="mt-2 h-11 rounded-none px-6 text-xs tracking-[0.25em] uppercase">
                <Link to="/contact" onClick={() => setOpen(false)}>Plan Your Event</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;