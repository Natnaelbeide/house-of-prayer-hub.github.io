import Layout from "@/components/Layout";
import { CalendarDays, Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { upcomingPrograms } from "@/data/upcomingPrograms";

export default function Calendar() {
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
            Church Events
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Calendar
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} />
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Stay up to date with services, classes, conferences, and special gatherings at House of Prayer Church DMV.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-24 bg-background">
        <div ref={cardsRef} className="container px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {upcomingPrograms.map((event) => (
              <div
                key={event.id}
                className={`group rounded-2xl p-6 sm:p-8 shadow-card border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ${
                  event.isNew ? "bg-accent/5 border-accent" : "bg-card border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    event.isNew ? "bg-accent/20" : "bg-accent/10"
                  }`}>
                    <CalendarDays size={22} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                        {event.title}
                      </h2>
                      {event.isNew && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent text-primary-foreground">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarIcon size={14} className="text-accent" /> {event.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} className="text-accent" /> {event.time}
                      </span>
                      {event.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} className="text-accent" /> {event.location}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center max-w-xl mx-auto">
            <p className="text-muted-foreground mb-6">
              Have an event to share or a question about our calendar? Reach out to the church office.
            </p>
            <a
              href="mailto:contact@houseofprayer.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us <CalendarDays size={16} />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
