import Layout from "@/components/Layout";
import { BookOpen, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import faithWorksI from "@/assets/FaithWorks_I.pdf.asset.json";
import faithWorksIII from "@/assets/FaithWorks_III.pdf.asset.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const lessons = [
  { title: "FaithWorks I", desc: "Foundational lessons for growing in faith.", url: faithWorksI.url },
  { title: "FaithWorks III", desc: "Continuing the journey — deeper walk with Christ.", url: faithWorksIII.url },
];

export default function BibleLessons() {
  const listRef = useScrollReveal();

  return (
    <Layout>
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
          <div className="grid gap-5">
            {lessons.map((lesson) => (
              <a
                key={lesson.title}
                href={lesson.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <FileText size={26} className="text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{lesson.title}</h3>
                  <p className="text-muted-foreground text-sm">{lesson.desc}</p>
                </div>
                <BookOpen size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
