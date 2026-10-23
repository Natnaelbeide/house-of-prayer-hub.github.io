import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, Clock3, Moon, Sun, Sunrise } from "lucide-react";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { readingPlan, type ReadingDay } from "@/data/readingPlan";
import heroBg from "@/assets/hero-bg.jpg";
import churchPhoto from "@/assets/90-day-bible-guide.jpg.asset.json";

interface ChapterReading {
  book: string;
  bookTigrinya: string;
  chapter: number;
}

interface ReadingSession {
  label: string;
  time: string;
  readings: string[];
}

const sessionDetails = [
  { label: "Morning", time: "Begin the day", icon: Sunrise },
  { label: "Afternoon", time: "Pause and continue", icon: Sun },
  { label: "Evening", time: "Finish and reflect", icon: Moon },
];

function expandDay(day: ReadingDay): ChapterReading[] {
  return day.readings.flatMap((reading) => {
    const [startText, endText] = reading.chapters.split("-");
    const start = Number(startText);
    const end = Number(endText ?? startText);

    return Array.from({ length: end - start + 1 }, (_, index) => ({
      book: reading.book,
      bookTigrinya: reading.bookTigrinya,
      chapter: start + index,
    }));
  });
}

function condenseReadings(chapters: ChapterReading[]): string[] {
  const groups: { book: string; start: number; end: number }[] = [];

  chapters.forEach((chapter) => {
    const previous = groups[groups.length - 1];
    if (previous?.book === chapter.book && previous.end + 1 === chapter.chapter) {
      previous.end = chapter.chapter;
      return;
    }
    groups.push({ book: chapter.book, start: chapter.chapter, end: chapter.chapter });
  });

  return groups.map(({ book, start, end }) => `${book} ${start}${end > start ? `–${end}` : ""}`);
}

function getSessions(day: ReadingDay): ReadingSession[] {
  const chapters = expandDay(day);
  const sections = [chapters.slice(0, 4), chapters.slice(4, 8), chapters.slice(8)];

  return sections.map((section, index) => ({
    label: sessionDetails[index].label,
    time: sessionDetails[index].time,
    readings: condenseReadings(section),
  }));
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Read the Bible in 90 Days",
  description: "A complete 90-day Bible reading guide with morning, afternoon, and evening readings from House of Prayer Church DMV.",
  image: `https://houseofprayerdmv.org${churchPhoto.url}`,
  author: {
    "@type": "Organization",
    name: "House of Prayer Church DMV",
    url: "https://houseofprayerdmv.org",
  },
  publisher: {
    "@type": "Organization",
    name: "House of Prayer Church DMV",
  },
  mainEntityOfPage: "https://houseofprayerdmv.org/how-to-read-the-bible-in-90-days",
};

export default function BibleReadingGuide() {
  return (
    <Layout>
      <Seo
        title="How to Read the Bible in 90 Days | House of Prayer DMV"
        description="Follow a complete 90-day Bible reading guide with morning, afternoon and evening readings from House of Prayer Church DMV."
        path="/how-to-read-the-bible-in-90-days"
        image={churchPhoto.url}
        type="article"
        schema={articleSchema}
      />

      <article className="bg-background">
        <header className="relative min-h-[68vh] flex items-end overflow-hidden">
          <img
            src={heroBg}
            alt="The pulpit and Scripture banners inside House of Prayer Church DMV"
            className="absolute inset-0 h-full w-full object-cover"
            width={1200}
            height={630}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="container relative z-10 px-4 pb-14 pt-32">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase text-accent">A 90-day journey through Scripture</p>
              <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl">
                How to Read the Bible in 90 Days
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
                Read four chapters at a time in the morning and afternoon, then complete the day’s remaining chapters in the evening.
              </p>
              <Button asChild size="lg" className="mt-7 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/bible-tracker">
                  <CheckCircle2 /> Track Your Progress
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <section className="border-b border-border bg-card py-14" aria-labelledby="daily-rhythm-heading">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase text-accent">A simple daily rhythm</p>
              <h2 id="daily-rhythm-heading" className="font-heading text-3xl font-bold text-foreground">Three reading times each day</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Pray before you begin, read without rushing, and write down one truth to remember. If you miss a sitting, continue later that day rather than giving up.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
              {sessionDetails.map(({ label, time, icon: Icon }, index) => (
                <div key={label} className="rounded-lg border border-border bg-background p-6 shadow-card">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase text-accent">Reading {index + 1}</p>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-foreground">{label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{time} · about 4 chapters</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16" aria-labelledby="schedule-heading">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase text-accent">The complete schedule</p>
              <h2 id="schedule-heading" className="font-heading text-3xl font-bold text-foreground">Daily readings for all 90 days</h2>
              <p className="mt-4 text-muted-foreground">Each day follows the same readings as the church’s 90-Day Bible Reading Tracker.</p>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-2">
              {readingPlan.map((day) => (
                <section key={day.day} className="rounded-lg border border-border bg-card p-5 shadow-card" aria-labelledby={`day-${day.day}`}>
                  <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                    <h3 id={`day-${day.day}`} className="font-heading text-xl font-bold text-primary">Day {day.day}</h3>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 size={14} /> 3 sittings</span>
                  </div>
                  <div className="space-y-4">
                    {getSessions(day).map((session, index) => {
                      const Icon = sessionDetails[index].icon;
                      return (
                        <div key={session.label} className="grid grid-cols-[2rem_1fr] gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-primary">
                            <Icon size={16} aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase text-accent">{session.label}</p>
                            <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">{session.readings.join(" · ")}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center border-t border-border pt-10 text-center">
              <BookOpen className="text-accent" size={34} aria-hidden="true" />
              <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Ready to begin?</h2>
              <p className="mt-2 text-muted-foreground">Use the tracker to check off each day and keep personal notes as you read.</p>
              <Button asChild size="lg" className="mt-6">
                <Link to="/bible-tracker">Open the 90-Day Bible Reading Tracker</Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}