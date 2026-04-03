import Layout from "@/components/Layout";
import { Heart } from "lucide-react";

export default function Giving() {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-2">Ways to Give</h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-10" />
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Your generous giving supports the ministry and helps us serve our community. Thank you for your faithfulness.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { method: "Zelle", number: "319-330-4590", desc: "Send directly via your bank's Zelle service." },
              { method: "CashApp", number: "319-330-4590", desc: "Send via CashApp using the number below." },
            ].map((g) => (
              <div key={g.method} className="bg-card rounded-2xl p-8 shadow-card border border-border text-center hover:shadow-elevated transition-shadow hover:glow-gold transition-all">
                <Heart size={32} className="mx-auto text-accent mb-4" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">{g.method}</h2>
                <p className="text-3xl font-mono font-bold text-gradient-gold mb-4">{g.number}</p>
                <p className="text-muted-foreground text-sm">{g.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 bg-muted rounded-2xl p-8 max-w-xl mx-auto text-center">
            <p className="text-muted-foreground italic font-heading text-lg">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            </p>
            <p className="text-accent font-semibold mt-3">— 2 Corinthians 9:7</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
