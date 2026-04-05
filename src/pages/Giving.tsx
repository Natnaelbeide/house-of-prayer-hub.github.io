import Layout from "@/components/Layout";
import { Heart, Gift, HandHeart } from "lucide-react";

export default function Giving() {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative py-28 bg-gradient-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(40_60%_50%/0.2),transparent_60%)]" />
        </div>
        <div className="relative container px-4 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Support the Ministry
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Ways to Give
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} />
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Your generous giving supports the ministry and helps us serve our community. Thank you for your faithfulness.
          </p>
        </div>
      </section>

      {/* Giving Cards */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { method: "Zelle", number: "319-330-4590", desc: "Send directly via your bank's Zelle service.", icon: Gift },
              { method: "CashApp", number: "319-330-4590", desc: "Send via CashApp using the number below.", icon: HandHeart },
            ].map((g, i) => (
              <div
                key={g.method}
                className="group bg-card rounded-2xl p-8 shadow-card text-center border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.2 + i * 0.15}s`, animationFillMode: "forwards" }}
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <g.icon size={26} className="text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">{g.method}</h2>
                <p className="text-3xl font-mono font-bold text-gradient-gold mb-4">{g.number}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-24 bg-muted">
        <div className="container px-4">
          <div className="max-w-xl mx-auto bg-card rounded-2xl p-10 shadow-card border border-border text-center animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Heart size={26} className="text-accent" />
            </div>
            <p className="text-foreground italic font-heading text-xl leading-relaxed mb-4">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            </p>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest">— 2 Corinthians 9:7</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
