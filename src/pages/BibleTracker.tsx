import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { readingPlan } from "@/data/readingPlan";
import { Check, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

const STORAGE_KEY = "fapim_bible_tracker";

interface TrackerState {
  completed: Record<number, boolean>;
  notes: Record<number, string>;
}

function getState(): TrackerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completed: {}, notes: {} };
}

function saveState(state: TrackerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function BibleTracker() {
  const [state, setState] = useState<TrackerState>(getState);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    saveState(state);
  }, [state]);

  const completedCount = Object.values(state.completed).filter(Boolean).length;
  const progress = Math.round((completedCount / 90) * 100);

  const toggleDay = (day: number) => {
    setState((prev) => ({
      ...prev,
      completed: { ...prev.completed, [day]: !prev.completed[day] },
    }));
  };

  const saveNote = (day: number) => {
    setState((prev) => ({
      ...prev,
      notes: { ...prev.notes, [day]: noteText },
    }));
    setExpandedDay(null);
    setNoteText("");
  };

  const expandDay = (day: number) => {
    if (expandedDay === day) {
      setExpandedDay(null);
    } else {
      setExpandedDay(day);
      setNoteText(state.notes[day] || "");
    }
  };

  return (
    <Layout>
      <section className="py-12 bg-background">
        <div className="container px-4 max-w-2xl">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-center text-foreground mb-2">
            90-Day Bible Tracker
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6" />
          <p className="text-center text-muted-foreground mb-8">
            Read through the entire Bible in 90 days. Track your progress below.
          </p>

          {/* Progress Bar */}
          <div className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm font-bold text-gradient-gold">{completedCount}/90 days ({progress}%)</span>
            </div>
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress === 100 && (
              <p className="text-center text-accent font-heading font-bold mt-3 text-lg animate-glow-pulse">
                🎉 Congratulations! You completed the Bible in 90 days!
              </p>
            )}
          </div>

          {/* Day List */}
          <div className="space-y-2">
            {readingPlan.map((day) => (
              <div key={day.day} className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 p-4">
                  <button
                    onClick={() => toggleDay(day.day)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      state.completed[day.day]
                        ? "bg-gradient-gold border-accent text-foreground"
                        : "border-border hover:border-accent"
                    }`}
                    aria-label={`Mark day ${day.day} as ${state.completed[day.day] ? "incomplete" : "complete"}`}
                  >
                    {state.completed[day.day] && <Check size={16} />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">Day {day.day}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {day.readings.map((r) => `${r.book} ${r.chapters}`).join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => expandDay(day.day)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label="Expand day details"
                  >
                    {expandedDay === day.day ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {expandedDay === day.day && (
                  <div className="border-t border-border px-4 py-4 bg-muted/50 animate-fade-in">
                    <div className="space-y-2 mb-4">
                      {day.readings.map((r, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <BookOpen size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {r.book} {r.chapters}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {r.bookTigrinya} {r.chapters}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add a note for this day..."
                      className="w-full p-3 rounded-lg border border-border bg-card text-foreground text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      onClick={() => saveNote(day.day)}
                      className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Save Note
                    </button>
                    {state.notes[day.day] && (
                      <p className="mt-2 text-xs text-muted-foreground italic bg-card p-2 rounded">
                        📝 {state.notes[day.day]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
