import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Star } from "lucide-react";
import logo from "@/assets/logo.png";

const STORAGE_KEY = "fapim_bible_tracker";

function useTrackerComplete() {
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const check = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return setComplete(false);
        const state = JSON.parse(raw);
        const count = Object.values(state.completed || {}).filter(Boolean).length;
        setComplete(count >= 90);
      } catch { setComplete(false); }
    };
    check();
    window.addEventListener("storage", check);
    const interval = setInterval(check, 1000);
    return () => { window.removeEventListener("storage", check); clearInterval(interval); };
  }, []);
  return complete;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/children-youth", label: "Children & Youth" },
  { to: "/giving", label: "Giving" },
  { to: "/gallery", label: "Gallery" },
  { to: "/connect", label: "Connect" },
  { to: "/bible-tracker", label: "Bible Tracker" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const trackerComplete = useTrackerComplete();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <img src={logo} alt="FAPIM Logo" className="h-10 w-10 object-contain" />
              {trackerComplete && (
                <Star size={14} className="absolute -top-1 -right-1 text-accent fill-accent animate-glow-pulse" />
              )}
            </div>
            <span className="font-heading text-sm font-bold text-primary hidden sm:block leading-tight">
              FAPIM
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-card animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium border-b border-border/50 transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gradient-navy text-primary-foreground">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="FAPIM" className="h-12 w-12 object-contain" />
                <div>
                  <p className="font-heading font-bold text-sm">Foundation of the Apostles</p>
                  <p className="font-heading font-bold text-sm">and Prophets</p>
                </div>
              </div>
              <p className="text-sm opacity-80">House of Prayer International Ministry</p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-3">Service Times</h4>
              <p className="text-sm opacity-80">Friday Night — 6:30 PM</p>
              <p className="text-sm opacity-80">Sunday — 3:00 PM</p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-3">Location</h4>
              <p className="text-sm opacity-80">3846 King St</p>
              <p className="text-sm opacity-80">Alexandria, VA 22302</p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-60">
            © {new Date().getFullYear()} Foundation of the Apostles and Prophets International Ministry
          </div>
        </div>
      </footer>
    </div>
  );
}
