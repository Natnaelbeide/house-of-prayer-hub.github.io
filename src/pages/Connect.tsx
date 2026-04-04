import Layout from "@/components/Layout";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Connect() {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-2">Connect With Us</h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-10" />
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            We'd love to hear from you. Visit us or reach out — you are always welcome.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border flex gap-4 items-start">
                <MapPin size={24} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground text-sm">
                    Foundation of the Apostles and Prophets<br />
                    House of Prayer Church<br />
                    3846 King St<br />
                    Alexandria, VA 22302
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card border border-border flex gap-4 items-start">
                <Mail size={24} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground text-sm italic">Coming soon</p>
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

            <div className="rounded-xl overflow-hidden shadow-card border border-border aspect-square md:aspect-auto">
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
