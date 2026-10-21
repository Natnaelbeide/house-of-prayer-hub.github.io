import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { POPUP_VERSION, upcomingPrograms } from "@/data/upcomingPrograms";

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // shown at most once every 24 hours
const AUTO_CLOSE_MS = 3 * 60 * 1000; // auto-close after 3 minutes
const storageKey = `popup_shown_${POPUP_VERSION}`;

function getMobileDelay() {
  return typeof window !== "undefined" && window.innerWidth < 768 ? 8000 : 1500;
}

export default function UpcomingPopup() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hasPrograms = upcomingPrograms.length > 0;

  useEffect(() => {
    if (!hasPrograms) return;
    let shown = false;
    try {
      shown = localStorage.getItem(storageKey) === "true";
    } catch {
      shown = false;
    }
    if (shown) return;

    const delay = setTimeout(() => {
      setOpen(true);
      try {
        localStorage.setItem(storageKey, "true");
      } catch {
        // ignore storage errors
      }
    }, getMobileDelay());

    const autoClose = setTimeout(() => setOpen(false), getMobileDelay() + AUTO_CLOSE_MS);

    return () => {
      clearTimeout(delay);
      clearTimeout(autoClose);
    };
  }, [hasPrograms]);

  if (!hasPrograms) return null;

  const showProgram = (index: number) => {
    videoRef.current?.pause();
    setActiveIndex(index);
  };

  const program = upcomingPrograms[activeIndex];
  if (!program) return null;
  const hasMultiplePrograms = upcomingPrograms.length > 1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[85vh] w-[calc(100vw-1.5rem)] max-w-lg flex-col overflow-hidden border-accent/30 bg-card p-0 [&>button:last-child]:text-primary-foreground/80 [&>button:last-child]:hover:bg-white/10 [&>button:last-child]:hover:text-primary-foreground">
        <div className="bg-gradient-navy px-5 py-4 text-primary-foreground">
          <DialogHeader>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="text-accent" size={22} />
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                Coming Up
              </span>
              <Sparkles className="text-accent" size={22} />
            </div>
            <DialogTitle className="text-center font-heading text-2xl text-primary-foreground">
              House of Prayer Church DMV
            </DialogTitle>
            <DialogDescription className="sr-only">Video announcements for upcoming church events.</DialogDescription>
          </DialogHeader>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative aspect-video bg-primary">
            {program.posterUrl ? (
              <img src={program.posterUrl} alt={`${program.title} poster`} className="h-full w-full object-cover" />
            ) : (
            <video
              key={program.id}
              ref={videoRef}
              src={program.videoUrl}
              className="h-full w-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${program.title} video announcement`}
            />
            )}
            {program.isNew && (
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground shadow-gold">
                New
              </span>
            )}
          </div>

          <div className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">{program.title}</h3>
                {program.titleTi && (
                  <p className="mt-0.5 text-sm font-bold text-foreground" lang="ti">
                    {program.titleTi}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">
                {activeIndex + 1} / {upcomingPrograms.length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{program.description}</p>
            {program.descriptionTi && (
              <p className="text-sm font-semibold text-muted-foreground/90" lang="ti">
                {program.descriptionTi}
              </p>
            )}
            {program.note && (
              <p className="font-bold text-foreground">{program.note}</p>
            )}
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="shrink-0 text-accent" />
                <span>{program.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-accent" />
                <span>{program.time}</span>
              </div>
              {program.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span>{program.location}</span>
                </div>
              )}
            </div>
            {program.link && (
              <Button
                asChild
                className="w-full bg-gradient-gold font-semibold text-foreground hover:opacity-90"
              >
                <a href={program.link} onClick={() => setOpen(false)}>
                  {program.linkLabel ?? "Registration & details"}
                </a>
              </Button>
            )}

            {hasMultiplePrograms && (
              <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => showProgram((activeIndex - 1 + upcomingPrograms.length) % upcomingPrograms.length)}
                  aria-label="Previous announcement"
                >
                  <ChevronLeft />
                </Button>
                <div className="flex items-center justify-center gap-1.5" aria-label="Announcement pages">
                  {upcomingPrograms.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => showProgram(index)}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${index === activeIndex ? "bg-accent" : "bg-muted-foreground/30"}`}
                      aria-label={`Show ${item.title}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => showProgram((activeIndex + 1) % upcomingPrograms.length)}
                  aria-label="Next announcement"
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          <Button
            onClick={() => setOpen(false)}
            className="w-full bg-gradient-gold text-foreground font-semibold hover:opacity-90"
          >
            Close
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
