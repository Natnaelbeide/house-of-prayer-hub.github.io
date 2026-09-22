import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { ArrowLeft, BookOpen, Quote, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const lessons = [
  {
    title: "Give Your Worries to Jesus",
    ages: "Ages 9–11",
    scripture: "Matthew 6:25–34",
    summary:
      "This week in Sunday School, our children learned that they do not have to carry their worries alone. Through Jesus' teaching about the birds and flowers, they discovered how deeply God cares for them and provides for their needs.",
    application:
      "The children were encouraged to turn their worries into prayer, trust God with things they cannot control, and remember that He is always with them.",
    memoryVerse:
      "\u201CCast all your anxiety on him because he cares for you.\u201D",
    memoryVerseRef: "1 Peter 5:7",
    takeaway:
      "Don't carry it—give it to God. When worry comes, pray and trust Him.",
  },
];

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
            Weekly Sunday School lessons for children, youth, and families.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div ref={listRef} className="container px-4 max-w-3xl mx-auto">
          <Link to="/children-youth" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
            <ArrowLeft size={16} /> Back to Children &amp; Youth
          </Link>

          {lessons.map((lesson) => (
            <article key={lesson.title} className="bg-card rounded-2xl p-8 sm:p-10 shadow-card border border-border mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full px-3 py-1">
                  <BookOpen size={14} /> {lesson.ages}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted rounded-full px-3 py-1">
                  {lesson.scripture}
                </span>
              </div>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-5">{lesson.title}</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">{lesson.summary}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{lesson.application}</p>

              <div className="rounded-xl border border-border bg-muted/60 p-6 mb-6">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                  <Quote size={16} /> Memory Verse
                </p>
                <p className="font-heading text-xl text-foreground italic leading-relaxed">
                  {lesson.memoryVerse}
                </p>
                <p className="text-sm font-semibold text-accent mt-2">— {lesson.memoryVerseRef}</p>
              </div>

              <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                  <Sparkles size={16} /> Weekly Takeaway
                </p>
                <p className="text-foreground font-medium leading-relaxed">{lesson.takeaway}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
