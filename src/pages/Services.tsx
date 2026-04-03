import Layout from "@/components/Layout";
import { Clock } from "lucide-react";

export default function Services() {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-2">Our Services</h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-10" />
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Join us in worship and prayer. All are welcome to experience the presence of God.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { day: "Friday Night Service", time: "6:30 PM", desc: "A powerful evening of worship, prayer, and the Word of God.", icon: "🕯️" },
              { day: "Sunday Service", time: "3:00 PM", desc: "Come together for Sunday worship, teaching, and fellowship.", icon: "☀️" },
            ].map((s) => (
              <div key={s.day} className="bg-card rounded-2xl p-8 shadow-card border border-border text-center hover:shadow-elevated transition-shadow">
                <span className="text-4xl mb-4 block">{s.icon}</span>
                <Clock size={20} className="mx-auto text-accent mb-3" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-1">{s.day}</h2>
                <p className="text-3xl font-bold text-gradient-gold mb-4">{s.time}</p>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
