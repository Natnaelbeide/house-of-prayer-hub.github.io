import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { ArrowLeft, BookOpen, Quote, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Lesson = {
  title: string;
  date: string;
  ages?: string;
  scripture: string;
  summary: string;
  application: string;
  memoryVerse: string;
  memoryVerseRef: string;
  takeaway: string;
};

const lessons: Lesson[] = [
  {
    title: "What Are You Planting in Your Heart?",
    date: "Sunday, October 25, 2026",
    scripture: "Galatians 6:7–10",
    summary:
      "This week in Sunday School, our children learned from the Apostle Paul's teaching about sowing and reaping. Just as seeds grow into plants, our daily choices, words, and actions influence our character and spiritual growth.",
    application:
      "The children explored how planting good spiritual seeds, such as love, kindness, patience, honesty, and faith, can help them grow closer to God. They also learned the importance of making wise decisions, reading God's Word, praying, and remaining faithful even when spiritual growth takes time.",
    memoryVerse:
      "\u201CA man reaps what he sows.\u201D",
    memoryVerseRef: "Galatians 6:7",
    takeaway:
      "The choices we make today shape who we become tomorrow. Plant seeds of love, kindness, and faith, and let God guide your spiritual growth.",
  },
  {
    title: "Trusting God's Timing",
    date: "Sunday, October 18, 2026",
    scripture: "John 11:1–44",
    summary:
      "This week in Sunday School, our children learned about patience, faith, and trusting God's timing through the story of Jesus raising Lazarus from the dead.",
    application:
      "The students discovered that even when God does not answer our prayers immediately or in the way we expect, His love and care for us never change. Through the example of Mary and Martha, they learned the importance of remaining faithful, praying, and trusting God's wisdom during difficult times.",
    memoryVerse:
      "\u201CWait for the Lord; be strong and take heart and wait for the Lord.\u201D",
    memoryVerseRef: "Psalm 27:14",
    takeaway:
      "God's timing is not always our timing. Keep praying, remain patient, and trust Him even when you don't understand His plan.",
  },
  {
    title: "The Power of Forgiveness",
    date: "Sunday, October 11, 2026",
    scripture: "Genesis 45:1–15; Ephesians 4:32",
    summary:
      "This week in Sunday School, our children learned about the power of forgiveness through the story of Joseph and his brothers. Despite being betrayed and mistreated by his own brothers, Joseph chose to forgive them rather than seek revenge.",
    application:
      "The children learned that forgiveness does not mean forgetting the hurt, but choosing to let go of anger and allowing God to bring healing to our hearts. Through an interactive activity, they also discovered how our words and actions can affect others and why kindness, compassion, and forgiveness are important in our daily lives.",
    memoryVerse:
      "\u201CBe kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.\u201D",
    memoryVerseRef: "Ephesians 4:32",
    takeaway:
      "Forgiveness is stronger than revenge. Just as God forgives us through Jesus Christ, we should learn to forgive others and show His love in our daily lives.",
  },
  {
    title: "Our Relationship with God and Jesus",
    date: "Sunday, October 4, 2026",
    scripture: "James 4:8",
    summary:
      "This week in Sunday School, our children learned what it means to have a personal relationship with God through Jesus Christ. We discussed how a relationship with God grows as we spend time with Him through prayer, reading His Word, trusting Him, obeying Him, and following Jesus in our daily lives.",
    application:
      "The students learned that God wants us not only to know about Him, but to know Him, love Him, and walk with Him every day. Just like any healthy relationship grows through communication and time together, our relationship with God grows when we consistently seek Him and allow His Word to guide our choices.",
    memoryVerse:
      "\u201CDraw near to God, and He will draw near to you.\u201D",
    memoryVerseRef: "James 4:8",
    takeaway:
      "Know God. Talk to God. Trust God. Follow Jesus. Grow closer to Him every day.",
  },
  {
    title: "Who Is Influencing You?",
    date: "Sunday, September 27, 2026",
    ages: "Ages 12–16",
    scripture: "Daniel 1:1–20",
    summary:
      "This week in Sunday School, our youth learned from the story of Daniel about the importance of standing firm in their faith and choosing their influences wisely. Even while surrounded by a culture that challenged his beliefs, Daniel remained committed to honoring God.",
    application:
      "The students were encouraged to think carefully about how friends, social media, entertainment, and other influences can affect their choices and relationship with God. They learned that they can love and respect everyone while still having the courage to make choices that honor God.",
    memoryVerse:
      "\u201CDo not be misled: \u2018Bad company corrupts good character.\u2019\u201D",
    memoryVerseRef: "1 Corinthians 15:33",
    takeaway:
      "Love everyone. Choose your closest influences wisely. Stand for God with courage and respect.",
  },
  {
    title: "Give Your Worries to Jesus",
    date: "Sunday, September 20, 2026",
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
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted rounded-full px-3 py-1">
                  {lesson.date}
                </span>
                {lesson.ages && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full px-3 py-1">
                    <BookOpen size={14} /> {lesson.ages}
                  </span>
                )}
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
