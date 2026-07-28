import Layout from "@/components/Layout";
import { MapPin, Mail, ChevronRight, Youtube, Facebook, Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Connect() {
  const contactRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative py-28 bg-gradient-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,hsl(40_60%_50%/0.2),transparent_60%)]" />
        </div>
        <div className="relative container px-4 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Get In Touch
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Connect With Us
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} />
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            We'd love to hear from you. Visit us or reach out — you are always welcome.
          </p>
        </div>
      </section>

      {/* Contact + Map */}
      <section className="py-24 bg-background">
        <div ref={contactRef} className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border flex gap-4 items-start hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Foundation of the Apostles and Prophets<br />
                    House of Prayer Church<br />
                    3846 King St<br />
                    Alexandria, VA 22302
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border flex gap-4 items-start hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                  <a href="mailto:contact@houseofprayer.com" className="text-accent hover:underline text-sm">contact@houseofprayer.com</a>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border flex gap-4 items-start hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Youtube size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">Social Media</h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.youtube.com/@rahabot"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Youtube size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/share/1bngFxjwt3/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="#"
                      aria-label="TikTok"
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <TikTokIcon size={20} />
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Send us your Instagram and TikTok links to activate those buttons.</p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=3846+King+St+Alexandria+VA+22302"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Get Directions <ChevronRight size={16} />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-square md:aspect-auto">
              <iframe
                title="Church Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.5!2d-77.1!3d38.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ5JzEyLjAiTiA3N8KwMDYnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 300 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
