import Layout from "@/components/Layout";
import { Users, BookOpen, Heart, Sparkles } from "lucide-react";
import bibleLessonsPdf from "@/assets/FaithWorks_III.pdf.asset.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ChildrenAndYouth() {
  const introRef = useScrollReveal();
  const programsRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative py-28 bg-gradient-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(40_60%_50%/0.2),transparent_60%)]" />
        </div>
        <div className="relative container px-4 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Growing in Faith
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Children & Youth Ministry
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} />
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Nurturing the next generation to know Christ, grow in faith, and shine His light.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-background">
        <div ref={introRef} className="container px-4 max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={30} className="text-accent" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">A Place for Every Age</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our Children and Youth Ministry provides a safe, fun, and spiritually enriching environment where young people learn the Word of God, build friendships, and discover their purpose in Christ.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-muted">
        <div ref={programsRef} className="container px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Programs</p>
            <h2 className="font-heading text-4xl font-bold text-foreground">What We Offer</h2>
            <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, title: "Bible Lessons", desc: "Age-appropriate Scripture teaching for kids and teens." },
              { icon: Users, title: "Mentorship", desc: "Guidance and discipleship from caring adult leaders." },
              { icon: Heart, title: "Fellowship", desc: "Games, activities, and events that build lasting friendships." },
            ].map((item) => (
              <div key={item.title} className="group bg-card rounded-2xl p-8 shadow-card text-center border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={26} className="text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-navy text-primary-foreground">
        <div className="container px-4 text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-4">Bring Your Family</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            All children and youth are welcome to join us during our regular services.
          </p>
          <p className="text-accent font-semibold">Friday 6:30 PM · Sunday 3:00 PM</p>
        </div>
      </section>
    </Layout>
  );
}
