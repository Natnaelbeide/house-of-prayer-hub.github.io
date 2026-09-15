import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BibleLessons() {
  const listRef = useScrollReveal();

  return (
    <Layout>
      <Seo title="Bible Lessons | House of Prayer Church DMV" description="Bible lesson materials for children and youth at House of Prayer Church DMV in Alexandria, VA." path="/children-youth/bible-lessons" />
      <section className="relative py-28 bg-gradient-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(40_60%_50%/0.2),transparent_60%)]" />
        </div>
        <div className="relative container px-4 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Study the Word
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Bible Lessons
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} />
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Downloadable lesson materials for children, youth, and families.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div ref={listRef} className="container px-4 max-w-3xl mx-auto">
          <Link to="/children-youth" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
            <ArrowLeft size={16} /> Back to Children & Youth
          </Link>
          <div className="bg-card rounded-2xl p-10 shadow-card border border-border text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <Clock size={32} className="text-accent" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">Lessons Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              New Bible lesson materials for children, youth, and families are being prepared. Check back soon!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
