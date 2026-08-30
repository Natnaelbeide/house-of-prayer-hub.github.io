import Layout from "@/components/Layout";
import { Megaphone, Calendar, Clock, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Announcements() {
  const cardsRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative py-28 bg-gradient-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(40_60%_50%/0.2),transparent_60%)]" />
        </div>
        <div className="relative container px-4 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Stay Informed
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Announcements
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} />
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Latest updates, events, and important news from House of Prayer Church DMV.
          </p>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-24 bg-background">
        <div ref={cardsRef} className="container px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                title: "Wednesday Ministers Class",
                date: "Every Wednesday",
                time: "8:00 PM",
                desc: "Join our weekly Zoom class teaching how to be a servant of God. All ministers and leaders are encouraged to attend.",
              },
              {
                title: "Sunday Service",
                date: "Every Sunday",
                time: "3:30 PM",
                desc: "Come worship with us at 3846 King St, Alexandria, VA. Visitors and new families are always welcome.",
              },
              {
                title: "Friday Night Service",
                date: "Every Friday",
                time: "6:30 PM",
                desc: "An evening of prayer, worship, and the Word. Join us in person or watch live on YouTube.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-card rounded-2xl p-6 sm:p-8 shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Megaphone size={22} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                      {item.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-accent" /> {item.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} className="text-accent" /> {item.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center max-w-xl mx-auto">
            <p className="text-muted-foreground mb-6">
              Have a question or want to share an announcement? Reach out to the church office.
            </p>
            <a
              href="mailto:contact@houseofprayer.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
