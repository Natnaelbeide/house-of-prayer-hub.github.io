import Layout from "@/components/Layout";
import { Clock, BookOpen, Users, Music } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Services() {
  const cardsRef = useScrollReveal();
  const expectRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative py-28 bg-gradient-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(40_60%_50%/0.2),transparent_60%)]" />
        </div>
        <div className="relative container px-4 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Worship With Us
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Our Services
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} />
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Join us in worship and prayer. All are welcome to experience the presence of God.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-24 bg-background">
        <div ref={cardsRef} className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { day: "Friday Night Service", time: "6:30 PM", desc: "A powerful evening of worship, prayer, and the Word of God.", icon: "🕯️" },
              { day: "Sunday Service", time: "3:00 PM", desc: "Come together for Sunday worship, teaching, and fellowship.", icon: "☀️" },
            ].map((s) => (
              <div
                key={s.day}
                className="group bg-card rounded-2xl p-8 shadow-card text-center border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-5xl mb-4 block">{s.icon}</span>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Clock size={22} className="text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-1">{s.day}</h2>
                <p className="text-3xl font-bold text-gradient-gold mb-4">{s.time}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 bg-muted">
        <div ref={expectRef} className="container px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">First Time?</p>
            <h2 className="font-heading text-4xl font-bold text-foreground">What to Expect</h2>
            <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Music, title: "Worship", desc: "Spirit-filled praise and worship to set the atmosphere for God's presence." },
              { icon: BookOpen, title: "The Word", desc: "Powerful biblical teaching and preaching rooted in Scripture." },
              { icon: Users, title: "Fellowship", desc: "A warm, welcoming community where everyone belongs." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
