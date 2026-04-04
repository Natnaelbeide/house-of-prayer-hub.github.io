import { Link } from "react-router-dom";
import { Clock, MapPin, Heart, ChevronRight, Youtube, BookOpen, Users } from "lucide-react";
import Layout from "@/components/Layout";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up max-w-3xl mx-auto">
          <div className="mb-8">
            <img src={logo} alt="FAPIM Logo" className="w-32 h-32 mx-auto drop-shadow-[0_0_30px_rgba(191,140,44,0.4)]" />
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-primary-foreground mb-4 leading-tight drop-shadow-lg">
            Foundation of the Apostles<br className="hidden sm:block" /> and Prophets
          </h1>
          <p className="text-primary-foreground/90 text-lg sm:text-2xl font-body mb-10 tracking-wide">
            House of Prayer International Ministry
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/connect"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-gold text-foreground font-semibold shadow-gold hover:scale-105 transition-transform text-lg"
            >
              Plan Your Visit <ChevronRight size={20} />
            </Link>
            <Link
              to="/bible-tracker"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-primary-foreground/40 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors text-lg"
            >
              <BookOpen size={20} /> 90-Day Bible Tracker
            </Link>
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Service Times */}
      <section className="py-24 bg-background relative">
        <div className="container px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Join Us</p>
            <h2 className="font-heading text-4xl font-bold text-foreground">Service Times</h2>
            <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { day: "Friday Night", time: "6:30 PM", icon: "🕯️", desc: "Evening Prayer & Worship" },
              { day: "Sunday", time: "3:00 PM", icon: "☀️", desc: "Main Service" },
            ].map((s) => (
              <div key={s.day} className="group bg-card rounded-2xl p-8 shadow-card text-center border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl mb-4 block">{s.icon}</span>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-1">{s.day}</h3>
                <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                <p className="text-3xl font-bold text-gradient-gold">{s.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 bg-muted">
        <div className="container px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Find Us</p>
            <h2 className="font-heading text-4xl font-bold text-foreground">Our Location</h2>
            <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto items-center">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <MapPin size={32} className="text-accent mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">
                Foundation of the Apostles and Prophets
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                3846 King St<br />Alexandria, VA 22302
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=3846+King+St+Alexandria+VA+22302"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Get Directions <ChevronRight size={16} />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video">
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

      {/* Watch Online */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Watch Anytime</p>
            <h2 className="font-heading text-4xl font-bold text-foreground">Watch Online</h2>
            <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mt-4" />
          </div>
          <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto text-lg">
            Catch up on sermons and worship from Pastor Henok Habte on our YouTube channel.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video mb-8">
              <iframe
                title="FAPIM YouTube Channel"
                src="https://www.youtube.com/embed/videoseries?list=UUjokQ06rjxq7k2nFf9NiMNw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            <div className="text-center">
              <a
                href="https://www.youtube.com/@rahabot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-destructive text-destructive-foreground font-semibold hover:scale-105 transition-transform text-lg"
              >
                <Youtube size={22} /> Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Giving */}
      <section className="py-24 bg-muted">
        <div className="container px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Support the Ministry</p>
            <h2 className="font-heading text-4xl font-bold text-foreground">Ways to Give</h2>
            <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { method: "Zelle", number: "319-330-4590" },
              { method: "CashApp", number: "319-330-4590" },
            ].map((g) => (
              <div key={g.method} className="group bg-card rounded-2xl p-8 shadow-card text-center border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Heart size={26} className="text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-foreground">{g.method}</h3>
                <p className="text-lg font-mono text-muted-foreground mt-3 tracking-wider">{g.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
