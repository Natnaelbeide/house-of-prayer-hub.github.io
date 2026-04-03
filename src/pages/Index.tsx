import { Link } from "react-router-dom";
import { Clock, MapPin, Heart, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <img src={logo} alt="FAPIM Logo" className="w-28 h-28 mx-auto mb-6 drop-shadow-lg" />
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-primary-foreground mb-3 leading-tight">
            Foundation of the Apostles<br />and Prophets
          </h1>
          <p className="text-primary-foreground/80 text-lg sm:text-xl font-body mb-8">
            House of Prayer International Ministry
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/connect"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-gold text-foreground font-semibold shadow-gold hover:opacity-90 transition-opacity"
            >
              Plan Your Visit <ChevronRight size={18} />
            </Link>
            <Link
              to="/bible-tracker"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary-foreground/30 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              90-Day Bible Tracker
            </Link>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-2">Service Times</h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              { day: "Friday Night", time: "6:30 PM", icon: "🕯️" },
              { day: "Sunday", time: "3:00 PM", icon: "☀️" },
            ].map((s) => (
              <div key={s.day} className="bg-card rounded-xl p-6 shadow-card text-center border border-border hover:shadow-elevated transition-shadow">
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <Clock size={20} className="mx-auto text-accent mb-2" />
                <h3 className="font-heading text-xl font-semibold text-foreground">{s.day}</h3>
                <p className="text-2xl font-bold text-gradient-gold mt-1">{s.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-muted">
        <div className="container px-4">
          <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-2">Our Location</h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col justify-center">
              <MapPin size={28} className="text-accent mb-3" />
              <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">
                Foundation of the Apostles and Prophets
              </h3>
              <p className="text-muted-foreground mb-4">
                3846 King St<br />Alexandria, VA 22302
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=3846+King+St+Alexandria+VA+22302"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity w-fit"
              >
                Get Directions <ChevronRight size={16} />
              </a>
            </div>
            <div className="rounded-xl overflow-hidden shadow-card border border-border aspect-video">
              <iframe
                title="Church Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.5!2d-77.1!3d38.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ5JzEyLjAiTiA3N8KwMDYnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Giving */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-2">Ways to Give</h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              { method: "Zelle", number: "319-330-4590" },
              { method: "CashApp", number: "319-330-4590" },
            ].map((g) => (
              <div key={g.method} className="bg-card rounded-xl p-6 shadow-card text-center border border-border hover:shadow-elevated transition-shadow">
                <Heart size={24} className="mx-auto text-accent mb-3" />
                <h3 className="font-heading text-xl font-semibold text-foreground">{g.method}</h3>
                <p className="text-lg font-mono text-muted-foreground mt-2">{g.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
